# Manager Collaboration — Governed Continuity Demo

This short demo asks one question:

> What should be remembered, what should remain uncertain, and what should be
> rejected?

The fictional post-standup capture contains a supported rollout risk, Rahul's
conditional dependency, the manager's staffing-review promise to Priya, and one
speculative people judgment. The workflow:

1. classifies every fragment before writing memory
2. preserves conditional language and creates clarification actions
3. rejects speculative people judgment from durable memory
4. records a processing receipt
5. produces three drafts for human review:
   - `outputs/manager-follow-through.md`
   - `outputs/daily-brief.md`
   - `outputs/stakeholder-draft.md`

All people, projects, and details are fictional. No draft is sent externally.

## Verify and reset

```bash
./scripts/test-demo.sh
./scripts/reset-demo.sh
```

## Present

Follow `DEMO-RUNBOOK.md` and use the single prompt in `DEMO-PROMPTS.md`.
If the live result is slow or noisy:

```bash
./scripts/use-golden.sh
./scripts/validate-demo.sh --final
```

Closing line:

> Useful professional context survives. Uncertainty stays visible.
> Speculative judgment does not become memory.
