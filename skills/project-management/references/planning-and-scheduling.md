# Planning and scheduling

Read this when Step 2 of `SKILL.md` calls for breaking down and scheduling the work. The underlying discipline is the same across methodologies — break work down to where progress is visible, make dependencies explicit, know what's actually on the critical path — but it looks different depending on the methodology chosen in `references/methodology-selection.md`.

## Work Breakdown Structure (WBS) — the foundation regardless of methodology

A WBS is a hierarchical decomposition of all the deliverables (not just activities) the project needs to produce. **Focus the WBS on deliverables, not verbs** — "User authentication module" rather than "Build user authentication module." This distinction matters more than it sounds: a deliverable-focused WBS describes the *what*, leaving the *how* (the specific tasks/activities) to be defined afterward by whoever owns delivering that piece.

**A practical signal for when the WBS is detailed enough**: once a team starts struggling not to phrase the next level down as a verb ("design the schema," "test the login flow"), that's usually a sign the deliverable breakdown is complete for that branch and it's time to move from deliverables into actual task/activity definition — trying to push the WBS itself even deeper at that point usually just produces busywork relabeling activities as if they were deliverables.

After the WBS is agreed and each branch assigned to an owner, that owner defines:
- **Activities** — the actual tasks needed to produce their deliverable.
- **Predecessors** — what has to finish before each activity can start. (Most schedules default to finish-to-start dependencies for simplicity; start-to-start, finish-to-finish, and start-to-finish relationships exist for cases where work can genuinely overlap, but introduce them only when the simpler default doesn't fit the real situation.)
- **Duration estimates** — see estimation approaches below.

## Estimating duration

- **Single-point estimates** (a flat number based on experience or historical data) are fine for well-understood, repeatable work where past data is a reliable guide.
- **PERT (three-point estimation)** — for anything with real uncertainty, get an Optimistic (O), Most Likely (ML), and Pessimistic (P) estimate, then compute `(O + 4×ML + P) / 6`. This produces a more realistic estimate than a single guess and, just as usefully, makes the *range* of uncertainty visible to stakeholders rather than presenting one number with false precision. Particularly suited to research, novel technical work, or anything where "how long will this actually take" doesn't have a confident, precedented answer.
- **Story points** (Agile/Scrum) — a relative-effort unit accounting for complexity, risk, and uncertainty together, rather than a direct time estimate. Calibrated by comparing new work against previously-completed work the team has a shared sense of ("this is about as complex as that other ticket, which was a 5"), not derived from a formula. Established via **planning poker**: each team member privately estimates, then reveals simultaneously, and discusses out loud only when estimates diverge — the private-then-reveal structure exists specifically to avoid anchoring everyone on the first person's guess. No individual story or task should be so large that confident estimation becomes guesswork — if a work item feels too big to estimate with real confidence, that's usually a sign it should be split rather than a sign to just pick a bigger number.

## Critical Path Method (CPM) — for Waterfall-style and hybrid schedules

The critical path is the longest sequence of dependent activities from start to finish — it determines the minimum possible project duration, and any delay to a task on the critical path delays the entire project by the same amount. Tasks *not* on the critical path have **float** (or slack) — time they can be delayed without affecting the overall finish date.

**The basic process**: build the WBS → define activities, durations, and dependencies → draw a network diagram (a flowchart of activities connected by dependency arrows) → calculate earliest/latest start and finish times for each activity via a forward pass and backward pass → the path with zero float is the critical path.

**Known limitations, worth stating plainly rather than glossing over**: CPM's output is only as good as its duration estimates, and it assumes a relatively static plan — in a project where scope and priorities are changing frequently, maintaining an accurate CPM network becomes pure administrative overhead with diminishing value. Basic CPM also assumes infinite resources by default; if specific people or equipment are genuinely constrained across multiple parallel activities, that's a resource-constraint problem CPM doesn't model on its own, and either resource leveling or Critical Chain methodology is the right tool to layer on top.

## CPM and Agile are not mutually exclusive

A common and well-suited hybrid scheduling pattern, worth naming directly: **use CPM for high-level roadmap planning and cross-team dependency mapping, while using Agile sprints for the actual execution within each phase.** This gives program-level predictability (stakeholders can see overall milestones and the critical dependencies between major phases) while preserving team-level flexibility in exactly how each phase's work gets done sprint to sprint. **Rolling wave planning** is the related, practical technique for handling the fact that far-future work is always less certain than near-term work: plan the next phase or two in real CPM-level detail, and keep everything beyond that at a higher, less-detailed level — refining it into full detail only as it gets closer and the team's understanding improves, rather than pretending to have CPM-grade precision on work that's still 18 months out.

## Sprint planning (Scrum-style execution)

- **Sprint length** is typically 1-2 weeks; pick a length and keep it consistent rather than varying it sprint to sprint, since consistent length is what makes velocity (story points completed per sprint) a meaningful, comparable number over time.
- **Velocity**, once established over a few sprints, becomes the basis for forecasting how much backlog the team can realistically commit to in an upcoming sprint — don't treat the first sprint or two's velocity as reliable; it usually takes a few cycles to stabilize.
- **Backlog refinement** (breaking down and estimating upcoming work before it's actually pulled into a sprint) should happen continuously, not all at once at the start of each sprint — a backlog that's only ever refined in a rush right before sprint planning tends to produce worse estimates than one refined steadily as a standing practice.

## Common mistakes specific to planning and scheduling

- **Phrasing the WBS as a task list instead of a deliverable list**, which front-loads "how" decisions before the team has even finished agreeing on "what."
- **Single-point estimates presented with false confidence** on genuinely uncertain work, instead of using PERT or an equivalent range-based approach to make the real uncertainty visible.
- **Treating CPM as a one-time exercise** rather than something that gets recalculated as actual progress and new information come in — a critical path calculated once at kickoff and never revisited stops reflecting reality almost immediately.
- **Ignoring resource constraints in a CPM schedule** that assumes infinite parallel capacity, then being surprised when the same two specialists are needed on three "parallel" critical-path activities at once.
- **Comparing velocity across different teams** as if it's a universal unit of productivity — story points are calibrated per-team and aren't comparable across teams that have calibrated independently; using one team's velocity to judge another's is a common, misleading mistake.
- **Letting backlog refinement only happen reactively, right before sprint planning**, producing rushed, lower-quality estimates under time pressure.
