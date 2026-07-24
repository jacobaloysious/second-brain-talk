# Demo Runbook

## Setup

Open the workspace and show four areas:

1. `fab-side/raw-logs/` — restricted evidence
2. `fab-side/local-analysis/debug-packet.md` — sanitized boundary artifact
3. `field-issues/FI-2026-00421/` — one assigned engineer's case workspace
4. `component-knowledge/` — curated knowledge, deliberately unchanged during triage

## Move 1: Evidence stays onsite

Show the raw log, sensor snapshot, and operator note. Run Prompt 1.

Say:

> Raw logs stay in the fab. The local model moves a sanitized debug packet—not the evidence boundary itself.

## Move 2: Create a case, not global memory

Run Prompt 2. Show:

- `field-issues/FI-2026-00421/case.md`
- `investigation.md`
- `actions.md`
- `agent-context-bundle.md`

Emphasize that the assigned engineer now knows what to do next, who owns each task, what result is expected, and what “done” means.

Say:

> Every issue creates an isolated case. Hundreds of historical cases can coexist without turning every hypothesis into global truth.

## Move 3: Show that shared knowledge did not change

Open `component-knowledge/stage-controller/known-failure-modes.md`.

Say:

> Suspected cause is not shared knowledge. During triage, the AI may retrieve validated guidance, but it cannot rewrite it.

## Move 4: Resolve and propose learning

Run Prompt 3 using the supplied verified experiment result. Show:

- the completed case resolution
- closed case actions
- `promotion-queue/FI-2026-00421.md`

Say:

> Fixing and verifying the issue closes the case. Reusable learning enters a review queue with provenance.

## Optional Move 5: Human-reviewed promotion

Run Prompt 4. Show the small, approved addition to component knowledge.

Say:

> Only verified learning becomes shared memory. It remains traceable to the issue and can later be superseded.

## Closing line

> Every issue creates a case. Only verified learning becomes shared memory.

