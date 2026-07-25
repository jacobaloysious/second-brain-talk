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

## Presentation route

- Slides 1–12: problem, governed-memory model, two use cases, and success signal
- Slides 13–14: demo transition and the audience's watch contract
- Live demo 1: field issue, 17–19 minutes
- Live demo 2: manager continuity, 5–7 minutes
- Slide 15: 30-day pilot and closing synthesis
- Slide 19: Q&A
- Slides 16–18: appendix; use only when a question needs technical depth

Useful deck shortcuts:

- `D` — demo transition
- `C` — closing pilot
- `A` — appendix
- `Q` or `End` — Q&A

## What the demos prove

The field demo keeps restricted evidence in `fab-side/`, admits only a reviewed
and independently validated packet to `engineering-side/`, refuses automatic
knowledge promotion, and proves safe later reuse.

The manager demo classifies each fragment as **remember**, **keep uncertain**,
or **reject**. It preserves professional commitments while refusing speculative
people judgments.

The repository demonstrates artifact admission, validation, receipts, and
human gates. Production isolation also requires separate credentials, hosts,
network policy, audit storage, and approved data-loss controls.
