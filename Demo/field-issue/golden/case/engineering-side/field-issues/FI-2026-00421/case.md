# Case FI-2026-00421

Status: investigate
Assigned engineer: Engineer
Severity: production blocking
Opened: 2026-07-18
Source: reviewed engineering inbox packet

## Impact

Fine alignment is failing repeatedly and the onsite run is paused.

## Goal

Identify the failing subsystem, define the smallest discriminating experiment,
inspect any implicated software guard, coordinate approved onsite intervention,
and verify recovery.

## Ownership Boundary

- **Engineer, offsite:** diagnosis, experiment design, code/test access, and
  verification decision.
- **Onsite field engineer:** approved local capture, tool observation, and
  physical intervention.
- **Motion Controls:** component-specific diagnostic review.

## Current Assessment

The reviewed packet supports a stage-settling path at moderate-to-high
confidence. A vision-only explanation remains possible but has weaker support.
The mechanical cause is not yet established.

## Definition of Done

- Cause is supported by reviewed evidence.
- Engineer defines the intervention and verification criteria.
- The onsite field engineer applies any approved physical intervention.
- Returned sanitized results meet the agreed verification criteria.
- Any software change has code review and regression evidence before deployment.
- Field follow-up is complete.
- Reusable learning is proposed for human review, not automatically promoted.
