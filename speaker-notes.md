# Speaker Notes — Second Brain for Engineering Teams

These notes are written as a read-aloud script for a one-hour session:

- approximately 30 minutes for slides 1–14
- approximately 20 minutes for the field-issue demo
- approximately 8 minutes for the manager-collaboration demo
- approximately 2 minutes to close and transition to questions

The deck has 19 slides. Slides 1–12 build the concept. Slide 13 transitions into the live demos, slide 14 sets the viewing lens, and slide 15 delivers the post-demo recommendation. Slides 16–18 are optional demo-reference slides. Slide 19 is the closing Q&A screen.

---

## Before the session

Reset both demos:

```bash
./Demo/field-issue/scripts/reset-demo.sh
./Demo/manager-collaboration/scripts/reset-demo.sh
```

Open the following in separate VS Code windows:

```text
Demo/field-issue/
Demo/manager-collaboration/
```

In the field-issue workspace, keep these files ready:

```text
DEMO-PROMPTS.md
fab-side/raw-logs/tool-run-0421.log
fab-side/raw-logs/sensor-snapshot.csv
fab-side/raw-logs/operator-note.md
fab-side/local-analysis/debug-packet.md
field-issues/FI-2026-00421/
component-knowledge/stage-controller/known-failure-modes.md
seed/verified-resolution.md
```

In the manager workspace, keep these ready:

```text
DEMO-PROMPTS.md
inbox.md
memory/projects/mobile-app-migration.md
memory/people/priya.md
memory/actions.md
memory/receipts.md
outputs/
```

Keep the demo prompts copied somewhere easy to paste. Live demos have a special ability to make a fast typist look like someone seeing a keyboard for the first time.

---

# Presentation

## Slide 1 — Second Brain for Engineering Teams

Good morning, everyone.

My name is Jacob Aloysious. I currently live and work in Singapore, and I have been at Meta for about five years as a software engineering manager.

I was born and brought up in Chennai. Before moving to Singapore and joining Meta, I worked at KLA in Chennai for around six years. I was part of the eBeam division, working with the eCougar and machine-control teams.

That experience is one reason I am excited about this topic. I have worked around both software engineering and complex semiconductor equipment, where context is not just a convenience. Context can be the difference between resolving a problem quickly and spending three days asking, “Who has access to the logs?”

On the personal side, I am married and have a twelve-year-old daughter. So between engineering, management, family, and trying to remember where I left my keys, I have developed a professional interest in memory systems.

Today I want to talk about a second brain for engineering teams.

This is not primarily a note-taking talk. It is about turning scattered context into collective memory that people and AI agents can use.

My central argument is simple:

Context is becoming a new execution layer.

When context is explicit, engineers onboard faster, managers coordinate better, and AI agents stop behaving like very intelligent contractors who forgot everything immediately after the last meeting.

[Pause.]

I will first explain the problem and the architecture. Then I will show two demos: a deeper engineering demo involving a semiconductor field issue, and a shorter engineering-manager demo involving project collaboration.

---

## Slide 2 — Memory Tax

Engineering work creates more context than one person can reliably hold.

We usually treat this as a personal weakness. We say, “I should have remembered that,” or, “I know someone explained this six months ago.”

But the real problem is structural. Our work produces decisions, assumptions, investigations, owner changes, incidents, code reviews, field reports, meeting commitments, and temporary workarounds. The volume is larger than human working memory was designed for.

I call the cost of reconstructing all of this the memory tax.

The first form is drifting context. Code and systems change, but the explanation around them becomes stale or disappears.

The second is lost rationale. We can see what decision was made, but not why. Then someone proposes the rejected option again, and everybody gets to enjoy the same debate twice.

The third is open loops: follow-ups, missing owners, and small commitments that remain active in our head.

Your brain is not a storage system. It should not have to remember where a decision was recorded, which hypothesis was rejected, or who promised the next step.

Human attention is more valuable for connecting signals, challenging assumptions, weighing trade-offs, and deciding what to do next.

When we use our brain as a database, we spend that valuable attention reconstructing context before the real engineering work can even begin. That is the memory tax.

---

## Slide 3 — One engineering organization. Different context needs.

This talk is for the whole engineering organization, not one specific job title.

The primary audience is the people doing and leading technical work: software engineers, systems engineers, application engineers, field engineers, individual contributors, and technical leads.

Engineering managers are included because they depend on the same context to coordinate work, remove blockers, support engineers, follow through on commitments, and communicate risk.

The memory foundation can be shared, while the information surfaced to each role can be different.

For individual contributors, the context problem often appears as repeated explanation. You explain the codebase to a reviewer, then to a new teammate, then to an AI coding agent, and then again to the same AI agent in a new session.

For tech leads, context becomes a dependency problem: stale decisions, unclear ownership, or cross-team assumptions that nobody realizes are different.

For managers, it appears as project state, commitments, daily priorities, 1:1 preparation, and stakeholder communication.

For leaders, the problem becomes organizational: onboarding, compliance, safe use of AI, and scaling engineering knowledge without scaling meetings at exactly the same rate.

The needs differ, but the underlying problem is the same:

Important context exists, but it is scattered, inconsistently structured, and surfaced too late.

---

## Slide 4 — Why traditional storage fails

Traditional second-brain systems improved capture, but they often made the human responsible for everything after capture.

The loop usually looks like this.

First, capture. We write something quickly.

Then organize. We need to choose a folder, title, tags, links, and taxonomy.

Then forget. We tell ourselves we will clean it up later.

Then abandon. Eventually the system contains so much unprocessed material that we stop trusting it.

This has happened to me with note-taking applications. I start with enthusiasm. I create folders, tags, templates, and probably a color system.

Two months later, the main folder is called “Inbox,” it contains 487 notes, and I am afraid to open it.

The problem is not that capture failed. The problem is that organization became a second job.

A useful second brain should reduce cognitive work, not create a part-time librarian position.

---

## Slide 5 — Start with the moment that leaks

The best place to begin is not with a tool. It is with a moment where context leaks.

For an engineer, that could be debugging breadcrumbs, an incident timeline, or code context that will disappear when the terminal closes.

For a manager, it might be the thought immediately after standup.

Look at the raw capture on the left.

It contains a project update, a technical blocker, an uncertain date, a stakeholder communication, and a promise to a teammate. Humans naturally mix these together because that is how work arrives.

On the right, the same capture has been processed into structured memory:

the project, the risk, the owner dependency, the stakeholder action, the people follow-up, the next action, and a confidence level.

Notice that this is not just a summary. A summary makes text shorter. Structured memory makes the information operational.

The system also preserves uncertainty. Rahul “may” unblock the work by Thursday. That is not the same as a committed Thursday delivery date. AI systems love converting hopeful language into very confident project plans, so we need boundaries.

We will return to this exact example in the second demo.

---

## Slide 6 — The shift: AI runs the memory loop

The key shift is that the human keeps one reliable behavior: capture.

The system takes more responsibility for the rest.

First, capture. Meet people where they already work: a terminal, chat, email, voice note, ticket, or field report.

Second, process. Classify the information, update the correct memory, preserve provenance, and ask a question when confidence is low.

Third, surface. Generate the brief, investigation context, 1:1 preparation, project signal, or agent prompt when it becomes useful.

This is the recurring loop for the entire talk:

Capture. Process. Surface.

The important point is not that an LLM can summarize text. We have known that for a while.

The useful capability is continuously turning unstructured context into controlled, retrievable, action-oriented memory.

Here, “continuously” means the memory loop happens as part of normal work.

If people must spend every evening sorting notes, adding tags, and updating several systems, the memory system has created more work instead of reducing it.

A useful second brain should be simple: capture once, let the system organize the information, and involve the human only when clarification or review is needed.

---

## Slide 7 — Architecture is portable. Tools are not.

The architecture has three layers.

The interface is where context enters and where useful information is surfaced. This might be Slack, Teams, email, voice, a notes application, a command line, or an internal tool.

The memory layer is the source of truth. It could be documents, a database, a task tracker, a Markdown repository, or an internal knowledge platform.

The compute layer runs the loop. It could be an LLM, workflow automation, a coding agent, a scheduled process, or a company platform.

I am using local Markdown and a coding agent for the demo because it makes the mechanism visible. We can see every file and every change.

Markdown is not the product. Markdown is the microscope.

In a real deployment, the interface and storage could be completely different.

This matters because we should not confuse the architecture with whichever tool is popular this month. Tool popularity has a shorter half-life than many engineering roadmaps.

The durable idea is the contract between capture, memory, processing, and surfaced action.

So at this point, we have the memory loop and the three architecture layers.

Before we enter the engineering demo, I want to add one operating contract: how do we trust what this system writes?

---

## Slide 8 — Make memory trustworthy

These are the three rules I want you to watch for in both demos.

An AI memory system does not need to be perfect, but every update must be inspectable and correctable.

First, it needs a receipt.

For every update, we should be able to see the source, destination, timestamp, confidence, and unresolved questions.

Second, it needs a bouncer.

If confidence is low, the system should ask instead of silently creating bad memory. A clarification question is slightly annoying. A confident fictional project decision is much more annoying.

Third, it needs a fix button.

Correction should be easy: “That owner is wrong,” or, “Do not store that.” Users should not need to perform database archaeology.

People abandon systems when errors feel mysterious, not merely when errors occur.

The trust contract is:

Show me what changed. Show me why. Let me fix it.

These are not three unrelated product features. They are the safety rules around the memory loop.

In the engineering demo, the sanitized packet acts as the receipt for what crossed the fab boundary. Missing evidence becomes a question rather than an invented fact. Any proposed shared learning remains reviewable before it is promoted.

Now we have the full setup:

the memory loop, the architecture, and the trust rules.

With that context, let us apply the pattern to a real engineering workflow.

---

## Slide 9 — Case #1: Field issue — how context crosses the boundary

We have covered the concept, the architecture, and the trust rules.

Now let us follow one field issue from the tool to the engineer who can fix it.

A semiconductor tool in a fab has reported an intermittent wafer-alignment failure.

Start on the left.

The field engineer is onsite, next to the tool. They can inspect the machine, reproduce symptoms, and answer questions using direct physical context.

The raw logs and restricted identifiers stay inside the fab.

In the middle is a human-and-AI loop.

The local AI agent can inspect the raw logs, local memory, and approved diagnostic guidance. It identifies patterns and asks clarification questions.

The field engineer answers with observations from the tool, corrects misunderstandings, and adds context that may not exist in the logs.

Together they produce the sanitized packet: symptoms, timeline, confidence, redactions, and open questions.

The field engineer reviews that packet before it crosses the boundary. The AI assists; the onsite engineer remains responsible for what is sent.

On the right, Shweta is offsite. She does not receive the restricted raw evidence, but she does have the codebase, tests, and engineering environment needed to debug and fix the issue.

The packet opens one isolated case for her.

This connects directly to slide 8:

the packet is the receipt, missing evidence becomes a question, and the field engineer can correct the output before it travels.

The takeaway is:

Human-reviewed engineering context crosses the boundary. Restricted evidence does not.

Once Shweta receives the case, she still owns the engineering work. The second brain simply preserves the experiments, decisions, and final verification so the team does not have to reconstruct them later.

That raises the next question: if we keep every case, will the shared engineering memory eventually become noisy and stale?

---

## Slide 10 — Not every case becomes component knowledge

This diagram shows the larger engineering-memory ecosystem.

The left circle is case history.

Every field issue can remain there as a traceable case, including its evidence, experiments, decisions, and final resolution.

Most cases never need to become component knowledge.

They may be one-off failures, environment-specific events, or investigations that produced no reusable lesson.

The right circle is shared component knowledge.

It is deliberately smaller. It contains reviewed diagnostics, validated failure modes, provenance, an owner, and a lifecycle.

The overlap is verified, reusable learning.

A case enters that overlap only when a lesson has been verified, is useful beyond the current incident, and has been reviewed by the relevant component owner.

Notice the other incident circles remaining on the left.

That is intentional. Retaining a case does not mean promoting all of its content into shared guidance.

The takeaway is:

Many cases can accumulate as history. Only a small amount of verified learning should become shared component knowledge.

---

## Slide 11 — Case #2: One stand-up, four kinds of follow-through

One stand-up can create several different kinds of follow-through.

There may be a project risk to track, a promise to remember, a stakeholder to update, and delegated work to check later.

The manager should not have to keep all of that context in their head.

The second brain keeps the relevant context ready for the moment when the manager needs to act.

A manager writes one messy post-standup note containing project risk, an owner dependency, a stakeholder update, and a commitment to an engineer.

In this example, the QA login issue is putting the migration at risk, Rahul may unblock it once infrastructure provides credentials, Maya needs the corrected risk assessment, and I promised Priya I would review staffing.

That is four different kinds of follow-through from one conversation.

The manager is at the centre of this picture because all four responsibilities compete for the same attention.

The system processes that capture into four reviewable surfaces: a daily brief, 1:1 preparation, a stakeholder update, and delegation context.

There is one boundary to watch: professional continuity is useful; speculative judgment about people is not.

It is appropriate to remember, “I promised Priya I would review staffing.”

It is not appropriate to create speculative labels such as, “Priya seemed disengaged.”

This use case is about continuity, follow-through, and clearer coordination—not scoring people.

The outputs remain drafts. They are traceable to the manager’s own note and can be reviewed or edited before use.

---

## Slide 12 — Same agent pattern. Different assignments.

Both cases use the same agent pattern, but the assignment is not generic.

Read this slide across the three columns.

First, set the job.

In Case #1, diagnose and close one field issue.

In Case #2, prepare the manager’s follow-ups from one stand-up.

Second, supply only the context required for that job.

The field-issue agent receives the reviewed sanitized packet and approved component guidance.

The manager agent receives the manager’s own note, project state, and professional commitments.

Third, make the human decision explicit.

Shweta verifies the fix and closes the engineering case.

The manager reviews collaboration drafts before using or sending them.

The takeaway is:

The agent supports the work. It does not own the outcome.

---

## Slide 13 — LIVE DEMOS

We have covered the idea. Now let us see the behavior.

Two cases. One memory loop. Different boundaries.

First, a field issue moves safely from onsite evidence to an engineering fix.

Then, one manager note becomes reviewable follow-through.

**[Advance to slide 14.]**

---

## Slide 14 — What to watch in the two demos

We have the mental model. Now let us watch the behavior rather than the mechanics of the files.

In Demo 1, watch the boundary:

raw evidence remains onsite;

a reviewed sanitized packet opens the engineering case;

and Shweta verifies the fix and closure.

In Demo 2, watch the follow-through:

one messy manager note becomes structured memory;

four reviewable collaboration drafts appear;

and the manager decides what to use.

Both demos use the same loop:

Capture. Process. Surface.

**[Leave the deck and run Demo 1: field issue resolution.]**

**[Then run Demo 2: manager collaboration.]**

**[Return to slide 15 after both demos. Do not continue to the next section until both demos are complete.]**

---

# Live Demo

## Demo 1 — Field issue resolution

### Demo 1 opening

We have a semiconductor tool reporting intermittent wafer-alignment failures.

The raw evidence exists only under `fab-side/raw-logs`.

I have a tool log, a sensor snapshot, and an operator note.

[Open `tool-run-0421.log`.]

You can see alignment and stage-related events here. I am only showing enough to establish that this is raw operational evidence.

[Open `sensor-snapshot.csv`.]

This has the time-aligned sensor values.

[Open `operator-note.md`.]

And this is the human observation from the field.

In a real environment, the remote engineering team may not be allowed to access any of these files.

The objective is not to move the logs out. The objective is to move useful debug context out.

### Demo 1, Prompt 1 — Local analysis

I will ask the local agent to analyze the evidence while respecting the boundary.

[Paste Prompt 1.]

```text
Analyze fab-side/raw-logs locally using AGENTS.md.
Do not copy raw logs outside fab-side.
Create fab-side/local-analysis/debug-packet.md containing a sanitized summary,
timeline, observed patterns, subsystem hypotheses, confidence, missing evidence,
redactions, and targeted questions for the field engineer.
```

While this runs, notice that the prompt is not simply “summarize these logs.”

It specifies the boundary, the output contract, uncertainty, redaction, and missing evidence.

[Open `fab-side/local-analysis/debug-packet.md`.]

Now we have a sanitized summary, a timeline, observed patterns, hypotheses, confidence, and follow-up questions.

The primary hypothesis points toward stage settling or mechanical instability. Vision interaction remains a secondary possibility.

The packet does not claim that the root cause is proven.

This is the boundary crossing:

Raw logs stay in the fab. Debug memory travels to engineering.

### Demo 1, Prompt 2 — Create the case

Now I will switch to the engineering-side workflow.

The sanitized packet should create an issue-specific case, not immediately rewrite global component knowledge.

[Paste Prompt 2.]

```text
Process fab-side/local-analysis/debug-packet.md as case FI-2026-00421.
Update only field-issues/FI-2026-00421/.

Prepare the assigned engineer to move the case from triage to investigation:
- separate facts from hypotheses
- identify suspected components and confidence
- consult relevant curated component-knowledge without modifying it
- define missing evidence
- create concrete case-specific actions with owner and expected result
- define what must be true to close the issue
- produce an agent-context-bundle.md

Do not create or update a global actions file.
Do not promote hypotheses into component knowledge.
```

[Open `field-issues/FI-2026-00421/case.md`.]

The case now has a clear goal, assigned engineer, status, and definition of done.

[Open `investigation.md`.]

Facts and hypotheses are separated. This is one of the most important behaviors in the demo.

[Open `actions.md`.]

The actions belong to this issue. Each action should identify the owner and expected result.

The assigned engineer is not being told, “Please investigate.”

They are being told what evidence is needed, who should obtain it, what outcome is expected, and how that result changes the next decision.

[Open `agent-context-bundle.md`.]

This allows another engineer or AI agent to continue the case without reading every file or starting with a blank session.

### Demonstrate that component knowledge did not change

[Open `component-knowledge/stage-controller/known-failure-modes.md`.]

Notice that component knowledge has not been rewritten during triage.

The case can retrieve an approved STAGE-119 diagnostic. But the suspected relationship between stage vibration and ALIGN-274 is still a hypothesis.

This is how we avoid memory rot.

Every issue creates a case. Not every issue creates a new global truth.

### Demo 1, Prompt 3 — Resolve and propose

For conference timing, I have a seeded, human-verified experiment result.

[Open `seed/verified-resolution.md`.]

This says the field engineer captured an approved longer sensor window. The evidence showed excessive X-axis vibration during the measurement window. A degraded stage damper was replaced, settle time returned below threshold, and five consecutive validation runs completed successfully.

I will ask the agent to close the case and propose reusable learning.

[Paste Prompt 3.]

```text
Use the verified experiment result in seed/verified-resolution.md to close
case FI-2026-00421.

Update the case resolution, evidence, investigation status, and actions.
Then create promotion-queue/FI-2026-00421.md containing only the reusable,
verified learning proposed for shared component knowledge, with provenance,
review owner, validation date, and supersession guidance.

Do not update component-knowledge directly.
```

[Open `resolution.md`.]

The case is closed with a verified cause, fix, and validation result.

[Open `actions.md`.]

Case-specific actions should now be completed or explicitly closed.

[Open `promotion-queue/FI-2026-00421.md`.]

Reusable learning has entered a review queue. It has provenance and an owner, but component knowledge still has not changed.

The agent can propose. A component owner approves.

That is the difference between memory automation and uncontrolled knowledge mutation.

### Optional Prompt 4 — Approved promotion

If time allows, I can simulate component-owner approval.

[Paste Prompt 4.]

```text
Assume a component owner has approved promotion-queue/FI-2026-00421.md.
Promote only the approved reusable finding into the appropriate file under
component-knowledge/. Include provenance back to FI-2026-00421 and a reviewed date.
Mark the proposal approved. Do not copy issue-specific actions into component knowledge.
```

[Open the stage-controller knowledge file.]

Now only the approved reusable diagnostic has been added.

The issue-specific narrative and actions remain in the case.

The shared knowledge stays small, reviewed, and traceable.

### Demo 1 closing

That completes the engineering loop:

restricted evidence, sanitized packet, isolated case, assigned investigation, verified resolution, and reviewed learning.

The goal was always to fix the issue.

Memory made the investigation continuous and made the verified learning reusable.

---

## Demo 2 — Engineering manager collaboration

### Demo 2 opening

The second demo is shorter.

We are using the same architecture—capture, process, surface—but with different memory boundaries and outputs.

[Switch to `manager-collaboration`.]

[Open `inbox.md`.]

This is a messy post-standup note.

It contains a technical blocker, an uncertain date, a stakeholder communication, and a promise to Priya.

This is realistic because human beings do not naturally speak in database rows.

### Demo 2, Prompt 1 — Process the capture

[Paste Prompt 1.]

```text
Process the latest entry in inbox.md using AGENTS.md.

Update the relevant project memory, professional people follow-up, actions, and receipts.
Separate facts from uncertain timing. Do not invent information or add speculative people notes.
```

[Open `memory/projects/mobile-app-migration.md`.]

The project memory should now contain the current risk, blocker, owner dependency, stakeholder action, and next step.

[Open `memory/people/priya.md`.]

The people memory contains only the professional commitment: review staffing before sprint planning.

It should not contain an interpretation of Priya’s personality, mood, or performance.

[Open `memory/actions.md`.]

Here are the operational follow-ups.

[Open `memory/receipts.md`.]

And here is the processing receipt: what source was processed, what files changed, the confidence, and anything unresolved.

### Demo 2, Prompt 2 — Surface collaboration outputs

Now I will ask the system to surface four outputs.

[Paste Prompt 2.]

```text
Using the updated memory, generate:

1. outputs/daily-brief.md — top actions, risks, and unresolved questions
2. outputs/one-on-one-prep-priya.md — project check-in and the staffing commitment only
3. outputs/stakeholder-update.md — concise rollout-risk update for Maya
4. outputs/delegation-context.md — goal, blocker, owners, evidence, expected result, and review checklist for investigating the QA login failure
```

[Open `outputs/daily-brief.md`.]

The daily brief tells the manager where attention is needed.

[Open `outputs/one-on-one-prep-priya.md`.]

The 1:1 preparation carries forward the project check-in and the commitment the manager made.

[Open `outputs/stakeholder-update.md`.]

The stakeholder update communicates that rollout risk is now medium and explains the blocker without adding invented certainty.

[Open `outputs/delegation-context.md`.]

The delegation context helps an engineer or agent investigate the QA login failure with a goal, evidence, owners, expected result, and review checklist.

This is where manager memory supports engineering execution.

It reduces the need for the manager to manually reconstruct and rewrite the same context four different ways.

### Optional trust moment

If time allows, I will test the people-memory boundary.

[Paste Prompt 3.]

```text
Process this note: "Priya seemed off today."

Do not add it to people memory. Explain why it is speculative and add a precise clarification question only if an actionable professional follow-up is needed.
```

The correct behavior is to reject the speculative label.

The system can remember professional commitments. It should not manufacture a psychological profile.

That is continuity, not surveillance.

### Demo 2 closing

The same loop supports engineering execution and management continuity.

The field-issue demo produced a sanitized packet, a case, investigation actions, and reviewed component learning.

The manager demo produced project memory, a professional follow-up, a daily brief, 1:1 preparation, a stakeholder update, and delegation context.

Same loop.

Different boundaries.

Outputs matched to the role.

---

## Slide 15 — Start with one context leak

**[Return to the deck on slide 15.]**

You have now seen both workflows.

Let me leave you with three ideas.

First, context is becoming an execution layer for both people and AI agents.

Second, memory needs types and boundaries. A case is not component knowledge. A professional commitment is not a personality judgment. A hypothesis is not a fact.

Third, start small.

My recommendation is not to build an enterprise second-brain platform on Monday morning.

Choose one recurring context leak your team feels every week.

It could be a field issue where remote engineers cannot access evidence.

It could be a project handoff, a missed commitment, or a meeting that begins with twenty minutes of reconstructing what everybody already knew last week.

Capture once, where the evidence already appears.

Build the correct type of memory: cases, component knowledge, projects, or professional follow-ups.

Surface the action, brief, or decision each role needs.

Do not begin by asking, “Which AI second-brain product should we buy?”

Begin by asking:

What context are we repeatedly reconstructing, and what decision or action would become easier if that context were reliable?

The goal is not to remember everything.

The goal is less context reconstruction and more engineering judgment.

[Pause.]

One context leak. One bounded memory loop. One outcome worth improving.

**[Jump to slide 19.]**

---

## Slide 19 — Q&A and thank you

Thank you.

I am happy to take questions.

**[Leave slide 19 visible throughout the Q&A.]**

---

# Optional demo-reference slides

These slides are not part of the normal presentation sequence. Use them only when introducing implementation details or answering a question.

## Slide 16 — Demo setup: local and reviewable

I am using two small local Markdown workspaces.

This is intentionally less glamorous than a full enterprise platform.

The advantage is that we can inspect every boundary and every file change. There is no complicated authentication, no customer data, and hopefully no conference Wi-Fi dependency. Conference Wi-Fi is a distributed system with very strong eventual-consistency properties.

The setup is intentionally reliable, inspectable, and portable.

Every change appears as a readable Markdown diff, and the same memory pattern could later move into enterprise tools.

---

## Slide 17 — Two workspaces make the boundaries visible

The first workspace is the field-issue demo.

The second is the manager-collaboration demo.

In the field-issue workspace, the folder structure separates restricted fab evidence, isolated cases, reviewed component knowledge, and the human-approved promotion queue.

In the manager workspace, it separates messy capture, project state, professional commitments, and the outputs the manager reviews.

The important point is not the folder names. It is that the boundary is explicit and inspectable.

---

## Slide 18 — Live runbook: prove depth, then show breadth

I will spend most of the time on the engineering case, then use the shorter manager workflow to show that the pattern generalizes.

First, we will keep raw field evidence local and create a reviewed sanitized packet.

Second, we will follow the engineering case through investigation, fix, verification, closure, and a proposed reusable learning.

Third, we will use the manager workflow to generate role-appropriate follow-through from one messy note.

One loop, different boundaries, and outputs matched to the role.

---

# Demo recovery lines

## If an agent response is slow

While this runs, the important point is the contract in the prompt: the evidence boundary, the allowed destination, the required output, and the uncertainty rules.

I also have expected outputs checked into the demo, because trusting a live model and conference Wi-Fi at the same time would be an unnecessarily ambitious distributed-systems experiment.

## If an agent produces a poor result

This is actually a useful illustration of the trust requirement. The update is visible, we can identify what is unsupported, and the system should be corrected before the memory is accepted.

## If the field demo must be shortened

Skip Prompt 4. Show the promotion proposal and explain that a component owner would approve it asynchronously.

## If the manager demo must be shortened

Show `inbox.md`, run Prompt 1, and open only the daily brief and 1:1 preparation.

## If both demos must be shortened

Use the expected outputs and narrate the state changes:

```text
raw evidence -> sanitized packet -> isolated case -> verified resolution -> review queue
```

and:

```text
messy capture -> structured project and professional memory -> role-specific outputs
```
