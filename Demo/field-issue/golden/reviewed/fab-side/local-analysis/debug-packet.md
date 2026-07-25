---
packet_id: FI-2026-00421-packet-v1
case_id: FI-2026-00421
review_status: approved
reviewed_by: "Onsite Field Engineer"
reviewed_at: "2026-07-18T10:15:00Z"
transfer_approved: true
classification: sanitized
---

# Reviewed Sanitized Debug Packet

## Sanitized Summary

Fine alignment failed repeatedly after an X-axis move. Stage settling was outside
the configured limit while the vision-confidence indication remained acceptable.
An alignment error repeated and a stage-settle timeout was also observed.

## Relative Event Timeline

1. Fine alignment began.
2. An X-axis move completed, followed by prolonged settling.
3. Vision detected the fiducial with acceptable confidence.
4. Alignment exceeded its permitted deviation.
5. Retry reproduced the same sequence.
6. A later attempt reproduced the alignment error and added a stage-settle timeout.
7. The operator stopped the run.

## Observed Patterns

- Failure follows X-axis movement.
- Prolonged settling appears before each failed alignment.
- Retrying does not recover.
- Vision confidence remains acceptable during the observed failures.
- The onsite approved observation confirmed motion through the measurement window.

## Subsystem Hypotheses

1. **Stage settling instability — primary, moderate-to-high confidence.**
   Repeated event order and onsite clarification support an X-axis motion or
   settling path.
2. **Stage-to-vision interaction — secondary, low confidence.**
   An acceptable vision score does not eliminate motion during measurement.

These are hypotheses, not verified causes.

## Confidence

Moderate to high for the stage-settling path; low for a vision-only cause.
The mechanical cause and maintenance correlation remain unverified.

## Missing Evidence

- Recent stage maintenance or mechanical-change history.
- Result of the approved stage-settling diagnostic selected by offsite engineering.
- Post-intervention verification against an agreed run count.

## Redactions Applied

- Customer, fab, tool, lot, and wafer identifiers withheld.
- Absolute event timestamps and exact machine values generalized.
- Raw filenames and raw evidence lines omitted.

## Field Clarification

The onsite field engineer used the approved longer local observation and
confirmed that X-axis vibration continued through the fine-alignment measurement
window. Maintenance history remains to be reviewed.

## Review Record

The onsite field engineer reviewed the wording, confirmed that the summary
matches the local observation, and approved this sanitized packet for transfer.
