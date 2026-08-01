# Case FI-2026-00421

Status: closed
Assigned engineer: Engineer
Severity: resolved
Opened: 2026-07-18
Closed: 2026-07-18
Source: reviewed engineering inbox packet plus reviewed experiment result

## Impact

Fine alignment failed repeatedly and the onsite run was paused.

## Outcome

Engineer isolated the stage path, defined the discriminating experiment, and
reviewed the returned sanitized results. The onsite field engineer replaced a
degraded stage damper under the approved service procedure. Engineer also
identified a position-only stage-settle gate, owned the reviewed two-file patch
in mock PR `#1847`, and deployed the stable-position-and-velocity guard. Five
consecutive validation runs completed without the reported alignment or
stage-timeout errors.

## Ownership Boundary

- **Engineer, offsite:** diagnosis, experiment design, code change, review and
  deployment evidence, and verification decision.
- **Onsite field engineer:** approved capture and physical damper replacement.
- **Motion Controls:** component-specific diagnostic review.

## Definition of Done

- [x] Cause supported by reviewed evidence.
- [x] Engineer defined the intervention and verification criteria.
- [x] Onsite field engineer applied the approved physical intervention.
- [x] The software guard had code review and regression evidence before deployment.
- [x] Returned sanitized results met the verification criteria.
- [x] Field follow-up completed.
- [x] Reusable learning proposed for human review.
