# Project Context

> **Read this file first.** This is the single shared source of truth for this project —
> its architecture, the contract between frontend and backend, decisions already made,
> and current status. Update it as you work; don't let it go stale. Any AI assistant
> working in this repo (Copilot, Claude Code, Cursor) is instructed to read this file
> automatically — see `.github/copilot-instructions.md` and `CLAUDE.md`.

## What this project is

<!-- One paragraph: what is being built and why. If a business case or BRD exists for
this initiative (see the business-analysis skill), link or summarize it here. -->

## Architecture summary

<!-- A few sentences + a link to any C4 diagrams or ADRs (see the system-architecture
skill's adr-and-c4 reference) — not a duplicate of those, just enough that someone
opening this file gets oriented without having to go read every ADR individually. -->

- **Frontend stack**: <!-- e.g. React + Next.js + TypeScript -->
- **Backend stack**: <!-- e.g. Node.js + Fastify + Postgres -->
- **Hosting / deployment**: <!-- e.g. Vercel + Railway -->

## The API contract

> This is the part that matters most for keeping two people's work compatible without
> re-explaining it to each other every session. Keep this current — when the contract
> changes, update this section in the *same* commit/PR that changes the code, not after.

<!-- Either summarize the contract directly here, or link to the actual source of truth
(an OpenAPI spec, a shared types file) and describe it in plain language. Example: -->

| Endpoint | Method | Request | Response | Notes |
|---|---|---|---|---|
| `/api/orders` | `POST` | `{ items: OrderItem[] }` | `{ orderId: string, status: OrderStatus }` | `OrderStatus` is one of `pending`, `confirmed`, `failed` |

## Decisions log

> Lightweight, append-only. For a significant architectural decision, write a full ADR
> instead (see the `system-architecture` skill) and just link it here. For a smaller
> decision that doesn't need a full ADR, a one-line entry here is enough — the point is
> that "why did we do it this way" should never require asking a person who might be
> unavailable, or might just not remember anymore.

| Date | Decision | Why |
|---|---|---|
| <!-- 2026-06-29 --> | <!-- Use Zustand instead of Redux for client state --> | <!-- App is small enough that Redux's boilerplate wasn't justified yet --> |

## Current status

> Update this section regularly — this is what answers "what's actually going on right
> now" without anyone needing to ask in chat or re-explain it to an AI assistant.

| Area | Owner | Status | Notes |
|---|---|---|---|
| Frontend | <!-- Person A --> | <!-- in progress / blocked / done --> | <!-- what's currently being worked on, what's blocking, if anything --> |
| Backend | <!-- Person B --> | <!-- in progress / blocked / done --> | <!-- same --> |

## Open questions / blockers

<!-- Anything currently unresolved that affects both sides — e.g. "auth strategy not
finalized yet, frontend login form is stubbed pending that decision." This is exactly
the kind of thing that otherwise gets lost between two people's separate AI sessions. -->

---

*Last updated: <!-- date --> by <!-- who -->*
