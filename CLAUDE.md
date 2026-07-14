# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

An **awesome-list** (curated map of the agent-reliability field) — there is no application code, build, or test suite. `README.md` is the product and the single source of truth (per ADR-005, a YAML data layer is deliberately deferred). Part of the [Swarm Proof toolkit](https://github.com/swarmproof); its entire value is curation honesty.

## Validation commands

```bash
npm install        # once — installs awesome-lint
npm run lint       # format-lint (entry grammar/tags/TOC/dupes) + awesome-lint
npm test           # format-lint self-test against tests/fixtures/{golden,bad}.md
```

CI (`.github/workflows/lint.yml`) runs both lints plus a lychee dead-link check over `README.md` + `docs/` on every PR/push; `link-sweep.yml` runs a monthly cron sweep that opens an issue on rot. Hosts that block non-browser clients (nsa.gov, ssrn.com) are excluded in `lychee.toml` with dated comments — verify manually at refresh time.

## The rulebook: docs/ARCHITECTURE.md

Every content change is judged against `docs/ARCHITECTURE.md`. The essentials:

**Entry grammar (one line, no exceptions — amended by ADR-007 for awesome-lint conformance):**
```
- [<name>](<canonical-url>) - <honest one-line description>. `<tag>`.
```
- Plain hyphen separates link from description (awesome-lint rejects em dashes there; they're fine *inside* descriptions); period ends the description; the tag follows, then a terminal period.
- The README disables awesome-lint's `double-link` rule (ADR-003 cross-listings need duplicate URLs); accidental dupes are caught by `scripts/format-lint.mjs` via its `CROSS_LIST` allowlist — add cross-listed URLs there.
- Repo-file links in README must be absolute GitHub URLs (relative links crash the double-link rule's normalize-url call).
- No `## License` section in the README — awesome-lint forbids it when a LICENSE file exists.
- Description: present tense, ≤ ~140 chars, states what it is and its boundary/limitation where material. No superlatives or marketing.
- Optional secondary links appended as `· code: <url>` / `· data: <url>`; provenance notes inline in parentheses (e.g., "acquired by OpenAI, still MIT").

**Tags — closed set of exactly three** (extending it requires a new ADR):
- `maintained` — runnable OSS/OSS-core software, active within the refresh window. OSS-core with a paid cloud stays `maintained` + an inline note.
- `research` — the artifact is knowledge: paper, dataset, benchmark spec, or standard. A benchmark with a maintained harness → `maintained`.
- `commercial` — closed, paid, no meaningful OSS core.

**Inclusion criteria — KEEP only if all five pass:** real · reachable (no auth wall) · relevant to agent reliability · non-redundant · honestly described. Auto-reject: SEO listicles, aggregators, marketing pages, dead repos, login-walled content.

**The honesty clause (non-negotiable, ADR-006):** the maintainer's own swarmproof tools (stampede, mockworld, mcp-probe, costbomb, exactly-once, agent-postmortems) are judged, tagged, and **ordered** identically to everything else — placed *below* stronger competitors where that's the truth (e.g., agent-postmortems after AIID/OECD/AIAAIC). Ranking an own tool above a better competitor is a policy violation and grounds for reverting a merge.

**Structure:** ten sections ordered knowledge → practice, agent → substrate (the "reliability stack": test-the-agent vs harden-the-substrate). Standards = specs only; tools that implement/check standards go in Tooling (ADR-004). Entries spanning two sections are cross-listed with a one-line disambiguation, never silently duplicated (ADR-003). Keep the `## Contents` TOC in sync with sections.

**On content changes:** update the `*Last refreshed: YYYY-MM.*` marker.

## Supporting docs

- `docs/RESEARCH.md` — annotated field survey with keep/cut/hold judgments for every candidate; consult before adding or removing entries.
- `docs/PRD.md`, `docs/DELIVERY-PLAN.md`, `docs/TEST-PLAN.md` — goals, milestones, and the planned CI design.
- `docs/PROPOSED-README.md` — the draft that was already adopted as `README.md` (commit 2d0155c); treat it as historical, don't edit it in place of the README.

## Conventions

- Conventional Commits (`feat:`, `fix:`, `docs:`, ...), atomic commits (most changes here are `docs:`).
- Tone throughout is neutral and factual — the list's authority depends on it. Name limitations, never editorialize against vendors.
