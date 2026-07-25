# Field Issue — Governed Engineering Memory Demo

A semiconductor tool reports intermittent fine-alignment failure. Restricted
evidence stays inside `fab-side/`. An onsite agent and the field engineer
co-create and review a sanitized packet. Only that validated export is accepted
by `engineering-side/`.

Shweta, the offsite assigned engineer, uses the packet and approved component
knowledge to define the next discriminating experiment. The onsite field
engineer performs approved local capture and any physical intervention. Closing
the case creates a promotion proposal; it does not automatically rewrite shared
knowledge.

Six months later, a new engineer retrieves the small approved diagnostic—with
provenance and limitations—without inheriting the original case or raw evidence.

## Operational Roots

```text
fab-side/
  raw-logs/              restricted
  local-analysis/        onsite-agent draft and reviewed packet
  field-input/           onsite clarification
  export/                only reviewed transfer artifact

engineering-side/
  inbox/                 independently validated packet
  verified-input/        reviewed experiment return
  field-issues/          isolated case memory
  component-knowledge/   curated shared guidance
  promotion-queue/       proposed learning
  promotion-approvals/   explicit human decision
  future-cases/          cold-start reuse proof
```

## Quick Start

```bash
./scripts/reset-demo.sh
./scripts/test-demo.sh
./scripts/reset-demo.sh
```

Then follow:

- `DEMO-RUNBOOK.md` for the presentation sequence
- `DEMO-PROMPTS.md` for live agent prompts
- `DEMO-EXPECTED-OUTPUTS.md` for deterministic golden fallbacks

## Enforced Boundaries

- `export-reviewed-packet.sh` rejects unreviewed or raw-bearing packets.
- `ingest-reviewed-packet.sh` accepts only the reviewed outbox artifact and
  independently validates metadata and checksum.
- `promote-approved-knowledge.sh` rejects promotion without a named human
  approval record.
- `test-demo.sh` proves the rejection and safe-reuse paths.

Key lines:

> The boundary is a test, not a sentence in a prompt.

> Every issue creates traceable case history. Only verified, human-approved
> learning becomes shared memory.
