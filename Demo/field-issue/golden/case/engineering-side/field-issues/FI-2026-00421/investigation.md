# Investigation — FI-2026-00421

Stage: investigate
Lead: Engineer

## Known Facts

- Failure repeats after X-axis movement.
- Settling is outside the configured limit before failed alignment.
- Vision confidence is acceptable during the reported failures.
- Onsite reviewed observation confirms motion through the measurement window.

## Hypotheses

1. **Stage-settling instability — primary, moderate-to-high confidence.**
2. **Stage-to-vision interaction — secondary, low confidence.**
3. **Vision-only fault — needs_review, low confidence.**

No mechanical root cause is established yet.

## Curated Guidance Consulted

- `engineering-side/component-knowledge/stage-controller/known-failure-modes.md`
  validates the approved stage-settling diagnostic for `STAGE-119`.
- `engineering-side/component-knowledge/vision-alignment/known-failure-modes.md`
  warns that acceptable confidence alone does not prove vision health or fault.

The curated guidance is retrieved, not modified.

## Next Discriminating Experiment

Engineer will use the approved stage-settling diagnostic and define pass/fail
criteria for a controlled onsite mechanical inspection and repeat validation.

Expected distinction:

- If settling normalizes after an approved stage-path intervention and alignment
  recovers, the stage path is supported.
- If settling normalizes but alignment still fails, investigate the
  stage-to-vision interaction before changing vision configuration.

## Missing Evidence

- Reviewed stage maintenance and mechanical inspection result.
- Sanitized pre/post diagnostic result.
- Agreed consecutive-run verification result.

## Experiments

| State | Experiment | Owner | Decision enabled |
| --- | --- | --- | --- |
| Planned | Approved stage-settling diagnostic | Engineer + Field Engineer | Select stage path or retain cross-subsystem hypothesis |
| Planned | Controlled mechanical inspection | Field Engineer | Confirm or reject a physical stage cause |
| Planned | Consecutive validation runs | Engineer reviews returned result | Verify recovery and close or continue |
