# Field-Issue Demo Prompts

Run these from `Demo/field-issue/`. The scripts enforce transfer and promotion
boundaries; the agent does not bypass them.

## Prompt 1 — Local analysis creates a draft and one useful question

```text
Operate only inside fab-side/ and follow AGENTS.md.

Analyze fab-side/raw-logs/ locally. Create:
- fab-side/local-analysis/debug-packet.md
- fab-side/local-analysis/clarification-request.md

The packet must contain a sanitized summary, relative timeline, observed
patterns, subsystem hypotheses, confidence, missing evidence, redactions, and
one targeted question for the onsite field engineer.

Keep review_status pending_field_review, transfer_approved false, and
classification restricted_local_draft. Do not copy raw lines, raw timestamps,
identifiers, filenames, or exact machine values. Do not write anywhere under
engineering-side/.
```

If the live run is slow:

```bash
./scripts/load-golden-stage.sh draft
```

## Human action — Provide the onsite clarification

The field engineer reviews the question and records a local response. For the
rehearsed scenario:

```bash
./scripts/load-golden-stage.sh field-response
```

This response stays fab-side.

## Prompt 2 — AI incorporates the answer; human approval remains explicit

```text
Operate only inside fab-side/ and follow AGENTS.md.

Read the draft packet, clarification request, and
fab-side/field-input/clarification-response.md. Update the packet with the
sanitized clarification.

Only because the field response explicitly says the onsite field engineer
reviewed the wording and approves transfer, set:
- review_status: approved
- reviewed_by: "Onsite Field Engineer"
- reviewed_at: "2026-07-18T10:15:00Z"
- transfer_approved: true
- classification: sanitized

Preserve facts versus hypotheses and remaining uncertainty. Do not copy the
local response verbatim, exact values, raw evidence, or restricted identifiers.
Do not write anywhere under engineering-side/.
```

If the live run is slow:

```bash
./scripts/load-golden-stage.sh reviewed
```

## Boundary action — Export, then ingest

These are deterministic, independently validated steps:

```bash
./scripts/export-reviewed-packet.sh
./scripts/ingest-reviewed-packet.sh
```

An unreviewed packet, raw evidence, checksum mismatch, or arbitrary source path
must be rejected.

## Prompt 3 — Create Shweta's engineering case

```text
Operate only inside engineering-side/ and follow AGENTS.md.

Process only engineering-side/inbox/FI-2026-00421/debug-packet.md and its
ingestion receipt. Do not read fab-side/.

Update only engineering-side/field-issues/FI-2026-00421/:
- case.md
- evidence.md
- investigation.md
- actions.md
- agent-context-bundle.md

Prepare Shweta, the offsite engineer, to move from triage to investigation:
- separate facts from hypotheses
- cite relevant approved component knowledge without modifying it
- select the smallest discriminating experiment
- assign each action and expected result
- define the stop condition and evidence required to close
- make clear that the onsite field engineer owns physical intervention

Do not create global actions. Do not modify component knowledge or infer a
mechanical cause.
```

If the live run is slow:

```bash
./scripts/load-golden-stage.sh case
```

## Human action — Install the reviewed time-jump result

The final result is deliberately absent during triage. Install it only after
Shweta has created the investigation workspace and the presenter announces the
time jump:

```bash
./scripts/load-golden-stage.sh verified-result
```

## Prompt 4 — Record verified resolution and propose reusable learning

```text
Operate only inside engineering-side/ and follow AGENTS.md.

Use engineering-side/verified-input/FI-2026-00421/verified-resolution.md as a
human-reviewed experiment result for FI-2026-00421. Update the case to show:
- Shweta led offsite diagnosis, experiment design, and verification
- the onsite field engineer performed the approved physical damper replacement
- five consecutive validation runs met the closure criteria

Create engineering-side/promotion-queue/FI-2026-00421.md containing only the
verified reusable diagnostic proposal, scope, limitations, provenance, review
owner, validation date, and supersession guidance.

Do not modify engineering-side/component-knowledge/.
```

If the live run is slow:

```bash
./scripts/load-golden-stage.sh resolved
```

## Human action — Approve promotion

Do not tell the agent to “assume approval.” The component owner creates a
separate decision record:

```bash
./scripts/load-golden-stage.sh approval-record
./scripts/promote-approved-knowledge.sh
```

The promotion script refuses to run without the named human approval record.

## Prompt 5 — Six months later, prove reuse in a cold start

Start a new agent session, or clearly state that the original case folder is out
of scope.

```text
Operate only inside engineering-side/.

For new case FI-2027-00987, read only:
- engineering-side/future-cases/FI-2027-00987/sanitized-symptom.md
- engineering-side/component-knowledge/

Do not read FI-2026-00421 case memory.

Create engineering-side/future-cases/FI-2027-00987/agent-brief.md with:
- the approved diagnostic path retrieved
- provenance and scope
- the new engineer's next action
- uncertainty that remains
- what must not be copied or assumed from the original case

Show how approved memory shortens reconstruction without turning the previous
physical cause into a default conclusion.
```

If the live run is slow:

```bash
./scripts/load-golden-stage.sh reuse
```

## Optional Trust Failure — Demonstrate the boundary rejecting a leak

Use a copy of the packet during rehearsal, never a real identifier:

```text
Add the synthetic token LOT=DEMO-REJECT to the local packet, then attempt export.
```

Expected result:

```text
REJECTED: restricted or raw evidence pattern detected
```
