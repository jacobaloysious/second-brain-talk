# Demo Workspaces and Presenter App

The talk uses one deep engineering demo and one short manager case.

## Presenter app

Path: `presenter-app/`

A local, deterministic chat experience for presenting both cases without
running terminal commands in front of the audience.

```bash
cd presenter-app
./run-local.sh
```

It has no database or live AI dependency. The audience follows three familiar
tabs:

- OnSite Fab Agent
- Fixer Agent
- Manager Assistant

Each tab has a different context boundary and human decision owner. The
OnSite chat can generate a real sanitized ZIP, the Fixer chat carries the case
through diagnosis, a visible code diff, a mock pull request, verification, and
governed knowledge promotion, and the Manager chat demonstrates continuity
without surveillance. The app is the
conference-facing story; the two workspaces below remain the executable
evidence and recovery source.

## Field issue

Path: `field-issue/`

A semiconductor tool reports intermittent fine-alignment failure. The onsite
field engineer and an onsite agent turn restricted evidence into a reviewed,
sanitized packet. Deterministic export and ingestion gates control the handoff
to Engineer, the offsite engineer. A verified result can propose reusable
learning, but component knowledge changes only after a separate human approval.
Six months later, a fresh case reuses the small approved diagnostic with
source and limitations.

```bash
cd field-issue
./scripts/test-demo.sh
./scripts/reset-demo.sh
```

Original terminal walkthrough: 17–19 minutes. Keep it for rehearsal and
technical Q&A; use the presenter app for the normal conference route.

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

Original terminal walkthrough: 5–7 minutes. Keep it for rehearsal and technical
Q&A; use the presenter app for the normal conference route.

Each workspace contains its own `DEMO-RUNBOOK.md`, `DEMO-PROMPTS.md`, and
`DEMO-EXPECTED-OUTPUTS.md`. Their golden recovery commands remain available for
an optional terminal walkthrough.
