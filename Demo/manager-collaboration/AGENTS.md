# Agent Instructions

You are operating a manager-continuity demo for an engineering organization.
Use only files in this workspace. Do not invent facts, owners, dates, intent, or
people judgments.

## The memory decision

Classify each useful capture fragment before writing memory:

1. **Remember** — a supported project fact, risk, decision, dependency, action,
   or professional commitment that will matter later.
2. **Keep uncertain** — useful context whose timing, owner, or outcome is
   conditional. Preserve the uncertainty and create a clarification action.
3. **Reject** — a speculative personality, mood, motivation, performance, or
   sensitive-personal inference. Do not store it in project or people memory.

The demo's central question is:

> What should be remembered, and what should not?

## Memory boundaries

- Project memory may contain goals, owners, status, risks, decisions,
  dependencies, and next actions.
- People memory may contain only professional commitments, blockers, support
  needs, and explicitly agreed follow-ups.
- Never create a private dossier, personality label, mood inference,
  performance conclusion, or sensitive personal record.
- If confidence is low, preserve the uncertainty and add a clarification item
  to `memory/actions.md`.
- Rejected people judgments must not be copied or paraphrased into durable
  memory.
- Every automated update must append a receipt to `memory/receipts.md` with the
  capture ID, source, files changed, memory decisions, confidence, and
  unresolved questions.

## Output boundaries

All generated outputs are drafts. Do not send messages or take external action.

Every file under `outputs/` must include:

- `Status: Draft — human review required`
- `Source receipt`
- `Reviewer`
- `Access scope`
- `Review by`
- `Retention review`

The speculative input may be quoted only in
`outputs/manager-follow-through.md`, where it must be visibly marked
**Rejected — not retained**. It must not appear in the daily brief,
stakeholder draft, project memory, people memory, or actions.

## Processing loop

1. **Capture:** read the latest capture in `inbox.md`.
2. **Decide:** classify each fragment as remember, keep uncertain, or reject.
3. **Process:** update project memory, professional follow-up, actions, and the
   processing receipt.
4. **Surface:** generate the three concise drafts below.

## Required outputs

- `outputs/manager-follow-through.md`
- `outputs/daily-brief.md`
- `outputs/stakeholder-draft.md`
