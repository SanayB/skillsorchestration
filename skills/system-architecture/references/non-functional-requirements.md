# Non-functional requirements (NFRs)

Read this first, before `integration-patterns.md` or `data-architecture.md` — this file is what makes every other architecture decision in this skill defensible rather than fashion-driven.

## What an NFR actually is

A functional requirement says what the system does ("the system shall allow a user to cancel an order"). A non-functional requirement says how well it has to do it, under what conditions — performance, scalability, security, availability, usability. The discipline here is the same one the `business-analysis` skill applies to business requirements: **a vague NFR is not yet a requirement.** "The system should be fast" and "the system should be secure" aren't checkable; "p99 latency under 200ms at 5,000 concurrent requests" and "all data at rest is encrypted, and access requires MFA" are.

**Quality Attribute Scenarios** are the standard structured format for writing an NFR so it's actually testable: stimulus (what triggers the concern — a request, a failure, a spike in load), environment (under what conditions), response (what the system should do), and response measure (the number that proves it did). "When request volume spikes to 3x normal during a flash sale (stimulus, environment), the system shall continue serving requests with p99 latency under 500ms (response, response measure)" is a complete, checkable scenario; "the system should handle traffic spikes" is not.

## The core NFR categories to establish before choosing any pattern

For every initiative this skill works on, get concrete answers on at least these, before recommending a pattern:

- **Scale** — requests/sec, data volume, concurrent users, *both today and at a stated future horizon* (e.g. 18 months out). A system designed for today's 1,000 users that needs to support 100,000 in a year is a different design problem than one that's stable at 1,000 indefinitely — don't let "a lot of growth, hopefully" stand in for an actual number; push for the most specific estimate available, even a rough one, since "we don't know" as an answer to this question is itself useful information about how much headroom to build in.
- **Availability** — stated as a number (99.9% = ~8.7 hours of downtime/year; 99.99% = ~52 minutes/year), not as "high availability." The jump from 99.9% to 99.99% is not a 10% bigger engineering problem — it usually requires fundamentally different architecture (multi-region failover, no single points of failure anywhere) and a correspondingly different cost. Push back gently if a stakeholder states 99.99% without having thought through what that actually costs to build and operate.
- **Consistency** — can different parts of the system temporarily see different versions of the same data (eventual consistency), or must every read reflect the most recent write immediately (strong consistency)? This single answer is often the most architecture-determining NFR of all, since it directly drives the data architecture decisions in `references/data-architecture.md` — get it nailed down explicitly rather than assuming.
- **Latency budget** — how fast does a given operation need to respond, and is that a hard requirement (a trading system) or a UX preference (a dashboard that's a bit slow is annoying but not broken)? The architectural cost of shaving the last 50ms off a latency budget is often disproportionate to the cost of the first 200ms — know which kind of latency requirement is actually in play.
- **Security and compliance** — specific, named constraints (PCI-DSS, HIPAA, SOC 2, data residency requirements), not a general "it should be secure." A named compliance requirement often dictates real architectural constraints (data must stay in a specific region, certain data must never leave a specific boundary) that have to be designed in from the start, not retrofitted.
- **Operability** — does the team have the operational maturity (on-call rotation, observability tooling, incident response practice) to run what's being proposed? A architecturally elegant distributed system that the team can't actually operate well is a worse outcome than a simpler system they can run confidently.

## Why this file exists: NFRs are the actual decision criteria

Every pattern in `references/integration-patterns.md` and `references/data-architecture.md` has a real cost — new failure modes, more infrastructure, a steeper learning curve for the team. **The only legitimate justification for taking on that cost is a specific NFR that demands it.** When evaluating or recommending a pattern, the right question is never "is this a good pattern" in the abstract — it's "does the NFR we established in Step 0 actually require this, or would something simpler satisfy the same requirement at lower cost?"

A few concrete examples of NFR-to-pattern reasoning, to make this less abstract:

- **NFR**: "Order processing must continue even if the payment provider's API is down for up to 10 minutes." → This specific availability/resilience requirement justifies an asynchronous, queue-based integration between the order and payment steps (see `references/integration-patterns.md`), because synchronous request-response would mean the whole order flow fails when payment is unavailable. The pattern follows directly from the requirement — it isn't chosen first and justified after.
- **NFR**: "Financial transactions must have a complete, immutable audit trail for 7 years for regulatory purposes." → This specific compliance requirement is a strong, concrete justification for event sourcing in that bounded part of the system (see `references/data-architecture.md`) — not as a default architectural style, but because this particular requirement specifically calls for it.
- **NFR**: "The team is 4 engineers, none of whom have run a distributed system in production before." → This operational-maturity constraint is a strong argument *against* a microservices/event-driven architecture regardless of what the scale numbers might otherwise suggest, at least until either the team grows or there's a specific, demonstrated reason the modular monolith default (see the `backend` skill) has actually become insufficient.

## Common mistakes specific to NFRs

- **Stating NFRs as adjectives** ("fast," "scalable," "secure") instead of as testable scenarios with numbers attached.
- **Skipping the future-scale conversation** and designing only for today's load, then being surprised when a successful product immediately needs a different architecture it wasn't built for.
- **Treating 99.9% and 99.99% as roughly the same ask** rather than recognizing the qualitatively different engineering effort between them.
- **Choosing a compliance-driven architectural constraint based on assumption rather than the actual regulation text or a compliance/legal stakeholder's input** — "I think HIPAA requires X" is not the same as confirming it does.
- **Letting team operational maturity go unstated as a factor**, then recommending an architecture the team has no realistic path to operating well.
