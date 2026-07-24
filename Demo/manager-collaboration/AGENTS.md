# Agent Instructions

Use only files in this workspace. Do not invent facts.

## Memory boundaries

- Project memory may contain goals, owners, status, risks, decisions, dependencies, and next actions.
- People memory may contain professional commitments, blockers, support needs, and agreed follow-ups.
- Never add speculative personality labels, sensitive personal details, performance conclusions, or private dossiers.
- If confidence is low, add a clarification item to `memory/actions.md` instead of guessing.
- Every automated update must append a receipt to `memory/receipts.md` with source, files changed, confidence, and unresolved questions.

## Processing loop

1. **Capture:** read the latest entry in `inbox.md`.
2. **Process:** update the relevant project, people, actions, and receipts files.
3. **Surface:** generate concise operational outputs under `outputs/`.

## Required outputs

- `outputs/daily-brief.md`
- `outputs/one-on-one-prep-priya.md`
- `outputs/stakeholder-update.md`
- `outputs/delegation-context.md`

