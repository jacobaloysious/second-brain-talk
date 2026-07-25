# Session Handoff — Second Brain for Engineering Teams

Updated: 25 July 2026
Workspace: `/Users/jacobaloysious/Desktop/secondbrain`
Repository: `https://github.com/jacobaloysious/second-brain-talk.git`
Branch: `main`

This file is the starting point for a future Codex session. Read it first, then
open the artifact or runbook relevant to the requested change.

## Current objective

Prepare a fresh, casual, technically credible 90-minute conference session for
an engineering organization:

- approximately 80% engineers
- approximately 20% engineering managers and leaders
- large-room readability for 1,000+ attendees
- useful on a projector and on a smaller laptop screen
- one deep engineering demo and one short manager demo

The audience should leave with one thesis:

> A second brain is not a bigger knowledge dump. It is a governed
> transformation from scattered context to a safer next decision.

## Presenter

Jacob Aloysious:

- based in Singapore and at Meta for about five years
- born and raised in Chennai
- previously at KLA Chennai for about six years
- worked in the eBeam division and the eCougar / Machine Control team
- married, with a 12-year-old daughter

The delivery should be conversational, confident, and lightly funny. Avoid
forced jokes, exaggerated AI claims, and language that sounds like a product
pitch.

## Authoritative artifacts

- `[SlideDeck]Second Brain for Engineering Teams.html`
  - the only slide deck
  - 19 slides
  - self-contained HTML; no PPTX is in use
  - contenteditable text and browser-local autosave
  - 1600×900 design that scales to the available viewport
- `speaker-notes.md`
  - read-aloud script
  - 90-minute route
  - exact demo commands, stage cues, and recovery lines
- `Demo/field-issue/`
  - primary, 17–19 minute engineering demo
- `Demo/manager-collaboration/`
  - secondary, 5–7 minute manager demo

## Deck route

### Concept and use cases

1. **Second Brain for Engineering Teams**
   Preserve context, respect boundaries, improve the next decision.
2. **Memory Tax**
   Reconstruction delays judgment.
3. **Different roles lose the same thing: decision context**
   Engineers, managers, and leaders have different questions but the same
   continuity problem.
4. **Storage preserves information. It does not maintain trust.**
   Contrast passive storage with governed memory.
5. **Start where context first leaks**
   Field issue and post-standup capture.
6. **The second brain is the governed transformation**
   Capture → Govern → Surface.
7. **Agents prepare context. Humans own the outcome.**
   Preparation is automated; accountability is not.
8. **Trust is an operating contract**
   Provenance, clarification, correction, and tests.
9. **Case #1: Field issue — how context crosses the boundary**
   Onsite human + agent, reviewed packet, validator, offsite diagnosis.
10. **Not every case becomes component knowledge**
    Every case stays traceable; only verified, approved learning is promoted.
11. **Case #2: Continuity without surveillance**
    Professional follow-through without a people dossier.
12. **A second brain must improve decisions—not just create files**
    Measure the next grounded decision, recovery time, late clarification, and
    governed reuse.

### Demo and close

13. **LIVE DEMOS**
14. **What to watch in the two demos**
15. **Start with one context leak—and one success signal**
16. **Appendix: the memory contract is portable**
17. **Appendix: the field boundary is separate and testable**
18. **Appendix: test the memory contract like software**
19. **Q&A / Thank you**

The normal route is Slides 1–14, both live demos, Slide 15, then Slide 19.
Slides 16–18 are appendix material only.

Keyboard shortcuts:

- `D` — Slide 13
- `C` — Slide 15
- `A` — Slide 16
- `Q` or `End` — Slide 19
- arrow keys, Page Up/Down, or Space — navigate

## 90-minute timing

Target prepared content: about 72–75 minutes.

| Segment | Target |
| --- | ---: |
| Introduction and audience pulse | 5 min |
| Problem and model, Slides 2–8 | 17 min |
| Use cases and success signals, Slides 9–12 | 8 min |
| Demo setup, Slides 13–14 | 2 min |
| Field-issue hero demo | 17–19 min |
| Manager-continuity demo | 5–7 min |
| Synthesis and 30-day pilot, Slide 15 | 4–5 min |
| Q&A, Slide 19 | 12 min |
| Contingency / final thesis | 3–6 min |

Do not fill the entire 90 minutes with scripted speech. Preserve room for
audience answers, live-demo variance, and Q&A.

## Demo 1 — Field issue

Read first:

- `Demo/field-issue/AGENTS.md`
- `Demo/field-issue/DEMO-RUNBOOK.md`
- `Demo/field-issue/DEMO-PROMPTS.md`
- `Demo/field-issue/DEMO-EXPECTED-OUTPUTS.md`

### Story

1. Restricted machine evidence stays under `fab-side/`.
2. An onsite agent drafts a sanitized packet and asks one useful question.
3. The onsite field engineer answers and explicitly reviews the wording.
4. Export and engineering ingestion independently validate the packet.
5. Shweta, the offsite engineer, receives a decision workspace and defines the
   smallest discriminating experiment.
6. A later human-reviewed result closes the case and creates a promotion
   proposal.
7. Component knowledge does not change until a named human approval exists.
8. Six months later, a new case reuses only the approved diagnostic, provenance,
   scope, and limitations.

### Ownership

- Shweta: offsite diagnosis, experiment design, and verification
- onsite field engineer: approved evidence capture and physical intervention
- component owner/reviewer: reusable-knowledge approval

Never imply that Shweta physically replaces hardware onsite.

### Boundary rule

Do not copy raw log lines, raw timestamps, restricted identifiers, raw
filenames, or exact machine values into the packet or engineering memory.

The repository enforces artifact admission, independent validation, checksums,
receipts, and human approval gates. It does **not** claim complete production
host isolation. Production also needs separate credentials, hosts, network
policy, audit storage, and approved data-loss controls.

### Verify and reset

```bash
cd Demo/field-issue
./scripts/test-demo.sh
./scripts/reset-demo.sh
```

The test suite currently contains 17 checks, including:

- unreviewed and raw-bearing export rejection
- stale-outbox revocation after a rejected re-export
- packet ID, export version, and checksum binding
- arbitrary-source and tamper rejection
- no verified answer during initial triage
- no automatic component-knowledge promotion
- required human approval
- safe six-month reuse

If a live agent exceeds 20 seconds, use the matching
`./scripts/load-golden-stage.sh <stage>` command from the runbook.

## Demo 2 — Manager continuity

Read first:

- `Demo/manager-collaboration/AGENTS.md`
- `Demo/manager-collaboration/DEMO-RUNBOOK.md`
- `Demo/manager-collaboration/DEMO-PROMPTS.md`
- `Demo/manager-collaboration/DEMO-EXPECTED-OUTPUTS.md`

### Story

Ask the audience to classify each fragment:

1. **Remember** supported project or professional context.
2. **Keep uncertain** conditional context and create a clarification action.
3. **Reject** speculative personality, mood, motivation, or performance
   inference.

The example contains:

- QA login puts rollout risk at medium
- Rahul may unblock by Thursday if credentials arrive
- the manager promised Priya a staffing review
- “Priya seemed off today” — rejected and not retained

One pass creates:

- `outputs/manager-follow-through.md`
- `outputs/daily-brief.md`
- `outputs/stakeholder-draft.md`
- a traceable receipt

All outputs remain drafts. Nothing is sent externally.

### Verify and reset

```bash
cd Demo/manager-collaboration
./scripts/test-demo.sh
./scripts/reset-demo.sh
```

Fallback:

```bash
./scripts/use-golden.sh
./scripts/validate-demo.sh --final
```

## Design decisions

- White, fresh base with restrained Instagram-inspired blue, purple, pink, and
  orange accents.
- One portable system sans-serif stack for predictable rendering; no network
  font dependency.
- Large titles, short body copy, and reduced text-box padding to avoid clipping.
- Subtle slide numbers at bottom right.
- No toolbar during presentation.
- Slides use diagrams, contrasts, and decision flows rather than repeated card
  grids where possible.
- The HTML remains directly editable, but it is not a Google Slides-style
  drag-and-drop editor.

## Presenter guardrails

- Ask a question before revealing an answer.
- During demos, show one proof file per decision; do not tour the whole tree.
- Give every audience interaction a time limit.
- If a live step takes more than 20 seconds, say:

  > The important behavior is the contract, not the typing animation. I will
  > load the verified checkpoint and keep the decision moving.

- For each demo beat, state:
  1. the question
  2. the visible result
  3. why it matters

## Current verification

- Field demo: all 17 deterministic checks pass.
- Manager demo: reset, golden recovery, and validation checks pass.
- Deck: 19 unique slide IDs and unique editable keys; all intentional
  decorations are the only objects outside slide bounds.
- Speaker notes must always be checked against the current deck titles and demo
  commands after structural changes.

## Next-session checklist

1. Read this file.
2. Run both demo tests.
3. Open the HTML deck and spot-check Slides 1, 6, 9, 10, 11, 12, 15, and 19
   at the actual presenting resolution.
4. Rehearse once with no live agents, using only golden checkpoints.
5. Rehearse once with live agents and enforce the 20-second fallback.
6. Confirm the projector, terminal zoom, privacy mode, and Q&A clock.
