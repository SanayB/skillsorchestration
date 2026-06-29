# Incident response

Read this when an active incident needs structure, or when setting up an incident response process before one occurs. The test of whether this process is actually good: a junior engineer who's on-call alone at 3am and has never seen this specific failure before should know exactly what to do — not freeze, and not need to gamble on whether to wake up a senior engineer. If the real answer to "what happens at 3am" is "they'd probably panic and message someone senior," the process lives in someone's head rather than in a system, and that gap deserves the same seriousness as any other reliability gap.

## The five-stage model

A simple, repeatable framework most SRE teams converge on, in some form: **prepare → detect → respond → recover → learn.** The postmortem (`references/postmortems.md`) is the "learn" stage — incident response proper covers the middle three.

**The real bottleneck is rarely detection.** Monitoring tools generally do flag that something's wrong. The actual bottleneck is almost always coordination — getting the right people, with the right context, assembled and aligned quickly. A process that's mostly aimed at speeding up coordination (clear roles, low-friction escalation, a single source of truth for what's known so far) addresses the part that actually costs the most time, more than detection-side tooling improvements typically do.

## Severity levels

Define explicit, written severity levels before an incident happens — "is this a SEV1 or a SEV3" should never be a live debate during an active incident, since every minute spent arguing about classification is a minute not spent fixing the actual problem.

A common structure (naming conventions vary — P1/P2/P3, SEV-0 through SEV-3, Critical/High/Medium — the labels matter far less than having an internally consistent, written definition everyone actually uses):

| Severity | Typical definition | Response expectation |
|---|---|---|
| **SEV-1 / P1** | Critical, widespread user impact, revenue-affecting, or a complete outage | Immediate, all-hands-on-deck; page immediately, no waiting |
| **SEV-2 / P2** | Significant but partial impact — a major feature degraded, a subset of users affected | Urgent response, typically within minutes, may not need every available responder |
| **SEV-3 / P3** | Moderate/low impact, workaround often exists | Handled during business hours or the next work cycle, prioritized normally in the backlog |
| **P4/P5** (if used) | Cosmetic or informational — a typo, an internal dashboard misalignment | No urgent action needed |

**Tie severity directly to SLA/SLO consequences where possible** — if a contract guarantees 99.9% uptime, the team needs an unambiguous rule for what counts as the kind of event that puts that guarantee at risk, rather than reconstructing the judgment call live, under pressure, for every incident.

## Roles during an active incident

Defining roles in advance — and consistently using them, even for a small team where one person might hold two roles — prevents the much worse failure mode of an incident with no clear leader, where everyone is reacting and nobody is actually deciding.

- **Incident Commander** — declares the incident and its severity, assigns roles, makes the call on response strategy, coordinates across teams, and decides when the incident is actually resolved. This role is about coordination and decision-making, explicitly *not* about being the person hands-on-keyboard fixing the problem — those are often, and should be, different people.
- **Communications Lead** — owns status updates (internal and, if relevant, a public status page), at a defined cadence, and is the single channel for customer/stakeholder-facing updates so messaging stays consistent rather than several people independently guessing what to say.
- **Operations Lead** — leads the actual technical investigation, proposes and executes mitigations, and pulls in subject matter experts as needed.
- **Scribe** — records the timeline, actions taken and by whom, and the reasoning behind key decisions as they're made — not reconstructed afterward from memory and scattered Slack messages, which is consistently slower and less accurate, and is the single biggest reason postmortem writing drags on (see `references/postmortems.md`).

For a small team, the same person may hold more than one role — but naming the roles explicitly, even when one person is wearing two hats, keeps the underlying responsibilities clear rather than assuming everything implicitly falls to whoever's most senior in the room.

## Automate the repeated steps

**If the same manual step happens during every incident — creating a channel, paging the same person, posting the same initial status update — that step should be automated.** This is the toil-elimination principle from `SKILL.md` applied specifically to incident response: a responder's attention during a live incident is the scarcest resource in the room, and spending it on a mechanical setup step that could be automated is a direct, avoidable cost to how fast the team can actually start fixing the real problem.

## Communication during an incident

- **Update at a predictable cadence**, even when there's genuinely nothing new to report — "still investigating, next update in 15 minutes" is far better for stakeholder trust than silence, which reads as either incompetence or a worse problem than what's actually happening.
- **State known facts and current actions separately from speculation.** Mixing "we believe X might be the cause" with confirmed facts, without clearly marking which is which, can send people chasing an unconfirmed theory as if it were established — be explicit about the difference in every update.
- **Keep the technical investigation channel and the stakeholder-facing updates separate** where practical — the pace and vocabulary that work for engineers actively debugging rarely translate well to an executive or customer-facing audience, and trying to serve both from one channel tends to serve neither well.

## Common mistakes specific to incident response

- **No written severity definitions**, leading to live, time-wasting arguments about classification during an actual incident.
- **No clearly assigned Incident Commander**, leaving the room in a state where everyone's investigating and nobody's actually deciding or coordinating.
- **The same person trying to be both Incident Commander and the primary hands-on-keyboard investigator** on anything beyond a small incident — these pull attention in different directions and the coordination role tends to suffer first.
- **Reconstructing the timeline from memory after the fact**, instead of having a scribe capture it live — this is consistently the single biggest reason postmortems take far longer to write than they should.
- **Manual, repeated setup steps every single incident** (creating the channel, paging the same on-call rotation, the same initial status post) that were never automated despite happening identically every time.
- **Silence during a prolonged investigation**, leaving stakeholders to assume the worst rather than being told plainly that the team is still working the problem.
