# Speaker Notes — Second Brain for Engineering Teams

This is the read-aloud performance script for the current 19-slide HTML deck,
the local presenter app, and the two executable proof workspaces behind it.

## Performance contract — rehearsal only

- Maximum session slot: **90 minutes**
- Prepared talk target: **69–72 minutes**
- Protected Q&A: **12 minutes**
- Contingency and transition reserve: **5 minutes 45 seconds**
- Timing assumes a deliberate large-room pace of roughly **100–110 spoken
  words per minute**, including pauses, audience interactions, and visible demo
  decisions.
- Slides 1–12: concept, use cases, and pilot metrics
- Slides 13–14: demo transition and viewing contract
- Presenter app, OnSite Fab + Fixer chats, **12–14 minutes**
- Presenter app, Manager Assistant chat, **4–5 minutes**
- Slide 15: 30-day pilot and close
- Slide 19: Q&A
- Slides 16–18: appendix only; do not show during the normal route

Text under **SAY** is intended to be spoken. Everything marked **STAGE CUES**,
**PRESENTER ACTION**, **REHEARSAL ONLY**, or enclosed in square brackets is an
instruction and should not be read aloud.

## One-page timing and routing table — rehearsal only

| Clock | Target | Section | Route |
| --- | ---: | --- | --- |
| 00:00–03:30 | 3:30 | Slide 1 — opening and personal context | Start at slide 1 |
| 03:30–07:00 | 3:30 | Slide 2 — memory tax | Right arrow |
| 07:00–10:00 | 3:00 | Slide 3 — role-specific decisions | Right arrow |
| 10:00–13:00 | 3:00 | Slide 4 — storage versus governed memory | Right arrow |
| 13:00–16:30 | 3:30 | Slide 5 — two context leaks | Right arrow |
| 16:30–20:00 | 3:30 | Slide 6 — governed transformation | Right arrow |
| 20:00–23:00 | 3:00 | Slide 7 — agent and human responsibilities | Right arrow |
| 23:00–27:00 | 4:00 | Slide 8 — trust contract | Right arrow |
| 27:00–30:30 | 3:30 | Slide 9 — field boundary | Right arrow |
| 30:30–33:30 | 3:00 | Slide 10 — case history and shared knowledge | Right arrow |
| 33:30–37:00 | 3:30 | Slide 11 — manager continuity | Right arrow |
| 37:00–40:00 | 3:00 | Slide 12 — success signals | Right arrow |
| 40:00–40:45 | 0:45 | Slide 13 — guided decision lab | Right arrow |
| 40:45–42:45 | 2:00 | Slide 14 — what to watch | Leave deck after this slide |
| 42:45–56:45 | 14:00 | App — OnSite Fab + Fixer Agents | Handoff, diff, and pull request |
| 56:45–61:45 | 5:00 | App — Manager Assistant | Guided chat classification |
| 61:45–67:15 | 5:30 | Slide 15 — 30-day pilot and close | Press `C` to return |
| 67:15–82:15 | 15:00 | Slide 19 — Q&A | Right arrow from slide 15, or press `Q` |
| 82:15–90:00 | 7:45 | Discussion / contingency reserve | Do not plan new content here |

### Deck shortcuts — rehearsal only

- `Home` — slide 1
- `D` — slide 13, guided decision lab transition
- `C` — slide 15, post-demo close
- `Q` or `End` — slide 19, Q&A
- `A` — slide 16, appendix
- Right arrow, Page Down, or Space — next slide
- Left arrow or Page Up — previous slide
- The normal next action from slide 15 skips the appendix and opens slide 19.

## Before the session — rehearsal only

### Presentation setup

- Put these notes on a second device or confidence monitor.
- Open the deck at:
  `/Users/jacobaloysious/Desktop/secondbrain/[SlideDeck]Second Brain for Engineering Teams.html`
- Enter full screen and confirm slides 1, 13, 15, 16, and 19 respond to the
  shortcuts above.
- Disable notifications, screen sleep, software updates, and automatic window
  rearrangement.
- Keep a large clock visible to the presenter. The hard checkpoints are:
  - slide 8 by minute 23;
  - Case #1 starts by minute 43;
  - the Fixer Agent ends by minute 57;
  - the Manager Assistant ends by minute 62;
  - Q&A begins by minute 67.

### Presenter-app preflight

From:

```text
/Users/jacobaloysious/Desktop/secondbrain/Demo/presenter-app
```

Run:

```bash
./run-local.sh
```

Open the printed local URL. The app has no database, live AI, or external data
dependency.

Before the room opens:

1. Press `R` and confirm the OnSite Fab Agent opens at the alignment alert.
2. Use the suggested actions through packet approval.
3. Open the packet viewer and confirm the ZIP download works.
4. Send the packet, then press `2` and confirm the Fixer Agent has one new
   issue.
5. Advance through the mock pull request. Confirm **Request owner review** shows
   a pending state without promotion, then use the distinct Motion Controls
   owner action and open the six-month cold start.
6. Press `S` and confirm Stage view enlarges the conversation and hides the
   composer, inspector, and presenter cues.
7. Press `3` for the Manager Assistant and `F` for browser full screen.
8. Press `R` and return to the OnSite Fab Agent.

Use the same spoken disclosure on every route: the app is a deterministic
replay backed by real local artifacts, validators, and tests; it does not
change an external system. The three tabs represent three role scopes; they do
not require three different foundation models.

### Technical-proof preflight — not audience-facing

Before the session, verify both workspaces once:

```bash
./Demo/field-issue/scripts/test-demo.sh
./Demo/manager-collaboration/scripts/test-demo.sh
```

Do not run these commands during the normal presentation. Keep the repository
open only as a Q&A fallback.

### The one-decision rule

Each chat beat has one communication job:

1. ask the question;
2. take the room's answer;
3. use the primary suggested action;
4. state why the result matters;
5. move on.

Do not click through every tab, validator, or generated output. The audience is
here to inspect decisions and guardrails—not implementation choreography.

---

# Presentation

## Slide 1 — Second Brain for Engineering Teams

**Target time:** 3 minutes 30 seconds

### SAY

Good morning, everyone.

Let me begin with a situation many engineering teams know very well.

A difficult issue arrives. The logs are in one place. The physical observation
is with someone else. The design rationale is in an old conversation. A useful
workaround lives in the memory of an engineer who happens to be on leave.

The first engineering task is not diagnosis. It is archaeology.

[PAUSE]

My name is Jacob Aloysious. I am currently based in Singapore, and I have been
working at Meta for about five years as a software engineering manager.

I was born and brought up in Chennai. Before moving to Singapore and joining
Meta, I spent about six years at KLA in Chennai. I was part of the eBeam
division, working with the eCougar and Machine Control teams.

That combination of semiconductor equipment, software, and engineering
management is why this topic matters to me. In complex systems, context is not a
nice extra. It changes how quickly we can make a safe decision.

On the personal side, I am married and have a twelve-year-old daughter. She
maintains a surprisingly accurate audit log of every promise I make, so I also
receive regular reminders that human memory is not a dependable system of
record.

[LOOK UP]

Today I want to talk about a second brain for engineering teams.

I do not mean a larger wiki, a cleverer notes application, or a place where we
dump everything and hope search rescues us later.

I mean a governed memory pipeline:

preserve useful context;

respect the boundary around that context;

and improve the next decision.

That last part is the test. If the next engineer, manager, or leader is not able
to decide faster or more safely, then producing more files is not progress.

I will build the idea in three steps. First, why engineering organizations pay a
memory tax. Second, what a governed memory loop changes. Third, two live cases:
one technical case in depth, and one short manager case that tests the privacy
boundary.

### STAGE CUES

- [LOOK UP] for the first two paragraphs and the central definition.
- [PAUSE] after “The first engineering task is not diagnosis. It is archaeology.”
- Keep the family joke light; do not wait for laughter.
- [CLICK] to slide 2.

---

## Slide 2 — Memory Tax

**Target time:** 3 minutes 30 seconds

### SAY

Engineering work creates more context than one person can reliably hold.

Before I define the memory tax, a quick show of hands.

How many of you have spent time in the last month reconstructing a decision,
incident, or handoff that your organization had already discussed?

[SHOW OF HANDS — 20 SECONDS]

That reconstruction is the tax.

It appears in three familiar forms.

First, drifting context. The code changes, the configuration changes, the tool
changes, but the explanation around it quietly becomes stale.

Second, lost rationale. We can see what was chosen, but we cannot see why. So a
rejected option returns six months later looking new, and the team gets to enjoy
the same debate again.

Third, open loops. A follow-up has no clear owner. A conditional date is repeated
as if it were a commitment. A small promise remains active in somebody's head.

The expensive part is not simply forgetting. The expensive part is that
judgment starts late.

An engineer cannot compare hypotheses until the history is reconstructed.

A manager cannot act on risk until ownership and uncertainty are reconstructed.

A leader cannot tell whether knowledge is reusable until its source trail and
freshness are reconstructed.

Human attention is much more valuable for finding patterns, challenging
assumptions, weighing trade-offs, and deciding what to do next.

When we use that attention to rebuild yesterday's context, we pay the memory tax
before the real work even begins.

The goal of a second brain is not perfect recall. The goal is to make reliable
context available at the moment a decision must be made.

Think about a familiar incident review. The team may eventually reach the right
answer, but first somebody searches chat, somebody asks who was on call, and
somebody else discovers that the dashboard changed names last quarter. None of
that reconstruction is the expert work we hired the team to do.

The memory tax also compounds across handoffs. Ten minutes lost by one person
becomes an hour when six people independently rebuild the same picture. At
organizational scale, the tax is not a personal productivity problem. It is an
execution-system problem.

### STAGE CUES

- [LOOK UP] before asking for hands.
- Hold the hand vote to 20 seconds; do not invite stories yet.
- Point once to each of the three cards.
- Emphasize the slide's central line: “judgment starts late.”
- [CLICK] to slide 3.

---

## Slide 3 — Different roles lose the same thing: decision context

**Target time:** 3 minutes

### SAY

This talk is for the whole engineering organization.

The specific questions change by role, but the underlying loss is the same:
decision context arrives late, incomplete, or untrusted.

For engineers—including software engineers, systems engineers, application
engineers, and field engineers—the questions are:

What failed?

Why did we choose this?

What should I try next?

For managers, the questions change:

What changed?

Who owns it?

What must I follow through?

And for leaders:

Where does knowledge decay?

What is truly reusable?

Is the way we are using AI governed?

These are not three separate memory products.

They are three surfaces over a shared need: continuity at the moment of
decision.

The engineer may need a discriminating experiment.

The manager may need a draft risk update and an unresolved question.

The leader may need evidence that the boundary is tested and that stale
knowledge can be retired.

The underlying memory can support all three, but only if it preserves the
difference between facts, hypotheses, commitments, and judgments.

That difference is important. A hypothesis is not a fact. A conditional date is
not a commitment. A professional follow-up is not a personality assessment.

If we flatten all of those into one generic summary, the text becomes shorter,
but the decision does not become safer.

The roles also meet in the same workflow.

A field engineer may supply the observation. An offsite engineer chooses the
experiment. A manager removes the dependency. A leader asks whether the result
can safely become reusable guidance.

If each handoff begins with a different reconstruction of the truth, the
organization does not really have continuity. It has a relay race in which every
runner redraws the map.

A shared memory foundation should preserve the thread while giving each role
only the context and authority appropriate to its decision.

### STAGE CUES

- Move your gaze across the three role rows.
- Do not list additional job titles beyond the first engineer sentence.
- [PAUSE] after “These are not three separate memory products.”
- [CLICK] to slide 4.

---

## Slide 4 — Storage preserves information. It does not maintain trust.

**Target time:** 3 minutes

### SAY

Most organizations already have plenty of storage.

We have document systems, tickets, chat, dashboards, repositories, and a folder
somewhere called “miscellaneous” that nobody is emotionally ready to open.

Storage is useful, but storage is passive.

It can hold a note. It cannot tell us whether the note is still current, whether
it is safe to move, whether the author meant a fact or a guess, or whether one
incident should become guidance for every future incident.

The passive loop on the left is familiar:

capture;

file;

search;

guess.

The pile grows. Ownership becomes unclear. Freshness becomes invisible.

A governed memory system has a lifecycle.

Trace the source.

Classify the information.

Review consequential changes.

Retire or supersede knowledge when the evidence changes.

“Retire” matters. Trusted memory cannot be append-only forever. An entry needs
an owner, a review date, and a way to say, “This was correct under the old
evidence, but it is no longer the current guidance.”

So the main problem is not capture. Engineers are already producing context all
day.

The problem is maintenance: deciding what the context means, where it belongs,
what boundary applies, and when it should be trusted again.

That is the work we want the system to help prepare—without handing the final
decision to the system.

There is another subtle risk with passive storage: an old answer can be easier
to find than a correct answer.

Searchability is not the same as trustworthiness.

A beautifully indexed diagnostic from three product versions ago can make the
wrong action arrive faster. Governed memory therefore needs negative
information too: what was rejected, what has expired, what superseded this
entry, and which scope the guidance does not cover.

The goal is not to make every artifact permanent. The goal is to make the
current decision traceable.

### STAGE CUES

- Point to the left column while saying the passive loop.
- Move to the right column for the governed lifecycle.
- Keep the “miscellaneous” joke brief.
- [CLICK] to slide 5.

---

## Slide 5 — Start where context first leaks

**Target time:** 3 minutes 30 seconds

### SAY

The best place to begin is not with a tool. It is with one recurring moment
where context leaks.

Here are the two moments we will use today.

On the left, a field issue.

A semiconductor tool fails after repeated retries. The machine events and
sensor patterns are useful, but they contain restricted context that cannot
simply travel to offsite engineering.

The field engineer is next to the tool. They can see behavior that may not be
fully represented in the logs.

So the question is not, “Can an AI summarize the files?”

The question is, “What may safely leave the fab, and who decides?”

On the right, a manager's post-stand-up note.

One short note can contain a delivery risk, an owner dependency, a stakeholder
update, and a promise to an engineer.

Some of that should become durable professional context.

Some of it must remain explicitly uncertain.

And some observations should not be remembered at all.

So the manager question is, “What should—and should not—be remembered?”

[LOOK UP]

Take ten seconds and choose one side.

Which leak looks more like the recurring pain in your own team: technical
handoff, or coordination follow-through?

[SILENT REFLECTION — 10 SECONDS]

The details are different, but the design move is the same:

capture the moment naturally;

define the boundary;

then structure the context.

Do not begin by designing a universal knowledge taxonomy. Begin at a painful
decision where missing context is already costing the team time.

This keeps the first implementation honest.

If the chosen leak is “everything engineers know,” the scope is already too
large to test.

If the leak is “the first hour of this recurring handoff,” the team can name the
input, the boundary, the decision, the owner, and the success signal.

That is small enough to govern and concrete enough for engineers to challenge.
It also gives skeptical users a safe way to test the behavior before trusting
the system with broader context.

### STAGE CUES

- Point left for the field case and right for the manager case.
- Keep the reflection silent and exactly ten seconds.
- [PAUSE] before the final three-line pattern.
- [CLICK] to slide 6.

---

## Slide 6 — The second brain is the governed transformation

**Target time:** 3 minutes 30 seconds

### SAY

This is the core model for the rest of the talk.

The second brain is not the raw input and it is not the final document.

It is the governed transformation between raw context and the next decision.

Step one is capture.

Capture should be natural: logs, notes, observations, messages, tickets, or
voice. The human should not need to perform a twenty-step filing ritual at the
end of every day.

Step two is govern.

This is where the real value sits.

Classify before remembering.

Separate facts from hypotheses.

Preserve conditional language.

Ask when evidence is incomplete.

Validate a data boundary.

Require review before shared reuse.

Step three is surface.

The output should be ready for a decision: an isolated case, the next
experiment, a daily brief, a draft update, or a small piece of reviewed
component guidance.

Notice that the loop is not “capture, summarize, store.”

It is “capture, govern, surface, decide.”

A summary reduces the amount of text. A governed transformation changes what
the organization can safely do next.

In the field case, governance decides which sanitized packet may cross and
which verified lesson may later be reused.

In the manager case, governance decides what becomes project context, what
remains uncertain, and what speculative judgment is rejected.

The model and the storage technology can change. The contract around
classification, ownership, evidence, and review should remain.

That is why this idea is larger than a specific note-taking product or a
specific AI model.

The word “govern” can sound heavy, so let me make it practical.

Governance here is not a committee reviewing every sentence.

It is a set of typed decisions:

this observation is a fact;

this cause is a hypothesis;

this date is conditional;

this packet may cross;

this lesson requires a component owner;

this people judgment must not be stored.

When those decisions are explicit, the automation becomes easier to inspect,
test, and correct. When they are implicit, a fluent answer can hide a dangerous
assumption.

### STAGE CUES

- Trace the diagram from left to centre to right.
- Spend most of the time on the centre, “Govern.”
- Emphasize “capture, govern, surface, decide.”
- [CLICK] to slide 7.

---

## Slide 7 — Agents prepare context. Humans own the outcome.

**Target time:** 3 minutes

### SAY

If the system prepares the context, what remains human?

Quite a lot.

On the left, the agent prepares.

It extracts supported facts and visible uncertainty.

It asks for missing evidence.

It drafts the next experiment or message.

It records the source and confidence.

On the right, the human decides.

The human authorizes a boundary crossing.

The human chooses the experiment or action.

The human verifies the real-world result.

The human approves reuse or communication.

This is not a ceremonial approval step where the person clicks “yes” on
something they cannot inspect.

The human must be able to see the evidence, understand the uncertainty, correct
the record, and say no.

That division of work matters because accountability does not move to the model
just because preparation becomes faster.

In the field case, the onsite field engineer owns the approved local evidence
and the physical intervention. Engineer owns offsite diagnosis, experiment
design, and verification. A component owner approves shared learning.

In the manager case, the system produces private drafts. The manager decides
what to use, edit, retain, or send. The system does not send anything by itself.

The design principle is simple:

automate preparation;

do not automate accountability.

This split also prevents the human from becoming a rubber stamp for every model
output.

Review should be concentrated at consequential points: crossing a restricted
boundary, choosing an experiment with real cost, communicating a risk, or
promoting knowledge that will influence future engineers.

Routine extraction can be automated. Authority remains explicit.

The design question is therefore not, “Where can we put a human in the loop?”

It is, “Which decision needs a named human, and what evidence must that person
see?”

### STAGE CUES

- Point to the agent column, then the human column.
- [LOOK UP] for “accountability does not move to the model.”
- Do not imply that a human must review every low-risk formatting operation;
  the point is consequential boundaries and outcomes.
- [CLICK] to slide 8.

---

## Slide 8 — Trust is an operating contract

**Target time:** 4 minutes

### SAY

Trust is not a feeling we add after the demo works.

It is an operating contract.

The first part is traceability: show your work.

For a consequential update, expose the source, the destination, the time, the
confidence, and the unresolved questions.

The second part is a clarification gate: ask when unsure.

Low confidence should not silently become durable memory. If the system cannot
distinguish a fact from a conditional statement, the safe behavior is to ask.

Quick choice.

When the evidence is incomplete, should the agent make the most likely guess,
or stop and ask one useful question?

[SHOW OF HANDS — 20 SECONDS]

The answer sounds obvious on a slide. It becomes harder when asking adds delay.
That is why the behavior needs a clear contract.

The third part is correction plus evaluation: correct and test.

Human corrections must update the record, and deterministic checks must protect
important boundaries.

A prompt can guide an agent. A prompt alone is not enforcement.

If the only data-loss control is a sentence saying “please do not leak the raw
logs,” we have written a polite request, not built a boundary.

In the field demo, a draft packet will be rejected until a field engineer has
reviewed it. Export scans it. Engineering validates it again. Promotion refuses
to run until a named human approval exists.

In the manager demo, conditional timing remains conditional, speculative people
judgment is rejected, and every surfaced output remains a private draft with a
receipt.

So the trust contract is:

visible;

correctable;

testable.

Those are the behaviors to watch in the live work.

There are two different kinds of tests behind this contract.

Model evaluations tell us whether the output is useful: did it separate facts
from hypotheses, ask a discriminating question, or preserve the intended
meaning?

Deterministic checks protect rules that must not be optional: was the packet
reviewed, did a restricted pattern appear, does the checksum match, is there a
named approval?

We need both.

A deterministic validator cannot judge whether an engineering hypothesis is
insightful. A model should not be the only control deciding whether restricted
evidence may cross.

### STAGE CUES

- Point to “Show your work,” “Ask when unsure,” and “Correct and test.”
- Hold the show-of-hands interaction to 20 seconds.
- [PAUSE] after “A prompt alone is not enforcement.”
- [CLICK] to slide 9.

---

## Slide 9 — Case #1: Field issue — how context crosses the boundary

**Target time:** 3 minutes 30 seconds

### SAY

Now let us apply the contract to a field issue.

Start on the left, inside the fab.

The raw machine logs, restricted identifiers, sensor context, and live tool
observations stay there.

In the centre, the onsite agent and the field engineer work as a loop.

The agent analyzes the local evidence and asks a targeted clarification
question.

The field engineer uses physical access to answer that question, correct the
draft, and review the wording.

The output is not “all the logs, but shorter.”

It is a human-reviewed export packet containing sanitized facts, hypotheses,
confidence, redactions, and open questions.

Then a validator controls the crossing.

It checks the review metadata and scans for restricted content. Engineering
independently validates the received artifact and its checksum.

On the right, Engineer leads the offsite diagnosis.

She receives sanitized evidence, not the raw fab context.

She separates facts from hypotheses, chooses the next discriminating
experiment, assigns the owners, and verifies the returned result.

The ownership is intentionally split.

Engineer owns diagnosis, experiment design, and verification.

The onsite field engineer owns approved capture and physical work at the tool.

The agent prepares the decision workspace. It does not replace either engineer.

The line at the bottom is the boundary:

validated context crosses;

restricted evidence does not.

And in the demo, that boundary will be executed by scripts and tests—not merely
described in the prompt.

One more distinction matters.

The export packet is not the raw evidence and it is not the final diagnosis.

It is a decision-quality handoff: enough supported context for Engineer to choose
the next experiment, with uncertainty preserved and questions still visible.

That makes the boundary useful rather than merely restrictive. Security that
blocks every useful handoff is not a working engineering system. The design
goal is the smallest safe context that enables the next responsible decision.

### STAGE CUES

- Trace the slide left to centre to right.
- Do not reveal the physical cause.
- Emphasize the ownership split.
- [CLICK] to slide 10.

---

## Slide 10 — Not every case becomes component knowledge

**Target time:** 3 minutes

### SAY

Once we retain cases, an important objection appears:

Will the shared engineering memory eventually become a noisy collection of
incident-specific guesses?

It will—if every case is allowed to rewrite global knowledge.

The left circle is case history.

Every issue may remain traceable there: its evidence, actions, experiments,
decisions, and final resolution.

Most cases stay there.

They may be one-off failures. They may depend on a specific environment. They
may close without producing a lesson that should guide anyone else.

The right circle is component knowledge.

It is deliberately smaller.

It contains approved diagnostics, validated failure modes, a source trail, a
review owner, and a lifecycle.

The overlap is verified reusable learning.

A resolved case may propose a reusable finding, but proposal is not promotion.

A named human owner reviews the scope, limitations, source trail, and future
maintenance responsibility. Only then may the shared guidance change.

And if later evidence contradicts it, the entry should be superseded with its
history intact—not silently rewritten.

So the operating model is:

many cases;

few promotions;

trusted guidance.

That protects engineering memory from rot.

This separation also changes how ownership works over time.

The case owner can close an individual investigation. The component owner
maintains shared guidance for future cases. Those are different responsibilities
and should not be collapsed into one automatic write.

Case history may grow large because it is traceable evidence. Shared guidance
should remain deliberately small because every entry creates future influence
and maintenance cost.

[PAUSE]

Now let us use the same typed-memory principle in a very different setting:
manager follow-through.

### STAGE CUES

- Point to case history, then shared knowledge, then the overlap.
- [LOOK UP] for “proposal is not promotion.”
- Use the final sentence as the bridge to slide 11.
- [CLICK] to slide 11.

---

## Slide 11 — Case #2: What deserves to become memory?

**Target time:** 3 minutes 30 seconds

### SAY

One stand-up can create several kinds of follow-through.

In our example, the QA login failure puts the migration at medium risk.

Rahul may be able to unblock it by Thursday **if** infrastructure provides test
credentials.

That language is conditional. Thursday is not confirmed.

Maya needs a corrected risk update.

And the manager promised Priya a staffing review before the next sprint
planning session.

One messy note now contains project context, uncertain timing, a stakeholder
draft, and a professional commitment.

The manager is at the centre because those obligations compete for the same
attention.

The four shapes around the manager represent four kinds of follow-through:

a daily brief;

conversation continuity;

stakeholder preparation;

and delegation follow-through.

They do not all need to become separate products or separate files. The point
is that the same capture can be surfaced differently when the manager needs to
review, decide, or follow through.

There is also a hard boundary.

Remembering “I promised Priya a staffing review” is professional continuity.

Inferring Priya's mood, personality, motivation, or performance is not.

The guided demo includes an intentionally speculative line. The system must reject
it rather than creating a private people dossier.

All outputs remain manager-private drafts. The manager reviews them before use,
and nothing is sent automatically.

Useful continuity should reduce forgotten commitments without creating a
people dossier.

For a real deployment, the privacy design must also be visible.

Who can read the manager's private workspace?

How long is a draft retained?

Which source receipt supports it?

When should a professional follow-up be reviewed or deleted?

The demo exposes those fields because “the model promised to be respectful” is
not a privacy architecture.

The memory should stay close to the person accountable for the follow-through,
and its scope should be narrower than the systems used for formal performance
or employee records.

### STAGE CUES

- Stress the words “may,” “if,” and “not confirmed.”
- Point to the four follow-through surfaces without reading every body line.
- Keep a serious tone for the privacy boundary.
- [CLICK] to slide 12.

---

## Slide 12 — A second brain must improve decisions—not just create files

**Target time:** 3 minutes

### SAY

If we pilot this idea, how should we measure it?

Not by counting notes.

Not by counting tokens.

Not by counting how many Markdown files an agent can generate before lunch.

The primary signal is time to the next grounded decision.

How quickly can an engineer, manager, or leader move from scattered context to
a justified next step?

Then there are three supporting signals.

First, context recovery time.

How much time do people spend reconstructing the current state before they can
reason about it?

Second, late handoff clarification.

How much repeated reconstruction happens because a useful question was not
asked early enough?

Clarification is sometimes exactly the right behavior. The goal is not zero
questions. The goal is to ask one good question early and avoid several late
loops when evidence is genuinely missing.

Third, governed reuse.

Does approved learning help a later case?

Do unsafe transfers and unapproved promotions get blocked?

A good pilot measures both the useful path and the refusal path.

If the system produces an attractive summary but does not speed up or improve
the next decision, the memory is not working.

In the field demo, watch whether a new engineer can start with a reviewed
diagnostic path six months later.

In the manager demo, watch whether useful context survives while uncertainty
and privacy boundaries remain visible.

Before a pilot begins, capture a baseline.

How long does the team spend today reconstructing the case?

How many late handoff clarification loops occur?

How often does an engineer find a prior diagnostic useful, and how often is it
stale?

Then compare the governed workflow against that baseline.

Also track correction rate, rejected unsafe actions, and the age of shared
guidance. A system that looks faster only because it skips clarification or
review is not an improvement.

The pilot should have a stop condition too. If the workflow adds maintenance
work without improving the decision, retire it rather than expanding it.

### STAGE CUES

- Point first to the large primary signal.
- Walk through the three supporting metrics.
- [PAUSE] after “A good pilot measures both the useful path and the refusal
  path.”
- [CLICK] to slide 13.

---

## Slide 13 — GUIDED DECISION LAB

**Target time:** 45 seconds

### SAY

We have the model. Now let us see whether the behavior holds up.

This is a deterministic replay of the governed workflow. The downloadable
packet, validators, tests, and boundaries are real; no external system is being
changed.

One engineering case in depth.

One short manager case for breadth.

The first demo is the main proof: a field issue moves through clarification,
validation, diagnosis, human approval, and later reuse.

The second is shorter: one manager note becomes useful follow-through while
speculative people judgments are deliberately rejected.

### STAGE CUES

- Keep this slide energetic and brief.
- [CLICK] to slide 14.

---

## Slide 14 — What to watch across the three agent workspaces

**Target time:** 2 minutes

### SAY

Before I leave the deck, here is the viewing contract.

Please watch the decisions and guardrails—not the mechanics of prompts,
commands, or generated files.

In Demo 1, watch three moves:

question;

validate;

reuse.

The onsite agent should ask for the missing observation.

The transfer validator should reject anything unreviewed or restricted.

And a future engineer should receive only approved learning, with its source
and limitations.

In Demo 2, watch another three moves:

remember;

qualify;

reject.

A supported project risk should be remembered.

Rahul's timing must remain conditional.

And a speculative people judgment must be rejected.

For every proof, I will use the same pattern:

what question are we testing;

what result do we see;

what does that result mean?

The browser experience uses three familiar role-scoped workspaces. Watch how
context moves between roles, where a human gate appears, and what is
deliberately not carried forward. The executable validators and tests remain
available for technical Q&A.

### STAGE CUES

- Point left for the field workflow and right for manager continuity.
- [LOOK UP] for “question, result, meaning.”
- [LEAVE THE DECK] and switch to the presenter app.

---

# Presenter App — Three role-scoped chats

**Target time:** 17–19 minutes

**Communication job:** Make the second brain feel like a familiar work
interface while showing that each role gets different context, permissions,
and human decision ownership.

### PRESENTER ACTION

Switch to the presenter app, press `S` to enter Stage view, then press `R`. Do
not look for, or imply the
existence of, a live-AI status banner; the disclosure has already been made on
Slide 13 and spoken aloud.

### SAY

Instead of showing prompts, terminals, and a file tree, I will show the same
workflow through three chat workspaces.

The OnSite Fab Agent can work with restricted evidence.

The Fixer Agent can work with the reviewed packet, code, tests, and approved
component guidance.

The Manager Assistant can work only with the manager's own note.

These do not need to be three different foundation models. Think of them as
three roles over the same memory architecture, each with a different context
boundary.

## Chat 1 — OnSite Fab Agent

**Target time:** 5–6 minutes

### SAY

The first interaction begins without anyone writing a prompt.

The mock telemetry reports: alignment failed.

The agent notices a repeated pattern and asks the field engineer whether to
start a local investigation.

Detection is not diagnosis. It is simply a good moment to offer help.

### PRESENTER ACTION

Click **Start local investigation**.

### SAY

The agent extracts a supported relative sequence and asks one targeted
question:

does vibration continue through the measurement window?

This is where the onsite engineer matters. They are next to the physical tool.
They can observe something the offsite engineer and the model cannot.

At the same time, the context inspector shows the boundary. This agent may see
restricted machine evidence, but it cannot see offsite source code and it
cannot update shared knowledge.

### PRESENTER ACTION

Click **Confirm onsite observation**, then **Create sanitized draft**.

### SAY

The draft contains facts, a moderate-confidence hypothesis, an open gap, and a
redaction record.

It does not claim a mechanical cause.

And because this is only a draft, usefulness is not permission.

Let us deliberately take the wrong action.

### PRESENTER ACTION

Click **Send now**.

### SAY

Export refused: missing approved review status.

The packet remains local.

The field engineer is not a courier. They are the domain expert who checks the
observation, wording, and release boundary.

### PRESENTER ACTION

Click **Review packet**, then **Approve reviewed transfer**.

Click **View contents**.

### SAY

This is the exact handoff bundle.

It contains a debug packet, a manifest, and boundary instructions.

Notice what is absent: raw log lines, timestamps, exact values, customer
identifiers, tool identifiers, and local filenames.

I can download this as a real ZIP. The normal on-stage route does not need the
ZIP, but it is there for inspection and rehearsal.

### PRESENTER ACTION

Close the viewer. Click **Send to Fixer**, then **Open Fixer Agent**.

### SAY

The engineering-side importer independently validates the reviewed artifact.

Only then does the Fixer Agent receive a new issue.

One human-reviewed context packet crossed the boundary. The restricted evidence
did not.

## Chat 2 — Fixer Agent

**Target time:** 8–9 minutes

### SAY

Engineer does not begin by asking, “Can somebody send me the logs again?”

She receives one reviewed issue notification.

### PRESENTER ACTION

Click **Open field issue**.

### SAY

The first useful move is separation.

On the left are supported facts.

On the right are hypotheses.

The stage path is suspicious. A stage-to-vision interaction is still possible.
A mechanical cause is not established.

What is the smallest experiment that distinguishes those paths?

[TAKE TWO ANSWERS — 20 SECONDS]

### PRESENTER ACTION

Click **Prepare stage-settling experiment**.

### SAY

Now the outcome branches are explicit before the work begins.

If settling normalizes and alignment recovers, the stage path is supported.

If settling normalizes but alignment still fails, investigate the
stage-to-vision interaction before changing vision configuration.

The agent prepares the decision. Engineer owns the diagnosis and verification.
The onsite engineer owns physical intervention.

### PRESENTER ACTION

Click **Run diagnostic + inspect code**.

### SAY

The diagnostic reveals a hybrid failure.

Onsite inspection supports a degraded stage damper.

But Engineer also finds a software weakness.

The settle gate treats one in-position sample as settled. It does not check
whether the stage is still moving, and it does not require a stable window.

The motion simulator reproduces the defect: alignment begins while velocity is
still unstable.

So the current tool needs physical recovery, and the product needs a software
guardrail.

This matters because “fix the hardware” is not enough when software can start a
precision operation before motion is actually stable.

### PRESENTER ACTION

Click **Review proposed diff**.

### SAY

Now we have an artifact software engineers recognize.

The removed code accepts a single position check.

The new code requires both position and velocity to be stable for consecutive
samples.

If either condition fails, alignment does not begin. The software returns an
actionable stage diagnostic instead of allowing a generic alignment failure
later.

The second file adds the regression tests:

do not report settled while the stage is still moving;

and require the full stable-sample window.

This is not the agent saying, “Trust me, I fixed it.”

It is a diff that Engineer can inspect, test, review, and own.

### PRESENTER ACTION

In the diff viewer, switch once between the runtime file and test file.

Click **Create pull request**.

### SAY

The mock pull request now has a repository, branch, two changed files, test
results, and an open human-review requirement.

It also names the rollout boundary: canary first, while watching the
stage-not-stable rate and alignment success.

The agent drafted the change.

Engineer still owns whether the code is correct, who reviews it, whether it
merges, and how it is deployed.

### PRESENTER ACTION

Click **Simulate review + deploy + verify**.

### SAY

This is an explicit time jump.

Code review, merge, deployment, physical service, and five field verification
runs did not happen instantly in the chat.

The pull request is now merged.

The onsite field engineer has restored the degraded damper.

Five repeated runs pass with the software guard active.

Now the case can close—and that creates a separate question:

what, if anything, deserves to become reusable engineering guidance?

The damaged damper is true for this case. The action list is useful for this
case. Neither is a safe default for every future alignment issue.

The reusable candidate is the software guardrail plus the diagnostic:

require stable position and velocity before alignment;

and if the guard rejects motion, run the stage-settling diagnostic before
changing vision configuration.

### PRESENTER ACTION

Leave only **Promote the diagnostic + software guardrail** selected. Click
**Review knowledge selection**.

### SAY

The agent creates a promotion proposal with source and limitations.

But Engineer still cannot rewrite shared component guidance directly.

### PRESENTER ACTION

Click **Promote now**.

### SAY

Promotion refused: a human approval record is missing.

This is the second human gate. The first governed what may cross the fab
boundary. This one governs what may influence future engineers.

### PRESENTER ACTION

Click **Request owner review**.

### SAY

The request has been sent, but shared guidance is unchanged. The component
owner receives the source case, code reference, proposed scope, and explicit
limitations. Requesting review is not the approval decision.

### PRESENTER ACTION

Click **Motion Controls owner: approve**.

### SAY

Now a named component owner has made the separate decision. Only the software
guardrail and narrow diagnostic are promoted.

### PRESENTER ACTION

Click **Six months later: open cold start**.

### SAY

A new engineer receives the approved diagnostic, its source, its limitation,
and a justified next action—not this case's physical cause or old action list.
The system explicitly refuses to assume another damaged damper.

That is the difference between accumulating incidents and building trusted
engineering memory.

## Chat 3 — Manager Assistant

**Target time:** 4–5 minutes

### PRESENTER ACTION

Press `3`.

### SAY

The third tab applies the same governed transformation to a different boundary.

The Manager Assistant sees only a note supplied by the manager. It does not
scrape employee messages, meetings, or private activity.

The note contains a real project risk, conditional timing, a professional
promise, and one speculative people judgment.

### PRESENTER ACTION

Click **Process the note**.

### SAY

Which two words make Thursday uncertain?

[TAKE ANSWERS — 10 SECONDS]

“May” and “if.”

The risk and blocker are remembered.

Rahul's timing stays conditional.

The staffing promise becomes professional follow-through.

And “Priya seemed off” is rejected. It does not become durable people memory.

### PRESENTER ACTION

Click **Create follow-through drafts**.

### SAY

The retained context becomes three surfaces:

a daily brief;

conversation continuity for the agreed staffing follow-up;

and a stakeholder update for Maya.

Nothing has been sent. These are drafts for the manager to review.

### PRESENTER ACTION

Click **Review Maya draft + receipt**.

### SAY

The receipt is the proof.

It records what was remembered, what remained uncertain, what was rejected, and
that no external action occurred.

Across all three chats, the pattern is the same:

the agent prepares;

the boundary is visible;

and a named human owns the consequential decision.

### STAGE CUES

- Keep the Fixer chat as the longest section; it is the engineering hero flow.
- Use the context inspector only to reinforce permissions and ownership.
- Do not open repository files during the normal route.
- Press `C` in the deck to return to Slide 15.

---

<details>
<summary><strong>Legacy scene-based presenter script — rehearsal history only</strong></summary>

# Legacy Presenter App — Case #1: Field-issue hero workflow

**Target time:** 10–12 minutes

**Communication job:** Show six decisions without asking the audience to parse
prompts, terminals, or a file tree.

### PRESENTER ACTION

Switch to the presenter app, press `1`, then `R`. Use the Slide 13 spoken
disclosure; do not depend on an in-app simulation banner.

## Case #1, Scene 1 — Diagnose before AI

**Target time:** 1 minute 30 seconds

### SAY

Let us begin exactly where the engineer begins: with incomplete evidence.

Fine alignment fails after X-axis movement. Settling exceeds its configured
limit. The same sequence repeats. Vision confidence appears acceptable.

Based on this alone, where would you look first:

stage path;

vision path;

or not enough evidence?

[SHOW OF HANDS — 20 SECONDS]

The stage path is suspicious. But the evidence does not establish a cause.

And there is a second constraint: every clue on this screen is restricted.

### PRESENTER ACTION

Click the room's chosen option if useful, then press `Space`.

### SAY

Useful evidence does not automatically become transferable evidence.

Raw lines, identifiers, exact values, and timestamps remain onsite.

### STAGE CUES

- Do not reveal the later damper result.
- End on the dark boundary statement.
- Right arrow moves to Scene 2.

## Case #1, Scene 2 — Useful is not permitted

**Target time:** 2 minutes

### SAY

The onsite agent has prepared a draft.

Notice what it does and what it does not do.

It extracts the supported pattern, ranks the stage-settling hypothesis at
moderate confidence, lists the missing evidence, records the redactions, and
asks one targeted question.

The question is whether vibration continues through the actual measurement
window.

The packet looks useful. Is that enough permission to send it?

[PAUSE]

Let us try.

### PRESENTER ACTION

Press `Space` to attempt export.

### SAY

Rejected: missing approved review status.

The system also revokes any earlier outbox, so a stale packet cannot remain
available after a failed re-export.

The useful draft stays local.

Now the field engineer uses the approved local observation, answers the
question, reviews the wording, and explicitly approves transfer.

### PRESENTER ACTION

Press `Space` again.

### SAY

That answer raises confidence in the stage-settling path.

But maintenance history and the mechanical cause remain unresolved.

The field engineer is not a courier. They are the onsite domain expert and the
release authority for this packet.

### STAGE CUES

- Let the red rejection remain visible for two seconds.
- Point to “Mechanical cause is still not established.”
- Right arrow moves to Scene 3.

## Case #1, Scene 3 — Make the boundary executable

**Target time:** 1 minute 30 seconds

### SAY

What must become true before this packet may cross?

We need a named human review, a clean redaction scan, valid structure and
identity, and a version bound to the checksum.

### PRESENTER ACTION

Press `Space`.

### SAY

The fab-side validator passes.

Engineering then independently checks the exact reviewed outbox artifact.

Both receipts bind the same packet identity and checksum.

If an arbitrary path, stale receipt, or altered packet appears, ingestion
fails.

The boundary is executable. It is not merely a polite sentence in a prompt.

This browser is a deterministic replay. The sibling repository scripts are the
executable proof, including seventeen safety checks. I can open those during
Q&A if useful.

### STAGE CUES

- Point to the four checks, then the matching receipts.
- Do not open the internals drawer unless the room asks.
- Right arrow moves to Scene 4.

## Case #1, Scene 4 — Context becomes a decision workspace

**Target time:** 2 minutes

### SAY

Engineer is the assigned offsite engineer.

She has code and test access. She has the reviewed packet. She does not have
the raw fab evidence.

This screen separates facts from hypotheses and makes ownership explicit.

What is the smallest experiment that would distinguish the paths?

[TAKE TWO OR THREE ANSWERS — 30 SECONDS]

### PRESENTER ACTION

Press `Space`.

### SAY

Run the approved stage-settling diagnostic with the onsite field engineer.

If settling normalizes and alignment recovers, the stage path is supported.

If settling normalizes but alignment still fails, investigate the
stage-to-vision interaction before changing vision configuration.

Engineer owns diagnosis, experiment design, and verification.

The field engineer owns approved local capture and any physical intervention.

And shared component knowledge remains unchanged.

The agent prepares the decision. Engineer owns the decision.

### STAGE CUES

- Do not state a specific closure run count yet; it is still `needs_review`.
- Point to “Consulted, not changed.”
- Right arrow moves to Scene 5.

## Case #1, Scene 5 — Resolution is not promotion

**Target time:** 2 minutes 30 seconds

### SAY

We now make an explicit time jump.

The physical service and repeated validation did not happen instantly.

The field engineer performed the approved onsite work. The reviewed result
supports a degraded stage damper for this case. Engineer verified five successful
runs and closed the case.

Should a closed case automatically rewrite shared component knowledge?

[SHOW OF HANDS — 15 SECONDS]

Let us try.

### PRESENTER ACTION

Press `Space`.

### SAY

Promotion refused: the human approval record is missing.

The case can be resolved while shared knowledge remains unchanged.

Now the Motion Controls component owner reviews the scope, limitations, source
trail, and future maintenance responsibility.

### PRESENTER ACTION

Press `Space` again.

### SAY

Only now is the diagnostic promoted.

Notice how narrow it is.

When alignment error and stage-settle timeout occur together, and approved
evidence confirms motion through measurement, run the stage-settling diagnostic
before changing vision configuration.

It does not say every alignment problem is a damaged damper.

A reusable diagnostic is not a reusable diagnosis.

### STAGE CUES

- Let the promotion refusal remain visible.
- Name the human owner before revealing approval.
- Right arrow moves to Scene 6.

## Case #1, Scene 6 — Six months later

**Target time:** 1 minute 30 seconds

### SAY

Six months later, a new rotation engineer receives a similar sanitized symptom.

This is a fresh case. The old case is not loaded.

What should this engineer inherit:

the entire old incident;

or one small approved diagnostic?

### PRESENTER ACTION

Press `Space`.

### SAY

The engineer receives the approved diagnostic, the source case, the human
reviewer, and the scope.

They do not inherit the old physical cause, the old actions, or a recommendation
to replace a damper.

The second brain earns its keep by shortening reconstruction without
preselecting the answer.

Three decisions controlled this case:

what may cross;

what is the next experiment;

and what deserves reuse.

### STAGE CUES

- End on “Not carried forward.”
- Press `2` to switch to the manager case.

---

# Legacy Presenter App — Case #2: What deserves to become memory?

**Target time:** 4–6 minutes

**Communication job:** Apply the same governed transformation to professional
follow-through without creating a people dossier.

## Case #2, Scene 1 — Decide what deserves memory

**Target time:** 2 minutes 30 seconds

### SAY

Here is one messy post-stand-up note.

The migration is behind because QA login is failing. Rahul may unblock by
Thursday if infrastructure provides credentials. Maya needs the corrected
medium-risk view. The manager promised Priya a staffing review.

And the last line says, “Priya seemed off today.”

Before we classify anything, which two words make Thursday uncertain?

[TAKE ANSWERS — 10 SECONDS]

### PRESENTER ACTION

Press `Space`.

### SAY

“May” and “if.”

Thursday is useful context. It is not Rahul's commitment.

Now vote on the last line. Should “Priya seemed off today” become durable
people memory?

[SHOW OF HANDS — 20 SECONDS]

### PRESENTER ACTION

Press `Space` again.

### SAY

The supported risk and blocker are remembered as project context.

The conditional timing stays uncertain and creates a clarification action.

The manager's staffing promise becomes professional follow-through.

And the speculative people judgment is rejected. It goes nowhere.

The useful task is not summarization.

It is deciding what to remember, what must remain uncertain, and what must not
become memory.

### STAGE CUES

- Point to the three destinations: Remember, Keep uncertain, Reject.
- Right arrow moves to Scene 2.

## Case #2, Scene 2 — Prove useful continuity with clear boundaries

**Target time:** 2 minutes 30 seconds

### SAY

The first useful surface is not a dossier.

It is the manager's own follow-through:

review Maya's medium-risk update today;

confirm credential ownership and Thursday viability;

and review staffing with Priya before sprint planning.

The manager decides what to use or send.

### PRESENTER ACTION

Press `Space`. Use the tabs to show the daily brief and Maya draft.

### SAY

The daily brief keeps the blocker and uncertainty visible.

The stakeholder draft corrects the risk, preserves the dependency, and says
that Thursday is not confirmed.

Nothing was sent. Every surface is a manager-private draft requiring human
review.

What proves this is useful continuity with clear boundaries?

### PRESENTER ACTION

Press `Space` again.

### SAY

The receipt.

It records the source, what was remembered, what stayed uncertain, what was
rejected, and which questions remain open.

Its boundary check confirms that no mood or performance inference was retained.

Same governed transformation; different boundary and decision.

Useful professional context survives.

Uncertainty stays visible.

Speculative judgment does not become memory.

### STAGE CUES

- Keep the receipt visible for the closing line.
- Press `C` in the slide deck to return to Slide 15.

---

</details>

<details>
<summary><strong>Legacy terminal walkthrough — rehearsal and technical Q&amp;A only</strong></summary>

# Legacy Live Demo 1 — Field-issue terminal workflow

**Target time:** 18 minutes

**Communication job:** Show that the onsite expert and agent decide what may
cross, Engineer turns the reviewed packet into the next experiment, and only
verified human-approved learning helps a later engineer.

**Visible proof-file limit:** five.

## Demo 1, Beat 1 — Ask the audience to diagnose first

**Target time:** 1 minute 30 seconds

### PRESENTER ACTION

Confirm the terminal is in:

```text
/Users/jacobaloysious/Desktop/secondbrain/Demo/field-issue
```

Open proof file 1:

```text
fab-side/ONSITE-EVIDENCE-BOARD.md
```

### SAY

This is a presentation view of the restricted onsite evidence.

We have a fine-alignment failure after X-axis movement, repeated settling
problems, acceptable vision confidence, and an onsite observation that retries
do not recover.

Based on this alone, which path would you choose:

stage path;

vision path;

or not enough evidence?

[SHOW OF HANDS — 30 SECONDS]

The responsible answer is that the stage path is suspicious, but the evidence
is not yet enough to establish a cause.

And all of this board remains restricted.

Offsite engineering cannot receive a prettier copy of the raw evidence.

### STAGE CUES

- Use a three-way hand vote; do not take verbal answers.
- Do not reveal the later damper result.
- Keep proof file 1 visible until Prompt 1 is submitted.

## Demo 1, Beat 2 — The agent drafts; the onsite human answers

**Target time:** 4 minutes

### PRESENTER ACTION

Paste **Prompt 1 — Local analysis creates a draft and one useful question** from:

```text
/Users/jacobaloysious/Desktop/secondbrain/Demo/field-issue/DEMO-PROMPTS.md
```

[START 20-SECOND TIMER]

If the agent has not produced a usable result at 20 seconds, stop it and run:

```bash
./scripts/load-golden-stage.sh draft
```

Open proof file 2:

```text
fab-side/local-analysis/debug-packet.md
```

Show only:

- subsystem hypotheses and confidence;
- missing evidence;
- field clarification;
- pending review metadata.

Attempt export:

```bash
./scripts/export-reviewed-packet.sh
```

Load the rehearsed human response without opening a sixth file:

```bash
./scripts/load-golden-stage.sh field-response
```

Paste **Prompt 2 — AI incorporates the answer; human approval remains
explicit** from
`/Users/jacobaloysious/Desktop/secondbrain/Demo/field-issue/DEMO-PROMPTS.md`.

[START 20-SECOND TIMER]

If needed, stop the live run and load:

```bash
./scripts/load-golden-stage.sh reviewed
```

Return to the same proof file and show:

- `review_status: approved`;
- named reviewer and review time;
- `transfer_approved: true`;
- changed confidence;
- remaining uncertainty.

### SAY

The first prompt is not “summarize the logs.”

It requires a sanitized draft, explicit uncertainty, redactions, and one
targeted question.

[WHILE THE AGENT RUNS]

The important question is whether X-axis vibration continues through the actual
measurement window. That observation helps distinguish a stage-settling path
from a vision-only path without exporting the raw evidence.

Here is the draft.

The stage-settling hypothesis has moderate confidence. The mechanical cause is
not established. The packet asks the field engineer for one local observation.

Now I will try to export it.

[RUN THE EXPORT; LET THE REJECTION REMAIN VISIBLE]

The packet looks useful, but usefulness is not permission.

It is still pending field review, so export fails.

For conference timing, I am loading the rehearsed onsite response. The field
engineer confirms that motion continues through the measurement window,
records that maintenance history still needs review, checks the sanitized
wording, and explicitly approves transfer.

The agent incorporates that answer without copying it verbatim.

Now the stage-settling path becomes moderate-to-high confidence, but the
mechanical cause remains unverified.

The field engineer is not a courier. They are the onsite domain expert who
answers the question and approves what may cross.

### STAGE CUES

- Keep the 20-second fallback automatic and calm.
- Use only the packet as the visible proof file; do not open the clarification
  request or response.
- Point to the metadata and uncertainty, not every paragraph.

## Demo 1, Beat 3 — Make the transfer boundary real

**Target time:** 2 minutes 30 seconds

### PRESENTER ACTION

Run:

```bash
./scripts/export-reviewed-packet.sh
./scripts/ingest-reviewed-packet.sh
```

Show the success lines and matching checksum in the terminal. Do not open both
receipt files.

### SAY

Now the reviewed packet can cross.

The first script validates the human-review metadata and scans for restricted or
raw evidence before it creates the export artifact.

The second script independently validates the accepted outbox path, the packet,
and its checksum before engineering ingests it.

The same rule is checked on both sides.

The agent does not get permission to write directly into engineering memory
from the restricted workspace.

[LOOK UP]

The boundary is a test, not a sentence in a prompt.

If this transfer fails, the safe result is that engineering receives nothing.
That is a good failure mode.

### STAGE CUES

- Keep the terminal zoom large enough for the success and checksum lines.
- Do not run the optional synthetic leak unless asked during Q&A.
- If export fails unexpectedly, use the recovery line in the checklist and move
  to the reviewed golden stage.

## Demo 1, Beat 4 — Engineer gets a decision workspace

**Target time:** 3 minutes 30 seconds

### PRESENTER ACTION

Paste **Prompt 3 — Create Engineer's engineering case** from:

```text
/Users/jacobaloysious/Desktop/secondbrain/Demo/field-issue/DEMO-PROMPTS.md
```

[START 20-SECOND TIMER]

If needed, stop the live run and load:

```bash
./scripts/load-golden-stage.sh case
```

Open proof file 3:

```text
engineering-side/field-issues/FI-2026-00421/agent-context-bundle.md
```

Focus on:

- facts versus hypotheses;
- assignment and ownership;
- approved knowledge available;
- required next output and constraints.

Do not open component knowledge as a sixth proof file. State the discriminating
experiment from the prepared case:

> Run the approved stage-settling diagnostic with controlled onsite inspection
> and branch based on whether settling normalizes and alignment recovers.

Ask the room:

> Should the current hypothesis become shared component knowledge now?

[SHOW OF HANDS — 15 SECONDS]

### SAY

Engineer is now operating entirely inside engineering-side.

She has the reviewed packet and approved component guidance. She does not have
the raw fab evidence.

This bundle separates the facts from the hypotheses.

It makes the ownership explicit:

Engineer owns diagnosis, experiment design, and verification.

The onsite field engineer owns approved local capture and physical
intervention.

Motion Controls owns component-specific review.

The smallest discriminating experiment is to run the approved stage-settling
diagnostic and use a controlled onsite inspection.

If settling normalizes and alignment recovers, the stage path is supported.

If settling normalizes but alignment still fails, keep the stage-to-vision
interaction open before changing vision configuration.

Now the question for the room:

Should this hypothesis become shared component knowledge?

[TAKE THE VOTE]

No.

It is a useful investigation direction, not yet a reusable truth.

### STAGE CUES

- Keep the audience vote to 15 seconds.
- Do not imply that Engineer performs the physical intervention.
- Do not open `investigation.md`, `actions.md`, or component-knowledge files;
  narrate the prepared experiment from the decision workspace.

## Demo 1, Beat 5 — Time jump: fix, verify, and request promotion

**Target time:** 3 minutes 30 seconds

### PRESENTER ACTION

Install the seeded, human-reviewed experiment result at the explicit time jump:

```bash
./scripts/load-golden-stage.sh verified-result
```

Paste **Prompt 4 — Record verified resolution and propose reusable learning**
from
`/Users/jacobaloysious/Desktop/secondbrain/Demo/field-issue/DEMO-PROMPTS.md`.

[START 20-SECOND TIMER]

If needed, stop the live run and load:

```bash
./scripts/load-golden-stage.sh resolved
```

State the verified result in one sentence. Do not open the resolution file.

Open proof file 4:

```text
engineering-side/promotion-queue/FI-2026-00421.md
```

Attempt promotion before approval:

```bash
./scripts/promote-approved-knowledge.sh
```

Let the refusal remain visible.

Then create the explicit human decision and promote:

```bash
./scripts/load-golden-stage.sh approval-record
./scripts/promote-approved-knowledge.sh
```

### SAY

We now time-jump over the physical service and five repeated validation runs.

This is a seeded, human-reviewed experiment result. I am being explicit about
that because the conference does not need to watch a mechanical intervention
and five tool runs in real time.

The approved onsite work found excessive motion through the measurement window.
The onsite field engineer performed the approved damper replacement. Engineer
verified that five consecutive validation runs met the closure criteria.

The agent can now close the case and write a promotion proposal.

Look at the proposal carefully.

It does not say, “Every alignment failure is a degraded damper.”

It says that when an alignment error, a stage-settle timeout, and reviewed
persistent X-axis motion occur together, run the approved stage-settling
diagnostic before changing vision configuration.

The degraded damper is one possible cause, not a default conclusion.

Now I will attempt promotion.

[RUN PROMOTION; SHOW REFUSAL]

The case is fixed, but the organization has not yet approved a shared rule.

Promotion requires a separate named human decision.

[LOAD APPROVAL AND PROMOTE]

Fixing a case does not automatically rewrite the organization.

Promotion is a separate human decision with scope, a source trail, an owner, and a
future supersession path.

### STAGE CUES

- Say “time-jump” before running Prompt 4.
- Do not hide that the verified result is seeded.
- Point to scope, limitations, source trail, and review owner.
- Let the pre-approval refusal remain visible for two seconds.

## Demo 1, Beat 6 — Six months later: prove the memory earns its keep

**Target time:** 2 minutes 15 seconds

### PRESENTER ACTION

Start a visibly fresh agent session if practical. State clearly that the
original case folder is out of scope.

Paste **Prompt 5 — Six months later, prove reuse in a cold start** from:

```text
/Users/jacobaloysious/Desktop/secondbrain/Demo/field-issue/DEMO-PROMPTS.md
```

[START 20-SECOND TIMER]

If needed, stop the live run and load:

```bash
./scripts/load-golden-stage.sh reuse
```

Open proof file 5:

```text
engineering-side/future-cases/FI-2027-00987/agent-brief.md
```

Show:

- the approved diagnostic path;
- source case and human reviewer;
- the new engineer's next action;
- the warning not to assume the previous physical cause.

### SAY

Six months later, a new engineer sees a similar sanitized symptom.

This is a cold start. The original case is out of scope.

The new engineer receives one small approved diagnostic path, its source,
its reviewer, and its limitations.

They can run the stage-settling diagnostic before changing vision
configuration.

But they are explicitly warned not to assume the old physical cause, copy the
old actions, or recommend a damper replacement without new evidence.

This is the payoff.

The engineer does not inherit the old case.

They inherit one reviewed decision path that reduces reconstruction without
turning history into a default conclusion.

### STAGE CUES

- Make the fresh-session boundary visible.
- End on the “What Is Not Carried Forward” section.

## Demo 1 close

**Target time:** 45 seconds

### SAY

That completes the field loop.

Three decisions controlled the entire workflow:

What may cross?

What is the next experiment?

What deserves reuse?

Every issue creates traceable case history.

Only verified, human-approved learning becomes shared memory.

And that memory must earn its keep by helping the next engineer.

### STAGE CUES

- [LOOK UP] for all three questions.
- Switch directly to the manager-collaboration workspace.

---

# Live Demo 2 — What deserves to become memory?

**Target time:** 6 minutes

**Communication job:** Show that one capture can preserve useful professional
context, keep uncertainty conditional, reject speculative people judgment, and
surface only reviewable drafts.

## Demo 2, Beat 1 — Ask the room what belongs in memory

**Target time:** 1 minute 15 seconds

### PRESENTER ACTION

Confirm the terminal is in:

```text
/Users/jacobaloysious/Desktop/secondbrain/Demo/manager-collaboration
```

Open:

```text
inbox.md
```

### SAY

This is one messy post-stand-up capture.

The QA login failure has moved rollout risk to medium.

Rahul may be able to unblock by Thursday **if** infrastructure provides test
credentials. Thursday is not confirmed.

The manager promised Priya a staffing review before the next sprint planning
session.

And the final line says, “Priya seemed off today.”

Quick vote: should that final line become durable people memory?

[SHOW OF HANDS — 20 SECONDS]

The correct answer is no. It is a speculative judgment without an actionable
professional fact.

Now let us see whether the workflow makes the same decision.

### STAGE CUES

- Stress “may,” “if,” and “not confirmed.”
- Ask only about the final line; keep the vote to 20 seconds.

## Demo 2, Beat 2 — Run one memory-decision prompt

**Target time:** 1 minute 30 seconds

### PRESENTER ACTION

Paste **Prompt 1 — Decide, remember, and surface** from:

```text
/Users/jacobaloysious/Desktop/secondbrain/Demo/manager-collaboration/DEMO-PROMPTS.md
```

[START 20-SECOND TIMER]

If the live result is not usable at 20 seconds, stop the agent and run:

```bash
./scripts/use-golden.sh
./scripts/validate-demo.sh --final
```

### SAY

The useful part is not summarization.

It is the memory decision.

Supported facts may persist.

Uncertain timing must remain uncertain and create a clarification action.

A professional commitment may be remembered.

A speculative people judgment must not become a dossier.

And every surfaced output remains a manager-private draft. The workflow does not
send a message or take external action.

### STAGE CUES

- Use the 20-second fallback without apology.
- Keep the terminal visible only until the update completes.

## Demo 2, Beat 3 — Show one compact decision view

**Target time:** 2 minutes 15 seconds

### PRESENTER ACTION

Open:

```text
outputs/manager-follow-through.md
```

Walk down the four decisions.

Then open only:

```text
outputs/daily-brief.md
outputs/stakeholder-draft.md
```

Point to the draft metadata before reading the content.

### SAY

This compact view makes the four decisions explicit.

The medium rollout risk and QA-login blocker are remembered as project context.

Rahul's Thursday timing is kept uncertain because it depends on credentials.
The system also creates a clarification action rather than inventing an owner or
date.

The staffing review is remembered as the manager's professional commitment to
Priya.

And the speculative line is visibly marked “Rejected — not retained.” It goes
nowhere else.

The daily brief surfaces the risk, blocker, conditional dependency,
stakeholder review, commitment, and unresolved questions.

The stakeholder draft says the risk is medium, preserves the conditional
timing, and clearly states that it requires manager review.

Notice the metadata:

draft status;

source receipt;

reviewer;

access scope;

review date;

retention review.

This is continuity without autonomous communication.

### STAGE CUES

- Do not open project memory, people memory, or actions.
- Point to “Rejected — not retained.”
- In the two surfaced drafts, show metadata first and content second.

## Demo 2, Beat 4 — Prove traceability and close

**Target time:** 1 minute

### PRESENTER ACTION

Open:

```text
memory/receipts.md
```

Show:

- source capture;
- files changed;
- four memory decisions;
- confidence;
- unresolved questions;
- boundary check.

### SAY

The receipt tells us which source was processed, which files changed, what was
remembered, what remained uncertain, what was rejected, and what still needs
clarification.

This is the manager version of the same governed transformation.

Useful professional context survives.

Uncertainty stays visible.

Speculative judgment does not become memory.

The outputs remain drafts, and the manager owns the action.

### STAGE CUES

- Keep the receipt on screen for no more than 30 seconds.
- Press `C` to return directly to slide 15.

</details>

---

## Slide 15 — Start with one context leak—and one success signal

**Target time:** 5 minutes 30 seconds

### SAY

You have now seen the same memory contract in two very different settings.

In the field case, restricted evidence stayed onsite. A field engineer and
agent created a reviewed packet. Engineer received a decision workspace. A
separate human approval controlled shared reuse. Six months later, a new
engineer received a diagnostic path—not the old conclusion.

In the manager case, a supported risk was remembered, conditional timing stayed
conditional, a professional promise survived, and a speculative judgment was
rejected.

So how should a team begin?

Not with a company-wide “second brain” program.

Start with a 30-day governed pilot around one painful decision.

Step one: pick the leak.

Choose one incident, handoff, decision, or follow-up where your team repeatedly
reconstructs context.

Step two: define the boundary.

Write down what may be remembered, what must stay local, what must remain
uncertain, and when the agent must ask.

Step three: assign one owner and one metric.

The owner maintains the contract.

The metric measures the next decision—not the number of notes or tokens
produced.

For example, a field-support pilot could measure time from a reviewed report to
the first discriminating experiment.

A software-team pilot could measure time for a new on-call engineer to recover
the current incident state.

A manager pilot could measure missed follow-ups and avoidable clarification
loops while auditing that speculative people judgments are rejected.

Review the pilot every week.

Look at successful decisions, human corrections, safe refusals, stale entries,
and maintenance effort.

At day 30, make an explicit choice:

continue;

change the contract;

or stop.

Stopping a pilot that does not improve the decision is a successful governance
outcome. It is much cheaper than scaling an impressive demo into another source
of organizational debt.

[LOOK UP]

I would like each of you to take 45 seconds.

Write down one recurring context leak in your own team and the decision that
would improve if that context were reliable.

[SILENT EXERCISE — 45 SECONDS]

Now add one boundary.

What must the system never assume, retain, or move without review?

[PAUSE — 10 SECONDS]

That is enough for the first pilot hypothesis.

One leak.

One boundary.

One owner.

One metric.

The goal is not to remember everything.

The goal is less reconstruction, safer reuse, and more engineering judgment.

Thank you.

### STAGE CUES

- [PRESS `C`] before beginning this slide.
- Give the room the full 45 seconds; silence is intentional.
- [LOOK UP] for the final eight lines.
- [CLICK] once; the deck skips the appendix and opens slide 19.

---

## Slide 19 — Q&A

**Target time:** 12 minutes

### SAY

Thank you.

I am happy to take questions.

### STAGE CUES

- Leave slide 19 visible unless an appendix answer would materially help.
- If the room is quiet, seed with one of these questions:
  - “Where would your first context leak be?”
  - “Which boundary would be hardest to enforce in your environment?”
  - “What evidence would convince you that a pilot is working?”
- For a portability question, press `A` for slide 16.
- From slide 16, use the right arrow for slides 17 and 18.
- Press `Q` to return to slide 19.
- Protect the final two minutes to answer one last question and close cleanly.

---

# Appendix — use only in Q&A

These slides are outside the normal presentation route. Every appendix slide
still has a short read-aloud answer so the presenter does not need to improvise
the main point under pressure.

## Slide 16 — Appendix: the memory contract is portable

**Target time if used:** 1 minute 30 seconds

### SAY

The demonstration uses transparent local files because that makes every read,
write, review, and test inspectable.

The durable part is not the interface, storage format, or model.

Those can change.

The durable part is the contract:

what may be read;

what may be written;

who owns the result;

and who must approve a consequential change.

The interface could be chat, email, voice, a tracker, or a command line.

The memory could be documents, a database, or an internal platform.

But traceability, access boundaries, validation, human gates, and evaluation must
remain visible.

### STAGE CUES

- Press `A` from anywhere to open slide 16.
- Answer the question, then either continue to slide 17 or press `Q`.

---

## Slide 17 — Appendix: the field boundary is separate and testable

**Target time if used:** 1 minute 30 seconds

### SAY

The field demo uses two operational roots.

Fab-side contains restricted raw evidence, local analysis, and the field
engineer's response.

Engineering-side contains only independently validated sanitized packets,
isolated cases, reviewed guidance, and the later reuse proof.

Between them is a transfer gate.

It checks human review, redaction, schema, the accepted source path, and the
checksum.

The prompt constrains the agent's scope, while the deterministic transfer path
enforces which artifact engineering memory will admit.

In production, the same contract would also use separate credentials, hosts,
network policy, audit storage, and the organization's approved data-loss
controls.

### STAGE CUES

- Use this slide for enforcement or architecture questions.
- Do not claim the demo repository alone is equivalent to production security.
- [CLICK] to slide 18 only if the question moves to testing.

---

## Slide 18 — Appendix: test the memory contract like software

**Target time if used:** 1 minute 30 seconds

### SAY

A plausible-looking answer is not proof that the memory contract works.

The important lifecycle rules need executable checks.

For the field case, the tests reject raw identifiers, unreviewed packets,
checksum tampering, and promotion without human approval. They also verify that
a later case cites approved guidance without copying case detail.

For the manager case, validation checks that conditional claims remain
conditional, speculative people judgments are rejected, outputs remain drafts,
and every update produces a receipt.

The principle is:

deterministic checks;

human review;

versioned evidence.

Use model evaluations for quality and deterministic checks for rules that must
not be optional.

### STAGE CUES

- Use this slide for evaluation, testing, or governance questions.
- Press `Q` to return to slide 19.

---

# Presenter-app recovery checklist — rehearsal only

## Normal recovery

- `R` — reset all three chats.
- `1` — open the OnSite Fab Agent.
- `2` — open the Fixer Agent.
- `3` — open the Manager Assistant.
- `N` — show or hide the current presenter cue.
- Reloading the page is safe; the app has no database or external write.
- If full screen becomes awkward, press `F` or `Escape`.
- Use the suggested action buttons for the rehearsed route.
- Keep the local server running for the entire session.

If the browser window becomes unusable, reopen:

```text
http://127.0.0.1:5173/#onsite
```

If the usual port changes, use the exact local URL printed by `./run-local.sh`.

## Honest fallback line

Say:

> This is a deterministic chat simulation using reviewed mock data. The
> executable validators and tests are in the repository; I can open those
> during Q&A.

Do not imply that the browser itself proves host, credential, or network
isolation.

<details>
<summary><strong>Legacy live-agent and terminal recovery — technical rehearsal only</strong></summary>

## Legacy live-agent recovery rule

- Start a 20-second timer with every live agent prompt.
- At 20 seconds, stop the live run before restoring a golden stage.
- Say:

  > The important behavior is the contract, not the typing animation. I will
  > load the verified checkpoint and keep the decision moving.

- Never let a late agent continue writing after a golden checkpoint is loaded.

## Field demo fallback map

From:

```text
/Users/jacobaloysious/Desktop/secondbrain/Demo/field-issue
```

Use:

| Live step | Fallback command |
| --- | --- |
| Prompt 1 — draft packet | `./scripts/load-golden-stage.sh draft` |
| Human onsite response | `./scripts/load-golden-stage.sh field-response` |
| Prompt 2 — reviewed packet | `./scripts/load-golden-stage.sh reviewed` |
| Prompt 3 — engineering case | `./scripts/load-golden-stage.sh case` |
| Human-reviewed result at time jump | `./scripts/load-golden-stage.sh verified-result` |
| Prompt 4 — resolution and proposal | `./scripts/load-golden-stage.sh resolved` |
| Human promotion decision | `./scripts/load-golden-stage.sh approval-record` |
| Approved promotion result | `./scripts/load-golden-stage.sh approved` |
| Prompt 5 — future reuse | `./scripts/load-golden-stage.sh reuse` |

### If export fails unexpectedly

Say:

> A failed transfer is the safe failure mode. The reviewed packet is still
> local; engineering has received nothing.

Then confirm the reviewed stage and retry:

```bash
./scripts/load-golden-stage.sh reviewed
./scripts/export-reviewed-packet.sh
./scripts/ingest-reviewed-packet.sh
```

### If promotion fails after the approval record

Do not improvise a direct edit to component knowledge.

Say:

> The promotion gate has failed closed. I will use the verified reuse
> checkpoint to show the intended approved state.

Then continue with:

```bash
./scripts/load-golden-stage.sh approved
```

Proceed to the future-reuse beat and use the normal `reuse` fallback only if
Prompt 5 is slow.

### If the field demo must be shortened

Keep these proof moments:

1. evidence-board audience vote;
2. rejected unreviewed export;
3. Engineer's decision workspace;
4. rejected pre-approval promotion;
5. future-case reuse.

Load golden stages immediately and skip waiting. Never skip the future-case
reuse proof; it demonstrates why the memory exists.

## Manager demo fallback map

From:

```text
/Users/jacobaloysious/Desktop/secondbrain/Demo/manager-collaboration
```

If Prompt 1 is slow or unusable:

```bash
./scripts/use-golden.sh
./scripts/validate-demo.sh --final
```

If the manager demo must be shortened, show only:

1. `inbox.md`;
2. `outputs/manager-follow-through.md`;
3. `memory/receipts.md`.

Preserve the audience vote and the rejection of speculative people judgment.

</details>

## Deck recovery

- `D` — return to slide 13
- `C` — return to slide 15
- `Q` — Q&A slide 19
- `A` — appendix slide 16
- Direct file URLs:

```text
file:///Users/jacobaloysious/Desktop/secondbrain/%5BSlideDeck%5DSecond%20Brain%20for%20Engineering%20Teams.html#slide-13
file:///Users/jacobaloysious/Desktop/secondbrain/%5BSlideDeck%5DSecond%20Brain%20for%20Engineering%20Teams.html#slide-15
file:///Users/jacobaloysious/Desktop/secondbrain/%5BSlideDeck%5DSecond%20Brain%20for%20Engineering%20Teams.html#slide-19
```

## Final pre-stage checklist

- [ ] Presenter app started locally and left running.
- [ ] OnSite Fab Agent reset to the alignment alert.
- [ ] Packet viewer and ZIP download tested.
- [ ] `1`, `2`, `3`, `N`, `F`, and `R` tested.
- [ ] Browser zoom and projector framing checked at the presenting resolution.
- [ ] Both executable demo test suites passed during rehearsal.
- [ ] Repository available for technical Q&A, but terminal hidden from the
      normal audience route.
- [ ] Notes visible on a second device.
- [ ] Slide shortcuts tested.
- [ ] Notifications and sleep disabled.
- [ ] Timer visible.
- [ ] Q&A begins no later than minute 66–68.
