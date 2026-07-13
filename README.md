# Awesome Agent Reliability [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated, ruthlessly honest map of the field: papers, tools, benchmarks, incidents, and standards for building agents that don't break.

The agent-reliability space is fragmenting fast — eval tools, sim tools, security scanners, checkpointing, benchmarks — with no canonical map. This is that map. Entries are included on merit and omitted when weak, **including the maintainer's own tools**, which appear only where they earn it and are labeled like everything else. A self-serving awesome-list is worthless; an honest one is authority.

**Tags:** `maintained` · `research` · `commercial`

## Contents

- [Foundations](#foundations)
- [Evaluation](#evaluation)
- [Simulation & stress-testing](#simulation--stress-testing)
- [Security](#security)
- [Checkpointing & recovery](#checkpointing--recovery)
- [Cost & economics](#cost--economics)
- [Benchmarks](#benchmarks)
- [Incidents & post-mortems](#incidents--post-mortems)
- [Standards](#standards)

## Foundations
*Papers and writing that frame what "agent reliability" even means.*
- _(seeding — PRs welcome)_

## Evaluation
*Tools that test the **agent**.*
- [agentevals](https://github.com/langchain-ai/agentevals) — evaluators for agent trajectories and outputs. `maintained`

## Simulation & stress-testing
*Tools that test the **system the agent uses**.*
- [stampede](https://github.com/swarmproof/stampede) — generate realistic + adversarial agent populations and run them against your MCP server / API / protocol. `maintained`
- [mockworld](https://github.com/swarmproof/mockworld) — high-fidelity fake services (Stripe/Gmail/exchange) as instant MCP servers for safe agent testing. `maintained`

## Security
*Answering "is this server/agent malicious or vulnerable?"*
- [mcp-scan](https://github.com/invariantlabs-ai/mcp-scan) — config-level MCP security scanner (tool poisoning, rug pulls). `maintained`
- [Cisco mcp-scanner](https://github.com/cisco-ai-defense/mcp-scanner) — YARA + LLM-judge MCP scanning engines. `maintained`

## Checkpointing & recovery
*Surviving crashes, retries, and replays without corruption.*
- [exactly-once](https://github.com/swarmproof/exactly-once) — idempotency middleware so agent side-effects (payments, emails, txs) fire once. `maintained`

## Cost & economics
*Keeping agents from spending unbounded money.*
- [costbomb](https://github.com/swarmproof/costbomb) — denial-of-wallet fuzzing; finds inputs that blow up your bill and gates CI on spend. `maintained`

## Benchmarks
- _(seeding — PRs welcome)_

## Incidents & post-mortems
- [agent-postmortems](https://github.com/swarmproof/agent-postmortems) — structured public database of real agent failures + a reporting standard. `maintained`

## Standards
*Quality and reliability tooling for the systems agents depend on.*
- [mcp-probe](https://github.com/swarmproof/mcp-probe) — quality suite for MCP servers (contract, legibility, cost, performance). `maintained`

---

## Contributing

PRs welcome — see [`CONTRIBUTING.md`](./CONTRIBUTING.md). Quality bar: real, working, relevant. One line per entry: name, honest one-line description, link, and a tag. Refreshed monthly.

*Part of the [Agent Reliability toolkit](https://github.com/swarmproof).*

## License

[Apache-2.0](./LICENSE).
