# Observability

Read this after `slo-and-error-budgets.md` — an SLO is only as real as the instrumentation that produces its SLI. This file covers what to actually measure and how the modern observability stack fits together.

## Observability vs. monitoring — a real distinction, not just newer jargon

**Monitoring** answers questions you already knew to ask: is this specific threshold breached, did this specific alert fire. **Observability** is the property of a system that lets you answer questions you *didn't* know to ask in advance — being able to investigate a genuinely novel failure mode using the system's own external outputs, without having pre-built a dashboard for that exact scenario. A system can be heavily monitored (lots of dashboards, lots of alerts) and still not be observable, if those dashboards only ever show the failure modes someone already anticipated. The practical implication: don't treat "we have dashboards" as equivalent to "we have observability" — the real test is whether an engineer can diagnose an incident they've never seen before using the data the system already emits, without needing to ship new instrumentation mid-incident just to see what's happening.

## The four golden signals

If a team can only track four things about a user-facing system, these are the four, and they remain the standard starting point for a reason — together they cover the questions that matter most for almost any service:

- **Latency** — how long requests take. Track successful and failed request latency *separately* — a fast error response can otherwise drag down an average in a way that hides a real problem, or a slow failure path can make the service look slower than it is for working requests.
- **Traffic** — how much demand the system is receiving (requests/sec, or whatever unit fits the system's actual workload).
- **Errors** — the rate of requests that fail, explicitly or implicitly (a 200 response with the wrong content is still a failure from the user's perspective, even though it wouldn't show up in a naive error-code count).
- **Saturation** — how "full" the system is relative to its capacity (queue depth, memory pressure, connection pool utilization) — the leading indicator that degradation is coming, often before latency or errors visibly worsen.

**Avoid "magic" monitoring that tries to automatically infer causality or learn thresholds without a human being able to understand why.** The guidance here is deliberately conservative: monitoring should stay simple and comprehensible to everyone on the team, including whoever's on-call at 3am and needs to trust what the dashboard is telling them without first reverse-engineering an opaque anomaly-detection model.

## The three pillars

These are the categories of telemetry data that feed both the golden signals and any SLI:

- **Metrics** — numeric, aggregated measurements over time (request count, latency histogram, error rate). Cheap to store and query at scale; best for "is this within normal range" and for driving alerts/SLO calculations.
- **Logs** — structured (not raw string concatenation — this matters for the same reason it matters in the `backend` skill) records of discrete events, useful for understanding exactly what happened on a specific request.
- **Traces** — the path a single request takes across multiple services, with timing for each hop. Essential once a system involves more than one service, since a slow or failing request might originate somewhere entirely different from where the symptom is visible.

**White-box and black-box monitoring together, not just one.** White-box monitoring uses the system's own internal metrics and logs; black-box monitoring tests the system from the outside, the way a real user would (synthetic transactions, external uptime checks). Black-box monitoring catches the specific, important class of failure where every internal metric looks fine but the system is actually unreachable or broken from the outside (a misconfigured load balancer, a DNS issue) — a failure mode white-box monitoring alone will reliably miss, precisely because the internals being measured aren't actually the thing that broke.

## OpenTelemetry — the current standard

**OpenTelemetry (OTel) is now the vendor-neutral standard for instrumenting traces, metrics, and logs**, replacing the older pattern of every team or tool inventing its own instrumentation format. The practical benefit, especially once an organization has more than a handful of services: a shared instrumentation standard means observability doesn't need to be rebuilt per team or per backend tool, and switching or adding an observability backend doesn't require re-instrumenting every service. Define sensible defaults once (service naming conventions, trace-context propagation, sampling rates) and apply them consistently — a system where every service emits telemetry slightly differently creates exactly the kind of avoidable confusion and wasted triage time that observability is supposed to eliminate.

## Data freshness matters more than it sounds like it should

**Monitoring data more than 4-5 minutes stale can meaningfully delay incident response.** This is an easy thing to overlook when an observability stack is being designed around average-case dashboard viewing, but during a live incident, several extra minutes of lag between something actually happening and a responder being able to see it happening is a real, costly delay — check this specifically for any pipeline a team will actually depend on during an incident, not just for routine, non-urgent reporting.

## Observability-as-code

Following the same principle as SLOs-as-code (see `references/slo-and-error-budgets.md`): define monitoring configuration, dashboards, and alert rules in version control rather than only through a backend tool's UI. This gets the same benefits version control gives anything else — changes are reviewable, the history of "why did this alert threshold change" is preserved, and a new service can be bootstrapped with a known-good baseline configuration instead of every team reinventing dashboards and alerts from scratch.

## Common mistakes specific to observability

- **Mistaking dashboard coverage for actual observability** — a system can have many dashboards and still be unable to answer a genuinely novel question about a failure no one anticipated.
- **Averaging successful and failed request latency together**, hiding a real latency problem behind a fast-failing error path that drags the average down.
- **White-box monitoring only, with no external/black-box check** — missing the specific class of failure where everything *internal* looks healthy but the service is actually unreachable from outside.
- **Inconsistent instrumentation across services**, making cross-service correlation during an incident slower and more error-prone than it needs to be.
- **Treating CPU/memory/disk metrics as a substitute for user-facing SLIs**, conflating "the infrastructure looks fine" with "users are succeeding" — these are related but genuinely different questions.
- **Letting monitoring data staleness creep up unnoticed**, until a live incident reveals that the dashboard everyone's relying on is several minutes behind reality.
