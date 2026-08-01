# Presenter App

Local, deterministic chat workspace for the conference demo.

The UI uses three familiar agent conversations:

- **OnSite Fab Agent** — investigates restricted evidence with the field
  engineer, drafts a sanitized packet, and enforces human review before export
- **Fixer Agent** — receives only the reviewed handoff, helps Engineer debug the
  hardware/software interaction, shows a tested code diff, creates a mock pull
  request, and separates code review from shared-knowledge promotion
- **Manager Assistant** — turns a manager-provided note into professional
  follow-through while preserving uncertainty and rejecting speculative people
  judgment

## Run

```bash
cd Demo/presenter-app
./run-local.sh
```

Then open the local URL printed in the terminal.

The app has no database, authentication, analytics, network calls, or live AI
dependency. It runs entirely from reviewed mock data included in the
repository. Suggested replies drive the rehearsed path; typed input is matched
to the same deterministic workflow.

The script uses a normal local Node.js installation when available. On the
conference laptop it can also use the Node.js runtime bundled with Codex.

## Production-style local build

```bash
npm run build
npm run preview
```

`npm run build` also creates:

```text
portable/[Demo]Second Brain Presenter.html
```

That file contains the app, styling, and mock data in one HTML document. It can
be opened directly without starting a server and is the recommended primary
stage artifact. Keep the local-server build as the secondary fallback.

## Presenter controls

- `1` — OnSite Fab Agent
- `2` — Fixer Agent
- `3` — Manager Assistant
- `N` — toggle the current presenter cue
- `S` — toggle projection-safe Stage view
- `F` — browser fullscreen
- `R` — reset the whole guided demo

Enter Stage view before presenting. It enlarges the decision content, hides the
composer, context inspector, and presenter cues, and replaces the full diff
with a projection-safe summary. The primary on-stage controls are the suggested
action buttons in each chat. The text composer remains available outside Stage
view, but it is intentionally deterministic rather than a live general-purpose
assistant.

## Handoff bundle

After onsite review, the app can show and download a real ZIP containing:

```text
debug-packet.md
manifest.json
README.md
```

Only sanitized transfer artifacts are included. Raw fab evidence is not
embedded in the app or the ZIP.

## Software-engineering artifact

The Fixer Agent proposes a change in the mock repository:

```text
motion-control/stage-runtime
```

The pull-request viewer shows the runtime change and regression tests. The
hybrid resolution is intentionally honest:

- the onsite field engineer restores the degraded stage hardware
- the software change requires stable position and velocity for consecutive
  samples before alignment can start
- Engineer owns the code, test evidence, reviewer choice, and merge decision

The pull request is deterministic demo data. The app does not call GitHub or
modify a remote repository.

Knowledge promotion uses a separate request and decision: requesting Motion
Controls review leaves shared guidance unchanged; the named owner approval is a
distinct action. The final cold-start scene opens a new case six months later
and retrieves only the approved diagnostic, source, scope, and limitations.

## What the browser experience proves

The app is explicitly labelled a deterministic replay backed by real local
artifacts and tests; it does not change an external system. The three tabs
demonstrate role-scoped context, human gates, and handoffs without requiring a
terminal or a sequence of prompts. The executable shell scripts and test suites
in the sibling demo workspaces remain the technical proof for packet admission,
checksum binding, reset behavior, and human promotion gates.

The app never reads the restricted raw-log directory. Audience-visible field
data comes from the sanitized evidence board and reviewed golden snapshots.
