# Session Handoff: Second Brain for Engineering Teams

Last updated: 2026-07-18

## Current Laptop State

The working artifacts now available on this laptop are:

```text
/Users/jacobaloysious/Desktop/secondbrain/Second Brain for Engineering Teams-editable.html
/Users/jacobaloysious/Desktop/secondbrain/second-brain-demo/field-issue-demo/
/Users/jacobaloysious/Desktop/secondbrain/second-brain-demo/manager-collaboration-demo/
```

Use them as follows:

- **Authoritative slide deck:** `Second Brain for Engineering Teams-editable.html`
  - Self-contained single HTML file with all visual assets embedded.
  - Contains 21 slides and browser-editable text regions.
  - Arrow keys and toolbar buttons navigate between slides.
  - Browser edits autosave to local browser storage only.
  - To persist edits into a movable artifact, use **Download HTML** and retain the downloaded file.
  - All future slide review and editing should target this HTML file directly.
  - Do not regenerate or maintain alternate deck formats.
  - Slide 5 and slides 9–17 were revised to match the case-based demo architecture:
    - slide 5 contrasts restricted fab evidence with the sanitized debug packet that creates a case
    - isolated field-issue cases
    - assigned-engineer investigation and definition of done
    - case-specific actions with owners and expected results
    - curated component knowledge that remains unchanged during triage
    - human-reviewed promotion of verified learning
    - closing line: **Every issue creates a case. Only verified learning becomes shared memory.**
- **Semiconductor field-issue demo:** `second-brain-demo/field-issue-demo/`
  - Uses a case-based architecture: every report gets an isolated folder under `field-issues/<case-id>/`.
  - Includes fab-side raw evidence, a sanitized debug-packet boundary, assigned-engineer case files, curated component knowledge, a human-review promotion queue, prompts, expected outputs, a runbook, seed files, and reset tooling.
  - Case-specific actions live inside the case; there is no global actions file.
  - Component knowledge is read-only during triage. Only verified learning may be proposed for promotion, and a human component owner must approve it before shared knowledge changes.
  - `second-brain-demo/field-issue-demo/scripts/reset-demo.sh` has been run and verified successfully.
- **Engineering manager collaboration demo:** `second-brain-demo/manager-collaboration-demo/`
  - Restores the post-standup capture use case from the earlier deck.
  - Processes project risk, professional commitments, actions, and receipts.
  - Surfaces a daily brief, 1:1 preparation, stakeholder update, and delegation context.
  - Rejects speculative people memory and stores only professional working context.
  - `second-brain-demo/manager-collaboration-demo/scripts/reset-demo.sh` has been run and verified successfully.

The temporary multi-file HTML export folder and conversion scripts were removed after the self-contained HTML was produced. Do not expect or depend on them.

Google Slides access may be unavailable because of browser or account policy. Do not treat Google Slides as a required artifact or blocker; use the self-contained HTML deck.

## Demo Architecture Correction

The demo was revised after identifying that directly updating global issue memory, component files, and a global actions list for every field report would not scale and would cause memory rot.

The current model is:

```text
fab-side/raw-logs/                       restricted evidence
fab-side/local-analysis/debug-packet.md sanitized boundary artifact
field-issues/FI-2026-00421/             isolated case and assigned-engineer work
component-knowledge/                    curated, reusable, reviewed knowledge
promotion-queue/                        verified learning awaiting human approval
```

The assigned engineer moves a case through:

```text
triage -> investigate -> experiment -> fix -> verify -> close
```

The case contains its own facts, hypotheses, evidence, actions with owners and expected results, agent context, definition of done, and resolution. Shared component knowledge must not change from a hypothesis or during triage.

Key line:

> **Every issue creates a case. Only verified learning becomes shared memory.**

## Current Goal

Prepare a 1-hour engineering conference talk:

- 30 minutes presentation
- 30 minutes live demo

The topic evolved from a general "Second Brain" talk into:

> **Second Brain for Engineering Teams**

Current subtitle:

> **Turn scattered context into shared memory and better execution.**

Latest strategic positioning:

> **Context is the new execution layer.**
>
> When teams make context explicit, humans onboard faster and agents work with continuity.

## Audience Balance

The audience is the broader engineering organization:

- Approximately **80% engineers**: software engineers, field engineers, technical leads, and other technical roles.
- Approximately **20% engineering managers**.

The talk should remain engineering-led, with the semiconductor field-issue demo as the deeper technical proof. It should also show that the same memory loop supports management collaboration through daily briefs, 1:1 preparation, project state, professional commitments, stakeholder communication, and delegation.

Avoid turning the talk into generic manager productivity. The manager workflow is a secondary demonstration of the same context architecture.

## Two-Demo Strategy

### Demo 1 — Field issue resolution (primary)

Raw fab evidence stays onsite. A local model produces a sanitized packet. Engineering opens an isolated case, investigates, fixes, verifies, closes, and proposes reusable learning for human review.

### Demo 2 — Engineering manager collaboration (secondary)

A messy post-standup capture is processed into:

- project status and risk
- professional people follow-ups
- explicit actions and receipts
- daily brief
- 1:1 preparation
- stakeholder update
- delegation context for an engineer or agent

Both demos use:

```text
Capture -> Process -> Surface
```

The memory boundaries and surfaced outputs differ by use case.

## Latest Recommended Demo Direction

The most relevant demo direction is:

> **Field issue memory when raw fab logs cannot leave the site.**

Context:

- Semiconductor org ships hardware tools to fabs.
- Fab access control is extremely restrictive.
- Remote engineering teams often cannot access raw logs directly.
- Teams often write one-off tools for log analysis.
- Better demo: run a local model near the tool/fab to analyze raw logs and produce a safe debug packet.
- The debug packet, not raw logs, is sent to engineering teams.

Strong framing line:

> **Raw logs stay in the fab. Debug memory travels to engineering.**

This is stronger for the new audience than the current EM/productivity demo.

## Proposed Semiconductor Demo Story

Scenario:

- A hardware tool in a fab reports intermittent wafer alignment failures.
- Raw logs cannot leave the fab environment.
- A local model analyzes logs onsite.
- It produces a sanitized debug packet for the remote engineering team.
- Engineering memory is updated from the debug packet.

Demo flow:

1. **Raw logs stay local**
   - tool logs
   - sensor traces
   - error codes
   - timestamps
   - maintenance events
   - operator notes

2. **Local model processes logs onsite**
   - detects patterns
   - summarizes failure sequence
   - extracts likely subsystem
   - identifies missing evidence
   - redacts sensitive fab/tool details

3. **Engineering team receives a debug packet**
   - issue summary
   - timeline
   - suspected components
   - confidence
   - recommended next debug steps
   - questions for field engineer

4. **Engineering memory gets updated**
   - known issue memory
   - component memory
   - actions
   - prior similar failures
   - agent context bundle for deeper analysis

Suggested demo folder:

```text
field-issue-demo/
  AGENTS.md
  fab-side/
    raw-logs/
      tool-run-0421.log
      sensor-snapshot.csv
      operator-note.md
    local-analysis/
      debug-packet.md
  engineering-memory/
    issues/
      wafer-alignment-drift.md
    components/
      stage-controller.md
      vision-alignment.md
    actions.md
    decisions.md
  outputs/
    engineering-debug-brief.md
    field-followup-questions.md
    agent-context-bundle.md
    fix-plan.md
```

Suggested live moves:

1. Show raw logs exist only in `fab-side/raw-logs`.
2. Ask local agent/model:

   ```text
   Analyze fab-side/raw-logs locally.
   Do not copy raw logs into engineering-memory.
   Produce fab-side/local-analysis/debug-packet.md with timeline, symptoms, likely subsystem, confidence, redactions, and follow-up questions.
   ```

3. Show `debug-packet.md`.
4. Ask engineering-side agent:

   ```text
   Process the debug packet into engineering-memory.
   Update issue memory, component memory, actions, and generate an engineering debug brief.
   ```

5. Show:
   - `outputs/engineering-debug-brief.md`
   - `outputs/field-followup-questions.md`
   - `outputs/agent-context-bundle.md`

Why this lands:

- remote engineering teams cannot access fab logs
- raw logs may be sensitive or locked down
- engineers waste time writing one-off tools
- local AI converts inaccessible raw evidence into structured debug context
- memory compounds across field issues
- future agents can debug with prior issue context

## Deck Artifact

The self-contained local HTML listed in **Current Laptop State** is the only authoritative deck:

```text
/Users/jacobaloysious/Desktop/secondbrain/Second Brain for Engineering Teams-editable.html
```

Use an HTML-first workflow for every slide review and edit. The deck is a single portable file with embedded assets. Ignore remote copies or alternate formats unless the user explicitly changes this decision later.

The Markdown file contains the planned narrative changes and the self-contained demo rebuild script.

Current deck state:

- 21 slides
- appendix starts at slide 18
- title: **Second Brain for Engineering Teams**
- subtitle: **Turn scattered context into shared memory and better execution.**

Current main flow:

1. Title / core idea
2. Memory tax
3. Engineering-organization audience: engineers primary, managers secondary
4. Traditional second brains as better storage
5. Manager example: messy post-standup capture to structured memory
6. Capture / Process / Surface loop
7. Portable architecture and current demo stack
8. Trust / receipts / fix
9. Field-issue case memory
10. Curated component knowledge
11. Field-issue investigation lifecycle
12. Manager continuity surfaces
13. Case context bundles for agents
14. Guardrails that prevent memory rot
15. Two demos, one memory loop
16. Cases to trusted organizational knowledge
17. Closing / CTA
18. Appendix - Demo Content
19. Local and reviewable setup
20. Two demo workspaces
21. Dual-demo live runbook

Important recent edits:

- Removed visible speaker notes.
- Renamed title from "Personal AI Memory..." to **Second Brain for Engineering Teams**.
- Replaced "This is not a note-taking talk" with **Context is the new execution layer.**
- Slide 3 focuses on audience role pain:
  - ICs: re-explaining code/project context to AI tools
  - TLs: stale decisions, cross-team ambiguity, dependency risk
  - EMs: follow-ups, project state, stakeholder memory
  - Leaders: onboarding, leverage, compliance, scaling AI safely
- Standardized framework terms to **Capture / Process / Surface**.
- Slide 7 currently says:
  > The demo uses VS Code, Claude Code, and local Markdown, but the pattern applies anywhere.
- Slide 13 says:
  > Agents need context bundles too
- Slide 17 says:
  > Use memory to reduce context load, so people can focus on judgment, direction, and review.

## Historical Local Artifacts

The earlier local demo and notes repo are **not required** for continuation.

They were tied to the original laptop and to the older EM-focused demo. On the new laptop, assume those files are unavailable and ignore any old local paths.

The portable source of truth is this Markdown file plus the self-contained HTML slide deck.

To recreate the demo, use:

```text
Self-Contained Rebuild Guide -> Copy-Paste Script To Generate The Demo
```

If notes repo access is restored later, regenerate the demo from this Markdown file and save it under:

```text
presentation/field-issue-demo/
```

## Historical Remote Slide Deck

The following Google Slides URL is retained only as historical provenance. Do not use it as the working deck:

```text
https://docs.google.com/presentation/d/1Vch4tpIFkYx_9iwTbOeZGGx6pj0in5odAnQUDI8LuoI/edit?usp=drivesdk
```

This deck may still contain some older EM-oriented content. Use the slide update plan later in this Markdown file to pivot it toward the semiconductor field-issue demo.

## Research / Novelty Pulse Check

External pulse check found that these themes are active and common:

- AI second brain / personal knowledge management
- context engineering for agents
- memory-augmented AI agents
- AI-ready documentation
- persistent project memory for coding agents

Conclusion:

- Generic "AI second brain" is low novelty.
- Personal AI memory using Markdown/agents is medium novelty.
- Project/debug memory as onboarding plus agent execution context is more compelling.
- For semiconductor audience, field-issue/debug-memory framing is likely stronger than EM productivity.

Best positioning:

> This is not a productivity system. It is a way to turn constrained engineering context into reusable debug memory that humans and agents can act on.

## Recommended Next Steps On New Laptop

1. Open the self-contained HTML deck listed in **Current Laptop State**.

2. Decide whether to pivot the deck fully to semiconductor field-issue debugging.

3. If yes, update slides:

   - Slide 5: replace EM capture with fab field issue raw log/debug capture.
   - Slide 9: replace project memory with field issue/component memory.
   - Slide 10: replace people memory or move it out; software engineers may not care.
   - Slide 11: replace EM day with "one field issue debug loop."
   - Slide 12: replace weekly management signal with "debug attention map."
   - Slide 13: replace generic agent context bundle with "debug context bundle."
   - Slide 15 and appendix: replace VS Code/Markdown EM demo with field-issue demo.

4. Build the new local demo in any working folder:

   ```text
   field-issue-demo/
   ```

5. Keep the core loop:

   ```text
   Capture -> Process -> Surface
   ```

6. For the semiconductor demo, map it as:

   - Capture: raw logs and field notes stay onsite
   - Process: local model creates sanitized debug packet
   - Surface: engineering receives debug brief, follow-up questions, and agent context bundle

## Key Lines Worth Reusing

- **Context is the new execution layer.**
- **Raw logs stay in the fab. Debug memory travels to engineering.**
- **Markdown is not the product. Markdown is the microscope.**
- **Project memory is not just documentation. It is onboarding context for humans and execution context for agents.**
- **A blank AI session is a freelancer with amnesia.**
- **The system should not ask users to review everything. It should only ask for clarification when guessing would pollute memory.**

## Current Caveat

The latest local deck still contains a lot of EM-oriented content. Given the semiconductor/software-engineering audience, the next major work item should be to update both the deck and demo to field issue debugging / local log analysis.

---

# Self-Contained Rebuild Guide

> **Important:** The copy-paste rebuild script in this historical section describes the earlier global `engineering-memory/` architecture and is now deprecated. Do not use it to overwrite the current `second-brain-demo/field-issue-demo/`. Until this embedded script is regenerated, the verified demo folder on the current laptop is the source of truth for the implementation. The current architecture is documented in **Demo Architecture Correction** above.

Use this section if a future laptop has this Markdown file and the self-contained HTML deck, but no local demo files.

## What To Recreate

Recreate a new demo workspace called:

```text
field-issue-demo/
```

This replaces the old EM-focused `second-brain-demo`.

The demo is designed for a semiconductor software engineering audience:

- hardware tools deployed to fabs
- raw logs cannot leave fab/site environment
- remote engineering team cannot directly inspect logs
- local AI analyzes logs onsite
- only a sanitized debug packet leaves the fab-side boundary
- engineering memory accumulates reusable debug context

## Ideal Demo Narrative

Say this before the demo:

> The Markdown files are not the product. Markdown is the microscope. It lets us inspect the memory loop clearly. In a real semiconductor organization, the raw logs would stay in the fab-side environment, the local model would generate a safe debug packet, and the engineering team would receive structured debug memory instead of raw logs.

Core loop:

```text
Capture -> Process -> Surface
```

Semiconductor mapping:

```text
Capture: raw tool logs, sensor snapshots, operator notes stay onsite
Process: local model creates sanitized debug packet
Surface: remote engineering gets debug brief, follow-up questions, agent context bundle
```

Key line:

> Raw logs stay in the fab. Debug memory travels to engineering.

## Copy-Paste Script To Generate The Demo

On the new laptop, create a folder where you want the demo and run this script from a terminal. It will generate the full `field-issue-demo` workspace.

```bash
#!/usr/bin/env bash
set -euo pipefail

ROOT="${1:-field-issue-demo}"

mkdir -p "$ROOT/fab-side/raw-logs"
mkdir -p "$ROOT/fab-side/local-analysis"
mkdir -p "$ROOT/engineering-memory/issues"
mkdir -p "$ROOT/engineering-memory/components"
mkdir -p "$ROOT/outputs"
mkdir -p "$ROOT/seed"
mkdir -p "$ROOT/scripts"

cat > "$ROOT/README.md" <<'EOF'
# Field Issue AI Memory Demo

This demo supports the talk **Second Brain for Engineering Teams**.

Scenario:

- A semiconductor hardware tool in a fab has intermittent wafer alignment failures.
- Raw logs cannot leave the fab environment.
- A local model analyzes logs onsite.
- The model produces a sanitized debug packet.
- Remote engineering receives structured debug memory, not raw logs.

Core loop:

1. Capture
2. Process
3. Surface

Key idea:

> Raw logs stay in the fab. Debug memory travels to engineering.

Run reset before each rehearsal:

```bash
./scripts/reset-demo.sh
```
EOF

cat > "$ROOT/AGENTS.md" <<'EOF'
# Agent Instructions

You are operating a local AI Memory demo for semiconductor field issue debugging.

Use only files in this workspace. Do not invent facts. If evidence is missing, mark it as `needs_review` and ask a specific clarification question.

## Boundary Rule

Raw logs in `fab-side/raw-logs/` must stay fab-side.

Do not copy raw log lines into `engineering-memory/` or `outputs/`.

Only sanitized summaries, extracted symptoms, timestamps, suspected subsystems, confidence, redactions, and follow-up questions may cross into engineering memory.

## Loop

1. **Capture**: raw tool logs, sensor snapshots, and operator notes are captured fab-side.
2. **Process**: local model analyzes raw data and produces `fab-side/local-analysis/debug-packet.md`.
3. **Surface**: engineering-side memory and outputs are generated from the debug packet.

## Processing Rules

When analyzing fab-side raw logs:

- Build a timeline of symptoms.
- Identify repeated error codes and suspicious sensor values.
- Identify likely subsystem candidates.
- Mark confidence.
- Redact fab-sensitive or tool-identifying details.
- Produce follow-up questions for the field engineer.
- Do not expose raw logs outside `fab-side/local-analysis/debug-packet.md`.

When processing a debug packet into engineering memory:

- Update issue memory in `engineering-memory/issues/`.
- Update component memory in `engineering-memory/components/`.
- Update `engineering-memory/actions.md`.
- Append receipts with changed files and confidence.

## Output Rules

Generate concise, operational outputs:

- `outputs/engineering-debug-brief.md`
- `outputs/field-followup-questions.md`
- `outputs/agent-context-bundle.md`
- `outputs/fix-plan.md`

All outputs must be based only on the sanitized debug packet and existing engineering memory.
EOF

cat > "$ROOT/fab-side/raw-logs/tool-run-0421.log" <<'EOF'
2026-07-18T09:41:02Z INFO LOT=REDACTED WAFER=REDACTED recipe=ALIGN_FINE stage=pre-align
2026-07-18T09:41:08Z INFO stage_controller move_start axis=X target=12.440mm
2026-07-18T09:41:11Z WARN stage_controller settle_time_ms=480 threshold_ms=300
2026-07-18T09:41:12Z INFO vision_alignment fiducial_detected score=0.91
2026-07-18T09:41:14Z ERROR ALIGN-274 wafer_alignment_delta_um=8.7 threshold_um=5.0
2026-07-18T09:41:17Z INFO retry alignment_attempt=2
2026-07-18T09:41:20Z WARN stage_controller settle_time_ms=515 threshold_ms=300
2026-07-18T09:41:21Z ERROR ALIGN-274 wafer_alignment_delta_um=9.1 threshold_um=5.0
2026-07-18T09:41:25Z INFO operator_intervention requested=true
2026-07-18T09:48:02Z INFO LOT=REDACTED WAFER=REDACTED recipe=ALIGN_FINE stage=pre-align
2026-07-18T09:48:07Z INFO stage_controller move_start axis=X target=12.441mm
2026-07-18T09:48:10Z WARN stage_controller settle_time_ms=502 threshold_ms=300
2026-07-18T09:48:12Z INFO vision_alignment fiducial_detected score=0.89
2026-07-18T09:48:13Z ERROR ALIGN-274 wafer_alignment_delta_um=8.4 threshold_um=5.0
2026-07-18T09:48:18Z ERROR STAGE-119 x_axis_settle_timeout=true
2026-07-18T09:48:22Z INFO operator_intervention requested=true
EOF

cat > "$ROOT/fab-side/raw-logs/sensor-snapshot.csv" <<'EOF'
timestamp,stage_temp_c,x_axis_vibration_mm_s,vision_score,alignment_delta_um
2026-07-18T09:41:08Z,23.9,0.18,0.92,2.1
2026-07-18T09:41:11Z,24.1,0.43,0.91,8.7
2026-07-18T09:41:20Z,24.2,0.46,0.90,9.1
2026-07-18T09:48:07Z,24.0,0.41,0.90,7.9
2026-07-18T09:48:10Z,24.2,0.48,0.89,8.4
EOF

cat > "$ROOT/fab-side/raw-logs/operator-note.md" <<'EOF'
# Operator Note

Tool reported repeated wafer alignment failures during fine alignment.

Observed:

- issue appears after X-axis stage move
- retries do not recover
- vision score looks acceptable on UI
- operator paused run after second repeated failure

Raw lot, wafer, fab, and tool identifiers must not leave the fab environment.
EOF

cat > "$ROOT/fab-side/local-analysis/debug-packet.md" <<'EOF'
# Debug Packet

Not generated yet.
EOF

cat > "$ROOT/engineering-memory/issues/wafer-alignment-drift.md" <<'EOF'
# Issue: Wafer Alignment Drift

## Summary

Intermittent wafer alignment failures have been observed during fine alignment on a fab-deployed hardware tool.

## Current Understanding

- Raw fab logs are not available to remote engineering.
- Engineering receives sanitized debug packets generated onsite.
- Current suspected area is stage motion or vision alignment interaction.

## Known Symptoms

- Alignment delta exceeds threshold during fine alignment.
- Retries do not consistently recover.

## Open Questions

- Is the primary trigger stage settling, vision scoring, or calibration drift?
- Does the issue correlate with temperature, vibration, recipe, or maintenance events?
- What additional field evidence is needed?

## Next Actions

- Wait for sanitized debug packet from fab-side analysis.
EOF

cat > "$ROOT/engineering-memory/components/stage-controller.md" <<'EOF'
# Component: Stage Controller

## Responsibility

Controls stage motion, axis settling, and movement completion signals.

## Known Failure Modes

- Axis settle timeout
- Excessive vibration during fine positioning
- Movement completion reported before mechanical stability

## Debug Checks

- Compare settle time against threshold.
- Check vibration during alignment window.
- Verify whether retries happen before stage stabilizes.
EOF

cat > "$ROOT/engineering-memory/components/vision-alignment.md" <<'EOF'
# Component: Vision Alignment

## Responsibility

Detects fiducials and computes wafer alignment delta.

## Known Failure Modes

- Low fiducial score
- False positive fiducial detection
- Alignment delta above process threshold

## Debug Checks

- Compare vision score with alignment delta.
- Check whether high vision score still produces high delta.
- Confirm if alignment errors correlate with stage motion instability.
EOF

cat > "$ROOT/engineering-memory/actions.md" <<'EOF'
# Actions And Receipts

## Open Actions

- [ ] Analyze next sanitized debug packet from fab-side local model.
- [ ] Identify likely subsystem owner.
- [ ] Prepare follow-up questions for field engineer.

## Needs Review

No items yet.

## Receipts

No automated processing yet.
EOF

cat > "$ROOT/engineering-memory/decisions.md" <<'EOF'
# Decisions

## Raw Log Handling

Decision: Raw fab logs must not be copied into engineering memory or shared outputs.

Rationale: Fab/tool/customer identifiers and process details may be restricted.

Allowed artifact: sanitized debug packet with redactions, symptoms, timeline, suspected subsystem, confidence, and follow-up questions.
EOF

cat > "$ROOT/outputs/engineering-debug-brief.md" <<'EOF'
# Engineering Debug Brief

Not generated yet.
EOF

cat > "$ROOT/outputs/field-followup-questions.md" <<'EOF'
# Field Follow-Up Questions

Not generated yet.
EOF

cat > "$ROOT/outputs/agent-context-bundle.md" <<'EOF'
# Agent Context Bundle

Not generated yet.
EOF

cat > "$ROOT/outputs/fix-plan.md" <<'EOF'
# Fix Plan

Not generated yet.
EOF

cat > "$ROOT/DEMO-PROMPTS.md" <<'EOF'
# Demo Prompts

Use these prompts with Claude Code or Codex from the root of this workspace.

## Prompt 1: Local Fab-Side Analysis

```text
Analyze fab-side/raw-logs locally using AGENTS.md.
Do not copy raw logs into engineering-memory or outputs.
Produce fab-side/local-analysis/debug-packet.md with:
- sanitized issue summary
- event timeline
- repeated error codes
- suspicious sensor patterns
- likely subsystem candidates
- confidence level
- redactions applied
- follow-up questions for the field engineer
```

## Prompt 2: Engineering-Side Memory Update

```text
Process fab-side/local-analysis/debug-packet.md into engineering memory using AGENTS.md.
Update:
- engineering-memory/issues/wafer-alignment-drift.md
- relevant component memory files
- engineering-memory/actions.md

Append a receipt with files changed, confidence, and open questions.
Do not copy raw log lines into engineering memory.
```

## Prompt 3: Surface Engineering Outputs

```text
Using only engineering memory and the sanitized debug packet, generate:
1. outputs/engineering-debug-brief.md
2. outputs/field-followup-questions.md
3. outputs/agent-context-bundle.md
4. outputs/fix-plan.md

Keep outputs concise and operational.
```

## Prompt 4: Low-Confidence Clarification

```text
Process this field note:
"The stage thing happened again after the usual step."

If confidence is low, do not update issue or component memory.
Add it to Needs Review in engineering-memory/actions.md with a specific clarification question.
```
EOF

cat > "$ROOT/DEMO-RUNBOOK.md" <<'EOF'
# Demo Runbook

## Setup

Open this folder in VS Code.

Show the audience three surfaces:

1. `fab-side/raw-logs/` - raw evidence that stays onsite
2. `fab-side/local-analysis/debug-packet.md` - sanitized output of local analysis
3. `engineering-memory/` and `outputs/` - what remote engineering receives and acts on

Do not walk through every file.

## Move 1: Capture

Show:

- `fab-side/raw-logs/tool-run-0421.log`
- `fab-side/raw-logs/sensor-snapshot.csv`
- `fab-side/raw-logs/operator-note.md`

Say:

> In the real world, remote engineering may not be allowed to access these raw logs directly. The goal is not to move logs out. The goal is to move debug memory out.

## Move 2: Process Locally

Run Prompt 1 from `DEMO-PROMPTS.md`.

Show:

- `fab-side/local-analysis/debug-packet.md`

Say:

> This is the boundary crossing. Raw logs stay fab-side. Sanitized debug memory travels.

## Move 3: Update Engineering Memory

Run Prompt 2.

Show:

- `engineering-memory/issues/wafer-alignment-drift.md`
- `engineering-memory/components/stage-controller.md`
- `engineering-memory/components/vision-alignment.md`
- `engineering-memory/actions.md`

Say:

> The engineering team now has persistent issue memory without direct access to the raw logs.

## Move 4: Surface Outputs

Run Prompt 3.

Show:

- `outputs/engineering-debug-brief.md`
- `outputs/field-followup-questions.md`
- `outputs/agent-context-bundle.md`
- optionally `outputs/fix-plan.md`

Say:

> This is where memory becomes execution context. The next engineer or agent does not start from a blank session.

## Optional: Clarification Queue

Run Prompt 4.

Expected behavior:

- the system should not guess
- it should add a Needs Review item
- it should ask what "stage thing" and "usual step" refer to

Say:

> The system should only ask for help when guessing would pollute memory.
EOF

cat > "$ROOT/DEMO-EXPECTED-OUTPUTS.md" <<'EOF'
# Expected Outputs

Use this file as backup if the live agent run is slow.

## Expected Debug Packet Shape

```md
# Debug Packet

## Sanitized Summary

Fine alignment failed repeatedly. ALIGN-274 occurred after X-axis stage moves. Vision scores remained acceptable, but alignment delta exceeded threshold. STAGE-119 appeared during one failure sequence.

## Timeline

- Pre-align starts.
- X-axis stage move begins.
- Stage settle time exceeds threshold.
- Vision fiducial score remains around 0.89-0.91.
- Alignment delta exceeds 5.0 um threshold.
- Retry repeats failure.
- Operator intervention requested.

## Likely Subsystem

Primary suspect: stage controller / X-axis settling.
Secondary area: vision alignment may be reacting to stage instability rather than causing failure.

## Confidence

Medium-high.

## Redactions

Lot, wafer, fab, recipe-sensitive, and tool-identifying details redacted.

## Follow-Up Questions

1. Did maintenance occur on the X-axis stage recently?
2. Does vibration spike on other recipes?
3. Can field capture a longer sensor window around stage settle?
```

## Expected Engineering Debug Brief Shape

```md
# Engineering Debug Brief

The latest sanitized debug packet points to stage settling as the likely contributor to wafer alignment failures.

Evidence:
- ALIGN-274 follows X-axis stage movement.
- Stage settle time exceeds threshold before alignment failure.
- Vision score remains acceptable, which reduces confidence that vision detection is primary cause.
- STAGE-119 appears in one sequence.

Recommended next step:
- Ask field team for longer X-axis vibration and settle-time window around fine alignment.
```

## Expected Agent Context Bundle Shape

```md
# Agent Context Bundle

Goal:
Investigate wafer alignment drift during fine alignment.

Known facts:
- Raw logs cannot leave fab-side environment.
- Sanitized packet indicates ALIGN-274 after X-axis move.
- Stage settle time exceeds threshold.
- Vision score remains acceptable.
- STAGE-119 appears in one sequence.

Likely subsystem:
- Stage controller / X-axis settling.

Expected output:
1. likely root causes
2. component checks
3. additional evidence needed
4. proposed fix or experiment
5. review checklist
```
EOF

cat > "$ROOT/scripts/reset-demo.sh" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

rm -rf "$ROOT/fab-side" "$ROOT/engineering-memory" "$ROOT/outputs"
mkdir -p "$ROOT/fab-side/raw-logs" "$ROOT/fab-side/local-analysis"
mkdir -p "$ROOT/engineering-memory/issues" "$ROOT/engineering-memory/components"
mkdir -p "$ROOT/outputs"

cp "$ROOT/seed/tool-run-0421.log" "$ROOT/fab-side/raw-logs/tool-run-0421.log"
cp "$ROOT/seed/sensor-snapshot.csv" "$ROOT/fab-side/raw-logs/sensor-snapshot.csv"
cp "$ROOT/seed/operator-note.md" "$ROOT/fab-side/raw-logs/operator-note.md"
cp "$ROOT/seed/debug-packet.md" "$ROOT/fab-side/local-analysis/debug-packet.md"
cp "$ROOT/seed/wafer-alignment-drift.md" "$ROOT/engineering-memory/issues/wafer-alignment-drift.md"
cp "$ROOT/seed/stage-controller.md" "$ROOT/engineering-memory/components/stage-controller.md"
cp "$ROOT/seed/vision-alignment.md" "$ROOT/engineering-memory/components/vision-alignment.md"
cp "$ROOT/seed/actions.md" "$ROOT/engineering-memory/actions.md"
cp "$ROOT/seed/decisions.md" "$ROOT/engineering-memory/decisions.md"
cp "$ROOT/seed/engineering-debug-brief.md" "$ROOT/outputs/engineering-debug-brief.md"
cp "$ROOT/seed/field-followup-questions.md" "$ROOT/outputs/field-followup-questions.md"
cp "$ROOT/seed/agent-context-bundle.md" "$ROOT/outputs/agent-context-bundle.md"
cp "$ROOT/seed/fix-plan.md" "$ROOT/outputs/fix-plan.md"

echo "Demo reset complete: $ROOT"
EOF

chmod +x "$ROOT/scripts/reset-demo.sh"

cp "$ROOT/fab-side/raw-logs/tool-run-0421.log" "$ROOT/seed/tool-run-0421.log"
cp "$ROOT/fab-side/raw-logs/sensor-snapshot.csv" "$ROOT/seed/sensor-snapshot.csv"
cp "$ROOT/fab-side/raw-logs/operator-note.md" "$ROOT/seed/operator-note.md"
cp "$ROOT/fab-side/local-analysis/debug-packet.md" "$ROOT/seed/debug-packet.md"
cp "$ROOT/engineering-memory/issues/wafer-alignment-drift.md" "$ROOT/seed/wafer-alignment-drift.md"
cp "$ROOT/engineering-memory/components/stage-controller.md" "$ROOT/seed/stage-controller.md"
cp "$ROOT/engineering-memory/components/vision-alignment.md" "$ROOT/seed/vision-alignment.md"
cp "$ROOT/engineering-memory/actions.md" "$ROOT/seed/actions.md"
cp "$ROOT/engineering-memory/decisions.md" "$ROOT/seed/decisions.md"
cp "$ROOT/outputs/engineering-debug-brief.md" "$ROOT/seed/engineering-debug-brief.md"
cp "$ROOT/outputs/field-followup-questions.md" "$ROOT/seed/field-followup-questions.md"
cp "$ROOT/outputs/agent-context-bundle.md" "$ROOT/seed/agent-context-bundle.md"
cp "$ROOT/outputs/fix-plan.md" "$ROOT/seed/fix-plan.md"

echo "Created demo workspace: $ROOT"
echo "Next:"
echo "  cd $ROOT"
echo "  ./scripts/reset-demo.sh"
echo "  code ."
```

## Slide Deck Update Plan For Semiconductor Audience

If you only have the self-contained HTML deck and this Markdown, update the HTML deck roughly like this:

### Slide 1

Keep:

- Title: **Second Brain for Engineering Teams**
- Subtitle: **Turn scattered context into shared memory and better execution.**
- Core idea: **Context is the new execution layer.**

### Slide 2

Keep the memory-tax idea, but make examples semiconductor/software-oriented:

- Debug context drifts across logs, field notes, and one-off scripts.
- Decisions lose rationale after incidents and handoffs.
- Follow-ups become open loops across field, product, and engineering.

### Slide 3

Update role cards:

- Field engineers: capture symptoms and constraints without leaking raw logs.
- Software engineers: receive structured debug context instead of inaccessible logs.
- Tech leads: preserve issue history, component decisions, and fix plans.
- Leaders: scale support safely across fabs, products, and compliance boundaries.

### Slide 5

Replace EM capture with fab field issue capture:

Raw capture:

```text
Tool reported repeated ALIGN-274 during fine alignment.
X-axis settle time exceeded threshold before each failure.
Vision score stayed around 0.9, so fiducial detection may not be primary.
STAGE-119 appeared once.
Raw logs cannot leave fab-side environment.
```

Structured memory:

```text
Issue: Wafer alignment drift
Likely subsystem: stage controller / X-axis settling
Evidence: ALIGN-274 after X-axis move; settle time above threshold
Secondary area: vision alignment
Boundary: raw logs stay fab-side
Next action: ask field for longer vibration and settle-time capture
Confidence: medium-high
```

### Slide 9

Replace "Project memory" with:

> **Field issue memory is engineering execution context**

Bullets:

- symptom timeline
- suspected subsystem
- evidence and confidence
- component history
- field follow-up questions
- agent-ready debug bundle

### Slide 10

Remove or reduce people-memory content. For this audience, replace it with:

> **Component memory compounds across field issues**

Cards:

- Stage controller: settle-time, vibration, axis timeout
- Vision alignment: fiducial score, alignment delta
- Recipe / process context: conditions, thresholds, known sensitivities

### Slide 11

Replace "One realistic project day" with:

> **One realistic field issue loop**

Timeline:

- 09:40 Fab-side raw logs captured
- 09:50 Local model creates sanitized debug packet
- 10:15 Engineering memory updates issue and component context
- 10:30 Engineering receives debug brief and follow-up questions
- 11:00 Agent gets context bundle for deeper investigation

### Slide 12

Replace weekly synthesis with:

> **Debug attention map**

Green / yellow / red:

- Green: known issue, clear next action
- Yellow: likely subsystem, missing evidence
- Red: repeated field impact, unclear owner, or safety/compliance risk

### Slide 13

Replace with:

> **Agents need debug context bundles too**

Subtitle:

> Field issue memory gives agents the context they need before they inspect code, propose fixes, or generate test plans.

### Slide 14

Keep guardrails, but make them semiconductor-specific:

- Raw log boundary
- Data privacy / customer/fab identifiers
- Redaction and audit trail
- Human review before fix recommendations

### Slide 15

Demo overview:

- Capture: raw logs and field note stay fab-side
- Process: local model generates sanitized debug packet
- Surface: engineering debug brief, follow-up questions, agent context bundle

### Slide 16

Future state:

- Personal debug memory
- Team/component memory
- Org-wide field issue memory

### Slide 17

Closing CTA:

> Tomorrow morning: pick one recurring field issue and define the sanitized debug packet you wish engineering received every time.

## One-Page Talk Narrative For New Session

Use this concise narrative if you need to brief a new AI assistant:

> I am preparing a 1-hour talk called Second Brain for Engineering Teams for the broader engineering organization: approximately 80% engineers and 20% engineering managers. The primary technical demo covers a semiconductor field issue where raw fab logs cannot leave the site. A local model creates a sanitized packet, and engineering opens an isolated case to investigate, fix, verify, and close; only reviewed learning becomes shared component knowledge. A shorter second demo covers manager collaboration: a messy post-standup capture updates project risk, professional commitments, actions, and receipts, then surfaces a daily brief, 1:1 preparation, stakeholder update, and delegation context. Both demos use Capture -> Process -> Surface, with different memory boundaries and outputs. Key lines: Raw logs stay in the fab. Debug memory travels to engineering. Every issue creates a case. Only verified learning becomes shared memory.
