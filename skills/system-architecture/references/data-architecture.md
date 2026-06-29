# Data architecture

Read this after `non-functional-requirements.md` has established the consistency requirement — that single NFR is the main thing that determines which of the patterns below actually applies.

## The foundational question: who owns this data?

In a system made of more than one service, every piece of data needs exactly one service that owns it — the single source of truth for that data, the only one that writes to it directly. Other services that need that data either call the owning service, or receive a copy via an event the owning service publishes (see `references/integration-patterns.md`) — they never reach directly into another service's database. **Shared direct database access between services is one of the most damaging anti-patterns in multi-service architecture**: it silently recreates tight coupling that the service boundary was supposed to prevent, since now a schema change in one service can break another service that nobody told about the dependency.

This sounds obvious stated directly, but it's commonly violated under time pressure ("we'll just have the reporting service read the orders database directly, it's faster") — and each violation quietly reintroduces exactly the coupling cost the service split was meant to avoid. If two services genuinely need the same data, the question to ask is which one owns it and how the other gets a copy or a call, not whether to skip that question for convenience.

## Consistency: the central decision

This is usually the single most architecture-determining data decision, and it's directly downstream of the consistency NFR established earlier:

- **Strong consistency** — every read reflects the most recent write, immediately, everywhere. Required when stale data would actually be wrong in a way that matters (a bank balance check before approving a withdrawal). Achieving this across multiple services/databases is expensive — it typically means either keeping the relevant data in one service/database rather than splitting it, or accepting the real cost of distributed transactions.
- **Eventual consistency** — different parts of the system may briefly see different versions of the same data, converging over time (often within milliseconds to seconds). Acceptable, and often the right default, for the large majority of business data — a product catalog update doesn't need every service to see it in the same millisecond. This is what makes event-driven, multi-service architectures practical at all: insisting on strong consistency everywhere effectively rules out distributed systems entirely.
- **The mistake to actively watch for**: defaulting to strong consistency by habit (because it's the simpler mental model) for data that doesn't actually require it, then paying an unnecessary architectural cost — or the opposite, accepting eventual consistency casually for data that genuinely needed strong guarantees (e.g. anything involving money moving between accounts), and discovering the gap only after a real incident.

**Pin the consistency decision per data domain, not once for the whole system.** A single system commonly has some data that genuinely needs strong consistency (payments, inventory counts at checkout) alongside plenty that's fine with eventual consistency (display data, analytics, most user-facing content) — treating the whole system as needing one uniform answer is itself a common mistake.

## Data contracts

When one service's data is consumed by another (directly or via an event), define the contract explicitly: schema, versioning approach, and what the consuming service can rely on staying stable. **Treat this with the same seriousness as an API contract between services**, because that's exactly what it is — a schema change with no contract or versioning discipline is how "I changed a field name in my service" turns into "three other teams' services broke in production with no warning." This becomes especially important as the number of services and consumers grows — at small scale, a quick conversation can substitute for a written contract; past a handful of services and teams, the informal version stops working reliably.

## Data mesh and data fabric — when an organization actually needs these

These are heavier organizational/architectural patterns, relevant once data ownership and access span many domains and teams — not something a small system with a handful of services needs to adopt.

- **Data mesh** is a decentralized, domain-oriented *operating model*: each domain team owns and exposes its own data as a well-defined "data product" (with the data contract discipline above formalized), rather than a central data team owning all data integration. This mirrors the same logic that justifies splitting a monolith into services in the `backend` skill — decentralizing ownership to the teams who actually understand the data, at the cost of needing real platform investment (self-service tooling, a shared schema registry/catalog) so domain teams can do this without each needing dedicated data engineers.
- **Data fabric** is a complementary, more *technology-centric* pattern: an automated metadata layer that unifies discovery, governance, and lineage across however the data is actually stored and owned. Where mesh distributes responsibility, fabric centralizes the *intelligence* about where data lives and how it flows.
- **The current, well-evidenced finding**: these aren't competing choices to pick between — **mesh without fabric creates invisible silos** (domains own their data but other teams can't find or use it), and **fabric without mesh recreates a centralized bottleneck under a different name**. Organizations that adopt one without the other report the same underlying problem either way. If an organization is large enough to need either pattern, it likely needs both together, not a choice of one.
- **When this doesn't apply**: a system with a handful of services and one or two teams doesn't need "a data mesh" — it needs the foundational ownership and consistency discipline above, applied consistently. Reaching for data-mesh terminology and tooling at that scale is a clear case of adopting a pattern because it's currently a major industry conversation, not because an actual organizational-scale data-ownership problem exists yet.

## Anti-patterns to flag in review

- A service reading another service's database directly instead of calling its API or subscribing to its events.
- No defined owner for a piece of data that multiple services read — leads to inconsistent copies and "which one is actually correct" confusion.
- Strong consistency assumed by default for data that doesn't actually need it, adding unnecessary architectural cost.
- Eventual consistency accepted casually for financial or safety-critical data without a deliberate decision that it's actually acceptable there.
- A schema change shipped with no versioning or contract discipline, breaking downstream consumers with no warning.
- Adopting "data mesh" as a buzzword/tooling choice at a scale where the underlying organizational problem (many domains, many teams, central team as bottleneck) doesn't actually exist yet.
