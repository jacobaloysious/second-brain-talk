---
packet_id: FI-2026-00421-packet-v1
case_id: FI-2026-00421
review_status: pending_field_review
reviewed_by: ""
reviewed_at: ""
transfer_approved: false
classification: restricted_local_draft
---

# Draft Debug Packet

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

## Subsystem Hypotheses

1. **Stage settling instability — primary, moderate confidence.**
   Timing and repetition point to X-axis motion or settling.
2. **Stage-to-vision interaction — secondary, low confidence.**
   An acceptable vision score does not eliminate motion during measurement.

These are hypotheses, not verified causes.

## Confidence

Moderate. The event order is consistent across attempts, but the approved
observation window and maintenance context are incomplete.

## Missing Evidence

- Whether motion persists through the actual fine-alignment measurement window.
- Recent stage maintenance or mechanical-change history.
- A reviewed result from the approved stage-settling diagnostic.

## Redactions Applied

- Customer, fab, tool, lot, and wafer identifiers withheld.
- Absolute timestamps and exact machine values generalized.
- Raw filenames and raw evidence lines omitted.

## Field Clarification

Pending onsite response:

> Using the approved local diagnostic, does X-axis vibration continue through
> the fine-alignment measurement window? Also confirm whether recent stage
> maintenance history is available.

## Review Record

Pending field-engineer review. This draft is not approved for transfer.
