# Second Brain for Engineering Teams

Conference talk, self-contained HTML slide deck, read-aloud speaker script, and
two executable demos.

## Authoritative artifacts

- `[SlideDeck]Second Brain for Engineering Teams.html` — the only slide deck;
  19 slides, self-contained, responsive 16:9 presentation
- `speaker-notes.md` — the 90-minute presenter route, stage cues, exact demo
  commands, and recovery paths
- `session.md` — current handoff and decisions for the next working session
- `Demo/field-issue/` — primary engineering hero demo
- `Demo/manager-collaboration/` — short manager-continuity demo
- `Demo/presenter-app/` — local three-agent chat experience for presenting both
  demos without a terminal

## Talk thesis

> A second brain is not a bigger knowledge dump. It is a governed
> transformation from scattered context to a safer next decision.

The recurring contract is:

```text
Capture -> Govern -> Surface
```

Agents prepare context. Humans decide what may cross a boundary, what becomes
durable memory, and what deserves reuse.

## Verify and reset the demos

```bash
./Demo/field-issue/scripts/test-demo.sh
./Demo/manager-collaboration/scripts/test-demo.sh

./Demo/field-issue/scripts/reset-demo.sh
./Demo/manager-collaboration/scripts/reset-demo.sh
```

Run the tests after changing either workflow. Reset both workspaces before a
rehearsal or live session.

## Run the presenter app

```bash
cd Demo/presenter-app
./run-local.sh
```

The presenter app has no database or live AI dependency. It presents the
workflow through three role-scoped chats: OnSite Fab Agent, Fixer Agent, and
Manager Assistant. Suggested actions keep the live path short; typed input is
matched to the same deterministic scenario. Use the sibling terminal
workspaces for implementation proof and technical Q&A. Its production build
also produces a single portable HTML fallback for presentation-day recovery.

## Presentation route

- Slides 1–12: problem, governed-memory model, two use cases, and success signal
- Slides 13–14: demo transition and the audience's watch contract
- Presenter app, OnSite + Fixer chats, approximately 12–14 minutes
- Presenter app, Manager Assistant chat, approximately 4–5 minutes
- Slide 15: 30-day pilot and closing synthesis
- Slide 19: Q&A
- Slides 16–18: appendix; use only when a question needs technical depth

Useful deck shortcuts:

- `D` — demo transition
- `C` — closing pilot
- `A` — appendix
- `Q` or `End` — Q&A

## What the demos prove

The field workflow keeps restricted evidence in `fab-side/`, admits only a
reviewed and independently validated packet to `engineering-side/`, produces a
tested mock pull request for a stage-settle software guard, refuses automatic
knowledge promotion, and proves safe later reuse.

The manager workflow classifies each fragment as **remember**, **keep uncertain**,
or **reject**. It preserves professional commitments while refusing speculative
people judgments.

The browser app is a deterministic chat simulation, not a claim that three
different foundation models are required. The tabs represent three roles with
different context and permissions. The repository scripts remain the
executable proof for artifact admission, validation, receipts, and human gates.
Production isolation also requires separate credentials, hosts, network
policy, audit storage, and approved data-loss controls.
