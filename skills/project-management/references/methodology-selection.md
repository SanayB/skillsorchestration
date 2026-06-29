# Methodology selection

Read this when Step 1 of `SKILL.md` calls for choosing (or evaluating) a project methodology. The goal here isn't memorizing definitions — it's matching an approach to a project's actual characteristics, and recognizing that the honest, common answer is usually a deliberate blend rather than a pure form of any one approach.

## The real decision factors

Don't start from "which methodology is best" — start from these characteristics of the actual project:

- **How well understood are the requirements upfront?** If the destination and the path are both genuinely well known (a regulated construction project, a well-precedented system migration), heavier upfront planning pays for itself. If the requirements are expected to evolve as the team learns more (exploratory product work, anything where customer feedback should shape the next step), locking in a detailed upfront plan is a liability, not a strength.
- **How much do requirements actually change once a project starts?** Some projects in genuinely volatile domains need to absorb change cheaply; others operate under contracts or regulatory frameworks where a changed scope is a formal, costly event no matter the methodology — don't choose an iterative approach for a project where stakeholders structurally can't actually accommodate iteration.
- **What governance/contractual rigidity exists?** A fixed-price, fixed-scope contract or a regulated industry frequently requires the documentation and milestone structure of a traditional approach, regardless of how the internal delivery team would prefer to work.
- **Team distribution, size, and experience.** A small, co-located, experienced team can run a lighter-weight process effectively; a large, distributed, or less experienced team often benefits from more explicit structure and checkpoints, simply because there's more coordination overhead to manage deliberately.

## The methodologies, briefly

- **Waterfall** — sequential phases (requirements → design → build → test → deploy), each completed before the next begins. Strong fit for well-understood, stable-requirement work, especially where regulatory or contractual structure already demands detailed upfront documentation (construction, many compliance-heavy initiatives). Weak fit for anything where the destination is expected to change as the work proceeds — by the time a Waterfall project discovers a wrong assumption, a lot of work has often already been built on top of it.
- **Agile** (the family, not a single methodology) — short iterative cycles, frequent reassessment, working software/output over comprehensive documentation, responsiveness to change over rigid upfront planning. Strong fit when the requirements are expected to evolve, when frequent stakeholder feedback genuinely changes direction, and when shipping something working quickly matters more than getting everything specified perfectly before starting.
- **Scrum** — the most widely used Agile framework for product development. Fixed-length sprints (typically 1-2 weeks), defined roles (Scrum Master, Product Owner, development team), and specific ceremonies (daily standup, sprint review, retrospective). Needs genuine team commitment to the cadence and ceremonies to work well — a team running "Scrum" in name but skipping retrospectives and treating sprints as arbitrary deadlines isn't actually getting Scrum's benefits.
- **Kanban** — continuous flow visualized on a board, with work-in-progress (WIP) limits rather than fixed-length iterations. A good fit for teams handling a steady stream of similarly-sized work items (support/maintenance flow, ops-heavy work) rather than a project with a clear beginning, middle, and end. Notably, Kanban is explicitly *not* itself a full project management methodology — it assumes some process is already in place and helps incrementally improve it, rather than replacing the need for one.
- **Scrumban** — a deliberate hybrid: Scrum's structure (sprints, ceremonies) combined with Kanban's continuous pull-based flow and WIP limits, rather than a fully pre-committed sprint backlog decided at the start of each iteration. A reasonable fit for teams that want some of Scrum's rhythm without fully committing to a fixed sprint scope upfront.

## Hybrid is the common, often correct, real-world answer

**PMBOK's 7th edition explicitly embraces methodology neutrality** — it supports Agile, traditional, and hybrid approaches as equally legitimate, with 12 guiding principles and flexible "performance domains" replacing the old rigid, sequential process groups. This isn't a compromise position; it reflects how most complex projects are actually run. A common, well-evidenced pattern: traditional/Waterfall-style structure for upfront planning, governance, milestones, and risk management, paired with Agile sprints for the actual execution and development work within that structure — e.g., a detailed Waterfall-style planning phase up front, followed by Scrum sprints for the build, with the original milestone structure still providing the overall governance and reporting rhythm stakeholders expect.

**Named hybrid frameworks worth recognizing** (rather than reinventing from scratch): SAFe (Scaled Agile Framework, for coordinating Agile across many teams in a large enterprise), LeSS (Large-Scale Scrum, applying Scrum to multi-team environments with minimal added process), and DAD (Disciplined Agile Delivery, a flexible toolkit blending Scrum/Kanban/Lean elements situationally). These exist because "just do Agile, but bigger" doesn't actually scale cleanly — coordinating many Agile teams raises specific problems (cross-team dependencies, portfolio-level prioritization) that a named framework has already worked through, rather than something to solve from scratch on a large initiative.

## How to actually decide

1. Answer the four real decision factors above honestly for this specific project — not in the abstract, and not based on what the team prefers to use regardless of fit.
2. If requirements are genuinely volatile and stakeholder feedback should shape direction: lean Agile/Scrum for the execution.
3. If governance, contractual, or regulatory rigidity is real and significant: keep that structure for planning, milestones, and reporting — Agile execution can still live inside that structure for the parts of the work that benefit from it.
4. If the work is continuous/operational rather than a discrete project with an end date: Kanban, or reconsider whether this is really `project-management` territory at all versus `workflow`.
5. State the chosen approach explicitly in the project charter, including which specific elements come from which methodology if it's a hybrid — don't leave the team to discover ad hoc, mid-project, which parts are "supposed to be" Agile and which aren't.

## Common mistakes specific to methodology choice

- **Choosing a methodology because it's currently fashionable or expected**, rather than because it fits this project's actual characteristics — "we should be Agile" stated as an unexamined default is itself a sign the decision wasn't actually made deliberately.
- **Running a hybrid by accident rather than by design** — quietly drifting between approaches without ever naming the blend, which makes it hard for the team to know what's actually expected of them at any given point.
- **Treating Kanban as if it's a complete project management methodology on its own**, when it explicitly assumes an underlying process already exists and is meant to refine flow within it, not replace planning and governance entirely.
- **Forcing Agile onto a fixed-price, fixed-scope contractual engagement** without first checking whether the contract structure can actually accommodate the kind of scope evolution Agile assumes — a mismatch here creates conflict between what the team is doing day-to-day and what the contract actually obligates.
- **Mistaking ceremony for substance** — running Scrum's named meetings without the underlying commitment to inspect-and-adapt that makes them valuable, which produces all of the process overhead with none of the actual benefit.
