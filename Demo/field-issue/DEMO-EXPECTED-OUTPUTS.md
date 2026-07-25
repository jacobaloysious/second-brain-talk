# Expected Outputs and Golden Fallbacks

Every major proof point has a deterministic snapshot under `golden/`. Use
`./scripts/load-golden-stage.sh <stage>` if a live agent takes more than
20 seconds or produces a visually noisy result.

## 1. Draft packet — `draft`

The onsite agent should produce:

- a relative event sequence, not raw timestamps
- facts separated from hypotheses
- stage settling as the primary hypothesis
- stage-to-vision interaction as a weaker hypothesis
- explicit confidence and missing evidence
- a targeted field question about motion through the measurement window
- `review_status: pending_field_review`
- `transfer_approved: false`

`./scripts/export-reviewed-packet.sh` must reject this state.

## 2. Human clarification — `field-response`

The onsite field engineer confirms, using an approved local observation, that
motion persists through measurement. Maintenance history remains unresolved.
The response explicitly records review and approval of the sanitized wording.
The response itself remains fab-side.

## 3. Reviewed packet — `reviewed`

The updated packet should contain:

- the new reviewed observation
- moderate-to-high confidence in the stage-settling path
- a mechanical cause still marked unverified
- named reviewer and review time
- approved transfer metadata
- no raw lines, identifiers, absolute event timestamps, exact machine values, or
  raw filenames

The validator, exporter, and independent engineering importer must all pass.
The two receipts must carry the same SHA-256 checksum.

## 4. Assigned-engineer case — `case`

The case must identify Shweta as the offsite engineer and distinguish:

- Shweta: diagnosis, experiment design, and verification
- onsite field engineer: approved capture and physical intervention
- Motion Controls: component-specific review

The key visible output is not a summary. It is a discriminating experiment with
owner, expected outcome for each branch, stop condition, and closure evidence.
Shared component knowledge must remain byte-for-byte unchanged.

## 5. Human-reviewed time jump — `verified-result`

The verified result must not exist after reset or during triage. Load it only
immediately before Prompt 4:

```bash
./scripts/load-golden-stage.sh verified-result
```

The staged file records the human-reviewed field experiment, onsite physical
intervention, and Shweta's returned-evidence verification.

## 6. Resolved case and proposal — `resolved`

The verified record should say:

- a degraded stage damper was supported by the controlled result
- the onsite field engineer replaced it under the approved procedure
- Shweta reviewed the sanitized returned evidence
- five consecutive runs passed the closure criteria

The promotion proposal must include a reusable diagnostic claim, limitations,
source case, validation owner, component reviewer, and supersession path.
Component knowledge must still remain unchanged.

## 7. Human promotion decision — `approval-record`

The decision record must name:

- the exact proposal
- the decision
- the human approver
- approval timestamp

`./scripts/promote-approved-knowledge.sh` must refuse promotion without this
record. After approval, the promoted entry must remain small, scoped, and
traceable to `FI-2026-00421`.

## 8. Six-month-later cold start — `reuse`

The new brief should:

- retrieve only approved component guidance
- cite its source case and human reviewer
- recommend the approved diagnostic path
- retain uncertainty about the new case's physical cause
- refuse to copy the original actions or assume another damper failure

This is the business payoff: a new engineer begins with reviewed rationale and
limitations rather than reconstructing the old investigation.

## Automated Proof

Run:

```bash
./scripts/test-demo.sh
```

The suite validates reset reproducibility, review gating, raw-evidence rejection,
export/import path enforcement, checksum integrity, no premature knowledge
mutation, human-approved promotion, and safe future reuse.
