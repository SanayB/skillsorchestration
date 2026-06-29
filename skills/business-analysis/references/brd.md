# Business Requirements Document (BRD)

Read this when Step 0 of `SKILL.md` has identified that the situation calls for a BRD — defining what an initiative needs to achieve, before build work starts.

## What a BRD is, and what it is not

A BRD states **what** a business needs from an initiative and **why**, in language a non-technical stakeholder can read and approve. It is not a technical specification — the moment content describes specific UI elements, database fields, or API contracts, that content has drifted out of the BRD and into a functional/technical requirements document (FRD). Keeping this boundary clean matters: a BRD that's secretly full of implementation detail locks in one solution before alternatives were genuinely considered, and becomes much harder for a non-technical sponsor to actually read and approve.

**A BRD is the project's source of truth on scope and intent.** When a dispute arises later about whether something was in scope, the BRD is what the team points back to — which is exactly why getting it right, and getting it formally signed off, matters more than its modest size would suggest.

**A BRD is generally not itself a legally binding contract** — it's an internal agreement on scope and intent. The binding document (if one exists) is a statement of work or services agreement that typically references the BRD to define agreed scope and deliverables.

## Structure

A complete BRD covers the same core sections regardless of the specific template used:

1. **Executive summary** — 2-3 paragraphs: what this is, why it matters, expected business impact. Write this *last*, after every other section is complete, so it accurately reflects everything the document actually says — not what was assumed at the start.
2. **Business objectives** — the specific, measurable goals this initiative serves. Use SMART criteria (specific, measurable, achievable, relevant, time-bound). "Improve customer satisfaction" is not a business objective; "increase customer satisfaction score from 72 to 85 within two quarters" is.
3. **Background / business need** — why this initiative exists now: what problem, pressure, or opportunity is driving it. This section is what later lets every requirement be traced back to a reason, rather than floating unanchored.
4. **Project scope** — what's included, and explicitly what's excluded. The exclusions matter as much as the inclusions; scope disputes overwhelmingly arise from things nobody explicitly ruled out, not from things nobody mentioned at all.
5. **Stakeholder identification** — who's involved and what they need from this (pair with the Power-Interest grid and RACI guidance in `SKILL.md`).
6. **Functional requirements** — what the solution must do, in business terms, written in consistent "shall" language: "The system shall allow a customer to cancel an order within 24 hours of placing it." Each requirement should be specific, numbered, and traceable to one of the business objectives in section 2.
7. **Non-functional requirements** — performance, usability, reliability, security, compliance. "The system shall support 10,000 concurrent users with under 2-second response time" is testable; "the system should be fast" is not.
8. **Success metrics** — how success will be measured, quantitatively and qualitatively. These should map directly back to the SMART objectives in section 2 — if a metric doesn't trace to an objective, either the metric or the objective is incomplete.
9. **Assumptions and constraints** — anything taken for granted (budget ceiling, available systems, timeline) stated explicitly rather than left implicit.
10. **Risks** — what could threaten successful delivery, and at what level of likelihood/impact (a lightweight risk register is often enough at this stage; deep risk management typically belongs to project management once the initiative is underway).
11. **Approval / sign-off** — names and roles of who must formally approve this document before it's treated as final.

Length scales with complexity: a simple initiative may need 5-10 pages; a complex enterprise initiative may run 20-50. Length is not the goal — clarity, specificity, and traceability are. A shorter BRD where every requirement is numbered and testable beats a long one full of vague language.

## Who's involved

A business analyst typically writes and owns the BRD (a project manager or product owner may do so on smaller teams), gathering input from business owners, end users, and technical teams, and routing the document to project sponsors and department heads for sign-off. The BA's role specifically includes spotting redundancies and inefficiencies in what stakeholders describe, and acting as the translation layer between business language and what a technical team will eventually need.

## The mistakes that quietly cause expensive problems later

These are the recurring, named failure modes worth actively checking for in any BRD, whether writing one from scratch or reviewing someone else's draft:

- **Vague requirements that can't be tested.** If there's no way to check whether a requirement was actually met, it isn't a requirement yet — it's a sentiment.
- **Technical "how" leaking into a business document.** Describing implementation detail in a BRD is a sign the document has drifted toward an FRD, or that a solution got locked in before alternatives were considered.
- **No clear scope exclusions.** Listing what's in scope without explicitly listing what's out invites disagreement later, since everyone fills the gap with their own assumption.
- **No measurable success criteria.** Without these, there's no way to know later whether the initiative actually delivered what it promised.
- **Shipped without formal sign-off.** This is named repeatedly across BA practice as one of the most common and expensive mistakes — without explicit approval, every stakeholder remembers the agreed scope slightly differently, and the disagreement surfaces at the worst possible time: mid-build, or at launch.
- **Requirements that can't be traced to a business objective.** A requirement serving no stated goal is something the organization will pay to build and may never actually need.
- **Letting the document go stale after approval.** Requirements evolve; an approved BRD that's never updated stops reflecting reality, and decisions made later against the stale version compound the gap.

## Worked example (abbreviated)

> **Executive summary**: This initiative implements an automated invoice-approval workflow to reduce average approval time from 6 business days to 1 business day and cut manual processing errors by 80%, addressing the finance team's growing backlog as transaction volume has tripled over the past two years.
>
> **Business objective**: Reduce average invoice approval cycle time from 6 days to 1 day within Q3.
>
> **Functional requirement (FR-014)**: The system shall route an invoice over $10,000 to a secondary approver automatically when the primary approver has not acted within 24 hours.
>
> **Non-functional requirement (NFR-003)**: The system shall maintain 99.5% uptime during business hours (8am-6pm local time, Monday-Friday).
>
> **Success metric**: Average approval cycle time, measured monthly, drops from 6 days to ≤1 day by end of Q3; manual data-entry error rate (currently 4.2%) drops below 1%.
>
> **Out of scope**: This initiative does not include changes to the vendor payment system or renegotiation of payment terms — those are handled under a separate procurement initiative.

Notice that the functional requirement is numbered, uses "shall," and is specific enough to test; the success metric maps directly to the business objective's numbers; and the out-of-scope line names a specific, plausible point of confusion rather than a generic disclaimer.
