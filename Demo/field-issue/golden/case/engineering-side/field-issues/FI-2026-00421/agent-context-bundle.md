# Agent Context Bundle — FI-2026-00421

## Mission

Help Engineer identify the smallest discriminating experiment and verify the
returned sanitized result. Do not diagnose from raw fab evidence; none is
available in engineering.

## Assignment

- Engineer: offsite diagnosis, experiment design, and verification.
- Onsite field engineer: approved capture and physical intervention.
- Motion Controls: component-specific review.

## Facts

- Fine alignment failure repeats after X-axis movement.
- Prolonged settling precedes the failure.
- Vision confidence remains acceptable.
- Onsite reviewed observation confirms motion through measurement.

## Hypotheses

- Stage settling instability: primary, moderate-to-high confidence.
- Stage-to-vision interaction: secondary, low confidence.
- Mechanical cause: not established.

## Approved Knowledge Available

- Use the approved stage-settling diagnostic for the stage-timeout condition.
- Do not treat acceptable vision confidence as proof of vision health or fault.

## Required Next Output

Return:

1. the next experiment
2. owner
3. expected result for each branch
4. stop condition
5. evidence required to close
6. claims still marked `needs_review`

## Constraints

- Do not request or reproduce raw fab evidence.
- Do not update shared component knowledge.
- Do not imply that Engineer performs physical service onsite.
- Keep all actions inside this case.
