# Stage Controller — Curated Knowledge

Owner: Motion Controls Team
Last reviewed: 2026-07-18

## Validated Failure Modes

### Axis-settle timeout

- `STAGE-119`: axis-settle timeout. Follow the approved settle-time diagnostic
  procedure.

### Alignment start guardrail

Before alignment starts, require both position and velocity to remain stable for
the configured consecutive sample window. If either condition is unstable,
reset the stability window and return `stage_not_stable` rather than starting
alignment.

- Code source: `motion-control/stage-runtime`, mock PR `#1847`
- Patch scope: `src/motion/stage-settle-gate.ts` and
  `test/motion/stage-settle-gate.test.ts`
- Evidence: type check, unit tests, motion-simulator regression, human code review

### Alignment error with persistent X-axis motion

When an alignment error and `STAGE-119` occur together, and an approved
sanitized observation confirms X-axis motion through the measurement window,
run the approved stage-settling diagnostic before changing vision configuration.

A degraded stage damper is one possible cause, not a default conclusion.

- Source case: `FI-2026-00421`
- Code provenance: mock PR `#1847`
- Reviewed by: Motion Controls Component Owner
- Reviewed date: 2026-07-18
- Validation: five consecutive successful runs after approved onsite intervention
- Scope: persistent X-axis motion confirmed through the measurement window
- Supersession: retain this provenance and record the evidence or procedure that
  changes the guidance
