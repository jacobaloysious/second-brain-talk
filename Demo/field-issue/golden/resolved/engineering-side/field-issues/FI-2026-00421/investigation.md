# Investigation — FI-2026-00421

Stage: complete
Lead: Engineer

## Facts Established

- The failure followed X-axis movement and prolonged settling.
- Vibration persisted through the measurement window.
- The approved diagnostic isolated the stage path.
- Physical inspection found a degraded stage damper.
- Engineering review found a position-only settle gate that did not require
  stable velocity or consecutive stable samples.
- The hardware replacement and reviewed software guard restored safe settling;
  five validation runs completed successfully.

## Hypotheses Disposition

| Hypothesis | Result | Reason |
| --- | --- | --- |
| Stage-settling instability | Verified | Controlled intervention restored settling and alignment |
| Stage-to-vision interaction | Not supported for this case | Alignment recovered without a vision change |
| Vision-only fault | Rejected for this case | No vision intervention was required |

## Experiment Record

| State | Experiment | Owner | Result |
| --- | --- | --- | --- |
| Complete | Approved stage-settling diagnostic | Engineer + Field Engineer | Stage path selected |
| Complete | Controlled mechanical inspection and intervention | Field Engineer | Degraded damper replaced onsite |
| Complete | Stage-settle gate review and motion-simulator reproduction | Engineer | Software guard weakness reproduced |
| Complete | Two-file mock PR `#1847`, review, and deployment | Engineer | Stable position and velocity required before alignment |
| Complete | Consecutive validation runs | Engineer reviewed | Five passed; closure criteria met |

## Shared-Knowledge Decision

The reviewed software guardrail and verified diagnostic sequence may be
reusable. They have been proposed for component-owner review and have not been
automatically promoted.
