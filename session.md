# Session Handoff — Second Brain for Engineering Teams

Updated: 26 July 2026
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
  - locked presentation mode by default; add `?edit=1` for contenteditable text
    and browser-local autosave
  - 1600×900 design that scales to the available viewport
- `speaker-notes.md`
  - read-aloud script
  - 90-minute route
  - presenter-app script, stage cues, and terminal Q&A fallback
- `Demo/presenter-app/`
  - primary conference-facing demo surface
  - three role-scoped chat tabs: OnSite Fab Agent, Fixer Agent, and Manager
    Assistant
  - deterministic, local-only, and database-free
  - creates a real ZIP containing only reviewed, sanitized transfer artifacts
- `Demo/field-issue/`
  - executable field-workflow proof and technical Q&A source
- `Demo/manager-collaboration/`
  - executable manager-workflow proof and technical Q&A source

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
   Traceability, clarification, correction, and tests.
9. **Case #1: Field issue — how context crosses the boundary**
   Onsite human + agent, reviewed packet, validator, offsite diagnosis.
10. **Not every case becomes component knowledge**
    Every case stays traceable; only verified, approved learning is promoted.
11. **Case #2: What deserves to become memory?**
    Professional follow-through without a people dossier.
12. **A second brain must improve decisions**
    Measure the next grounded decision, recovery time, repeated clarification, and
    governed reuse.

### Demo and close

13. **GUIDED DECISION LAB**
14. **What to watch across the three agent workspaces**
15. **Start with one context leak—and one success signal**
16. **Appendix: the memory contract is portable**
17. **Appendix: the field boundary is separate and testable**
18. **Appendix: test the memory contract like software**
19. **Q&A / Thank you**

The normal route is Slides 1–14, both guided cases, Slide 15, then Slide 19.
Slides 16–18 are appendix material only.

Keyboard shortcuts:

- `D` — Slide 13
- `C` — Slide 15
- `A` — Slide 16
- `Q` or `End` — Slide 19
- arrow keys, Page Up/Down, or Space — navigate

## 90-minute timing

Target prepared content: about 65–70 minutes before Q&A and discussion.

| Segment | Target |
| --- | ---: |
| Introduction and audience pulse | 5 min |
| Problem and model, Slides 2–8 | 17 min |
| Use cases and success signals, Slides 9–12 | 8 min |
| Demo setup, Slides 13–14 | 2 min |
| Presenter app, OnSite + Fixer chats | 12–14 min |
| Presenter app, Manager Assistant chat | 4–5 min |
| Synthesis and 30-day pilot, Slide 15 | 4–5 min |
| Q&A, Slide 19 | 15 min |
| Discussion / contingency / final thesis | 7–10 min |

Do not fill the entire 90 minutes with scripted speech. Preserve room for
audience answers, live-demo variance, and Q&A.

## Presenter app

Run:

```bash
cd Demo/presenter-app
./run-local.sh
```

The app is the normal audience-facing route. It:

- runs entirely in the browser from reviewed mock data
- requires no database, authentication, external service, or live model call
- labels itself as a guided deterministic simulation
- presents three agent tabs with different context boundaries and human owners
- allows suggested-button or typed-chat interaction along one rehearsed path
- creates a viewable and downloadable reviewed ZIP after onsite approval
- shows a hybrid field resolution: onsite hardware recovery plus a tested
  stage-settle software guard
- renders a two-file code diff and creates a deterministic mock pull request
- asks the fixer to select what deserves reusable knowledge, then enforces a
  separate component-owner approval
- supports `1`, `2`, `3`, `N`, `F`, and `R`
- exposes a concise presenter cue in the context inspector
- produces `Demo/presenter-app/portable/[Demo]Second Brain Presenter.html` as a
  no-server emergency fallback

The tabs represent three roles with different context and permissions; they do
not imply that three different foundation models are required. The app must not
claim that one browser bundle proves filesystem, credential, or network
isolation. The sibling scripts remain the executable proof of validator
behavior.

## Demo 1 proof workspace — Field issue

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
5. Engineer, the offsite engineer, receives a decision workspace and defines the
   smallest discriminating experiment.
6. The investigation separates the unhealthy hardware from a software
   weakness: the settle gate can accept one in-position sample without checking
   stable velocity.
7. The Fixer Agent proposes a two-file patch and mock pull request; Engineer owns
   code review, merge, deployment, and verification.
8. A later human-reviewed result closes the case and creates a promotion
   proposal.
9. Component knowledge does not change until a named human approval exists.
10. Six months later, a new case reuses only the approved guardrail,
    diagnostic, source trail, scope, and limitations.

### Ownership

- Engineer: offsite diagnosis, experiment design, and verification
- onsite field engineer: approved evidence capture and physical intervention
- component owner/reviewer: reusable-knowledge approval

Never imply that Engineer physically replaces hardware onsite.

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

For an optional technical walkthrough, use the matching
`./scripts/load-golden-stage.sh <stage>` recovery command from the runbook.
This is not part of the normal audience route.

## Demo 2 proof workspace — Manager continuity

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
- During the presenter app, show one proof state per decision; do not tour the
  repository tree.
- Give every audience interaction a time limit.
- Keep terminal and prompt execution out of the normal audience route. Use them
  only for technical Q&A.

- For each demo beat, state:
  1. the question
  2. the visible result
  3. why it matters

## Current verification

- Field demo: all 17 deterministic checks pass.
- Manager demo: reset, golden recovery, and validation checks pass.
- Presenter app: local production build and nine contract tests pass.
- Deck: 19 unique slide IDs and unique editable keys; all intentional
  decorations are the only objects outside slide bounds.
- Speaker notes must always be checked against the current deck titles and demo
  commands after structural changes.

## Next-session checklist

1. Read this file.
2. Start the presenter app and run both proof-workspace test suites.
3. Open the HTML deck and spot-check Slides 1, 6, 9, 10, 11, 12, 15, and 19
   at the actual presenting resolution.
4. Rehearse the app route once using only suggested action buttons and agent
   shortcuts `1`, `2`, and `3`.
5. Open the packet viewer, test the ZIP download, inspect both diff files,
   create the mock pull request, and rehearse `N`, `F`, and `R`.
6. Confirm the projector, browser full screen, privacy mode, and Q&A clock.
