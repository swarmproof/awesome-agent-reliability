#!/usr/bin/env node
/**
 * format-lint — enforces the entry grammar and list invariants from
 * docs/ARCHITECTURE.md (§3 entry schema, §4 tag rubric, ADR-003 cross-listing).
 *
 * Checks, per TEST-PLAN.md §2a:
 *   1. Entry grammar: `- [name](url) - description. `tag`.`
 *   2. Tag validity: exactly one of `maintained` | `research` | `commercial`.
 *   3. TOC sync: every content `## Section` appears in `## Contents` and vice versa.
 *   4. Duplicate URLs: an entry URL may appear in at most one section, unless the
 *      pair of sections is declared in CROSS_LIST (ADR-003 cross-listings).
 *
 * Usage:  node scripts/format-lint.mjs [README.md]
 *         node scripts/format-lint.mjs --self-test   (runs against tests/fixtures)
 */

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const TAGS = new Set(['maintained', 'research', 'commercial']);

// Sections that are structural, not content — exempt from entry-grammar checks.
const NON_CONTENT_SECTIONS = new Set(['Contents', 'Contributing', 'License']);

// ADR-003: entries deliberately cross-listed in two sections (same canonical URL).
const CROSS_LIST = [
  'https://github.com/sierra-research/tau-bench',
  'https://github.com/sierra-research/tau2-bench',
  'https://github.com/promptfoo/promptfoo', // Evaluation + Security
];

// Entry grammar. Name may contain any chars except `]`; URL must be http(s);
// description must be non-empty and end with `. `tag`.`
const ENTRY_RE = /^- \[([^\]]+)\]\((https?:\/\/[^)\s]+)\) - (.+) `([a-z]+)`\.$/;

// In a content section every bullet must be an entry; anchor-only bullets
// (internal navigation) are the sole exception.
const BULLET_RE = /^- /;
const ANCHOR_ONLY_RE = /^- \[[^\]]+\]\(#[^)]+\)$/;

function slugify(heading) {
  // GitHub anchor algorithm (sufficient subset): lowercase, strip non [a-z0-9 -], spaces → hyphens.
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/ /g, '-');
}

export function lint(markdown, { file = 'README.md' } = {}) {
  const errors = [];
  const lines = markdown.split('\n');

  let section = null;
  let inToc = false;
  const sections = [];
  const tocAnchors = [];
  const urlSections = new Map(); // url -> [{section, line}]

  lines.forEach((line, i) => {
    const n = i + 1;

    const h2 = line.match(/^## (.+)$/);
    if (h2) {
      section = h2[1].trim();
      inToc = section === 'Contents';
      if (!NON_CONTENT_SECTIONS.has(section)) sections.push({ name: section, line: n });
      return;
    }

    if (inToc) {
      const anchor = line.match(/^- \[([^\]]+)\]\(#([^)]+)\)$/);
      if (anchor) tocAnchors.push({ text: anchor[1], slug: anchor[2], line: n });
      return;
    }

    if (!section || NON_CONTENT_SECTIONS.has(section)) return;
    if (!BULLET_RE.test(line)) return;
    if (ANCHOR_ONLY_RE.test(line)) return;

    const m = line.match(ENTRY_RE);
    if (!m) {
      errors.push(
        `${file}:${n} entry does not match the grammar \`- [name](url) - description. \`tag\`.\` (docs/ARCHITECTURE.md §3)`
      );
      return;
    }
    const [, , url, desc, tag] = m;
    if (!TAGS.has(tag)) {
      errors.push(
        `${file}:${n} invalid tag \`${tag}\` — must be one of: ${[...TAGS].join(', ')} (docs/ARCHITECTURE.md §4)`
      );
    }
    if (desc.trim().length === 0) {
      errors.push(`${file}:${n} empty description`);
    }
    // Track primary URL for duplicate detection.
    const list = urlSections.get(url) ?? [];
    list.push({ section, line: n });
    urlSections.set(url, list);
  });

  // 3. TOC sync (both directions).
  const sectionSlugs = new Map(sections.map((s) => [slugify(s.name), s]));
  for (const a of tocAnchors) {
    if (!sectionSlugs.has(a.slug)) {
      errors.push(`${file}:${a.line} TOC links to #${a.slug} but no such section exists`);
    }
  }
  const tocSlugs = new Set(tocAnchors.map((a) => a.slug));
  for (const s of sections) {
    if (!tocSlugs.has(slugify(s.name))) {
      errors.push(`${file}:${s.line} section "${s.name}" is missing from the Contents TOC`);
    }
  }

  // 4. Duplicate URLs outside the ADR-003 allowlist.
  for (const [url, occ] of urlSections) {
    if (occ.length > 1 && !CROSS_LIST.includes(url)) {
      const where = occ.map((o) => `${o.section} (line ${o.line})`).join(', ');
      errors.push(
        `${file} duplicate entry URL ${url} in: ${where} — cross-listing requires adding it to CROSS_LIST (ADR-003)`
      );
    }
  }

  return errors;
}

function selfTest() {
  const here = dirname(fileURLToPath(import.meta.url));
  const golden = readFileSync(join(here, '..', 'tests', 'fixtures', 'golden.md'), 'utf8');
  const bad = readFileSync(join(here, '..', 'tests', 'fixtures', 'bad.md'), 'utf8');

  const goldenErrors = lint(golden, { file: 'golden.md' });
  if (goldenErrors.length > 0) {
    console.error('SELF-TEST FAIL: golden fixture should produce zero errors, got:');
    goldenErrors.forEach((e) => console.error('  ' + e));
    return 1;
  }

  const badErrors = lint(bad, { file: 'bad.md' });
  // bad.md documents its expected failure count in its first line: <!-- expect-errors: N -->
  const expected = Number(bad.match(/expect-errors: (\d+)/)?.[1] ?? NaN);
  if (badErrors.length !== expected) {
    console.error(
      `SELF-TEST FAIL: bad fixture should produce ${expected} errors, got ${badErrors.length}:`
    );
    badErrors.forEach((e) => console.error('  ' + e));
    return 1;
  }
  console.log('self-test passed (golden: 0 errors, bad: expected failures all caught)');
  return 0;
}

const args = process.argv.slice(2);
if (args[0] === '--self-test') {
  process.exit(selfTest());
}

const target = args[0] ?? 'README.md';
const errors = lint(readFileSync(target, 'utf8'), { file: target });
if (errors.length > 0) {
  errors.forEach((e) => console.error(e));
  console.error(`\n${errors.length} format error(s).`);
  process.exit(1);
}
console.log(`format-lint: ${target} OK`);
