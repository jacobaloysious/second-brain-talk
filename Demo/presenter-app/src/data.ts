import type {
  AgentDefinition,
  AgentKey,
  KnowledgeChoice,
  PacketFile,
  PullRequestDefinition,
} from "./types";

export const CASE_ID = "FI-2026-00421";
export const PACKET_ID = "FI-2026-00421-packet-v1";
export const PACKET_VERSION =
  "FI-2026-00421-packet-v1-cbb2e63f337a6c6c";
export const PACKET_CHECKSUM =
  "cbb2e63f337a6c6c8599c6173574afa8074dda5a141844a4879f8fdb99287370";

export const agents: Record<AgentKey, AgentDefinition> = {
  onsite: {
    key: "onsite",
    name: "OnSite Fab Agent",
    shortName: "OnSite",
    subtitle: "Restricted fab workspace",
    initials: "OF",
    scope:
      "Helps the field engineer investigate locally and prepare a reviewed, sanitized handoff.",
    canSee: [
      "Restricted machine evidence",
      "Local tool observations",
      "Approved local guidance",
    ],
    cannotSee: [
      "Offsite source code",
      "Engineering test systems",
      "Shared-memory write access",
    ],
    humanOwner:
      "The onsite field engineer owns observations, packet wording, and transfer approval.",
    accent: "blue",
    totalSteps: 7,
  },
  fixer: {
    key: "fixer",
    name: "Fixer Agent",
    shortName: "Fixer",
    subtitle: "Offsite engineering",
    initials: "FX",
    scope:
      "Turns a reviewed field packet into an investigation, tested code change, and verification plan.",
    canSee: [
      "Reviewed sanitized packet",
      "Code and test systems",
      "Approved component knowledge",
    ],
    cannotSee: [
      "Raw fab logs",
      "Restricted identifiers",
      "Unapproved local observations",
    ],
    humanOwner:
      "Engineer owns the code, review, merge, and verification. Motion Controls owns knowledge approval.",
    accent: "purple",
    totalSteps: 9,
  },
  manager: {
    key: "manager",
    name: "Manager Assistant",
    shortName: "Manager",
    subtitle: "Private continuity workspace",
    initials: "MA",
    scope:
      "Turns a manager-provided note into reviewable follow-through without creating a people dossier.",
    canSee: [
      "The manager's own notes",
      "Professional commitments",
      "Supported project context",
    ],
    cannotSee: [
      "Unrequested employee monitoring",
      "Private-message scraping",
      "Speculative people judgments",
    ],
    humanOwner:
      "The manager decides what to retain, edit, use, or send. Every output stays a draft.",
    accent: "pink",
    totalSteps: 4,
  },
};

export const agentOrder: AgentKey[] = ["onsite", "fixer", "manager"];

const debugPacket = `---
packet_id: ${PACKET_ID}
case_id: ${CASE_ID}
review_status: approved
reviewed_by: "Onsite Field Engineer"
reviewed_at: "2026-07-18T10:15:00Z"
transfer_approved: true
classification: sanitized
---

# Reviewed Sanitized Debug Packet

## Sanitized Summary

Fine alignment failed repeatedly after an X-axis move. Stage settling was outside
the configured limit while the vision-confidence indication remained acceptable.
An alignment error repeated and a stage-settle timeout was also observed.

## Relative Event Timeline

1. Fine alignment began.
2. An X-axis move completed, followed by prolonged settling.
3. Vision detected the fiducial with acceptable confidence.
4. Alignment exceeded its permitted deviation.
5. Retry reproduced the same sequence.
6. A later attempt reproduced the alignment error and added a stage-settle timeout.
7. The operator stopped the run.

## Observed Patterns

- Failure follows X-axis movement.
- Prolonged settling appears before each failed alignment.
- Retrying does not recover.
- Vision confidence remains acceptable during the observed failures.
- The onsite approved observation confirmed motion through the measurement window.

## Subsystem Hypotheses

1. **Stage settling instability — primary, moderate-to-high confidence.**
   Repeated event order and onsite clarification support an X-axis motion or
   settling path.
2. **Stage-to-vision interaction — secondary, low confidence.**
   An acceptable vision score does not eliminate motion during measurement.

These are hypotheses, not verified causes.

## Confidence

Moderate to high for the stage-settling path; low for a vision-only cause.
The mechanical cause and maintenance correlation remain unverified.

## Missing Evidence

- Recent stage maintenance or mechanical-change history.
- Result of the approved stage-settling diagnostic selected by offsite engineering.
- Post-intervention verification against an agreed run count.

## Redactions Applied

- Customer, fab, tool, lot, and wafer identifiers withheld.
- Absolute event timestamps and exact machine values generalized.
- Raw filenames and raw evidence lines omitted.

## Field Clarification

The onsite field engineer used the approved longer local observation and
confirmed that X-axis vibration continued through the fine-alignment measurement
window. Maintenance history remains to be reviewed.

## Review Record

The onsite field engineer reviewed the wording, confirmed that the summary
matches the local observation, and approved this sanitized packet for transfer.
`;

const manifest = `{
  "case_id": "${CASE_ID}",
  "packet_id": "${PACKET_ID}",
  "version": "${PACKET_VERSION}",
  "sha256": "${PACKET_CHECKSUM}",
  "classification": "sanitized",
  "review_status": "approved",
  "reviewed_by": "Onsite Field Engineer",
  "reviewed_at": "2026-07-18T10:15:00Z",
  "transfer_approved": true,
  "files": [
    "debug-packet.md",
    "manifest.json",
    "README.md"
  ]
}`;

const readme = `# Reviewed handoff bundle

This bundle contains only the sanitized, human-reviewed context approved for
offsite engineering.

It intentionally excludes raw fab logs, exact machine values, raw timestamps,
restricted identifiers, and local filenames.

The offsite engineering importer must independently validate the packet
identity, version, checksum, review metadata, and restricted-content scan.
`;

export const packetFiles: PacketFile[] = [
  {
    name: "debug-packet.md",
    description: "Human-reviewed engineering context",
    content: debugPacket,
  },
  {
    name: "manifest.json",
    description: "Packet identity and validation receipt",
    content: manifest,
  },
  {
    name: "README.md",
    description: "Boundary and ingestion instructions",
    content: readme,
  },
];

export const knowledgeChoices: KnowledgeChoice[] = [
  {
    id: "diagnostic",
    title: "Promote the diagnostic + software guardrail",
    detail:
      "Check both stable position and velocity before alignment; use the approved stage-settling diagnostic when the guard rejects motion.",
    verdict: "reusable",
  },
  {
    id: "damper",
    title: "Promote “degraded damper” as the cause",
    detail:
      "That cause was verified for this case, but it is not a safe default for future alignment failures.",
    verdict: "case-specific",
  },
  {
    id: "actions",
    title: "Promote this case's action list",
    detail:
      "The owners, physical service, and verification steps belong to this case history.",
    verdict: "case-specific",
  },
];

export const pullRequest: PullRequestDefinition = {
  repository: "motion-control/stage-runtime",
  number: 1847,
  title: "Require stable velocity before starting alignment",
  branch: "fix/stage-settle-gate",
  base: "main",
  author: "Engineer",
  summary:
    "A marginal stage exposed a software weakness: the settle gate accepted one in-position sample without checking velocity or consecutive stability.",
  additions: 32,
  deletions: 6,
  files: [
    {
      path: "src/motion/stage-settle-gate.ts",
      additions: 20,
      deletions: 5,
      lines: [
        {
          type: "header",
          content: "@@ -42,10 +42,25 @@ export class StageSettleGate",
        },
        {
          type: "context",
          oldLine: 42,
          newLine: 42,
          content: "  evaluate(sample: MotionSample): SettleResult {",
        },
        {
          type: "remove",
          oldLine: 43,
          content:
            "    const settled = Math.abs(sample.positionError) <= this.positionTolerance;",
        },
        {
          type: "remove",
          oldLine: 44,
          content: "    return settled ? { state: \"settled\" } : { state: \"moving\" };",
        },
        {
          type: "add",
          newLine: 43,
          content:
            "    const positionStable = Math.abs(sample.positionError) <= this.positionTolerance;",
        },
        {
          type: "add",
          newLine: 44,
          content:
            "    const velocityStable = Math.abs(sample.velocity) <= this.velocityTolerance;",
        },
        {
          type: "add",
          newLine: 45,
          content: "",
        },
        {
          type: "add",
          newLine: 46,
          content: "    if (!positionStable || !velocityStable) {",
        },
        {
          type: "add",
          newLine: 47,
          content: "      this.stableSamples = 0;",
        },
        {
          type: "add",
          newLine: 48,
          content:
            "      return { state: \"moving\", reason: \"stage_not_stable\" };",
        },
        {
          type: "add",
          newLine: 49,
          content: "    }",
        },
        {
          type: "add",
          newLine: 50,
          content: "",
        },
        {
          type: "add",
          newLine: 51,
          content: "    this.stableSamples += 1;",
        },
        {
          type: "add",
          newLine: 52,
          content:
            "    if (this.stableSamples < this.requiredStableSamples) {",
        },
        {
          type: "add",
          newLine: 53,
          content:
            "      return { state: \"moving\", reason: \"stability_window\" };",
        },
        {
          type: "add",
          newLine: 54,
          content: "    }",
        },
        {
          type: "add",
          newLine: 55,
          content: "",
        },
        {
          type: "add",
          newLine: 56,
          content: "    return { state: \"settled\" };",
        },
        {
          type: "context",
          oldLine: 45,
          newLine: 57,
          content: "  }",
        },
      ],
    },
    {
      path: "test/motion/stage-settle-gate.test.ts",
      additions: 12,
      deletions: 1,
      lines: [
        {
          type: "header",
          content: "@@ -18,6 +18,17 @@ describe(\"StageSettleGate\")",
        },
        {
          type: "add",
          newLine: 18,
          content:
            "  it(\"rejects an in-position sample while the stage is still moving\", () => {",
        },
        {
          type: "add",
          newLine: 19,
          content:
            "    const result = gate.evaluate(sample({ positionError: 0, velocity: velocityTolerance + epsilon }));",
        },
        {
          type: "add",
          newLine: 20,
          content:
            "    expect(result).toEqual({ state: \"moving\", reason: \"stage_not_stable\" });",
        },
        {
          type: "add",
          newLine: 21,
          content: "  });",
        },
        {
          type: "add",
          newLine: 22,
          content: "",
        },
        {
          type: "add",
          newLine: 23,
          content:
            "  it(\"requires consecutive position and velocity stable samples\", () => {",
        },
        {
          type: "add",
          newLine: 24,
          content:
            "    expect(runStableWindow(gate)).toMatchObject({ state: \"settled\" });",
        },
        {
          type: "add",
          newLine: 25,
          content: "  });",
        },
      ],
    },
  ],
};

export const presenterCues: Record<AgentKey, string[]> = {
  onsite: [
    "Pause on the proactive alert. Ask whether detection is the same as diagnosis.",
    "Point to supported signals, then to the one missing observation.",
    "Explain that the field engineer answers from the physical tool—not from a remote guess.",
    "Try “Send now” once. Let the human-review refusal remain visible.",
    "Open the bundle and show that raw evidence is absent.",
    "Send the reviewed packet, then switch to the Fixer Agent.",
  ],
  fixer: [
    "The fixer starts with a notification, not a prompt-writing exercise.",
    "Separate facts from hypotheses before discussing the experiment.",
    "Ask the room which result would distinguish the two branches.",
    "Name both findings: unhealthy hardware and a software settle-gate weakness.",
    "Open the diff. Let software engineers read the two essential changes.",
    "Show the pull request, tests, and review boundary before the time jump.",
    "Call out the explicit time jump; merge, deploy, and field service did not happen in chat.",
    "Try promotion before approval to show the second human gate.",
    "End on the reusable diagnostic and guardrail, not the old physical cause.",
  ],
  manager: [
    "The assistant sees only the manager-provided note.",
    "Ask which two words make Thursday uncertain: “may” and “if”.",
    "Point out that every surface is a draft.",
    "End on the receipt: remember, qualify, reject.",
  ],
};
