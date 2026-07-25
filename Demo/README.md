# Demo Workspaces

The talk uses one deep engineering demo and one short manager case.

## Field issue

Path: `field-issue/`

A semiconductor tool reports intermittent fine-alignment failure. The onsite
field engineer and an onsite agent turn restricted evidence into a reviewed,
sanitized packet. Deterministic export and ingestion gates control the handoff
to Shweta, the offsite engineer. A verified result can propose reusable
learning, but component knowledge changes only after a separate human approval.
Six months later, a fresh case reuses the small approved diagnostic with
provenance and limitations.

```bash
cd field-issue
./scripts/test-demo.sh
./scripts/reset-demo.sh
```

Target live time: 17–19 minutes.

## Manager collaboration

Path: `manager-collaboration/`

A messy post-standup capture is classified into:

- supported context to remember
- conditional context to keep uncertain
- speculative people judgment to reject

One processing pass updates project and professional follow-through memory,
records a receipt, and creates three human-reviewable drafts:

- manager follow-through
- daily brief
- stakeholder draft

```bash
cd manager-collaboration
./scripts/test-demo.sh
./scripts/reset-demo.sh
```

Target live time: 5–7 minutes.

Each workspace contains its own `DEMO-RUNBOOK.md`, `DEMO-PROMPTS.md`, and
`DEMO-EXPECTED-OUTPUTS.md`. Use the golden recovery command if a live agent
takes more than 20 seconds.
