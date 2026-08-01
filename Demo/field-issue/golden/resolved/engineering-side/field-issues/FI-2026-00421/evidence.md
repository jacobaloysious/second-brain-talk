# Sanitized Evidence — FI-2026-00421

## Accepted Sources

- Reviewed inbox packet and ingestion receipt
- Human-reviewed experiment result in
  `engineering-side/verified-input/FI-2026-00421/verified-resolution.md`
- Raw fab evidence access: none

## Established Triage Facts

- Fine alignment failure repeated after X-axis movement.
- Prolonged settling preceded the failure.
- Vision confidence remained acceptable.
- Onsite clarification confirmed motion through the measurement window.

## Verified Resolution Evidence

- The approved diagnostic isolated persistent X-axis vibration during measurement.
- An onsite physical inspection identified a degraded stage damper.
- The onsite field engineer replaced the damper using the approved procedure.
- Returned sanitized results showed settling within the approved limit.
- Engineer verified five consecutive successful validation runs without the two
  reported error conditions.

## Engineering Code and Test Evidence

- Code review found that the settle gate could accept one in-position sample
  without checking velocity or a consecutive stability window.
- The motion simulator reproduced alignment starting while velocity remained
  unstable.
- Mock PR `#1847` records a two-file runtime and regression-test patch in
  `software-change.md`.
- Type checks, unit tests, the motion-simulator regression, and human code review
  passed before the guard was deployed.

## Evidence Boundary

No raw line, absolute event timestamp, restricted identifier, raw filename, or
exact machine value is stored in this case.
