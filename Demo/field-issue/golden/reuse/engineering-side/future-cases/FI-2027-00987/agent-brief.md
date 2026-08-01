# Six Months Later — New Case FI-2027-00987

Assigned engineer: New rotation engineer
State: triage
Source available: new sanitized symptom plus approved component knowledge
Raw evidence access: none

## New Sanitized Symptom

A new fine-alignment failure follows X-axis movement. The reviewed packet
reports an alignment error together with a stage-settle timeout and confirms
motion through the measurement window.

## Retrieved Approved Guidance

The approved component knowledge requires the alignment-start guard to verify
stable position and velocity for the configured consecutive sample window. If
the guard returns `stage_not_stable`, it recommends running the stage-settling
diagnostic before changing vision configuration.

- Knowledge source:
  `engineering-side/component-knowledge/stage-controller/known-failure-modes.md`
- Provenance: `FI-2026-00421`
- Code provenance: `motion-control/stage-runtime`, mock PR `#1847`
- Human reviewer: Motion Controls Component Owner
- Scope: persistent X-axis motion confirmed through the measurement window

## What the New Engineer Can Do Immediately

1. Confirm that the approved position-and-velocity guard is active.
2. Apply the approved stage-settling diagnostic if the guard rejects motion.
3. Keep a vision-only cause open until the controlled result distinguishes it.
4. Ask the onsite field engineer for a reviewed sanitized result.
5. Create new actions and evidence inside `FI-2027-00987`, not by copying the
   original case.

## What Is Not Carried Forward

- The previous case's physical cause is not assumed.
- The previous case's actions are not copied.
- No raw evidence or restricted identifier is available.
- A damper replacement is not recommended without new supporting evidence.

## Payoff

The new engineer starts with a reviewed software guardrail, diagnostic path,
and their limitations instead of reconstructing the rationale from the earlier
case.
