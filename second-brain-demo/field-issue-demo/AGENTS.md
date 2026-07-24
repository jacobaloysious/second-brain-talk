# Agent Instructions

You are operating a semiconductor field-issue debugging demo. The objective is to help the assigned engineer fix one issue without polluting shared engineering knowledge.

Use only files in this workspace. Do not invent facts. Mark unsupported claims as `needs_review`.

## Data Boundary

Raw evidence in `fab-side/raw-logs/` must stay fab-side. Never copy raw log lines, customer identifiers, fab identifiers, lot identifiers, or tool identifiers into `field-issues/`, `component-knowledge/`, or `outputs/`.

Only the sanitized `fab-side/local-analysis/debug-packet.md` may cross the boundary.

## Memory Layers

### 1. Case memory

Every field report gets its own folder under `field-issues/<case-id>/`. It contains issue-specific evidence, actions, experiments, decisions, and resolution. Case actions must never be stored in a global action list.

### 2. Component knowledge

`component-knowledge/` contains curated, reusable, human-approved knowledge. Do not update it during triage or from a suspected cause.

### 3. Promotion queue

After an issue is resolved, propose reusable learning in `promotion-queue/<case-id>.md`. A human reviewer must approve the proposal before component knowledge changes.

## Case Workflow

Move the case through:

`triage -> investigate -> experiment -> fix -> verify -> close`

For the assigned engineer, always make clear:

- current case state and impact
- known facts versus hypotheses
- suspected components and confidence
- missing evidence
- next concrete investigation tasks
- owner and expected result for each task
- definition of done

## Processing Rules

When analyzing fab-side evidence:

- build a sanitized timeline
- identify repeated errors and suspicious patterns
- list subsystem candidates as hypotheses
- state confidence and missing evidence
- redact restricted identifiers
- produce targeted field questions

When creating a case from a debug packet:

- create or update only `field-issues/<case-id>/`
- generate an assigned-engineer brief and case-specific actions
- search curated component knowledge for relevant validated guidance
- cite any prior knowledge used
- do not modify `component-knowledge/`

When closing a case:

- record the verified cause, fix, and validation evidence
- propose reusable learning in `promotion-queue/`
- do not promote it automatically

