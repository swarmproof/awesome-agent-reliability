# TEST PLAN — Quality & Validation Strategy

> For a curation project, "tests" = **format lint, dead-link checking, awesome-lint conformance, and curation-policy validation**. "E2E testing" = the automated CI that runs on every PR + a scheduled monthly sweep. This document defines what "healthy" means and the concrete Given/When/Then scenarios that enforce it.

---

## 1. What we validate (and how)

| Dimension | What it checks | Automated? | Gate |
|---|---|---|---|
| **Format lint** | Entry grammar (`[name](url) — desc. \`tag\``), one tag from the closed set, TOC in sync. | Yes (custom + regex) | PR blocks |
| **Dead-link check** | Every URL resolves (2xx/3xx, no auth wall). | Yes (link-checker) | PR blocks + monthly cron |
| **awesome-lint** | Structure/format conformance to the `awesome` standard (required by `sindresorhus/awesome`). | Yes (`awesome-lint`) | PR blocks |
| **Tag correctness** | Tag matches the rubric (ARCHITECTURE §4). | Partial (lint checks *validity*; human checks *correctness*). | Human review |
| **Curation policy** | Real, relevant, non-redundant, sourced, honestly ordered. | No (human judgment). | Human review |
| **Honesty/neutrality** | Own tools ranked truthfully; tone neutral (NFR-1/NFR-3). | No (maintainer). | Human review |

**Principle:** automation does the *mechanical* checks so human effort is reserved for *judgment*. A PR that passes CI still faces the merit bar; a PR that fails CI never reaches a human.

---

## 2. CI design

### 2a. On every PR / push to `main` — `.github/workflows/lint.yml`
1. **awesome-lint** — `npx awesome-lint` over `README.md`.
2. **Dead-link check** — a link-checker (e.g., `lychee` or `markdown-link-check`) over `README.md` + `docs/**`, failing on any 4xx/5xx, with a short retry + timeout for flaky hosts and an ignore-list only for known-rate-limiting hosts (documented inline).
3. **Format lint** — a small script asserting the entry grammar and tag validity (regex over list lines; see §4 scenarios).
4. **TOC sync** — assert every `## Section` has a `## Contents` anchor and vice-versa.

### 2b. Scheduled — monthly cron (`schedule: cron`)
- Full dead-link sweep over the whole repo (catches rot introduced by the outside world, not a PR).
- Opens an issue listing any newly-dead links for the monthly refresh.

### 2c. Local dev
- A `make lint` / `npm run lint` that runs the same three checks so contributors catch failures before pushing.

---

## 3. List-health acceptance criteria

The list is **healthy** when, on `main`:
- **H1** Dead-link pass rate = **100%** (zero unresolved URLs).
- **H2** awesome-lint exits **0**.
- **H3** Format lint exits **0** (every list line parses; every tag ∈ {`maintained`,`research`,`commercial`}).
- **H4** TOC ↔ sections in perfect sync.
- **H5** "last refreshed" marker is ≤ 1 refresh window old.
- **H6** No entry violates the honesty ordering (spot-audited each refresh; documented).
- **H7** Zero listicle/aggregator entries (spot-audited).

---

## 4. Concrete scenarios (Given / When / Then)

### A — Entry passes the quality bar
> **Given** a PR adding `- [Restate](https://github.com/restatedev/restate) — journal-based durable execution with ctx.run steps and idempotency keys. \`maintained\``
> **When** CI runs and a maintainer reviews
> **Then** format lint passes (valid grammar, one valid tag), dead-link check passes (URL resolves), it's real/relevant/non-redundant/honest → **MERGE**.

### B — Entry fails on format
> **Given** a PR adding `- Restate: great durable execution tool https://restate.dev` (no markdown link, no em-dash, no tag)
> **When** CI runs
> **Then** format lint **fails** with a message pointing to the schema (ARCHITECTURE §3) → **BLOCKED**, contributor fixes before human time is spent.

### C — Entry fails on dead link
> **Given** a PR whose URL returns 404 (typo'd repo path)
> **When** the dead-link check runs
> **Then** CI **fails** identifying the unreachable URL → **BLOCKED**.

### D — Entry fails on curation policy (passes CI)
> **Given** a well-formatted, live-linked PR adding a "Top 10 AI Agent Eval Tools 2026" **listicle**
> **When** CI passes but a maintainer reviews
> **Then** it's **REJECTED** per the hard-CUT rule (ARCHITECTURE §5) with a one-line reason ("aggregator/SEO page, not a primary entry").

### E — Entry fails on redundancy
> **Given** a PR adding another closed commercial eval platform functionally identical to two already listed
> **When** reviewed against criterion 4 (non-redundant) + the commercial cap (REQ-12)
> **Then** **REJECTED** unless the contributor names a distinct capability → keeps vendor sprawl out.

### F — Wrong tag
> **Given** a PR tagging LiveMCP-101 (a paper/benchmark) as `maintained`
> **When** reviewed against the rubric (§4: paper/dataset → `research`)
> **Then** maintainer requests change to `research` (or, if a maintained harness exists, confirms which) before merge.

### G — Honesty ordering violation (own tool)
> **Given** a refresh commit that moves `agent-postmortems` *above* AIID/OECD/AIAAIC in the Incidents section
> **When** the honesty spot-audit (H6) runs at review/refresh
> **Then** the change is **reverted** per ADR-006 (own tools ranked below stronger competitors where true) — this is a hard policy gate, not a preference.

### H — Link rot caught by the monthly sweep
> **Given** a previously-live entry whose project was archived and the URL now 404s
> **When** the scheduled monthly cron runs
> **Then** an issue is auto-opened; the refresh either updates the URL, re-tags (dormant), or CUTs the entry — restoring H1.

### I — Meta-list submission readiness
> **Given** the intent to submit to `sindresorhus/awesome`
> **When** `awesome-lint` runs
> **Then** it exits 0 (H2) — the same gate the meta-list applies — so submission isn't bounced on format.

### J — Stale `maintained` entry
> **Given** an entry tagged `maintained` whose repo's last commit is older than the refresh window
> **When** the monthly staleness check runs
> **Then** it's flagged for re-tag (`research`/archived note) or CUT — tags must stay a true promise to the reader (§4).

---

## 5. Test data / fixtures

- **Golden entries** — a small fixture file of known-good lines (one per tag, one cross-listed) that format lint must accept; used to prevent lint regressions.
- **Known-bad entries** — fixtures for each failure class (B, C, F above) that lint must reject; a lint change that stops rejecting these fails its own test.
- **Link allow/ignore-list** — documented list of hosts that rate-limit or block HEAD requests (checked with GET or exempted), so the dead-link check stays low-false-positive.

---

## 6. Non-goals for testing

- No attempt to *auto-judge relevance/quality/honesty* — those are deliberately human judgments; automating them would undermine the trustworthiness of the curation.
- No screenshot/visual regression at v0 (README-only; revisit if a generated site ships later).
- No performance testing (static content).

---

## 7. Exit criteria for "tested"

v0 is considered validated when scenarios **A–F and I** pass in CI/review on the real populated README, **G and J** have a documented manual audit step in the refresh runbook, and **H** is wired as the scheduled cron. Health invariants **H1–H7** hold on `main`.
