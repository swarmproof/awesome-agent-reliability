# Contributing to awesome-agent-reliability

Thanks for helping build **awesome-agent-reliability** — part of the [Swarm Proof toolkit](https://github.com/swarmproof).

## Adding an entry

Every entry is one line, following the exact grammar (full spec: [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) §3):

```
- [<name>](<canonical-url>) - <honest one-line description>. `<tag>`.
```

**Tags** — exactly one, from the closed set (rubric in `docs/ARCHITECTURE.md` §4):

| Tag | Means |
|---|---|
| `maintained` | Runnable software, actively developed (commit/release within the refresh window), OSS or OSS-core. |
| `research` | The artifact is knowledge: a paper, dataset, benchmark spec, or standard/guidance document. |
| `commercial` | Closed, paid product with no meaningful OSS core. Capped per section. |

**The quality bar** — an entry is included only if it passes **all five** (full criteria in `docs/ARCHITECTURE.md` §5):

1. **Real** — it exists and does what it claims.
2. **Reachable** — canonical public URL, no auth wall (CI-checked).
3. **Relevant** — genuinely about agent reliability, not adjacent hype.
4. **Non-redundant** — adds something no listed entry does.
5. **Honest** — the one-liner is defensible and names limitations.

**Auto-rejected:** SEO listicles, "Top N" content farms, aggregators, marketing pages, dead repos, login-walled content.

**Honesty policy:** the maintainer's own Swarm Proof tools are held to the identical bar and ranked *below* stronger competitors where that's the truth (ADR-006). The same neutrality applies to every entry — describe, don't market.

## Workflow

1. Fork and clone.
2. Create a branch: `git checkout -b feat/<short-name>`.
3. Run the same checks CI runs: `npm install && npm run lint` (format lint + awesome-lint; CI also dead-link-checks with lychee).
4. Keep commits atomic and use [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, ...).
5. Open a PR — the template walks you through the entry self-check.

A PR that passes CI still faces the merit bar; a maintainer may decline it with a one-line reason (e.g., "aggregator, not a primary entry").

## Other ways to contribute

- **Good first issues** — look for the `good-first-issue` label.
- **Bug reports / dead links** — open an issue with the entry and what's wrong.
- **Features & discussion** — open an issue before a large PR so we can align on direction.

## Principles (shared across the toolkit)

- **Provider-agnostic** — no hard dependency on a single model vendor.
- **Honest over impressive** — we don't overpromise guarantees; we document boundaries.
- **Watchable & reproducible** — outputs should be seedable and screenshot-worthy.

By contributing you agree your work is licensed under this repo's LICENSE (Apache-2.0).
