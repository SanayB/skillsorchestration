# Risk management and RAID logs

Read this when Step 3 of `SKILL.md` calls for setting up risk tracking. Set this up during project initiation, not after something has already gone wrong — the entire value of this practice comes from catching things early, which only happens if the tracking exists before the problem does.

## RAID log vs. risk register — pick the right scope

A **risk register** tracks risks only — potential future problems that haven't happened yet. A **RAID log** is broader and tracks four things together: **R**isks, **A**ssumptions, **I**ssues, and **D**ependencies (or in some versions, **D**ecisions). Use a risk register alone for a small, simple project where risk is genuinely the only thing worth formally tracking; use a full RAID log once the project has real complexity across multiple of these dimensions — which is the more common case for anything beyond a small, short initiative.

| Category | What it captures | Example |
|---|---|---|
| **Risks** | Things that *might* happen and would hurt the project if they did | "Key vendor may not deliver API access by the agreed date" |
| **Assumptions** | Things being treated as true without confirmation, that the plan depends on | "Assuming the existing customer database doesn't need cleanup before migration" |
| **Issues** | Things that *have already* happened and need active resolution | "Vendor confirmed API access will be 3 weeks late" |
| **Dependencies** | External factors or other workstreams this project's progress relies on | "Marketing launch depends on legal sign-off, owned by a different team" |
| **Decisions** (if used as the fourth category instead of, or alongside, dependencies) | Significant choices made, including alternatives considered and why they were rejected | "Chose vendor B over vendor A due to data residency requirement — documented since no one remembers this reasoning six months later" |

**A practical judgment call on Actions vs. Decisions**: some teams use "Actions" as the fourth RAID category instead of "Decisions." For a log aimed at a senior/steering-committee audience, decisions are usually the more valuable thing to capture there — action items are tactical and change too often to be useful at that altitude, and are often better tracked in a separate, more operational task list. Decisions, by contrast, are exactly the kind of thing "no one remembers why we did this" six months later — document not just the decision but the alternatives considered and why they were rejected, since that's frequently the more useful part when someone questions the decision much later.

## Setting it up

1. **Create the log during initiation or early planning**, once there's enough known about scope, stakeholders, and objectives to populate it meaningfully — not as a placeholder template with nothing in it yet.
2. **Populate it from real elicitation**, not just the project manager's own assumptions — pull from stakeholder interviews, kickoff workshops, and (per the `business-analysis` skill's elicitation guidance) document review. A RAID log built solely from one person's head misses what other stakeholders already know or worry about.
3. **Assign an owner to every entry.** A risk, issue, or dependency with no named owner tends to just sit there, since "the project" isn't a person who can actually act on it.
4. **Revisit on a defined cadence** — at minimum at major milestones or whenever scope changes; on an Agile project, the start of each sprint is a natural, lightweight checkpoint to review and update it. A RAID log reviewed only once, at kickoff, provides essentially none of its intended value.

## Risk assessment

For each risk, assess **likelihood** and **impact** (commonly on a simple low/medium/high scale, or a numeric scale for more quantitative tracking), and use the combination to prioritize attention — a low-likelihood, low-impact risk needs far less active management than a high-likelihood, high-impact one, and treating every entry on the log with equal urgency dilutes attention away from the ones that actually matter.

For each significant risk, define a **response strategy**:
- **Avoid** — change the plan to eliminate the risk entirely.
- **Mitigate** — take action now to reduce likelihood or impact.
- **Transfer** — shift the risk to another party (insurance, a vendor contract clause).
- **Accept** — consciously decide the risk is tolerable as-is, often paired with a contingency plan for if it does occur.

A risk with no response strategy attached is really just an observation, not yet something the project is actually managing.

## Common mistakes specific to RAID logs and risk management

- **Building the log once at kickoff and never returning to it** — by the time a tracked risk actually materializes, the log has often gone stale enough that no one's checked it recently, defeating the entire point of tracking it early.
- **No owner assigned to entries**, leaving them as unowned observations that nobody's actually accountable for acting on.
- **Treating assumptions as facts** by never circling back to confirm them — an unconfirmed assumption that turns out to be wrong, discovered late, behaves exactly like an unmanaged risk that materialized.
- **Recording issues but not the decisions made to resolve them** — losing the "why we chose this fix" reasoning the same way an unrecorded architectural decision gets lost (see the parallel guidance on ADRs in the `system-architecture` skill — the same discipline, applied here at the project level).
- **Treating all risks as equally urgent**, without likelihood/impact prioritization, which causes real attention to get spread too thin across low-stakes entries instead of concentrated on the few that could actually derail the project.
- **A RAID log that's overly long and detailed for its actual audience.** If it's meant for a steering committee, keep entries at the altitude that audience needs to act on — granular operational action items belong in a separate, more tactical tracking document instead.
