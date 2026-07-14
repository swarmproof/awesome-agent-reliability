# ARCHITECTURE — Information Architecture & Curation Design

> How the list is *structured*, what an *entry* is, how things get *tagged* and *included*, how *contributions* flow, and how an optional site could be *generated* later. Plus the ADRs behind these choices.
>
> For a curation/editorial project, "architecture" = the section taxonomy, entry schema, tagging rubric, inclusion criteria, and contribution workflow. This is the spec CI validates against and PRs are judged against.

---

## 1. Design principle: the reliability stack

The organizing idea, derived from the field survey (`RESEARCH.md`), is a two-axis split:

```
                     TEST THE AGENT                 HARDEN THE SUBSTRATE
                (does it do the right thing?)   (does the system survive it?)
   ──────────────────────────────────────────────────────────────────────────
   KNOWLEDGE     Foundations                     Standards
   (research)    Benchmarks                      Incidents & post-mortems
   ──────────────────────────────────────────────────────────────────────────
   PRACTICE      Evaluation                      Security
   (tools)       Simulation & stress-testing     Checkpointing & recovery
                                                  Cost & economics
                                                  Tooling (MCP quality & ops)
```

A capable agent on a poisoned, non-idempotent, or cost-unbounded substrate still fails in production. Reliability is the *product* of both columns — so the taxonomy gives both first-class space. This framing is also the list's editorial point of view: most "agent" content covers only the left column.

---

## 2. Section taxonomy (final)

Ten sections. Order runs knowledge → practice, agent → substrate, so a newcomer reads top-to-bottom as a learning path.

| # | Section | Scope (the one-line boundary shown in the list) | Adjacent-section disambiguation |
|---|---|---|---|
| 1 | **Foundations** | Papers & writing that frame what "agent reliability" *means* — failure taxonomies, design principles, evaluation theory. | Not benchmarks (those are runnable task sets, §7). |
| 2 | **Evaluation** | Tools that *score* an agent's outputs and trajectory. | Eval **scores a run**; Simulation (§3) **generates the runs**. |
| 3 | **Simulation & stress-testing** | Tools that *generate* interactions/populations/environments to pressure-test agents. | Simulates users→agent (τ-bench) or agents→system (stampede) or fake environments (mockworld). |
| 4 | **Security** | "Is this server/agent malicious, vulnerable, or exploitable?" — scanners + red-teaming + runtime guardrails. | Two subheads: **Scanners (static/config)** and **Red-teaming & runtime guardrails**. |
| 5 | **Checkpointing & recovery** | Surviving crashes, retries, and replays without corruption or double side-effects — durable execution + idempotency. | Durability engines (Temporal/Restate/DBOS) vs the narrow idempotency layer (exactly-once). |
| 6 | **Cost & economics** | Keeping agents from spending unbounded money. | Two subheads: **Observability of spend** (Helicone/Langfuse) vs **Proactive cost defense** (costbomb). |
| 7 | **Benchmarks** | Fixed task sets for comparing agents/models, framed by a *reliability* lens (consistency, policy adherence). | Lead with reliability-relevant metrics (`pass^k`, time-horizons), not capability leaderboards. |
| 8 | **Incidents & post-mortems** | Structured records of real agent failures in the wild. | Generalist DBs (AIID/OECD/AIAAIC) first; agent-specific corpora (agent-postmortems) after. |
| 9 | **Standards** | The *specs* — protocol, security top-10s, telemetry conventions. | Specs only. Tools that *implement/check* standards live in §10. |
| 10 | **Tooling (MCP quality & ops)** | Quality/reliability tooling for the systems agents depend on (MCP servers, contracts, legibility). | New section (see ADR-004): fixes the current README's mis-filing of mcp-probe under "Standards." |

> **Change vs current README:** §9 "Standards" in the current README mixes specs with tooling (mcp-probe is listed there). This IA separates *specs* (§9) from *tooling* (§10). Everything else maps cleanly onto the existing structure.

---

## 3. Entry schema

**Grammar (one line, no exceptions):**

```
- [<name>](<canonical-url>) - <honest one-line description>. `<tag>`.
```

**Rules**
- **Name** = the project/paper/spec's own name, linked to its canonical home (repo, arXiv abstract page, or official site). No vanity renaming.
- **Description** = one sentence, present tense, ≤ ~140 chars. States *what it is* and, where material, *its boundary* ("~2.7 tool calls avg — relatively simple"; "narrower than a full workflow engine"). No superlatives, no marketing.
- **Tag** = exactly one, from the closed set (§4), backtick-formatted, at the end of the line, followed by a terminal period.
- **Hyphen** (` - `) separates link from description; **period** ends the description; the tag follows the period. (Originally an em dash — amended for awesome-lint conformance, see ADR-007. Em dashes remain fine *inside* descriptions.)
- **Inline provenance notes** allowed in parentheses where honesty requires it: `(formerly mcp-scan; now Snyk Agent Scan)`, `(acquired by OpenAI, still MIT)`.

**Optional secondary link** (papers with code, or a paper + dataset) is linked inline in the description (e.g., "Ships a [dataset](url) and [code](url)").

**Example (real, from the survey):**
```
- [τ-bench](https://github.com/sierra-research/tau-bench) - LLM user-simulator + tool APIs + policy docs; introduced `pass^k` (consistency across repeats). `research`.
```

**Enforcement:** `scripts/format-lint.mjs` (run via `npm run lint`) asserts this grammar, the closed tag set, TOC↔section sync, and duplicate-URL detection with an ADR-003 cross-list allowlist. Golden/known-bad fixtures live in `tests/fixtures/`.

---

## 4. Tagging rubric

Exactly three tags. The test for each is objective enough for a contributor to self-apply and a reviewer to verify.

| Tag | Applies when… | Examples | Edge-case rule |
|---|---|---|---|
| `maintained` | Runnable software, actively developed (commit/release within the refresh window), OSS or OSS-core. | agentevals, garak, LangGraph, Helicone, Restate | OSS-core with a paid cloud → `maintained` **+** an inline note of the commercial tier (e.g., "OSS + Temporal Cloud"). |
| `research` | The artifact is *knowledge*: a paper, dataset, benchmark spec, or standard/guidance document. | MAST, LiveMCP-101, OWASP MCP Top 10, NSA CSI. | A benchmark with a maintained *harness* (MCPBench) → `maintained`; a benchmark that is primarily a paper/dataset → `research`. |
| `commercial` | Closed, paid product with no meaningful OSS core. | LangSmith, Braintrust, Galileo. | Capped per section (PRD REQ-12). Acquired-but-still-OSS (promptfoo) stays `maintained` with an ownership note. |

**Staleness handling:** a `maintained` entry that goes dormant past the refresh window is either re-tagged (`research`/archived note) or CUT at the monthly pass. Tags are a *promise to the reader* about current state — they must stay true.

---

## 5. Inclusion criteria (the quality bar)

An entry is **KEEP** only if it passes **all five**:

1. **Real** — it exists and does what it claims (repo runs / paper is published / spec is official). No vaporware, no "coming soon."
2. **Reachable** — canonical public URL, no auth wall, resolves (CI-checked).
3. **Relevant** — genuinely about *agent reliability* (test the agent or harden the substrate), not adjacent hype.
4. **Non-redundant** — adds something a listed entry doesn't. A look-alike is CUT unless it has a distinct capability.
5. **Sourced/honest** — the one-liner is defensible and names limitations where they exist.

**Hard CUT list (auto-reject):** SEO "Top N …" listicles, content-farm aggregators, marketing landing pages with no substance, dead/abandoned repos, and anything requiring login to view.

**The honesty clause (non-negotiable):** the maintainer's own Swarm Proof tools are judged by criteria 1–5 identically, tagged identically, and **ordered honestly within their section** — placed below stronger competitors where that is the truth (e.g., agent-postmortems listed *after* AIID/OECD/AIAAIC; exactly-once framed as a narrow idempotency layer, not a peer of Temporal). Ranking own tools above better competitors is an automatic policy violation (PRD NFR-1).

---

## 6. Contribution workflow

```
Contributor opens PR (uses entry PR template)
        │
        ▼
CI gate (automated, TEST-PLAN.md)
  ├─ format lint (entry grammar §3)
  ├─ dead-link check (criterion 2)
  └─ awesome-lint (TOC/structure)
        │  pass
        ▼
Maintainer review (curation policy §5)
  ├─ merit bar (criteria 1,3,4,5)
  ├─ tag correctness (§4)
  └─ honesty/neutrality (NFR-1, NFR-3)
        │  approve
        ▼
Merge → next monthly refresh verifies liveness
```

**PR template** (`.github/PULL_REQUEST_TEMPLATE.md`) encodes a contributor self-check:
- [ ] Entry follows the one-line schema (`[name](url) - desc. \`tag\`.`).
- [ ] URL is canonical, first-party, and loads without login.
- [ ] Exactly one tag, correct per the rubric.
- [ ] Not a listicle/aggregator/marketing page.
- [ ] Not redundant with an existing entry (or I explain the distinct capability).
- [ ] Description is honest and names any real limitation.
- [ ] Placed in the correct section (and cross-listed with a disambiguation if it legitimately spans two).

**Maintainer rejection is allowed even when CI passes** — with a one-line public reason (keeps the bar legible and the process fair).

---

## 7. Optional later tooling (derived, not required)

v0 is a README. Everything below is *later* and *optional* (PRD NG4), and — critically — **derived from the same source data** so there's one source of truth.

### 7a. Data-first refactor (enables everything else)
Introduce `data/entries.yaml` (or per-section YAML) as the machine-readable source of truth; the README is *generated* from it. Each record:
```yaml
- name: τ-bench
  url: https://github.com/sierra-research/tau-bench
  section: [simulation, benchmarks]     # cross-listing is explicit
  tag: research
  description: "LLM user-simulator + tool APIs + policy docs; introduced pass^k."
  notes: "Princeton + Sierra."
  added: 2026-07
```
This is an ADR-worthy decision (ADR-005) because it changes the contribution surface (edit YAML, not prose). Defer until entry count justifies it.

### 7b. Automated link-checking CI (do this at/near launch)
Already low-effort and high-value — see `TEST-PLAN.md`. Runs on PR + a scheduled monthly cron.

### 7c. Generated searchable site (later)
From the YAML: a static site (e.g., zero-backend SSG) with **filter by section, filter by tag, full-text search, "added this month" feed**. Mirrors the sibling agent-postmortems' generated-site pattern. Zero backend, deploy from CI. This is the only place a "web app" appears, and it stays derived + static.

---

## 8. Architecture Decision Records

### ADR-001 — README-first, not app-first
**Decision:** Ship v0 as a README + repo files. **Why:** an awesome-list's value is the curation, not the delivery mechanism; a README is where the audience (GitHub, meta-lists) already is, costs ~2 evenings, and carries zero maintenance surface. **Alternatives rejected:** launch with a site (premature, higher maintenance, splits source of truth). **Consequence:** a generated site is a *later, derived* option (§7c, ADR-005).

### ADR-002 — Three-tag closed vocabulary
**Decision:** `maintained` · `research` · `commercial`, closed set. **Why:** three tags are learnable at a glance, self-applicable by contributors, and verifiable by CI/reviewers; they capture the axis readers most need (can I run it? is it knowledge? will it cost me?). **Alternatives rejected:** rich multi-facet tagging (language, license, stars) — higher maintenance, lower signal, invites bikeshedding. **Consequence:** extending the vocabulary requires a new ADR.

### ADR-003 — Cross-list overlapping entries, never duplicate silently
**Decision:** an entry that legitimately spans two sections (τ-bench: Simulation + Benchmarks) appears in both **with a one-line disambiguation**; the canonical description lives once and is referenced. **Why:** readers approach from different sections; silent duplication rots (two copies drift). **Consequence:** lint checks that cross-listed entries share a canonical URL.

### ADR-004 — Separate Standards (specs) from Tooling (implementations)
**Decision:** §9 Standards = specs only; new §10 Tooling holds implementations/quality-suites (mcp-probe). **Why:** the current README files a *tool* (mcp-probe) under *Standards*, conflating two different things and mistagging the reader's intent. **Consequence:** one relocation; README-visible section count goes from 9 → 10.

### ADR-005 — Data-as-source-of-truth is deferred, not adopted at launch
**Decision:** keep prose Markdown as the source at v0; adopt `entries.yaml` only when entry count / site plans justify it. **Why:** premature data-modeling raises the contribution barrier (YAML PRs) before the list is big enough to need it. **Consequence:** the generated-site plan (§7c) is blocked on this ADR flipping to "adopted."

### ADR-006 — Own tools ranked honestly, in-section, same tags
**Decision:** Swarm Proof tools obey the identical schema, tags, and ordering rules; where a competitor is stronger, it is listed above the own tool. **Why:** the honesty is the entire product (PRD NFR-1); a self-serving list is worthless. **Consequence:** this is enforced in review and is grounds for reverting a merge.

### ADR-007 — Entry grammar amended for awesome-lint conformance
**Decision:** the link↔description separator is a plain hyphen (` - `), the trailing tag is followed by a terminal period, and the README carries no `## License` section (the LICENSE file is authoritative). **Why:** `awesome-lint` — the gate `sindresorhus/awesome` applies to submissions (DELIVERY-PLAN M1.1, TEST-PLAN scenario I, PRD M7) — rejects em/en-dash separators, list items not ending in punctuation, and a License section when a LICENSE file exists. The original §3 grammar could never pass the meta-list's own linter; conformance wins because meta-list acceptance is a primary success metric (PRD M1). **Also:** awesome-lint's `double-link` rule is disabled file-wide in the README (HTML comment at top) because ADR-003 cross-listings *require* duplicate canonical URLs; accidental duplicates are still caught by `scripts/format-lint.mjs` via an explicit cross-list allowlist. **Consequence:** §3 grammar, the PR template, CONTRIBUTING, and format-lint all encode the amended grammar; em dashes remain legal inside descriptions.
