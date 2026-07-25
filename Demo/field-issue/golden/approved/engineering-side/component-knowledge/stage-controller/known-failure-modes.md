# Stage Controller — Curated Knowledge

Owner: Motion Controls Team
Last reviewed: 2026-07-18

## Validated Failure Modes

### Axis-settle timeout

- `STAGE-119`: axis-settle timeout. Follow the approved settle-time diagnostic
  procedure.

### Alignment error with persistent X-axis motion

When an alignment error and `STAGE-119` occur together, and an approved
sanitized observation confirms X-axis motion through the measurement window,
run the approved stage-settling diagnostic before changing vision configuration.

A degraded stage damper is one possible cause, not a default conclusion.

- Source case: `FI-2026-00421`
- Reviewed by: Motion Controls Component Owner
- Reviewed date: 2026-07-18
- Validation: five consecutive successful runs after approved onsite intervention
- Scope: persistent X-axis motion confirmed through the measurement window
- Supersession: retain this provenance and record the evidence or procedure that
  changes the guidance
