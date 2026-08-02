import type { AgentKey } from "../types";

type ActivityEntry = {
  title: string;
  summary: string;
  tools: readonly string[];
};

const activityByAgent: Record<AgentKey, readonly ActivityEntry[]> = {
  onsite: [
    {
      title: "Investigated the local failure pattern",
      summary:
        "Compared the permitted machine signals and kept the analysis inside the restricted fab workspace.",
      tools: ["Local signal reader", "Failure-pattern matcher"],
    },
    {
      title: "Recorded the onsite observation",
      summary:
        "Added the field engineer's physical observation without treating missing maintenance history as a fact.",
      tools: ["Field clarification recorder"],
    },
    {
      title: "Created a sanitized draft",
      summary:
        "Converted local observations into a bounded summary and removed identifiers and raw machine evidence.",
      tools: ["Boundary policy checker", "Sanitization scanner"],
    },
    {
      title: "Checked the packet before transfer",
      summary:
        "Verified the draft against review requirements and kept transfer blocked until a human approved it.",
      tools: ["Packet validator", "Human-review gate"],
    },
    {
      title: "Finalized the reviewed bundle",
      summary:
        "Bound the approved contents to a packet version and checksum, with raw fab evidence excluded.",
      tools: ["SHA-256 checksum", "ZIP bundle builder"],
    },
    {
      title: "Transferred the reviewed packet",
      summary:
        "Sent only the reviewed, sanitized packet into the offsite engineering workspace.",
      tools: ["Scoped handoff"],
    },
  ],
  fixer: [
    {
      title: "Opened the reviewed field issue",
      summary:
        "Loaded the approved packet and separated supported observations from working hypotheses.",
      tools: ["Packet reader", "Fact-hypothesis classifier"],
    },
    {
      title: "Prepared a discriminating experiment",
      summary:
        "Designed two outcome branches to distinguish a physical settling problem from a software timing gap.",
      tools: ["Experiment planner"],
    },
    {
      title: "Inspected diagnostics and code",
      summary:
        "Compared the reviewed evidence with the stage-settle code path and identified the smallest testable change.",
      tools: ["Diagnostic runner", "Repository search", "Code inspector"],
    },
    {
      title: "Prepared the proposed change",
      summary:
        "Added a stable position-and-velocity gate and paired it with regression coverage.",
      tools: ["Patch builder", "Test runner"],
    },
    {
      title: "Created the pull request",
      summary:
        "Packaged the code change, test evidence, and reviewer context for an explicit engineering decision.",
      tools: ["Git diff", "Pull-request builder"],
    },
    {
      title: "Verified the deployed fix",
      summary:
        "Simulated review, deployment, and verification while keeping the physical service action visible.",
      tools: ["Review simulator", "Deployment check", "Verification suite"],
    },
    {
      title: "Reviewed shared-knowledge scope",
      summary:
        "Selected only the reusable diagnostic lesson and excluded case-specific ownership and customer details.",
      tools: ["Knowledge boundary checker"],
    },
    {
      title: "Recorded owner approval",
      summary:
        "Promoted the reusable lesson only after the responsible owner approved the proposed memory update.",
      tools: ["Owner approval gate", "Knowledge publisher"],
    },
  ],
  manager: [
    {
      title: "Processed the manager note",
      summary:
        "Separated supported commitments and uncertainty from speculative people judgment.",
      tools: ["Note classifier", "Speculation filter"],
    },
    {
      title: "Drafted follow-through surfaces",
      summary:
        "Matched retained context to the manager's private workspace and the appropriate communication drafts.",
      tools: ["Context router", "Draft composer"],
    },
    {
      title: "Prepared the stakeholder update and receipt",
      summary:
        "Kept the recovery date explicitly uncertain and produced a receipt of remembered, uncertain, and rejected context.",
      tools: ["Stakeholder draft builder", "Memory receipt generator"],
    },
  ],
};

export function ActionActivity({
  agent,
  step,
}: {
  agent: AgentKey;
  step: number;
}) {
  const entry = activityByAgent[agent][step - 1];
  if (!entry) return null;

  return (
    <details className="activity-trail action-activity">
      <summary>
        <span className="activity-summary-icon" aria-hidden="true">
          ✓
        </span>
        <span>
          <strong>Thinking steps…</strong>
          <small>{entry.title}</small>
        </span>
        <span className="activity-summary-action">
          <span className="thinking-chevron" aria-hidden="true">
            ›
          </span>
        </span>
      </summary>
      <ol className="activity-list">
        <li>
            <span className="activity-step-number">{step}</span>
            <div className="activity-step-copy">
              <strong>{entry.title}</strong>
              <p>
                <span>Reasoning summary</span>
                {entry.summary}
              </p>
              <div className="activity-tools">
                <span>Tools called</span>
                {entry.tools.map((tool) => (
                  <code key={tool}>{tool}</code>
                ))}
              </div>
            </div>
          </li>
      </ol>
    </details>
  );
}
