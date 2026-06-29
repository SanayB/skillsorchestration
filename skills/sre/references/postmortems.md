# Postmortems

Read this after an incident has been resolved (`references/incident-response.md`), or when establishing a postmortem practice before incidents occur. This is the "learn" stage of the core SRE loop in `SKILL.md` — and it's the stage most teams genuinely struggle to do well, not because the templates are hard, but for reasons that are cultural rather than procedural.

## What a postmortem actually is

A structured, non-punitive analysis of an incident focused on systemic causes, remediation, and learning — explicitly **not** a legal investigation, an HR disciplinary tool, or a one-off "let's not blame anyone" meeting with no real accountability mechanism behind it. The analogy worth holding onto: a flight data recorder review seeks design fixes, not a pilot to fault.

## Why blameless is the only version that actually works

**This isn't a values statement — it's a practical mechanism for getting accurate information.** When people feel safe, they describe what actually happened. When they're afraid of consequences, they give the sanitized version — and a sanitized account doesn't prevent the same incident from happening again, because the real contributing factors never surface. The goal of a blameless postmortem is specifically to surface what John Allspaw calls the **"second story"**: not just what happened mechanically, but why the failure was possible given what the people involved knew and believed at the time, with the resources and information they actually had — which only gets told when people believe it's genuinely safe to tell it.

**Ground rules that make this practice real rather than aspirational:**
- No finger-pointing — refer to roles ("the on-call database engineer"), not names, while staying clear and unambiguous about the actual facts.
- Focus on facts over opinions — reconstruct the timeline and data first, before drawing conclusions.
- Ask "why" repeatedly (the Five Whys technique) until reaching a systemic or process-level cause, not stopping at the first human action in the chain.
- Document learnings and action items, not judgments.
- Assign owners for *improvements*, not for guilt — accountability here means driving a fix, not absorbing blame.

## The single biggest threat to blameless culture

**Blameful language from senior leadership is the most common way a blameless postmortem culture erodes** — and it's worth naming directly rather than softening, because it's specific and avoidable. A leader who says "I know we're supposed to be blameless, but..." in a postmortem, especially under real pressure after a costly incident, reverts to language that feels like accountability because it's simpler than confronting genuine systemic complexity. Engineers in the room notice this, every time, and they recalibrate what's actually safe to admit in the next postmortem accordingly. **The fix isn't a training program — it's leaders holding the line on their own language and behavior in the room, specifically when the pressure is highest**, since that's precisely the moment the culture is actually being tested. A blameless culture that holds up only when incidents are small and cheap isn't actually a blameless culture yet.

## Root cause analysis techniques

- **Five Whys** — iteratively ask "why" on each answer until reaching a systemic cause, rather than stopping at the first proximate one ("the deploy caused the outage" → why did the deploy cause it → why didn't testing catch it → why isn't that case covered by tests → systemic gap identified).
- **Fishbone/Ishikawa diagram** — categorizes contributing factors (process, tooling, people, environment) to ensure analysis doesn't fixate on just one category and miss contributing factors from others.
- **Timeline correlation** — lining up metrics, logs, traces, and human actions/decisions on one shared timeline, which is often what actually reveals the real causal chain rather than the first plausible-sounding story.
- **Fault tree analysis** — for genuinely complex incidents, mapping the dependencies and possible failure paths that could each have produced the observed symptom, rather than assuming the first identified cause is the only one that mattered.

**Root cause analysis should explicitly look past "human error" to the systemic conditions that made the error possible** — ambiguous runbooks, missing tests, insufficient automation, unclear ownership. "An engineer ran the wrong command" is rarely a complete root cause; "the command was ambiguous to run safely and there was no safeguard against running it on production by mistake" usually is.

## Structure

A practical, structured template — comprehensive enough to actually support learning, but not so long that writing it becomes the team's main blocker to closing the loop:

- **Key facts** — severity, impact start/end timestamps, affected services, on-call responders, customer impact (downtime, users affected, business impact if known).
- **Executive summary** — written *last*, 2-3 sentences a non-technical stakeholder can understand: what broke, how bad it was, what was done, what's being done to prevent recurrence.
- **Timeline** — the auditable, narrative sequence of detection, key decisions, actions taken, and resolution — captured live by the incident's scribe wherever possible (see `references/incident-response.md`), since reconstructing this after the fact from memory and scattered chat logs is the single most common reason postmortems take far longer to write than they should and end up less accurate.
- **Contributing factors** — the systemic causes identified via the RCA techniques above, not a single oversimplified "root cause" if the reality involved several contributing conditions.
- **Action items** — each with a specific owner and a real due date. An action item with neither is, in practice, a wish, not a commitment — and a postmortem with many such unanchored items is a strong, well-documented predictor that none of them will actually get done.

## The real failure mode: postmortem theater

**The most common mistake, named directly because it's so easy to fall into without noticing**: treating the *document* as the deliverable. A team can write a well-formatted, thorough-looking postmortem, hold a respectful review meeting, and still have produced nothing of actual value if no architectural change, no completed action item, and no real organizational learning follows from it. **The postmortem document is evidence that a conversation happened — it is not itself the measure of success.** The actual measure is what's different in the system or process afterward.

**Two concrete, checkable signals for whether the practice is actually working, rather than just performing the format:**
- If the last several major incidents share a systemic condition that an *earlier* postmortem already identified but that was never actually fixed, the practice isn't working, regardless of how good the documents themselves look.
- Whether engineers volunteer the full story unprompted, or have to be drawn out detail by detail — volunteering it is the signal that psychological safety is real, not just claimed.

## Common mistakes specific to postmortems

- **Waiting too long to run the postmortem.** Details fade fast — running it within a few days of resolution, while memory and urgency are still fresh, produces a meaningfully more accurate and useful document than waiting weeks.
- **Action items with no owner and no due date** — these are the items that reliably never get done, and a postmortem full of them is closer to wishful thinking than to an actual remediation plan.
- **Assigning action items to a person instead of to a system or process change** — "have Sarah double-check this next time" doesn't scale and doesn't survive Sarah being on vacation or leaving the team; "add an automated check that prevents this class of mistake" does.
- **Stopping at the first plausible human action in the causal chain** instead of continuing to ask why until reaching the systemic condition that made that action possible.
- **Treating the published, well-formatted document as proof the practice succeeded**, without separately checking whether anything in the actual system or process changed afterward.
- **Leadership using blame-adjacent language even once, under pressure** — a single instance is enough to recalibrate what the team believes is actually safe to admit going forward, regardless of how many times "blameless" was stated as a policy beforehand.
