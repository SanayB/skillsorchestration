# Status reporting and stakeholder communication

Read this when Step 4 of `SKILL.md` calls for reporting project status. A status report's actual job is giving a sponsor or steering committee the honest signal they need to intervene early if something's off track — not to reassure them, and not to make the project manager look good. Keep that distinction in mind throughout: a report optimized for looking good and a report optimized for being useful are not always the same document.

## RAG status — the standard at-a-glance system

**Red/Amber/Green (RAG)** is the near-universal shorthand for communicating project health quickly to a busy stakeholder who doesn't have time to read a detailed report every cycle:

- **Green** — on track, progressing as planned, no significant risks or issues requiring escalation.
- **Amber** — at risk; there's a real concern, but the team has a credible plan to recover without outside help (e.g. a budget overspend coverable by existing contingency).
- **Red** — off track; scope, schedule, or budget is significantly affected and needs escalation and intervention, not just monitoring.
- **Blue** (an increasingly common fourth status in Agile/hybrid reporting) — complete, distinguishing finished work cleanly from in-progress work rather than forcing it to stay "green" indefinitely.

**Apply RAG to each dimension separately** (schedule, budget, scope, resources, risk), not just one overall number — a project can be green on budget and red on schedule simultaneously, and collapsing that into a single rating hides exactly the information a sponsor needs to know where to focus.

**The single most important practice for RAG to actually work**: define the rating criteria in hard, specific numbers *before* the reporting starts, not left to each report's subjective judgment. For example: red if cost variance exceeds 10% or a key milestone slips by more than two weeks; amber for a smaller, recoverable deviation; green otherwise. Subjective RAG ("I feel like this is amber") is where the practice breaks down — one project manager's amber is another's red, and without hard thresholds, RAG stops being a reliable signal and becomes just a mood indicator.

## The single most important failure mode: watermelon reporting

**A project that's green on the outside and red on the inside** — named directly and worth taking seriously, because it's extremely common and quietly destroys the entire value of status reporting. It happens when whoever's reporting is reluctant to report bad news — often from a reasonable, very human fear that a red status reflects poorly on their own competence, rather than on the project's actual situation.

**The fix is mostly cultural, not procedural**: leadership has to visibly create a climate where reporting red is treated as the responsible, useful thing to do — not as an admission of personal failure — or the incentive to hide bad news will reliably win regardless of what template or process is in place. A project manager who reports red and gets immediate, blame-free support is far more likely to report the next red honestly than one who got publicly criticized for the first one.

## Structure of a status report

1. **Header** — project name, reporting period, report date, project manager, sponsor, overall RAG status. This establishes accountability for anyone reading it later.
2. **Executive summary** — 2-4 sentences: overall status and the one or two things that most need the reader's attention this period. Write this to be useful standalone, since a busy sponsor may genuinely read only this section.
3. **Key accomplishments** — what was actually delivered this period, demonstrating real momentum rather than just activity.
4. **Upcoming work** — what's planned for the next period, giving the reader a forward-looking sense of the plan, not just a backward-looking one.
5. **Milestones/deliverables with RAG status** — tracked individually, each with an owner, not buried in prose.
6. **Budget** — planned vs. actual vs. variance, with RAG applied to the variance.
7. **Top risks and issues** — pulled from the RAID log (`references/risk-and-raid.md`); a short list of the few that actually matter this period, not the full log.
8. **Decisions needed** — anything genuinely blocked on a stakeholder decision, named explicitly so it doesn't silently sit unresolved.

**Keep the format genuinely consistent across reporting periods.** Stakeholders read these reports faster and more reliably once they know exactly where to look for each piece of information — a report that reorganizes its own structure every cycle forces the reader to re-orient each time, which works against the entire point of frequent, lightweight reporting.

## Earned Value Management (EVM) — for complex, budget-sensitive projects

RAG alone is often insufficient for a large, multi-million-unit, budget-sensitive initiative where a sponsor needs quantitative answers, not just a color. EVM compares three numbers over time:

- **Planned Value (PV)** — the budgeted value of work that was scheduled to be done by this point.
- **Earned Value (EV)** — the budgeted value of work *actually* completed by this point.
- **Actual Cost (AC)** — what was actually spent to complete that work.

From these: **Schedule Variance (SV = EV − PV)** and **Cost Variance (CV = EV − AC)** show whether the project is ahead/behind schedule and under/over budget, in the same units, comparably. EVM's real value over a simple percent-complete number is **predictive**: it can project, based on current performance trends, what the likely final cost and completion date will be if the current trend continues — directly answering the two questions a sponsor on a large initiative actually cares about: are we getting the value we planned for the money spent, and when will this actually finish.

**Use EVM when the project's scale and budget sensitivity genuinely justify the additional tracking overhead** — setting it up and maintaining it accurately takes real discipline (it depends on having a credible, granular cost-loaded schedule to measure against). For a small or simple project, RAG status alone is proportionate; reach for EVM specifically once budget exposure and stakeholder scrutiny are high enough that "we think we're on track" needs to become "here's the data showing we're on track, and here's our projected final cost."

## Common mistakes specific to status reporting

- **Watermelon reporting** — reporting green to avoid an uncomfortable conversation, until the problem is too big to hide and arrives as a sudden, late red.
- **Subjective RAG with no defined thresholds**, making the rating depend on who's reporting rather than on the actual project data.
- **One overall RAG number instead of per-dimension ratings**, hiding which specific area (schedule vs. budget vs. scope) actually needs attention.
- **Changing the report's structure every period**, forcing stakeholders to re-orient instead of reading fluently for the signal they're used to looking for.
- **A status report that only narrates what the project manager did**, rather than what the project's actual current state and trajectory are — the report should be about the project, not a personal activity log.
- **Reporting only retrospectively** (what happened) with no forward-looking section — stakeholders need the upcoming plan and any pending decisions just as much as the historical record.
