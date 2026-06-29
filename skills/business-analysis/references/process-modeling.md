# Process modeling (As-Is / To-Be, BPMN)

Read this when Step 0 of `SKILL.md` has identified that the situation calls for understanding or redesigning how work currently flows through a process.

## Why model a process at all

A process described only in narrative text hides ambiguity that a diagram exposes immediately — where does work actually wait, who's really accountable for handing it off, what happens when the exception case occurs. Modeling a process isn't a formality before "real" analysis starts; the act of diagramming is itself how a lot of the actual analytical findings get discovered, because forcing a process into a precise visual notation surfaces gaps and contradictions that a paragraph of prose lets slide.

## The As-Is / To-Be method

**Always model As-Is before designing To-Be**, even when the destination already feels obvious. Skipping straight to the desired future state means the redesign is built on assumptions about the current process rather than verified facts about it — and the gap between "how people say the process works" and "how it actually works" is one of the most consistent, valuable findings in this kind of work.

1. **Model As-Is**: document the current process exactly as it runs today, warts and all. Use multiple elicitation methods to build this (see `SKILL.md`'s elicitation section) — interview the people who do the work, and where possible **observe** the process actually happening rather than relying purely on how it's described, since these two sources frequently disagree in informative ways.
2. **Identify pain points directly on the As-Is model**: bottlenecks, redundant handoffs, manual steps that could be automated, points where work waits without anyone owning it. Annotate these on the diagram itself rather than in a separate document — keeping the finding next to the exact step it concerns makes the connection between problem and process step immediately legible to anyone reviewing it later.
3. **Design To-Be**: the target future-state process, addressing the identified pain points. This is where requirements analysis and design definition meet process modeling directly — the To-Be model is often a more concrete, visual companion to the functional requirements in a BRD covering the same initiative.
4. **Identify transition states if needed**: a large process change rarely happens in one step. If getting from As-Is to To-Be requires intermediate states (e.g. a manual workaround while a new system is being built), model those explicitly too, rather than presenting only the start and end points and leaving the path between them as an exercise for whoever implements it.
5. **Feed the As-Is → To-Be comparison into a gap analysis** (see `references/gap-analysis.md`) when the initiative needs that explicit framing for a funding or planning decision.

## BPMN — the standard notation

**Business Process Model and Notation (BPMN)**, maintained by the Object Management Group and also ratified as ISO 19510, is the de facto global standard for process diagrams. Its specific value over a generic flowchart: it's precise enough for technical implementation while staying readable by non-technical stakeholders — meaning the same diagram can serve a business sponsor and the developer who eventually builds support for the process, without translation loss between them.

### Core elements

- **Events** (circles) — something that *happens*. A thin-bordered circle is a start event (always "catching" — triggered by something, like a request arriving); a thick double-bordered circle is an intermediate event; a thick single-bordered circle is an end event. An icon inside the circle indicates the trigger type (an envelope for a message, a clock for a timer).
- **Activities** (rounded rectangles) — something that's *done*. A plain task is a single, atomic unit of work. A subprocess (marked with a small "+") groups multiple tasks and can be expanded or collapsed for readability. A call activity invokes a separate, reusable process — useful for standardizing a step like "validate customer identity" that's called from multiple places rather than redrawn each time.
- **Gateways** (diamonds) — decision points where the flow branches or merges. An exclusive gateway sends the flow down exactly one of several paths based on a condition (most common, and the right default for an either/or business decision). A parallel gateway splits into multiple simultaneous paths that all happen. Don't reach for a parallel gateway when the steps are actually conditional alternatives — that's an exclusive gateway's job, and using the wrong gateway type changes what the diagram actually claims about how the process behaves.
- **Sequence flows** (solid arrows) — the order activities happen in. Distinct from **message flows** (dashed arrows), which represent communication crossing between separate pools (see below) — mixing these up is a common notation error that makes a diagram ambiguous about whether something is an internal step or a handoff to an external party.
- **Pools and lanes** — a pool represents a major participant (often a different company, department, or system); lanes within a pool separate activities by role or sub-team. Use swimlanes whenever a process crosses more than one role or department — this is precisely the situation where "who's accountable for this step" is most likely to be unclear without an explicit lane making it visible.
- **Data objects and artifacts** — what information flows through the process and where it's stored. Almost every process model a BA produces should show how documents/data move and where systems are involved — a process diagram that shows only activities and arrows, with no indication of what data or system each step touches, is missing information a developer will need and a stakeholder will want to see.

### Practical modeling guidance

- **Model at the right level of detail for the audience.** An executive-facing process overview should use far fewer, more abstract activities than a model intended to drive system implementation. Producing one model and expecting it to satisfy both audiences usually satisfies neither — it's either too detailed for the executive or too vague for the implementer.
- **Name activities as verb-noun pairs** ("Approve invoice," "Notify customer") — consistent, specific naming makes a complex diagram far easier to scan and audit than activities named as nouns alone ("Invoice," "Customer").
- **Don't model every conceivable exception path on the primary diagram.** A small number of genuinely common exceptions belong on the main model; rare edge cases are often better handled in a separate model or in supporting text, so the primary diagram stays legible as a map of the normal flow.
- **Keep the diagram and the narrative description in sync.** When a process changes, both need updating — a stale diagram that no longer matches the documented narrative (or the actual process) actively misleads anyone who trusts it later.

## When BPMN is overkill

Not every process needs full BPMN rigor. A simple, linear process with no branching, no cross-departmental handoffs, and no automation target may be perfectly well served by a basic flowchart. Reach for full BPMN notation specifically when: the process will be handed to a technical team for possible automation, the process crosses multiple departments/systems where "who's accountable here" is genuinely unclear, or the audience includes both business and technical stakeholders who need one shared, unambiguous reference. For a quick internal walkthrough among people who already understand the process informally, a lighter-weight diagram is the more proportionate choice.
