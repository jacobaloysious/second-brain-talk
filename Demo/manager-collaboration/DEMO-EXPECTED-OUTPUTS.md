# Expected Demo Outputs

The live run should produce one compact decision view, two usable drafts, and a
traceable memory update.

Golden snapshots are stored under `golden/`.

## Memory decisions

| Capture fragment | Decision | Durable destination |
| --- | --- | --- |
| Rollout risk is medium because QA login is failing | Remember | Project risk |
| Rahul may unblock by Thursday if credentials arrive | Keep uncertain | Project dependency plus clarification action |
| The manager promised Priya a staffing review | Remember | Professional follow-up plus manager action |
| “Priya seemed off today” | Reject | No project, people, or action memory |

The speculative people judgment may appear only in
`outputs/manager-follow-through.md`, where it is visibly marked
`Rejected — not retained`.

## Updated memory

The processed state must include:

- project risk set to medium
- QA login failure as the supported blocker
- Rahul's timing preserved as conditional, not a commitment
- the manager's staffing-review promise as the only Priya-specific follow-up
- clarification actions for credential availability and unresolved dates
- one processing receipt with source, files changed, decisions, confidence, and
  unresolved questions

## Required output metadata

Each output must contain:

- `Status: Draft — human review required`
- `Source receipt: MC-2026-07-22-01`
- `Reviewer: Manager`
- an explicit access scope
- `Review by: 2026-07-29`
- `Retention review: 2026-08-22`

## Required outputs

### `outputs/manager-follow-through.md`

A single decision table showing remember, keep uncertain, and reject, followed
by the manager's three concrete follow-through items.

### `outputs/daily-brief.md`

A concise internal brief containing the medium rollout risk, the conditional
credential dependency, the stakeholder draft review, the staffing commitment,
and unresolved timing questions.

### `outputs/stakeholder-draft.md`

A short draft for Maya that says the risk is medium, names the QA-login blocker,
preserves the conditional nature of Thursday, and promises a further update
only after credential availability and revised timing are confirmed.

## Deterministic fallback

```bash
./scripts/use-golden.sh
./scripts/validate-demo.sh --final
```

## Full automated test

```bash
./scripts/test-demo.sh
```
