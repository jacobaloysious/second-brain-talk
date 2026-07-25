# Field-Issue Hero Demo Runbook

Target time: 17–19 minutes

Communication job:

> Show that a second brain is a governed memory pipeline: the onsite expert and
> onsite agent decide what may cross, Shweta turns it into the next experiment, and
> only verified human-approved learning helps a future engineer.

## Preflight

From `Demo/field-issue/`:

```bash
./scripts/reset-demo.sh
./scripts/test-demo.sh
./scripts/reset-demo.sh
```

Presentation setup:

- Use 150–175% editor/terminal zoom.
- Hide the file tree unless a path is the point.
- Keep these three baseline proof files ready in tabs:
  1. `fab-side/ONSITE-EVIDENCE-BOARD.md`
  2. `fab-side/local-analysis/debug-packet.md`
  3. `engineering-side/field-issues/FI-2026-00421/agent-context-bundle.md`
- Open these generated files only when their beat creates them:
  - after Prompt 4:
    `engineering-side/promotion-queue/FI-2026-00421.md`
  - after Prompt 5:
    `engineering-side/future-cases/FI-2027-00987/agent-brief.md`
- Keep `DEMO-EXPECTED-OUTPUTS.md` available as a presenter-only fallback.
- If any agent step exceeds 20 seconds, load its golden stage and continue.

Do not parade through every generated file. The audience needs one visible proof
per decision.

## Beat 1 — Ask the audience to diagnose first (1 minute)

Open `fab-side/ONSITE-EVIDENCE-BOARD.md`.

Ask:

> Based on this alone: stage path, vision path, or not enough evidence?

Take a quick hand vote. Do not reveal a cause.

Say:

> All of this is useful—and all of it is restricted. Offsite engineering cannot
> receive a prettier copy of the raw evidence.

## Beat 2 — Onsite agent drafts; onsite human answers (3 minutes)

Run Prompt 1 from `DEMO-PROMPTS.md`.

Show only these sections in the draft packet:

- hypotheses and confidence
- missing evidence
- field clarification

Attempt export:

```bash
./scripts/export-reviewed-packet.sh
```

Let the rejection remain visible:

> The packet looks useful, but usefulness is not permission.

Load or enter the onsite response:

```bash
./scripts/load-golden-stage.sh field-response
```

Run Prompt 2. Show the changed confidence, remaining uncertainty, and named
review metadata.

Say:

> The field engineer is not a courier. They are the onsite domain expert who
> answers the question and approves what crosses.

## Beat 3 — Make the boundary real (2 minutes)

Run:

```bash
./scripts/export-reviewed-packet.sh
./scripts/ingest-reviewed-packet.sh
```

Show the success lines and matching receipt checksum, not both receipt files in
full.

Optionally demonstrate the synthetic leak rejection from `DEMO-PROMPTS.md`.

Say:

> Export validates the human review and scans for raw evidence. Engineering
> validates it again and accepts only this outbox path. The boundary is a test,
> not a sentence in a prompt.

## Beat 4 — Shweta gets a decision workspace (4 minutes)

Run Prompt 3.

Show only `agent-context-bundle.md`, centred on:

- facts versus hypotheses
- the next discriminating experiment
- owner
- expected result for each branch
- stop condition

Say:

> Shweta is offsite. She diagnoses, designs the experiment, and verifies the
> result. The field engineer owns approved local capture and the physical tool
> work.

Open component knowledge briefly and point out that it is unchanged.

Ask:

> Should this hypothesis become shared component knowledge now?

The answer is no.

## Beat 5 — Time jump: fix, verify, propose (3 minutes)

Say:

> We now time-jump over the physical service and repeated validation. This file
> is a seeded human-reviewed result so the conference does not watch five tool
> runs.

Install and open the human-reviewed result only at this time jump:

```bash
./scripts/load-golden-stage.sh verified-result
```

Run Prompt 4.

Show the resolution in one sentence, then open the promotion proposal. Emphasize
scope, provenance, review owner, and supersession.

Attempt promotion before approval:

```bash
./scripts/promote-approved-knowledge.sh
```

Show the refusal. Then record the human decision:

```bash
./scripts/load-golden-stage.sh approval-record
./scripts/promote-approved-knowledge.sh
```

Say:

> Fixing a case does not automatically rewrite the organization. Promotion is a
> separate human decision.

## Beat 6 — Six months later: prove the memory earns its keep (3 minutes)

Start a visibly fresh agent session if practical. Run Prompt 5 and keep the
original case folder out of scope.

Show `agent-brief.md`:

- retrieved approved diagnostic
- source case and reviewer
- next action
- the warning not to assume the same physical cause

Say:

> The second engineer did not inherit the old case. They inherited one small,
> reviewed diagnostic path with provenance and limitations.

## Close (1 minute)

Return to the three decisions:

1. What may cross?
2. What is the next experiment?
3. What deserves reuse?

Closing line:

> Every issue creates traceable case history. Only verified, human-approved
> learning becomes shared memory—and that memory must help the next engineer.

## Recovery Lines

If the model is slow:

> The important behavior is the contract, not the typing animation. I will load
> the verified checkpoint and keep the decision moving.

If export fails unexpectedly:

> A failed transfer is the safe failure mode. The reviewed packet is still local;
> engineering has received nothing.

If the audience challenges enforcement:

> This repository demonstrates process separation, independent validation, and
> deterministic tests. A production deployment would additionally use separate
> credentials, hosts, network policy, audit storage, and your approved data-loss
> controls.
