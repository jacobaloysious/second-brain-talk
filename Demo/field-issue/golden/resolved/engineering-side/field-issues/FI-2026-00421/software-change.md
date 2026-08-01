# Software Change — FI-2026-00421

Status: reviewed, merged, deployed, and verified
Artifact type: deterministic mock pull-request record
Repository: `motion-control/stage-runtime`
Pull request: `#1847`
Title: Require stable velocity before starting alignment
Author and owner: Engineer
Human review: completed

## Engineering Finding

The stage-settle gate accepted one in-position sample without checking velocity
or requiring consecutive stable samples. The motion simulator reproduced
alignment starting while velocity was still unstable.

## Two-File Patch

### `src/motion/stage-settle-gate.ts`

- Require both `positionStable` and `velocityStable` before accepting a sample.
- Reset the stable-sample counter when either condition fails.
- Require `requiredStableSamples` consecutive stable samples.
- Return `stage_not_stable` while motion remains outside the guardrail.

### `test/motion/stage-settle-gate.test.ts`

- Reject an in-position sample while velocity remains unstable.
- Require the complete consecutive stable-sample window before reporting settled.

## Review and Test Evidence

- Type check: passed.
- Unit tests: passed.
- Motion simulator regression: passed.
- Human code review: completed before merge.
- Canary deployment monitored the stage-not-stable rate and alignment success.

## Verification Boundary

The onsite field engineer owned the physical damper replacement. Engineer owned
the software change, review, deployment decision, and returned-evidence
verification. Five consecutive validation runs passed with the restored
hardware and the software guard active.

This file is a deterministic mock PR artifact for the demo. It does not claim
that a remote repository was modified by the demo scripts.
