# Awesome Agent Reliability [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

<!--lint disable double-link-->
<!-- double-link is disabled by design: entries that legitimately span two sections are
     cross-listed with the SAME canonical URL (ADR-003 in docs/ARCHITECTURE.md).
     Accidental duplicate URLs are still caught by scripts/format-lint.mjs, which
     enforces a cross-list allowlist. -->

> A curated, ruthlessly honest map of the field: papers, tools, benchmarks, incidents, and standards for building agents that don't break.

The agent-reliability space is fragmenting fast — eval tools, sim tools, security scanners, checkpointing, benchmarks — with no canonical map, and a rising tide of SEO listicles pretending to be one. This is the honest map. Entries are included on merit and omitted when weak, **including the maintainer's own tools**, which appear only where they earn it, are labeled like everything else, and are ranked below stronger alternatives where that's the truth. A self-serving awesome-list is worthless; an honest one is authority.

**Tags:** `maintained` (runnable, actively developed) · `research` (paper / dataset / spec) · `commercial` (closed, paid). See [`docs/ARCHITECTURE.md`](https://github.com/swarmproof/awesome-agent-reliability/blob/main/docs/ARCHITECTURE.md) for the tagging rubric and inclusion criteria.

*Last refreshed: 2026-07.*

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
- [Tooling (MCP quality & ops)](#tooling-mcp-quality--ops)

## Foundations

*Papers and writing that frame what "agent reliability" even means — failure taxonomies, design principles, evaluation theory.*

- [Building Effective Agents](https://www.anthropic.com/research/building-effective-agents) - the canonical case for simple, composable patterns over heavy frameworks; frames reliability as an architecture choice. `research`.
- [Writing Tools for AI Agents](https://www.anthropic.com/engineering/writing-tools-for-agents) - argues the agent-computer (tool) interface is where reliability is won or lost. `research`.
- [Why Do Multi-Agent LLM Systems Fail? (MAST)](https://arxiv.org/abs/2503.13657) - NeurIPS 2025; 14 empirical failure modes across 3 categories from 1,600+ traces / 7 frameworks. Ships a [dataset](https://huggingface.co/datasets/mcemri/MAST-Data) and [code](https://github.com/multi-agent-systems-failure-taxonomy/MAST). `research`.
- [Taxonomy of Failure Modes in Agentic AI Systems](https://www.microsoft.com/en-us/security/blog/2026/06/04/updating-taxonomy-failure-modes-agentic-ai-systems-year-red-teaming-taught-us/) - Microsoft AI Red Team; security-flavored taxonomy (compromise, injection, impersonation, memory poisoning), updated with a year of red-teaming. `research`.
- [Failure Modes in LLM Systems: A System-Level Taxonomy](https://arxiv.org/abs/2511.19933) - system-level (not just model-level) taxonomy — the right altitude for reliability engineering. `research`.
- [Characterizing Faults in Agentic AI](https://arxiv.org/html/2603.06847v1) - types, symptoms, and root causes; fault-diagnosis oriented, useful for post-mortem writers. `research`.
- [How Coding Agents Fail Their Users](https://arxiv.org/pdf/2605.29442) - large-scale analysis of developer-agent misalignment across 20,574 real sessions. `research`.

## Evaluation

*Tools that **score** an agent's outputs and trajectory. (Eval scores a run; [Simulation](#simulation--stress-testing) generates the runs.)*

- [agentevals](https://github.com/langchain-ai/agentevals) - open evaluators for agent trajectories and outputs; trajectory match (strict/unordered/subset/superset) + LLM-as-judge. `maintained`.
- [DeepEval](https://github.com/confident-ai/deepeval) - "pytest for LLMs"; 30+ metrics incl. tool-call accuracy and task completion (OSS core; Confident AI is the paid platform). `maintained`.
- [Ragas](https://github.com/vibrantlabsai/ragas) - RAG-eval standard extended to agents (Agent Goal Accuracy, Tool Call Accuracy) *(formerly explodinggradients; now Vibrant Labs, OSS core retained)*. `maintained`.
- [Arize Phoenix](https://github.com/Arize-ai/phoenix) - self-hostable observability + eval on OpenTelemetry; 50+ evaluators over the full agent reasoning loop. `maintained`.
- [LangWatch](https://github.com/langwatch/langwatch) - OSS-core eval + monitoring with UI-driven eval building for non-engineers (commercial cloud tier). `maintained`.
- [LangSmith](https://www.langchain.com/langsmith) - best-in-class framework-native trajectory eval for LangChain/LangGraph users; closed platform. `commercial`.
- [Braintrust](https://www.braintrust.dev) - eval + prompt-iteration platform, widely adopted. `commercial`.

## Simulation & stress-testing

*Tools that **generate** interactions, populations, or environments to pressure-test agents.*

- [IntellAgent](https://github.com/plurai-ai/intellagent) - builds synthetic test suites from policy graphs; simulates thousands of realistic edge-case conversations to surface hidden failures. `maintained`.
- [τ-bench](https://github.com/sierra-research/tau-bench) - LLM user-simulator + tool APIs + policy docs; introduced `pass^k` (consistency across repeats). Also a [benchmark](#benchmarks). `research`.
- [τ²-bench](https://github.com/sierra-research/tau2-bench) - dual-control successor with voice + knowledge-retrieval domains. Also a [benchmark](#benchmarks). `research`.
- [stampede](https://github.com/swarmproof/stampede) - generates realistic + adversarial agent *populations* against your MCP server / API / protocol (tests agents→system, vs τ-bench's users→agent). Earlier-stage than τ-bench; complementary. `maintained`.
- [mockworld](https://github.com/swarmproof/mockworld) - high-fidelity fake services (Stripe/Gmail/exchange) as instant MCP servers for safe agent testing. `maintained`.

## Security

*"Is this server/agent malicious, vulnerable, or exploitable?"*

#### Scanners (static / config)

- [Snyk Agent Scan](https://github.com/snyk/agent-scan) - the de-facto MCP config scanner: tool poisoning, rug pulls, cross-origin/shadowing, prompt injection *(formerly Invariant Labs `mcp-scan`; acquired by Snyk)*. `maintained`.
- [Cisco mcp-scanner](https://github.com/cisco-ai-defense/mcp-scanner) - three engines (YARA, LLM-as-judge, Cisco AI Defense API) usable independently. `maintained`.

#### Red-teaming & runtime guardrails

- [garak](https://github.com/NVIDIA/garak) - NVIDIA's LLM vulnerability scanner; 37+ probe modules (encoding attacks, GCG suffixes, package hallucination, prompt injection). `maintained`.
- [PyRIT](https://github.com/microsoft/PyRIT) - Microsoft AI Red Team toolkit; multi-turn orchestrated attacks (Crescendo, TAP, Skeleton Key), multimodal *(moved from the archived Azure/PyRIT)*. `maintained`.
- [promptfoo](https://github.com/promptfoo/promptfoo) - YAML-defined red-team + eval, CI/CD-native, OWASP mapping *(acquired by OpenAI, still MIT-licensed)*. `maintained`.
- [Invariant Guardrails](https://github.com/invariantlabs-ai/invariant) - rule-based runtime guardrail/proxy layer between your app and MCP/LLM providers. `maintained`.

## Checkpointing & recovery

*Surviving crashes, retries, and replays without corruption or double side-effects.*

- [LangGraph](https://github.com/langchain-ai/langgraph) - agent-native checkpointing: saves graph state per superstep, threads, human-in-the-loop pauses; protects against application-level failure. `maintained`.
- [Temporal](https://github.com/temporalio/temporal) - durable workflow engine; protects against infrastructure-level failure (crashes, partitions, preemption). OSS core + Temporal Cloud. `maintained`.
- [Restate](https://github.com/restatedev/restate) - journal-based durability; `ctx.run` durable steps, built-in KV state, durable timers, idempotency keys, awakeables. Lighter than Temporal. `maintained`.
- [DBOS](https://github.com/dbos-inc/dbos-transact-py) - durable execution backed by PostgreSQL; inherently durable without explicit checkpoint instrumentation. `maintained`.
- [exactly-once](https://github.com/swarmproof/exactly-once) - focused idempotency middleware so agent side-effects (payments, emails, txs) fire once. Narrower than the workflow engines above — a complementary idempotency layer, not a full durable-execution runtime. `maintained`.

## Cost & economics

*Keeping agents from spending unbounded money.*

#### Observability of spend

- [Helicone](https://github.com/Helicone/helicone) - proxy-layer observability; one-line integration, automatic cost tracking, zero markup. Best for simpler chains / lower spend. `maintained`.
- [Langfuse](https://github.com/langfuse/langfuse) - span-tracing observability; strong for multi-step agent debugging; self-hostable or managed. `maintained`.

#### Proactive cost defense

- [costbomb](https://github.com/swarmproof/costbomb) - denial-of-wallet *fuzzing*: finds inputs that blow up your bill and gates CI on spend. Offensive/proactive, not observability — no direct competitor found. `maintained`.

## Benchmarks

*Fixed task sets for comparing agents, framed by a reliability lens (consistency, policy adherence) — not just capability.*

- [τ-bench](https://github.com/sierra-research/tau-bench) - policy adherence + `pass^k` consistency; the most reliability-relevant benchmark (a task completed but policy-violating = fail). Also in [Simulation](#simulation--stress-testing). `research`.
- [τ²-bench](https://github.com/sierra-research/tau2-bench) - dual-control successor to τ-bench (agent and user both act); voice + knowledge-retrieval domains. Also in [Simulation](#simulation--stress-testing). `research`.
- [METR HCAST / Time Horizons](https://metr.org) - the longest task an agent finishes 50% of the time — a distinctive reliability-over-time framing. `research`.
- [LiveMCP-101](https://arxiv.org/abs/2508.15760) - 101 real queries needing coordinated multi-MCP-tool use; frontier models score <60%; identifies 7 failure modes. `research`.
- [LiveMCPBench](https://icip-cas.github.io/LiveMCPBench/) - navigating a large MCP toolset; note: tasks are relatively simple (~2.7 tool calls avg). `research`.
- [MCPBench](https://github.com/modelscope/MCPBench) - evaluates MCP servers (Web Search / DB / GAIA) on accuracy, latency, and token cost; harness dormant since Apr 2025. `research`.
- [MCP-SafetyBench](https://arxiv.org/pdf/2512.15163) - safety evaluation of LLMs against real-world MCP servers; bridges benchmarks and security. `research`.
- [SWE-bench](https://github.com/princeton-nlp/SWE-bench) - real GitHub bug-fixes; the coding-agent standard (Verified split saturated at the frontier). `research`.
- [GAIA](https://arxiv.org/abs/2311.12983) - general-assistant tasks across three difficulty levels (Level 3 still hard); dataset access now login-gated on HF. `research`.
- [WebArena](https://github.com/web-arena-x/webarena) - multi-step browser tasks in realistic web environments. `research`.
- [OSWorld](https://github.com/xlang-ai/OSWorld) - computer-use on a real desktop; hard and un-saturated. `research`.

## Incidents & post-mortems

*Structured records of real agent failures in the wild.*

- [AI Incident Database (AIID)](https://incidentdatabase.ai) - Responsible AI Collaborative; the canonical public incident corpus (~800–900 incidents). News-sourced; lacks agent activity logs/tooling detail. `maintained`.
- [OECD AI Incidents & Hazards Monitor](https://oecd.ai/en/incidents) - ~5,000–7,000 incident-reports from news monitoring; policy-grade. `maintained`.
- [AIAAIC Repository](https://www.aiaaic.org) - independent repository of AI, algorithmic & automation incidents and controversies. `maintained`.
- [MIT AI Risk Repository](https://airisk.mit.edu) - living risk taxonomy + incident tracking. `research`.
- [Incident Analysis for AI Agents](https://arxiv.org/pdf/2508.14231) - argues existing databases miss agent-specific detail (logs, tools) — the case for agent-native corpora. `research`.
- [agent-postmortems](https://github.com/swarmproof/agent-postmortems) - structured database of *agent-specific* failures + a reporting standard. Narrower and deeper than the generalist databases above (agent-only, structured schema, activity-level detail they lack) — not a replacement for them. `maintained`.

## Standards

*The specs — protocol, security top-10s, and telemetry conventions.*

- [Model Context Protocol — Specification](https://modelcontextprotocol.io/specification) - the protocol nearly every entry here assumes (link tracks the latest revision). `maintained`.
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - first dedicated Top-10 for MCP (token mismanagement, scope creep, tool poisoning, supply chain); still draft/beta. `research`.
- [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/) - model-layer risks (prompt injection, data poisoning); the de-facto LLM-risk checklist scanners map to. `research`.
- [OWASP Top 10 for Agentic Applications](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/) - autonomous-agent-behavior risks (ASI01–ASI10), finalized Dec 2025. `research`.
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) - risk-management framework; NIST agent-standards initiative began Feb 2026. Governance-side more than engineering-side. `research`.
- [CSA AI Controls Matrix (AICM)](https://cloudsecurityalliance.org/artifacts/ai-controls-matrix) - 243 control objectives / 18 domains; maps to ISO 42001 and NIST AI RMF. Compliance/audit-side. `research`.
- [OpenTelemetry GenAI Semantic Conventions](https://github.com/open-telemetry/semantic-conventions-genai) - spans/metrics for GenAI + MCP; the convention major observability vendors converge on. Experimental. `maintained`.
- [NSA — MCP Security guidance (CSI)](https://www.nsa.gov/Portals/75/documents/Cybersecurity/CSI_MCP_SECURITY.pdf) - government guidance on securing MCP (site blocks non-browser clients; loads in a browser). `research`.

## Tooling (MCP quality & ops)

*Quality and reliability tooling for the systems agents depend on.*

- [mcp-probe](https://github.com/swarmproof/mcp-probe) - quality suite for MCP servers (contract, legibility, cost, performance). `maintained`.

## Contributing

PRs welcome — see [`CONTRIBUTING.md`](https://github.com/swarmproof/awesome-agent-reliability/blob/main/CONTRIBUTING.md). Quality bar (full criteria in [`docs/ARCHITECTURE.md`](https://github.com/swarmproof/awesome-agent-reliability/blob/main/docs/ARCHITECTURE.md)): **real · reachable · relevant · non-redundant · honestly described.** One line per entry: `[name](url) - honest one-line description. \`tag\`.` Listicles and marketing pages are rejected. Refreshed monthly.

*Part of the [Swarm Proof toolkit](https://github.com/swarmproof).*
