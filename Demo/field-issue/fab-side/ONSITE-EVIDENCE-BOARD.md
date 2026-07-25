# RESTRICTED — Onsite Evidence Board

This board is a presentation view of local evidence. It must remain under
`fab-side/` and must never be ingested by engineering.

## Machine Events

- Fine alignment begins after an X-axis move.
- Stage settling repeatedly exceeds its configured limit.
- The same alignment error repeats after retry.
- A stage-settle timeout appears on a later attempt.

## Sensor Pattern

- X-axis vibration rises after movement and remains elevated around alignment.
- Vision confidence remains acceptable.
- Alignment deviation remains outside its permitted range.

## Field Observation

- Retries do not recover.
- The operator pauses the run after repeated failure.
- Restricted customer, fab, tool, lot, and wafer context remains local.

## Local Question

Does motion continue through the measurement window, and what evidence can the
field engineer safely approve for transfer?
