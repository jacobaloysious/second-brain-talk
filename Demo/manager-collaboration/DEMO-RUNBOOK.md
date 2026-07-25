# Demo Runbook

Target time: **5–7 minutes**.

## Before the session

```bash
./scripts/reset-demo.sh
./scripts/validate-demo.sh --initial
```

Keep these files open:

- `inbox.md`
- `outputs/manager-follow-through.md`
- `outputs/daily-brief.md`
- `outputs/stakeholder-draft.md`
- `memory/receipts.md`

## Move 1: Ask the room

Open `inbox.md`.

Ask:

> Which lines should become durable memory, which should remain uncertain, and
> which should be rejected?

Use a show of hands for the final line before revealing the policy.

## Move 2: Run one prompt

Run Prompt 1 from `DEMO-PROMPTS.md`.

While it runs, say:

> The useful part is not summarization. It is the memory decision: facts may
> persist, uncertainty must stay uncertain, and speculative people judgment
> does not become a dossier.

## Move 3: Show one compact view

Open `outputs/manager-follow-through.md`.

Walk down the four decisions:

1. rollout risk — remember
2. Rahul's conditional timing — keep uncertain
3. the manager's staffing promise — remember as professional follow-through
4. “Priya seemed off today” — rejected and not retained

Then show only:

- `outputs/daily-brief.md`
- `outputs/stakeholder-draft.md`

Point to the draft metadata before reading the content.

## Move 4: Prove traceability

Open `memory/receipts.md`.

Say:

> The receipt tells us what source was processed, what changed, what was
> rejected, the confidence, and what still needs clarification.

Do not open every memory file during the live run unless the audience asks.

## Recovery

If the live agent is slow or produces an unusable result:

```bash
./scripts/use-golden.sh
./scripts/validate-demo.sh --final
```

The golden state contains the complete expected memory and outputs.

Closing line:

> Useful professional context survives. Uncertainty stays visible. Speculative
> judgment does not become memory.
