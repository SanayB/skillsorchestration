# Architecture Decision Records (ADRs) and the C4 model

Read this whenever a real architectural decision has been made in this skill — documenting it isn't a separate, optional step, it's part of the decision being complete.

## Why this matters more than it sounds like it should

Architecture decisions made without a written record create a specific, recurring failure: eighteen months later, someone (often the same person who made the original call) looks at a piece of the system and can't tell whether a strange-looking design choice was deliberate and load-bearing, or accidental and safe to "clean up." Without the record, the only way to find out is to change it and see what breaks — which is exactly the expensive, risky way to relearn something that took five minutes to write down the first time. **An ADR is written for the person who has to change this code later, who will very often be you.**

## ADRs and diagrams are not substitutes for each other

This is worth stating directly because it's a common point of confusion: **a diagram shows what the system looks like; an ADR shows why it looks that way.** Neither replaces the other, and each should reference the other — link an ADR from the specific diagram element it affects (e.g., from a database container in a C4 diagram, link to the ADR that explains why that database was chosen over the alternatives).

## ADR format

The original Michael Nygard template is lightweight and remains the most common starting point. A typical ADR includes:

- **Title** — specific to one decision ("Use Postgres for order-service session state," not "Database decisions").
- **Status** — proposed, accepted, deprecated, or superseded (by which later ADR, if superseded).
- **Context** — the situation and constraints that made a decision necessary. Include the actual decision drivers (which NFRs from `references/non-functional-requirements.md` are actually in play here) — a reader should be able to see *why this was even a decision* and not just a default.
- **Considered options** — the realistic alternatives, not just the one chosen. An ADR that lists only the chosen option, with no comparison, can't actually explain why the alternatives were rejected — which is frequently the more useful half of the document for someone questioning the decision later.
- **Decision** — what was actually chosen, stated plainly.
- **Consequences** — what this commits the team to, including trade-offs accepted, not just benefits gained. A decision with no stated downside is either a decision with no real trade-off (rare) or an ADR that's only telling half the story.

```markdown
---
status: accepted
date: 2026-04-12
deciders: order-service-tech-lead, platform-tech-lead
---
# Use Postgres for User Session State

## Context and Problem Statement
The order service needs to store session state (cart contents, address
selections) with low-millisecond read latency and durability across node
failure. Operating a second high-availability datastore is non-trivial
for a five-engineer team. Where should sessions live?

## Decision Drivers
- p99 session read latency under 10ms
- Sessions survive single-node failure
- Operational footprint should not grow by a new HA cluster

## Considered Options
1. In-memory on the application node (no persistence)
2. Redis cluster, separate from order data
3. Postgres, same cluster as order data

## Decision
Option 3: Postgres, same cluster as order data.

## Consequences
Avoids a new operational dependency for a small team. Read latency is
slightly higher than Redis would provide but comfortably within budget.
If session read volume grows significantly, this decision should be
revisited (see decision driver above).
```

Several lighter and more structured alternatives exist (MADR — Markdown Any Decision Records; Olaf Zimmermann's Y-Statement, a single-sentence compressed form) — the specific format matters far less than actually maintaining the practice (see below). Pick one format per team/org and stay consistent, rather than mixing formats across the same codebase.

## Where ADRs live

Store ADRs in version control alongside the code they describe — typically `docs/adr/` or `docs/decisions/` in the relevant repository, numbered sequentially (`0001-use-postgresql-for-orders.md`, `0002-adopt-event-driven-architecture.md`). This keeps the decision record discoverable by the same people who'll be looking at the code, and means an ADR can be reviewed and updated through the same pull-request process as everything else — no separate tool or process to maintain just for this.

## The C4 model

A hierarchical set of diagrams for visualizing architecture at four levels of zoom, each aimed at a different audience and level of detail:

1. **Context** — the system in its environment: who uses it, what other systems it talks to. The right level for a non-technical stakeholder or an executive who needs the big picture, not the internals.
2. **Container** — the major deployable/runnable pieces inside the system (a web app, an API, a database, a message queue) and how they communicate. The level where most architecturally significant decisions are actually visible, and so the most natural level to link ADRs from.
3. **Component** — the internal structure of a single container, broken into its major logical building blocks. Useful for a developer about to work inside that specific container; usually too detailed to be useful at the system level.
4. **Code** (optional) — class/code-level detail, generally skipped in favor of letting the actual code be the source of truth at this level — diagrams this granular go stale almost immediately and rarely earn back the maintenance cost.

For most architectural communication, **the Context and Container levels do almost all the useful work** — they're where a new team member, a stakeholder, or a reviewing architect gets oriented fastest. Don't feel obligated to produce all four levels for every system; produce the ones that actually serve a real audience.

**Diagrams-as-code** (Mermaid, PlantUML, Structurizr's DSL) checked into the same repository as the ADRs is the recommended approach over a diagram drawn in a separate tool and pasted in as an image — a diagram-as-code file can be reviewed in a pull request, diffed when it changes, and kept in the same place as the ADR that explains it, rather than living in a separate tool that quietly drifts out of sync.

## The real failure mode: "Decision Documentation Theater"

Almost every team that tries ADRs adopts them at some point; the much harder problem, well-documented in current practice, is that most stop maintaining them within a couple of years — a pattern specific enough to deserve its own name. **The teams that succeed and the teams that fail tend to use the same templates** — the difference is entirely operational, not which format was chosen:

- **Where the records live** — in the repo, reviewed via the same PR process as code, survives; a separate wiki or doc tool that nobody visits during normal work does not.
- **When they get written** — at the point the decision is actually made, while the context is fresh, not retroactively reconstructed weeks or months later when someone asks "wait, why did we do it this way?" If a team is starting a technical investigation by writing the ADR first, that's usually a sign either the decision is already fully understood (and the ADR is genuinely just capturing it), or the team is jumping to a conclusion before the alternatives were actually explored.
- **Who reviews them** — folded into normal code/architecture review, not a separate, easily-skipped step.
- **What happens when the world moves on** — a decision that's no longer correct should be marked superseded, with a link to the ADR that replaces it, not silently ignored while the code drifts away from what the (now-stale) record describes. A collection of confidently-stated but outdated ADRs is arguably worse than no ADRs at all, since it actively misleads rather than just being silent.

## Anti-patterns to flag in review

- An architecturally significant decision made with no ADR at all, discovered only by reverse-engineering the code later.
- An ADR that lists only the chosen option with no alternatives considered, making it impossible to evaluate later whether the reasoning still holds.
- ADRs stored in a tool or location disconnected from the code repository, where they predictably stop being read or updated.
- A diagram with no link to the ADR that explains a non-obvious choice visible in it (e.g., why this particular database, why this particular boundary between two containers).
- A superseded decision left marked "accepted" with no pointer to whatever replaced it.
- Diagrams maintained as static images in a separate tool, drifting out of sync with the system because updating them isn't part of the normal change-review workflow.
