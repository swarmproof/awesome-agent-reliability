# RESEARCH — Annotated Field Survey (2026)

> The raw material for **awesome-agent-reliability**. Every candidate entry found via live web research, grouped by section, each with a URL, an honest note, a proposed tag, and a **keep / cut / hold** judgment against the quality bar (see `ARCHITECTURE.md §Inclusion criteria`).
>
> **Research window:** July 2026. **Method:** live web search + source inspection.
> **Tag legend:** `maintained` = actively developed software you can run today · `research` = paper, dataset, or standard (the artifact is knowledge, not a running tool) · `commercial` = product with a paid core (may have an OSS component).
> **Honesty note:** Swarm Proof's own tools (stampede, mockworld, mcp-probe, costbomb, exactly-once, agent-postmortems) are evaluated against the *same* bar as everyone else and tagged identically. Where a competitor is stronger, this survey says so.

---

## How to read the judgments

- **KEEP** — meets the bar: real, reachable, relevant, and adds something the section doesn't already have.
- **HOLD** — plausibly worthy but needs verification (activity, canonical URL, or de-duplication) before it ships.
- **CUT** — fails the bar: listicle/SEO page, dead/unmaintained, redundant, or not actually about agent *reliability*.

A recurring **CUT** class this cycle: the field is drowning in "Top N AI Agent Evaluation Frameworks 2026" SEO content farms (morphllm, futureagi, getmaxim, techsy, etc.). These are **not** entries — they are noise the list exists to replace. They are cited below only as evidence of what was surveyed, never as list entries.

---

## 1. Foundations
*Papers and writing that frame what "agent reliability" even means. Bias toward primary sources (arXiv, first-party engineering blogs) over commentary.*

| Entry | URL | Tag | Note | Judgment |
|---|---|---|---|---|
| Anthropic — *Building Effective Agents* | https://www.anthropic.com/research/building-effective-agents | `research` | The canonical "keep it simple, composable patterns over frameworks" piece (Dec 2024). Frames reliability as an architecture choice, not a bolt-on. Most-cited foundational read in the space. | **KEEP** |
| Anthropic — *Writing Tools for AI Agents* | https://www.anthropic.com/engineering/writing-tools-for-agents | `research` | Sep 2025. Argues the agent-computer interface (tool design) is where reliability is won or lost. Directly relevant; pairs with the above. | **KEEP** |
| *Why Do Multi-Agent LLM Systems Fail?* (MAST taxonomy) | https://arxiv.org/abs/2503.13657 · code: https://github.com/multi-agent-systems-failure-taxonomy/MAST · data: https://huggingface.co/datasets/mcemri/MAST-Data | `research` | NeurIPS 2025. 14 failure modes across 3 categories (specification, inter-agent misalignment, task verification) from 200+ traces / 7 frameworks. Reports 41–86.7% failure rates. The single best empirical taxonomy; ships with an annotated dataset. | **KEEP** |
| Microsoft AI Red Team — *Taxonomy of Failure Modes in Agentic AI Systems* | https://www.microsoft.com/en-us/security/blog/2026/06/04/updating-taxonomy-failure-modes-agentic-ai-systems-year-red-teaming-taught-us/ | `research` | Originally Apr 2025, updated Jun 2026 with a year of red-teaming. Security-flavored taxonomy (agent compromise, injection, impersonation, flow manipulation, memory poisoning). Complements MAST from the adversarial side. | **KEEP** |
| *Failure Modes in LLM Systems: A System-Level Taxonomy for Reliable AI Applications* | https://arxiv.org/abs/2511.19933 | `research` | Nov 2025. System-level (not just model-level) taxonomy — the right altitude for reliability engineering. | **KEEP** |
| *Characterizing Faults in Agentic AI: A Taxonomy of Types, Symptoms, and Root Causes* | https://arxiv.org/html/2603.06847v1 | `research` | Mar 2026. Symptom→root-cause mapping; useful for post-mortem writers. Slight overlap with MAST — keep both, note the difference (this one is fault-diagnosis oriented). | **KEEP** |
| *How Coding Agents Fail Their Users* (20,574 real sessions) | https://arxiv.org/pdf/2605.29442 | `research` | May 2026. Large-scale empirical study of developer–agent misalignment. Concrete, data-driven, domain-specific (coding agents). | **KEEP** |
| MIT AI Risk Repository | https://airisk.mit.edu | `research` | Living meta-database of AI risks with a taxonomy; also tracks incidents (see §8). Foundational reference for framing risk categories. | **KEEP** (cross-listed) |
| *Silent Failure in LLM Agent Systems: The Entropy Principle* | https://arxiv.org/pdf/2606.08162 | `research` | Jun 2026. Provocative framing (disorder as inevitable) but thinner empirical grounding than MAST. | **HOLD** — verify citations/reception before listing; risk of being a hot-take preprint. |
| *AgentRx: Diagnosing AI Agent Failures from Execution Trajectories* | https://arxiv.org/pdf/2602.02475 | `research` | Feb 2026. Trajectory-based diagnosis. Interesting but leans toward a specific method; may fit Evaluation better than Foundations. | **HOLD** |
| SSRN — *Why AI Agents Fail: A Taxonomy…* (Vadlamudi) | https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6572478 | `research` | Redundant with stronger peer-reviewed taxonomies (MAST, Microsoft). SSRN working paper, unclear review status. | **CUT** — redundant, weaker provenance. |

**Section verdict:** 8 KEEP, 2 HOLD, 1 CUT. Strong, primary-source-heavy foundation.

---

## 2. Evaluation
*Tools that test the **agent** — its outputs and its trajectory (the chain of reasoning + tool calls).*

| Entry | URL | Tag | Note | Judgment |
|---|---|---|---|---|
| agentevals | https://github.com/langchain-ai/agentevals | `maintained` | LangChain's open evaluators for agent trajectories and final outputs; trajectory match (strict/unordered/subset/superset) + LLM-as-judge. Framework-agnostic. Already in current README. | **KEEP** |
| DeepEval | https://github.com/confident-ai/deepeval | `maintained` | Open-source "pytest for LLMs" — 30+ metrics incl. tool-call accuracy, task completion. OSS core; Confident AI is the paid platform. Tag the OSS repo `maintained`, note the commercial layer. | **KEEP** |
| Ragas | https://github.com/explodinggradients/ragas | `maintained` | Started as the RAG-eval standard; now ships agent metrics (Agent Goal Accuracy, Tool Call Accuracy). Experiments-first workflow. | **KEEP** |
| Arize Phoenix | https://github.com/Arize-ai/phoenix | `maintained` | OSS observability + eval built on OpenTelemetry/OpenInference; 50+ evaluators, full trace of the agent reasoning loop. Strong self-hostable option. Cross-cuts §6 (cost/obs). | **KEEP** |
| LangWatch | https://github.com/langwatch/langwatch | `maintained` | OSS-core eval + monitoring; UI-driven eval building for non-engineers. Commercial cloud tier. Tag `maintained`, note commercial cloud. | **KEEP** |
| LangSmith | https://www.langchain.com/langsmith | `commercial` | Best-in-class framework-native trajectory eval for LangChain/LangGraph users; closed platform. Honest tag: `commercial`. Include — it's genuinely the strongest for LangGraph shops. | **KEEP** |
| Braintrust | https://www.braintrust.dev | `commercial` | Eval + prompt-iteration platform; widely used. Include as a `commercial` option; no OSS core. | **KEEP** |
| Galileo | https://www.galileo.ai | `commercial` | Agentic tracing + eval; enterprise. Overlaps Braintrust/LangSmith. Include one line, `commercial`. | **HOLD** — include only if it adds a distinct capability vs Braintrust; avoid a wall of look-alike commercial platforms. |
| Maxim AI / Future AGI / Morph | — | — | Surfaced only via their own SEO listicles; products exist but signal is marketing, not adoption. | **CUT** — insufficient independent signal this cycle. |

**Section verdict:** Core OSS trio (agentevals, DeepEval, Ragas) + Phoenix + LangWatch are unambiguous KEEPs. Cap commercial entries at ~3 clearly-differentiated ones to avoid vendor sprawl.

---

## 3. Simulation & stress-testing
*Tools that test **the agent through interaction** — simulated users, adversarial populations, and the environment the agent operates in. The line vs Evaluation: eval scores a run; simulation *generates* the runs (and the pressure).*

| Entry | URL | Tag | Note | Judgment |
|---|---|---|---|---|
| tau-bench / τ-bench | https://github.com/sierra-research/tau-bench | `research` | Princeton + Sierra. LLM user-simulator + tool APIs + policy docs; introduced `pass^k` (consistency across repeats) — a reliability metric, not just a capability one. Both a benchmark (§7) and a simulation *framework*. Cross-list. | **KEEP** |
| τ²-bench | https://github.com/sierra-research/tau2-bench | `research` | 2026 successor: dual-control, voice + knowledge-retrieval domains, 38+ model entries. Cross-lists to §7. | **KEEP** |
| IntellAgent | https://github.com/plurai-ai/intellagent | `maintained` | Plurai. Builds synthetic test suites from policy graphs; simulates thousands of realistic edge-case conversations to surface hidden failure points. Uses τ-bench as gold standard. Best OSS "simulate to break it" tool found. | **KEEP** |
| stampede (Swarm Proof) | https://github.com/swarmproof/stampede | `maintained` | Generates realistic + adversarial agent *populations* against your MCP server / API / protocol. Distinct from τ-bench (which simulates *users* against an agent) — stampede simulates *agents* against a *system*. Honest note: earlier-stage than τ-bench; complementary, not a replacement. Already in README. | **KEEP** |
| mockworld (Swarm Proof) | https://github.com/swarmproof/mockworld | `maintained` | High-fidelity fake services (Stripe/Gmail/exchange) as instant MCP servers for safe agent testing. Fills a real gap: safe *environments*, not just scorers. Already in README. | **KEEP** |
| *Mind the Sim2Real Gap in User Simulation for Agentic Tasks* | https://arxiv.org/pdf/2603.11245 | `research` | Mar 2026. Important caveat on user-simulation validity — good "read before you trust your sim" citation. Could live in Foundations or here. | **HOLD** — decide placement; likely a short pointer here. |

**Section verdict:** Clean section. Key editorial call: cross-list τ-bench/τ²-bench between here and Benchmarks with a one-line disambiguation so readers aren't confused about the overlap.

---

## 4. Security
*Answering "is this server/agent malicious, vulnerable, or exploitable?" Two layers: **static/config scanning** (pre-deploy) and **red-teaming / runtime guardrails**.*

| Entry | URL | Tag | Note | Judgment |
|---|---|---|---|---|
| mcp-scan → Snyk Agent Scan | https://github.com/snyk/agent-scan (formerly https://github.com/invariantlabs-ai/mcp-scan) | `maintained` | The de-facto MCP config scanner (tool poisoning, rug pulls, cross-origin/shadowing, prompt injection). Invariant Labs → acquired by Snyk; repo renamed `agent-scan`. **Honesty note:** list the new canonical URL, note the rename so old links resolve. | **KEEP** |
| Cisco mcp-scanner | https://github.com/cisco-ai-defense/mcp-scanner | `maintained` | Three engines (YARA, LLM-as-judge, Cisco AI Defense API) usable independently. Already in README. | **KEEP** |
| Invariant Guardrails | https://github.com/invariantlabs-ai/invariant | `maintained` | Rule-based runtime guardrail/proxy layer between app and MCP/LLM; the *runtime* counterpart to static scanning. | **KEEP** |
| mcp-audit | https://appsecsanta.com/mcp-audit (Apache-2.0 scanner) | `maintained` | Fully offline/deterministic config scanner; cross-server attack-path graphs, 89 Semgrep rules, OWASP MCP Top 10 mapping. Verify canonical GitHub URL before listing. | **HOLD** — confirm repo URL + license/activity. |
| garak | https://github.com/NVIDIA/garak | `maintained` | NVIDIA's LLM vulnerability scanner; 37+ probe modules (encoding attacks, GCG suffixes, package hallucination, prompt injection). Model-layer red-teaming. | **KEEP** |
| PyRIT | https://github.com/Azure/PyRIT | `maintained` | Microsoft AI Red Team's toolkit; multi-turn orchestrated attacks (Crescendo, TAP, Skeleton Key), multimodal. Application/agent-layer. | **KEEP** |
| promptfoo | https://github.com/promptfoo/promptfoo | `maintained` | YAML-defined red-team + eval, CI/CD-native, OWASP mapping. Acquired by OpenAI (Mar 2026) but kept MIT-licensed — note this honestly. Straddles eval + security; place in Security (red-team) with a cross-ref. | **KEEP** |

**Section verdict:** Strongest-populated section in the field. Editorial structure: split into **"Scanners (static/config)"** and **"Red-teaming & runtime guardrails"** subheads — the field has clearly bifurcated.

---

## 5. Checkpointing & recovery
*Surviving crashes, retries, and replays without corruption or double side-effects. This is where "durable execution" and "idempotency" live.*

| Entry | URL | Tag | Note | Judgment |
|---|---|---|---|---|
| LangGraph (persistence/checkpointers) | https://github.com/langchain-ai/langgraph | `maintained` | Agent-native checkpointing: saves graph state per superstep, threads, human-in-the-loop pauses. Protects against *application-level* failure (bad branches, HITL). | **KEEP** |
| Temporal | https://github.com/temporalio/temporal | `maintained` | Durable workflow engine; protects against *infrastructure-level* failure (crashes, partitions, preemption). OSS core + Temporal Cloud (`commercial` tier — note it). The heavyweight standard. | **KEEP** |
| Restate | https://github.com/restatedev/restate | `maintained` | Journal-based durability; `ctx.run` durable steps, built-in KV state, durable timers, idempotency keys, awakeables. Lighter-weight than Temporal; strong fit for agents. | **KEEP** |
| DBOS | https://github.com/dbos-inc/dbos-transact-py | `maintained` | Durable execution backed by Postgres; "inherently durable without explicit checkpoint instrumentation." Lowest-ceremony option. | **KEEP** |
| exactly-once (Swarm Proof) | https://github.com/swarmproof/exactly-once | `maintained` | Idempotency middleware so agent side-effects (payments, emails, txs) fire once. **Honesty note:** narrower scope than Temporal/Restate/DBOS — it's a focused idempotency layer, *not* a full workflow engine. Positioned as complementary. Already in README. | **KEEP** |
| Inngest | https://github.com/inngest/inngest | `maintained` | Durable functions / event-driven workflows; increasingly used for agents. | **HOLD** — verify agent-reliability relevance vs general job queue framing. |
| Hatchet | https://github.com/hatchet-dev/hatchet | `maintained` | Distributed task queue with durability; similar HOLD rationale. | **HOLD** |

**Section verdict:** The Temporal/Restate/DBOS trio + LangGraph gives readers the full spectrum (infra-level → app-level durability). Frame exactly-once honestly as the narrow idempotency piece, not a peer of Temporal.

---

## 6. Cost & economics
*Keeping agents from spending unbounded money — observability of spend, plus proactive denial-of-wallet defense.*

| Entry | URL | Tag | Note | Judgment |
|---|---|---|---|---|
| Helicone | https://github.com/Helicone/helicone | `maintained` | Proxy-layer observability; one-line integration, automatic cost tracking, zero markup. Fastest setup; best for simpler chains / lower spend. OSS + cloud. | **KEEP** |
| Langfuse | https://github.com/langfuse/langfuse | `maintained` | Span-tracing observability; strong for multi-step agent debugging. OSS-core, self-hostable (compliance) or managed. The default for mid-scale agents. | **KEEP** |
| costbomb (Swarm Proof) | https://github.com/swarmproof/costbomb | `maintained` | Denial-of-wallet *fuzzing* — finds inputs that blow up your bill; gates CI on spend. **Distinct category:** proactive/offensive, not observability. No direct competitor found — genuinely fills a gap. Already in README. | **KEEP** |
| LangSmith | (see §2) | `commercial` | Also does cost tracking; already listed under Evaluation. Cross-ref, don't duplicate. | **KEEP** (cross-ref only) |
| Portkey | https://github.com/Portkey-AI/gateway | `maintained` | AI gateway with cost tracking + routing/failover; zero markup. Adds a routing/reliability angle. | **HOLD** — verify agent-reliability framing vs pure gateway. |
| Arize Phoenix | (see §2) | `maintained` | Also tracks cost/tokens per trace. Cross-ref. | **KEEP** (cross-ref only) |

**Section verdict:** Split "Observability of spend" (Helicone, Langfuse) from "Proactive cost defense" (costbomb) — the honest framing that keeps costbomb from looking like a me-too Helicone.

---

## 7. Benchmarks
*Fixed task sets for comparing agents/models — with a reliability lens (consistency, policy adherence), not just raw capability.*

| Entry | URL | Tag | Note | Judgment |
|---|---|---|---|---|
| SWE-bench (+ Verified) | https://github.com/princeton-nlp/SWE-bench | `research` | Real GitHub bug-fixes; the coding-agent standard. Frontier ~87% (Verified) as of Apr 2026 — note saturation. | **KEEP** |
| GAIA | https://huggingface.co/datasets/gaia-benchmark/GAIA | `research` | General-assistant tasks, 3 difficulty levels; Level 3 still hard. | **KEEP** |
| WebArena | https://github.com/web-arena-x/webarena | `research` | Multi-step browser tasks in realistic web environments. | **KEEP** |
| OSWorld | https://github.com/xlang-ai/OSWorld | `research` | Computer-use on a real desktop; hard, un-saturated. | **KEEP** |
| τ-bench / τ²-bench | https://github.com/sierra-research/tau2-bench | `research` | Policy-adherence + `pass^k` consistency — the most *reliability-relevant* benchmark (a task done that violates policy = fail). Cross-listed from §3. | **KEEP** |
| METR HCAST / Time Horizons | https://metr.org | `research` | Longest task an agent finishes 50% of the time — a distinctive reliability-over-time framing. | **KEEP** |
| LiveMCP-101 | https://arxiv.org/abs/2508.15760 | `research` | 101 real queries needing coordinated multi-MCP-tool use; parallel reference-agent eval; frontier <60% success; 7 failure modes identified. Directly agent-reliability-relevant. | **KEEP** |
| LiveMCPBench | https://icip-cas.github.io/LiveMCPBench/ | `research` | "Ocean of MCP tools" navigation; note: tasks relatively simple (~2.7 tool calls avg) — say so honestly. | **KEEP** |
| MCPBench | https://github.com/modelscope/MCPBench | `maintained` | ModelScope's MCP-server eval (Web Search / DB / GAIA) on accuracy, latency, token cost. Runnable harness → `maintained`. | **KEEP** |
| MCP-SafetyBench | https://arxiv.org/pdf/2512.15163 | `research` | Dec 2025. Safety eval of LLMs against real-world MCP servers. Bridges Benchmarks ↔ Security. | **KEEP** |
| AgentBench | (paper) | `research` | Multi-environment agent benchmark; somewhat superseded by newer suites. | **HOLD** — include only if still maintained/relevant vs the above. |
| "AI Agent Benchmarks 2026" listicles (benchmarkingagents.com, layer3labs, decodethefuture) | — | — | Aggregator/SEO pages, not benchmarks. | **CUT** |

**Section verdict:** Rich section. Lead with the reliability-relevant ones (τ-bench `pass^k`, METR time-horizons, LiveMCP-101) rather than the capability leaderboards, to keep the *reliability* framing.

---

## 8. Incidents & post-mortems
*Structured records of real agent failures in the wild — the empirical bedrock of the field.*

| Entry | URL | Tag | Note | Judgment |
|---|---|---|---|---|
| AI Incident Database (AIID) | https://incidentdatabase.ai | `maintained` | Responsible AI Collaborative. ~800–900 incidents through Q1 2026; the canonical public incident corpus. Note: news-sourced, lacks agent activity logs/tooling detail. | **KEEP** |
| OECD AI Incidents & Hazards Monitor (AIM) | https://oecd.ai/en/incidents | `maintained` | ~5,000–7,000 incident-reports from news monitoring; policy-grade. | **KEEP** |
| AIAAIC Repository | https://www.aiaaic.org | `maintained` | Independent repository of AI, algorithmic & automation incidents/controversies; widely cited. | **KEEP** |
| MIT AI Risk Repository | https://airisk.mit.edu | `research` | Risk taxonomy + incident tracking; cross-listed from Foundations. | **KEEP** |
| agent-postmortems (Swarm Proof) | https://github.com/swarmproof/agent-postmortems | `maintained` | Structured DB of *agent-specific* failures + a reporting standard. **Honest positioning:** the generalist databases above are broader and larger; agent-postmortems is narrower and deeper (agent-only, structured schema, activity-level detail the generalists explicitly lack). List it *below* AIID/OECD/AIAAIC, not above. Already in README. | **KEEP** |
| *Incident Analysis for AI Agents* | https://arxiv.org/pdf/2508.14231 | `research` | Aug 2025. Argues existing DBs miss agent-specific detail (logs, tools) — the intellectual case for agent-postmortems' existence. Good honest cross-cite. | **KEEP** |
| *Open Problems in AI Incident Governance* | https://arxiv.org/html/2607.05163 | `research` | Jul 2026. Governance framing; useful pointer. | **HOLD** |

**Section verdict:** This section is the *bridge* to the sibling agent-postmortems repo — and the honesty test. Listing three larger competitors *above* Swarm Proof's own is the exact credibility move the whole list is built on.

---

## 9. Standards
*Specs, security top-10s, and telemetry conventions that make agent systems legible and interoperable.*

| Entry | URL | Tag | Note | Judgment |
|---|---|---|---|---|
| Model Context Protocol — Specification | https://modelcontextprotocol.io/specification/2025-11-25 | `maintained` | The protocol nearly every entry here assumes. Pin to the dated spec revision. | **KEEP** |
| OWASP MCP Top 10 | https://owasp.org/www-project-mcp-top-10/ · https://github.com/OWASP/www-project-mcp-top-10 | `maintained` | First dedicated Top-10 for MCP (token mismanagement, scope creep, tool poisoning, supply chain, etc.). Beta in 2026. | **KEEP** |
| OWASP Top 10 for LLM Applications | https://genai.owasp.org | `maintained` | Model-layer risks (prompt injection, data poisoning). Foundational. | **KEEP** |
| OWASP Top 10 for Agentic Applications | https://genai.owasp.org | `maintained` | Finalized Dec 2025; autonomous-agent-behavior risks + a guide for third-party MCP servers. | **KEEP** |
| NIST AI RMF (+ AI Agent Standards Initiative) | https://www.nist.gov/itl/ai-risk-management-framework | `maintained` | Risk-management framework; NIST agent-standards initiative began Feb 2026. | **KEEP** |
| CSA AI Controls Matrix (AICM) | https://cloudsecurityalliance.org/artifacts/ai-controls-matrix | `maintained` | 243 control objectives / 18 domains; maps to ISO 42001, NIST AI RMF. Enterprise bridge. | **KEEP** |
| OpenTelemetry GenAI Semantic Conventions | https://github.com/open-telemetry/semantic-conventions | `maintained` | Emerging standard for agent telemetry (agents, tasks, tools, memory spans). The observability *lingua franca* — Datadog/Honeycomb/New Relic + LangChain/CrewAI/AutoGen converging on it. | **KEEP** |
| NSA — MCP Security guidance (CSI) | https://www.nsa.gov/Portals/75/documents/Cybersecurity/CSI_MCP_SECURITY.pdf | `research` | Government guidance PDF; authoritative pointer. | **KEEP** |
| CSA — Agentic MCP Security Best Practices v1 | https://labs.cloudsecurityalliance.org/agentic/agentic-mcp-security-best-practices-v1/ | `research` | Practitioner best-practices. | **HOLD** — verify stability of URL. |
| mcp-probe (Swarm Proof) | https://github.com/swarmproof/mcp-probe | `maintained` | Quality suite for MCP servers (contract, legibility, cost, performance). **Placement fix:** currently under "Standards" in the README — it's a *tool*, not a standard. Move to a **Tooling / MCP quality** section or Simulation; list the *specs* (MCP, OWASP, OTel) under Standards instead. Already in README (mis-placed). | **KEEP** (relocate) |

**Section verdict:** The current README conflates "standards" (specs) with "tooling for the systems agents depend on." Split them (see ARCHITECTURE.md). Standards = the specs; mcp-probe moves to a tooling section.

---

## Discovered gaps & notable finds

- **Snyk consolidation:** Invariant Labs' `mcp-scan` is now `snyk/agent-scan`; the security-scanner subfield is consolidating under Snyk. List the new URL, keep the old as a note so inbound links resolve.
- **promptfoo → OpenAI (Mar 2026), still MIT** — a "commercial acquisition, OSS preserved" case worth tagging honestly (`maintained`, note ownership).
- **The reliability-relevant benchmark metrics** — `pass^k` (τ-bench) and METR time-horizons — are the ones worth foregrounding; most "agent benchmark" coverage foregrounds capability leaderboards instead. Editorial opportunity to be the list that frames benchmarks by *reliability*.
- **A genuine white space** confirmed for two Swarm Proof tools: **costbomb** (no direct denial-of-wallet-fuzzing competitor found) and **mockworld** (few safe high-fidelity mock-service-as-MCP options). These earn their place on merit, not brand.
- **Content-farm saturation** is severe in Evaluation and Benchmarks. The list's value is partly *defensive*: a trustworthy human-curated map against SEO noise.

## Sources (representative — full URLs inline above)
- https://arxiv.org/abs/2503.13657 (MAST) · https://github.com/multi-agent-systems-failure-taxonomy/MAST
- https://www.microsoft.com/en-us/security/blog/2026/06/04/updating-taxonomy-failure-modes-agentic-ai-systems-year-red-teaming-taught-us/
- https://www.anthropic.com/research/building-effective-agents · https://www.anthropic.com/engineering/writing-tools-for-agents
- https://github.com/langchain-ai/agentevals · https://github.com/confident-ai/deepeval · https://github.com/explodinggradients/ragas · https://github.com/Arize-ai/phoenix · https://github.com/langwatch/langwatch
- https://github.com/plurai-ai/intellagent · https://github.com/sierra-research/tau-bench · https://github.com/sierra-research/tau2-bench
- https://github.com/snyk/agent-scan · https://github.com/cisco-ai-defense/mcp-scanner · https://github.com/invariantlabs-ai/invariant · https://github.com/NVIDIA/garak · https://github.com/Azure/PyRIT · https://github.com/promptfoo/promptfoo
- https://github.com/langchain-ai/langgraph · https://github.com/temporalio/temporal · https://github.com/restatedev/restate · https://github.com/dbos-inc/dbos-transact-py
- https://github.com/Helicone/helicone · https://github.com/langfuse/langfuse
- https://github.com/princeton-nlp/SWE-bench · https://huggingface.co/datasets/gaia-benchmark/GAIA · https://github.com/web-arena-x/webarena · https://github.com/xlang-ai/OSWorld · https://arxiv.org/abs/2508.15760 · https://github.com/modelscope/MCPBench · https://arxiv.org/pdf/2512.15163
- https://incidentdatabase.ai · https://oecd.ai/en/incidents · https://www.aiaaic.org · https://airisk.mit.edu · https://arxiv.org/pdf/2508.14231
- https://modelcontextprotocol.io/specification/2025-11-25 · https://owasp.org/www-project-mcp-top-10/ · https://genai.owasp.org · https://www.nist.gov/itl/ai-risk-management-framework · https://github.com/open-telemetry/semantic-conventions
