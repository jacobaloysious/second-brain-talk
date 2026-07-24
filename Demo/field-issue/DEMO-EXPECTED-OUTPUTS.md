# Expected Demo Outputs

Use these shapes as a fallback if a live agent run is slow.

## After Prompt 1: Sanitized Debug Packet

The packet should say that fine alignment failed after X-axis movement, stage settling exceeded its threshold, vision confidence remained acceptable, and the primary hypothesis is stage settling with vision interaction as a secondary hypothesis. It must state confidence, missing evidence, redactions, and field questions without copying raw log lines.

## After Prompt 2: Assigned-Engineer Case

`field-issues/FI-2026-00421/case.md` should show:

- status: investigating
- assigned engineer: Priya Nair
- issue impact and sanitized summary
- definition of done

`investigation.md` should clearly separate:

- **Facts:** repeated fine-alignment failure, excessive settle time, acceptable vision score, and one stage timeout in the sanitized packet
- **Hypotheses:** stage instability primary; vision interaction secondary
- **Missing evidence:** longer approved vibration/settle window and maintenance history

`actions.md` should resemble:

| Status | Owner | Action | Expected result |
| --- | --- | --- | --- |
| Open | Priya Nair | Compare packet with curated stage diagnostics | Decide whether the approved stage procedure applies |
| Open | Field engineer | Capture an approved longer sanitized sensor window | Confirm whether vibration persists through alignment measurement |
| Open | Motion Controls | Review recent stage maintenance | Identify a mechanical change correlated with onset |

`agent-context-bundle.md` should give an agent the case goal, constraints, facts, hypotheses, relevant curated guidance, missing evidence, next tasks, and required output.

Component knowledge must remain unchanged after Prompt 2.

## After Prompt 3: Closed Case and Promotion Proposal

The case should record:

- verified cause: degraded stage damper causing X-axis vibration through the measurement window
- fix: replace the damper
- verification: five consecutive successful runs without the two observed errors
- status: closed

`promotion-queue/FI-2026-00421.md` should propose a reusable diagnostic finding with:

- the exact validated claim
- scope and limitations
- provenance to `FI-2026-00421`
- validation date
- component owner review requirement
- how to supersede or revoke the guidance

Component knowledge must still remain unchanged.

## After Prompt 4: Approved Shared Knowledge

Only the approved diagnostic guidance should be added under:

`component-knowledge/stage-controller/known-failure-modes.md`

The entry should link back to `FI-2026-00421`, include a reviewed date, and avoid copying case actions or raw evidence.
