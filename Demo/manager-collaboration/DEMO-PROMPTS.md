# Demo Prompts

## Prompt 1: Decide, remember, and surface

```text
Process the latest capture in inbox.md using AGENTS.md.

For each capture fragment, decide whether to:
- remember it as supported professional context
- keep it explicitly uncertain and create a clarification action
- reject it as speculative people judgment

Then, in one pass:
1. update the relevant project memory
2. update only supported professional follow-up in people memory
3. update actions and append one processing receipt
4. generate:
   - outputs/manager-follow-through.md
   - outputs/daily-brief.md
   - outputs/stakeholder-draft.md

Preserve conditional language such as "may" and "if".
Do not invent dates, owners, evidence, intent, or personality conclusions.
Keep all outputs as drafts with the metadata required by AGENTS.md.
```

## Optional Prompt 2: Explain the boundary

```text
Review the latest receipt and outputs without changing files.
Explain, in four bullets:
1. what became project memory
2. what became a professional follow-up
3. what remained uncertain
4. what was rejected and why
```
