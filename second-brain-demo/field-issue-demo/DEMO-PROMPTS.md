# Demo Prompts

Run these from the workspace root with Codex or another coding agent.

## Prompt 1: Analyze locally

```text
Analyze fab-side/raw-logs locally using AGENTS.md.
Do not copy raw logs outside fab-side.
Create fab-side/local-analysis/debug-packet.md containing a sanitized summary,
timeline, observed patterns, subsystem hypotheses, confidence, missing evidence,
redactions, and targeted questions for the field engineer.
```

## Prompt 2: Create the engineering case

```text
Process fab-side/local-analysis/debug-packet.md as case FI-2026-00421.
Update only field-issues/FI-2026-00421/.

Prepare the assigned engineer to move the case from triage to investigation:
- separate facts from hypotheses
- identify suspected components and confidence
- consult relevant curated component-knowledge without modifying it
- define missing evidence
- create concrete case-specific actions with owner and expected result
- define what must be true to close the issue
- produce an agent-context-bundle.md

Do not create or update a global actions file.
Do not promote hypotheses into component knowledge.
```

## Prompt 3: Record a verified resolution

```text
Use the verified experiment result in seed/verified-resolution.md to close
case FI-2026-00421.

Update the case resolution, evidence, investigation status, and actions.
Then create promotion-queue/FI-2026-00421.md containing only the reusable,
verified learning proposed for shared component knowledge, with provenance,
review owner, validation date, and supersession guidance.

Do not update component-knowledge directly.
```

## Prompt 4: Human-approved promotion

```text
Assume a component owner has approved promotion-queue/FI-2026-00421.md.
Promote only the approved reusable finding into the appropriate file under
component-knowledge/. Include provenance back to FI-2026-00421 and a reviewed date.
Mark the proposal approved. Do not copy issue-specific actions into component knowledge.
```

## Optional: Reject vague evidence

```text
Process this note for FI-2026-00421:
"The stage thing happened again after the usual step."

Do not change facts, component knowledge, or the suspected root cause.
Add a needs_review item to the case with a precise clarification question.
```

