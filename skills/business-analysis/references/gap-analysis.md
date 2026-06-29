# Gap analysis

Read this when Step 0 of `SKILL.md` has identified that the situation calls for comparing current state to a desired future state, to identify what's missing and how to close it.

## What a gap analysis actually does

A gap analysis answers one question with structure: **what stands between where we are and where we want to be, and what does it take to close that distance?** It's the analytical bridge between "we have a problem" (often surfaced through a process model's As-Is findings, or simply a stated business frustration) and "here's the specific, scoped initiative that addresses it." Where a process model focuses on *how work flows*, a gap analysis focuses more broadly on *capability* — which can include process, but also systems, skills, data, or organizational structure.

This is a precursor to, not a replacement for, a business case or a BRD — a gap analysis establishes that a real, specific gap exists and roughly what closing it would take; the business case then justifies the investment, and the BRD then defines exactly what the solution must do.

## The method

1. **Define the current state precisely.** This needs the same rigor as an As-Is process model — specific, verified facts, not a general impression. If a process model already exists for the relevant area, reuse it directly rather than re-describing the same current state from scratch in different language.
2. **Define the future state precisely**, anchored to a real business driver — a strategic goal, a competitive pressure, a regulatory requirement, a customer expectation that's currently unmet. A future state that isn't anchored to something real is just a wish list, and a gap analysis built on a wish-list future state won't survive scrutiny when someone asks "why does it need to look like this specifically?"
3. **Identify the specific gaps**, organized by category so the analysis stays structured rather than becoming an unsorted list:
   - **Process gaps** — steps, controls, or handoffs that don't exist today but the future state requires.
   - **Technology/systems gaps** — capabilities the current systems can't support.
   - **People/skills gaps** — capacity or capability the organization doesn't currently have.
   - **Data gaps** — information that isn't currently captured, or isn't captured in a usable form.
   - **Organizational/structural gaps** — reporting lines, ownership, or governance that doesn't yet exist to support the future state.
4. **Assess each gap's size and difficulty to close** — not all gaps are equal, and a gap analysis that treats "we need one new approval step" and "we need to replace our core ERP system" as equivalent line items is hiding the information that actually matters for prioritization.
5. **Identify the path, including transition states.** For each significant gap, name the realistic way to close it — and if closing it requires intermediate steps rather than one clean jump, name those explicitly (this connects directly to the transition-state guidance in `references/process-modeling.md` when the gap is process-related).
6. **Recommend the approach with the best value**, not just the technically ideal one. BABOK explicitly frames this step as comparing options and recommending the one offering the greatest value to stakeholders and the organization — which sometimes means recommending a smaller, faster, lower-risk closing of the gap over a more complete but slower and riskier one, depending on what the organization can actually absorb right now.

## A simple structure for presenting it

| Dimension | Current state | Future state | Gap | Path to close |
|---|---|---|---|---|
| Process | Manual 6-step approval, avg. 6 days | Automated routing, 1-day target | No automated routing exists; no defined escalation rule | Build automated workflow with escalation logic |
| Technology | Spreadsheet-based tracking | System-of-record with audit trail | No system supports this today | Implement or extend existing system |
| People | No dedicated approver role for high-value items | Defined secondary-approver role | Role doesn't exist; no one currently owns this | Define role, assign, train |

A table like this, even at this level of brevity, does more work than a paragraph of prose saying the same thing — it forces every gap to be stated as a specific, comparable item rather than blended into a general narrative.

## Common mistakes specific to this deliverable

- **Vague future state.** "Be more efficient" or "modernize our systems" isn't a future state — it's a direction. A usable future state is specific enough that someone could check, after the fact, whether it was actually reached.
- **Treating all gaps as equally urgent or equally costly to close.** Without explicit sizing, a gap analysis reads as a flat list rather than something that can actually drive a prioritization decision.
- **Skipping the "why does the future state look like this" anchor.** A future state needs to trace to a real driver the same way a BRD's requirements need to trace to a business objective — otherwise the analysis can't defend itself when challenged.
- **Treating the gap analysis as a one-time snapshot.** Current state, and sometimes the future state itself (strategic priorities shift), change over time — a gap analysis that's never revisited can recommend closing a gap that's no longer the right priority by the time anyone acts on it.
- **Jumping straight to a single recommended solution without naming the alternatives considered.** Even a brief "options considered" note strengthens the credibility of the final recommendation and gives a reviewing stakeholder the chance to catch an overlooked alternative before resources are committed.
