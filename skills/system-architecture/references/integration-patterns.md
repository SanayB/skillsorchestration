# Integration patterns

Read this after `non-functional-requirements.md` has established what's actually being optimized for. Every pattern here has a genuine cost; justify each choice against a specific NFR established earlier, not against the pattern's general reputation.

## Synchronous (request-response) vs. asynchronous (event-driven)

These are complementary tools, not competitors — **most production systems use both**, and the right question is which fits a given interaction, not which is the better architecture overall.

- **Request-response fits** when the caller needs the result before continuing — a frontend asking an API for a user's profile, a payment authorization that must complete before checkout proceeds.
- **Event-driven fits** when the producer doesn't need to know who's listening or wait for them to finish — an `OrderCreated` event might be consumed independently by a billing service, an analytics service, and a notification service, none of which block the producer or each other. Adding a fourth consumer (e.g. a fraud-detection service) later doesn't require touching the producer at all — that decoupling is the specific property event-driven architecture exists to provide, and it's the concrete thing to check for when deciding whether this pattern is actually earning its cost for a given interaction.

## Event-driven architecture (EDA) — and the sub-patterns inside it

"Event-driven" is often used as if it's one pattern; in practice it's a family, and conflating them is a common source of confusion (and unnecessary complexity, if a project takes on a heavier sub-pattern than its actual requirement calls for).

- **Plain pub/sub event notification** — a service publishes an event when something happens; other services subscribe and react. This is the baseline pattern, and for most "decouple service A from service B" needs, it's sufficient on its own.
- **CQRS (Command Query Responsibility Segregation)** — separates the model used to write data (commands) from the model used to read it (queries), allowing each to be optimized independently. Justified by a specific NFR: read and write load patterns are different enough (e.g. heavy read traffic, much lighter write traffic) that one shared model can't serve both well. Don't reach for CQRS as a default "best practice" — it adds real complexity (two models to keep conceptually aligned) that needs a concrete read/write asymmetry to justify.
- **Event sourcing** — stores state changes as an immutable sequence of events rather than persisting current state directly; current state is derived by replaying events. **This is commonly confused with event-driven architecture generally, but it's a separate decision with its own cost** — adopting event-driven communication between services does not require event sourcing, and event sourcing can be adopted within a single service's internal data model without making the whole system event-driven externally. Justified by a specific NFR like a regulatory requirement for a complete, immutable audit trail, or a genuine need to reconstruct historical state — not adopted as a default "more rigorous" way to store data.
- **Saga pattern** — coordinates a multi-step transaction across multiple services where a traditional single-database transaction isn't possible (each step is in a different service/database). Justified when a business process genuinely spans multiple services and needs a defined way to handle partial failure (compensating actions to undo completed steps if a later step fails) — this is real, necessary complexity for that specific situation, not something to add preemptively.
- **Inbox/outbox pattern** — solves the specific reliability problem of publishing an event and writing to a database as one atomic operation, so a crash between the two doesn't leave the system in an inconsistent state (data written but event never published, or vice versa). Worth knowing as the standard, named solution to a very specific and easy-to-get-wrong reliability problem in event-driven systems — don't reinvent this from scratch.

**Sequencing for adopting these, if multiple are eventually needed**: start with plain event-driven communication via an API gateway and pub/sub for basic decoupling; add resilience patterns (circuit breakers, retry with backoff) as actual failure modes are observed; add CQRS specifically where a read/write asymmetry is measured, not assumed; reach for a service mesh only once there are enough services that manually configuring inter-service communication, security, and observability becomes the actual bottleneck (rough rule of thumb cited in practice: once past roughly 15-20 services); add event sourcing or sagas only for the specific bounded contexts where their specific justifying NFR applies, not system-wide.

## Tooling

- **Kafka** — the default for high-throughput event streaming with strong durability and replay guarantees; the right choice when event history/replay matters and the team can support operating it (it has real operational weight).
- **NATS** — lighter-weight, simpler to operate, a reasonable choice when Kafka's durability/replay guarantees are more than the requirement actually needs.
- **Managed cloud options** (AWS EventBridge, Google Pub/Sub, Azure Service Bus) — lower operational overhead than self-hosting Kafka, and often the right default for a team without dedicated platform/infra engineers, especially in serverless/cloud-native setups where minimizing operational surface area is itself a goal.

## API Gateway

A single entry point for external clients into a system made of multiple internal services — handles routing, authentication, rate limiting, and request/response transformation in one place rather than duplicating that logic in every service. Justified once there's more than a small number of services behind it that external clients need a unified way to reach; for a single backend service, this is what that service's own framework already handles, and adding a gateway in front of one service is unnecessary indirection.

**Backend for Frontend (BFF)** is a specific, narrower variant: a dedicated gateway/aggregation layer tailored to one specific client type (e.g. a mobile app) when different clients have meaningfully different data-shaping needs from the same underlying services — justified by that specific divergence, not adopted by default alongside a general API gateway.

## Service mesh

A dedicated infrastructure layer (e.g. Istio, Linkerd) handling service-to-service communication concerns — mutual TLS, traffic routing, retries, observability — outside individual services' own code. **This is a heavyweight pattern with real operational cost**, and the honest guidance from current practice is to reach for it specifically once the *number* of services has grown enough that hand-configuring these cross-cutting concerns in each service individually has become the actual, observed bottleneck — not as a default for "we have microservices now, so we need a mesh." A team with 4 services and a service mesh is very likely carrying infrastructure complexity their actual requirement doesn't justify yet.

## Resilience patterns (apply within either sync or async integration)

- **Circuit breaker** — stops calling a downstream service that's clearly failing, instead of repeatedly hammering it with requests that will fail anyway, giving it room to recover and protecting the calling service from cascading delay.
- **Retry with backoff** — retries a failed call with increasing delay between attempts, rather than retrying immediately and potentially worsening a downstream service's overload.
- **Strangler Fig** — a migration pattern, not a steady-state architecture: incrementally routes traffic away from a legacy system to a new one feature-by-feature, rather than attempting a single big-bang cutover. The right reference when an initiative's actual goal is migrating off a legacy system, particularly relevant alongside the `backend` skill's monolith-to-extracted-service guidance for the same situation viewed from inside one service.

## Anti-patterns to flag in review

- Reaching for event sourcing because it sounds more rigorous, with no specific audit/replay requirement justifying it.
- A service mesh adopted for a small number of services, before manual cross-cutting configuration has actually become the bottleneck.
- CQRS introduced with no measured read/write asymmetry to justify the two-model complexity.
- Treating "event-driven" and "event sourcing" as synonyms, leading to a much larger architectural commitment than the actual requirement called for.
- An API gateway placed in front of a single service, adding indirection with no corresponding benefit.
- No inbox/outbox pattern (or equivalent) where an event-driven system needs an atomic write+publish, leading to silent data/event inconsistency on a crash.
