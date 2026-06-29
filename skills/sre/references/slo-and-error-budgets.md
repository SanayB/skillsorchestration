# SLOs, SLIs, and error budgets

Read this first — this is the quantitative core that the rest of this skill builds on. Without a real SLO, there's no error budget to make decisions with, no clear target for observability to measure against, and no objective basis for deciding whether an incident actually mattered.

## The three terms, precisely

- **SLI (Service Level Indicator)** — a quantitative measure of some aspect of the service, expressed as a ratio: `(good events) / (total events)`. The defining discipline here is that an SLI has to represent **actual user-facing experience** — successful checkout completions, requests served under a latency threshold — not an internal infrastructure metric that's easy to measure but doesn't track what users actually feel (CPU utilization is a classic example of a metric that's tempting to use because it's easy to get, but is usually the wrong thing to base an SLO on).
- **SLO (Service Level Objective)** — a target value or range for an SLI over a defined time window: "99.9% of requests succeed, measured over a rolling 30-day window." This is the number SRE practice is actually built around — Google's own SRE workbook states this almost as a definition of the discipline itself: **without SLOs, there's no real basis for SRE's core work of prioritizing reliability against feature velocity.**
- **Error budget** — the complement of the SLO: `100% − SLO%`. A 99.9% SLO yields a 0.1% error budget — at 1,000,000 requests over the window, that's 1,000 allowed failures. This reframes reliability from a binary "did we have an outage" question into a quantified resource that gets spent over time, and that can run out before the window resets.

## Setting the target — don't just measure what you already do

**Base the SLO on user expectations and business impact, not on what the system happens to already achieve.** If a service currently runs at 99.95% and the SLO is also set to 99.95%, the SLO carries no information — it's just describing the present, not setting a real target. The standard, sound approach: start with a target slightly below current measured performance, run it for a full review cycle (often a quarter), and tighten it once there's real confidence the target is both achievable and meaningful — not the reverse, picking an aspirational number first and hoping the system catches up.

**Know what each nine actually costs.** This isn't just a rhetorical point — it's the basis for an honest conversation with stakeholders about what they're actually asking for:

| SLO | Allowed downtime/window (30-day) |
|---|---|
| 99% | ~7.3 hours |
| 99.5% | ~3.6 hours |
| 99.9% | ~43 minutes |
| 99.95% | ~21.6 minutes |
| 99.99% | ~4.3 minutes |

The jump from 99.9% to 99.99% isn't a 10x bigger ask in a linear sense — it's frequently a qualitatively different engineering problem (multi-region failover, eliminating every remaining single point of failure), and most services don't need to be there. **Most services should start in the 99.5–99.9% range** rather than reaching for four nines by default; reserve the higher targets for services where the cost of additional reliability engineering is clearly justified by the cost of an outage.

**Multiple SLOs per service are normal.** Availability, latency, and correctness/quality are different dimensions, and a single blended metric usually hides more than it reveals — a service can be "available" by one definition while quietly returning wrong or slow responses by another.

**Document the rationale, not just the number.** The SLO document should include the SLI implementation details, how the error budget is calculated, and crucially *why this number* — whether it came from real experimental/observational data or was set ad hoc. If it was ad hoc, say so explicitly in the document — a future engineer making a decision based on this SLO needs to know whether it's backed by real analysis or a reasonable guess, since that changes how much weight the number should carry.

## Error budget policy

A written policy turns "we're burning through error budget" from an abstract worry into a predetermined set of actions — without one, reliability discussions default to whoever argues loudest in the room. A typical structure, scaled to remaining budget:

- **>75% remaining** — normal release velocity.
- **50-75% remaining** — more cautious deploys; additional staging validation.
- **25-50% remaining** — explicit reliability focus; defer risky changes.
- **<25% remaining** — feature freeze; reliability work only.
- **Exhausted (0%)** — emergency fixes only, full freeze on everything else.

**State explicitly that this policy is not punitive.** Google's own published error budget policy makes this point directly: halting feature work is undesirable, but the policy exists to give a team explicit permission to prioritize reliability over new features when the data says reliability needs it right now — not to punish anyone for an outage. Without that framing stated up front, teams tend to treat budget exhaustion as a sign of personal or team failure, which pushes toward exactly the kind of defensive, blame-avoidant behavior that undermines honest postmortems (see `references/postmortems.md`).

**Carve out reasonable exceptions in the policy itself**, decided in advance rather than argued over mid-incident: outages caused by a different team's service that has itself already frozen to fix the problem, budget consumed by out-of-scope traffic (load tests, security scans), or miscategorized errors that didn't actually affect real users. Defining these upfront avoids a credibility-damaging argument about whether the policy "really" applies in a specific case, in the middle of dealing with that case.

**A specific, useful escalation trigger worth adopting directly**: if a single incident consumes more than roughly 20% of the error budget within a four-week window, that alone should trigger a mandatory postmortem — regardless of how the incident might otherwise be categorized by severity.

## Burn rate — the early warning signal

Burn rate measures how fast the error budget is being consumed relative to a sustainable pace: `(observed errors in period) / (acceptable errors in period)`. A burn rate above 1 means the budget is being spent faster than the window allows; below 1 means it's being conserved. **Page on burn rate, not just on raw error count** — a high burn rate over a short window can indicate the SLO will be blown well before the monitoring window ends, giving time to react before the budget is actually gone, rather than discovering exhaustion only after the fact.

## SLOs as code

**The current (2026) practice has shifted SLO definitions from living in a dashboard UI to living in version control alongside the code they measure** — using a declarative, portable spec like OpenSLO, stored in Git, reviewed via the same pull-request process as everything else. This is a meaningful step up from earlier practice for a concrete reason: an SLO defined as code can directly drive automation — gating a deployment on remaining error budget, triggering an automatic canary rollback if a release starts burning budget abnormally fast — rather than relying on someone noticing a dashboard and manually deciding to act.

## Common mistakes specific to SLOs and error budgets

- **Basing an SLI on an easy-to-measure infrastructure metric instead of actual user experience** — CPU usage looking fine doesn't mean users are succeeding at what they came to do.
- **Setting the SLO to match current performance exactly**, producing a target that carries no actual information.
- **Reaching for 99.99% by default** without a concrete justification for why that specific service needs that specific level, given the very real jump in engineering cost it implies.
- **Treating error budget exhaustion as a blame event** rather than the data-driven prioritization signal it's designed to be — this single framing mistake undermines the entire practice's credibility with the team.
- **No documented error budget policy**, leaving "what do we do when budget runs low" to be argued out in real time, under pressure, instead of decided calmly in advance.
- **Reviewing the SLO once and never again.** SLO appropriateness should be reviewed frequently early on (monthly is a reasonable start) and can move to a lower cadence (quarterly) only once there's real confidence the targets and their measurement are sound.
