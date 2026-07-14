<!-- expect-errors: 6 -->
<!-- Known-bad fixture: each entry below violates one rule; format-lint MUST reject all
     (TEST-PLAN §5 / scenarios B, C-format-class, F). Expected errors:
     1. no markdown link / bare text          (grammar)
     2. em-dash separator                     (grammar)
     3. missing tag                           (grammar)
     4. invalid tag `awesome`                 (tag rubric)
     5. missing terminal period after tag     (grammar)
     6. duplicate URL not in CROSS_LIST       (ADR-003)
     Plus a TOC that is deliberately in sync so only entry errors fire. -->

## Contents

- [Section One](#section-one)
- [Section Two](#section-two)

## Section One

- Restate: great durable execution tool https://restate.dev
- [Restate](https://github.com/restatedev/restate) — journal-based durable execution. `maintained`.
- [DBOS](https://github.com/dbos-inc/dbos-transact-py) - durable execution backed by PostgreSQL.
- [garak](https://github.com/NVIDIA/garak) - LLM vulnerability scanner. `awesome`.
- [PyRIT](https://github.com/Azure/PyRIT) - red-team toolkit. `maintained`

## Section Two

- [Helicone](https://github.com/Helicone/helicone) - proxy-layer cost observability. `maintained`.
- [Helicone](https://github.com/Helicone/helicone) - duplicated without an allowlist entry. `maintained`.
