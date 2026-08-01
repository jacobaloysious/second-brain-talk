# Resolution — FI-2026-00421

Status: verified and closed
Verification owner: Engineer
Physical intervention owner: Onsite field engineer

## Verified Cause

A degraded stage damper allowed X-axis vibration to persist through the
fine-alignment measurement window.

## Fix

The onsite field engineer replaced the degraded damper using the approved
physical-service procedure.

Engineer owned the two-file change in mock PR `#1847`. The reviewed guard now
requires both stable position and stable velocity for a consecutive sample
window before alignment can start, and returns `stage_not_stable` while motion
remains outside that guardrail.

## Verification

Engineer reviewed the returned sanitized results:

- stage settling returned within the approved limit
- type checks, unit tests, and the motion-simulator regression passed
- five consecutive validation runs completed successfully
- neither reported error condition recurred

## Scope

The physical cause is verified only for `FI-2026-00421`. Reuse of the software
guardrail or diagnostic outside this case requires the separate
component-knowledge review recorded in the promotion queue.
