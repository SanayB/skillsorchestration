# Business case

Read this when Step 0 of `SKILL.md` has identified that the situation calls for justifying whether an investment or initiative is worth doing.

## What a business case does

A business case answers a specific question: **does this initiative create more value than it consumes, and is it the best use of this money compared to the alternatives?** It converts both financial and non-financial outcomes into comparable terms, then applies standard financial metrics to produce an evidence-based recommendation — not just a confident assertion that the idea is good.

A well-built business case **documents its assumptions transparently enough that a skeptical reviewer can test the analysis themselves**, rather than simply asking them to trust the conclusion. This is the single biggest difference between a business case that survives scrutiny in front of finance and one that gets quietly shelved after the first hard question.

## The three headline metrics

Lead with these — a decision-maker wants the answer before the methodology:

- **ROI (Return on Investment)** — `(total net benefit ÷ total cost)` over a defined period. Easy to communicate, easy to compare across projects of different sizes, but doesn't account for *when* the money arrives.
- **NPV (Net Present Value)** — discounts future cash flows back to present-day value before summing them, because a dollar received in year three is worth less than a dollar received today. A positive NPV means the initiative is expected to create more value than it costs once that timing difference is accounted for; negative means the opposite.
- **Payback period** — how long until cumulative benefits exceed cumulative costs. Intuitive, useful for gauging risk exposure (a shorter payback means less time exposed to things changing), but it ignores everything that happens *after* the breakeven point — so use it alongside NPV, never as a substitute for it. A long payback period isn't automatically disqualifying for something strategically necessary (major infrastructure, a regulatory requirement) — but if the payback is long, say explicitly why that's acceptable rather than leaving it unaddressed.

**Discount rate**: use the organization's actual cost of capital or established hurdle rate if known; 8-12% is the typical range for corporate investments, and 10% is a reasonable default when no organization-specific rate is available. The choice of rate meaningfully changes the NPV result — a rate set too low makes a weak initiative look artificially attractive; too high can make a genuinely good one look unattractive. State which rate was used and why.

**IRR (Internal Rate of Return)** may also be requested by finance — treat it as a supporting metric to NPV, not the primary decision point; IRR can rank projects misleadingly when their cash flow timing differs.

## Structure

1. **Executive summary** — the recommendation, headline metrics (ROI, NPV, payback), and the key risk, all in one paragraph a busy executive could act on without reading further.
2. **Problem / opportunity statement** — what's driving this, ideally connected directly to a gap analysis if one exists for this initiative (see `references/gap-analysis.md`).
3. **Options considered** — including the "do nothing" baseline. A business case that presents only one option, with no comparison, is much weaker than one that shows why this option beats the realistic alternatives.
4. **Cost inventory** — one-time (implementation, capital) and recurring (licensing, maintenance, support). Include costs that only materialize during implementation, not just the obvious sticker-price items — onboarding time and productivity dips during a transition are real costs that are easy to leave out and which then make the actual experience look like the business case was wrong.
5. **Benefit inventory** — tangible (cost savings, revenue, time saved, converted to dollars) and intangible (risk reduction, compliance assurance, employee retention, customer satisfaction). **Don't drop intangible benefits just because they're harder to quantify** — assign a conservative, documented dollar range rather than omitting them entirely; leaving them at zero systematically understates the case for initiatives where the primary value is genuinely non-financial.
6. **Financial analysis** — ROI, NPV, payback period, calculated from the cost and benefit inventories above, using the stated discount rate.
7. **Sensitivity / scenario analysis** — see below; this is not optional for anything beyond a small, low-risk initiative.
8. **Risks and mitigations** — what could undermine the projected benefits or blow out the costs, and what's being done about each.
9. **Recommendation** — a direct go/no-go statement, plus explicit decision criteria: what has to remain true for this to proceed, and what would trigger pausing or stopping.

## Sensitivity and scenario analysis — don't skip this

A single point estimate invites the reasonable challenge "what if you're wrong about X?" Answer that question in the document itself rather than waiting to be asked:

- **Build at least three scenarios**: a base case (best estimate), an optimistic case (e.g. benefits +30%, costs -10%), and a pessimistic case (e.g. benefits -30%, costs +20%). Show ROI and NPV for each.
- **If the pessimistic case still yields a positive NPV**, the recommendation is straightforward and the document can say so plainly.
- **If the pessimistic NPV is negative**, don't hide this — name it, and explain the specific risk-mitigation strategy that's meant to keep the initiative out of that scenario. A business case that's silent about its own downside case looks less credible than one that confronts it directly, not more.
- **Identify the 3-5 assumptions most likely to be challenged** (adoption speed, cost escalation, delivery timing are common ones) and show what a plausible range on each does to the headline metrics — this turns a defensive scramble during review into a controlled, already-anticipated conversation.

## Common mistakes specific to this deliverable

- **Overly optimistic savings assumptions.** This is named repeatedly as the single most common reason an ROI analysis gets discounted by an experienced reviewer on sight. Use conservative estimates grounded in evidence (pilot data, benchmarks, comparable past initiatives), and justify any upward adjustment with specific evidence rather than general optimism.
- **Incomplete cost accounting.** Sum the full multi-year cost of ownership, including costs that only show up during and after implementation, before calculating ROI — not just the upfront price tag.
- **Mixing cash and accounting views.** Model cash timing first; translate to an accounting view afterward if needed. A business case that blends the two without being explicit about which is which tends to produce numbers that don't reconcile when finance checks them.
- **Using one "perfect" forecast with no range.** A single confident number invites a single confident objection. Ranges and scenarios make the uncertainty visible and defensible instead of hidden and fragile.
- **Skipping stakeholder input when building the cost/benefit inventory.** A business case built in isolation from finance, operations, and the people actually affected tends to miss real costs and overstate adoption speed — involve them while building it, not only when presenting it.
- **No clear recommendation.** Don't make the reader assemble the conclusion themselves from a pile of numbers — state the recommendation directly, supported by the data, not implied by it.

## Worked example (abbreviated)

> **Recommendation**: Approve the automated invoice-routing initiative. Base case ROI: 150% over 3 years; NPV: $3,213 (at 8% discount rate); payback: ~1 year. Pessimistic-case NPV remains positive ($1,100), supported by a vendor savings guarantee that caps downside risk.
>
> **Options considered**: (1) Do nothing — backlog continues to grow as transaction volume rises; (2) Hire two additional approval clerks — addresses volume but not the underlying manual-error rate; (3) **Recommended**: automated routing with exception-based human review.
>
> **Cost inventory**: implementation ($45,000, one-time), annual licensing ($12,000/year), estimated onboarding/productivity dip during transition ($8,000, one-time, often the figure teams forget to include).
>
> **Benefit inventory**: labor cost avoidance from not hiring two clerks ($95,000/year, tangible); reduced compliance risk from consistent audit trail (intangible, conservatively valued at $15,000/year based on past audit-finding remediation costs).
>
> **Sensitivity**: if benefit realization is 30% slower than modeled (staff adoption takes longer than planned), payback extends to ~1.4 years — still well within the analysis window, so the recommendation holds even under that downside.

Notice the do-nothing option is named explicitly, the easy-to-forget transition cost is called out as exactly the kind of cost that's easy to forget, and the sensitivity case is resolved rather than left as an open question.
