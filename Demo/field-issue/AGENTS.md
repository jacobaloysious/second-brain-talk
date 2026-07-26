# Agent Instructions

You are operating a semiconductor field-issue debugging demo. The objective is
to help an assigned engineer diagnose and verify one issue without leaking
restricted fab evidence or polluting shared engineering knowledge.

Use only files in this workspace. Do not invent facts. Mark unsupported claims
as `needs_review`.

## Enforced Data Boundary

The workspace has two operational roots:

- `fab-side/` contains restricted raw evidence, local analysis, the field
  engineer's clarification response, and the reviewed export.
- `engineering-side/` contains only transferred sanitized packets, case memory,
  curated component knowledge, promotion proposals, and future-case retrieval.

Raw evidence in `fab-side/raw-logs/` must stay fab-side. Never copy raw log
lines, raw timestamps, customer identifiers, fab identifiers, lot identifiers,
wafer identifiers, tool identifiers, raw filenames, or exact machine values
into `fab-side/export/` or anything under `engineering-side/`.

Only the reviewed packet produced at
`fab-side/export/FI-2026-00421/debug-packet.md` may cross the boundary. The
boundary is executed in two explicit steps:

1. `scripts/export-reviewed-packet.sh` validates review metadata and scans for
   restricted/raw content before creating the outbox artifact.
2. `scripts/ingest-reviewed-packet.sh` independently validates the outbox
   artifact and its checksum before copying it to the engineering inbox.

The engineering importer refuses arbitrary source paths, unreviewed packets,
packets without approval metadata, checksum mismatches, and packets containing
restricted or raw evidence.

## Human + AI Review Checkpoint

The onsite agent first creates a **draft** packet and a targeted clarification
request. The onsite field engineer supplies only locally observed evidence and
reviews the updated packet.

The final local packet must include:

- `review_status: approved`
- `reviewed_by`
- `reviewed_at`
- `transfer_approved: true`
- `classification: sanitized`

Do not set these fields on the human's behalf. Until the field engineer has
reviewed the packet, export and engineering ingestion must fail.

## Memory Layers

### 1. Case memory

Every field report gets its own folder under
`engineering-side/field-issues/<case-id>/`. It contains issue-specific evidence,
actions, experiments, decisions, and resolution. Case actions must never be
stored in a global action list.

### 2. Component knowledge

`engineering-side/component-knowledge/` contains small, curated, reusable,
human-approved knowledge. Do not update it during triage or from a suspected
cause.

### 3. Promotion queue

After an issue is resolved, propose reusable learning in
`engineering-side/promotion-queue/<case-id>.md`. A named human reviewer must
approve the proposal before component knowledge changes.

## Case Workflow and Ownership

Move the case through:

`triage -> investigate -> experiment -> fix -> verify -> close`

Engineer is the assigned offsite engineer. She owns diagnosis, experiment design,
and verification. The onsite field engineer owns approved evidence capture and
physical intervention at the tool. Do not imply that Engineer physically replaces
hardware onsite.

For Engineer, always make clear:

- current case state and impact
- known facts versus hypotheses
- suspected components and confidence
- missing evidence
- next concrete investigation tasks
- owner and expected result for each task
- definition of done

## Processing Rules

When analyzing fab-side evidence:

- build a sanitized relative timeline
- identify repeated errors and suspicious patterns
- list subsystem candidates as hypotheses
- state confidence and missing evidence
- redact restricted identifiers and exact machine values
- produce targeted questions for the field engineer
- keep the packet in draft state until human review

When creating a case from an ingested packet:

- read only `engineering-side/inbox/<case-id>/debug-packet.md`
- create or update only `engineering-side/field-issues/<case-id>/`
- generate an assigned-engineer brief and case-specific actions
- search curated component knowledge for relevant validated guidance
- cite any prior knowledge used
- do not modify `engineering-side/component-knowledge/`

When closing a case:

- use only the human-reviewed result under
  `engineering-side/verified-input/<case-id>/`
- record the verified cause, onsite physical fix, and Engineer's verification
- propose reusable learning in `engineering-side/promotion-queue/`
- do not promote it automatically

When demonstrating future reuse:

- begin with a new case and only the new case's sanitized symptom plus approved
  component knowledge
- cite the promoted guidance and its source case
- state scope and uncertainty
- do not copy the original case's actions or raw evidence

## Deterministic Safety Checks

Run `./scripts/test-demo.sh` after changing the workflow. The test suite proves
that:

- unreviewed packets are rejected
- a rejected re-export revokes any older outbox artifact
- receipts bind packet ID, export version, and checksum
- restricted/raw evidence is rejected
- only the reviewed outbox path can be ingested
- checksum tampering is rejected
- reset is deterministic
- the verified resolution is absent during triage and staged only at the time jump
- shared knowledge is unchanged before approval
- the six-month-later brief cites approved knowledge without copying case detail
