import {
  FormEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AgentRail } from "./components/AgentRail";
import { ActionActivity } from "./components/ActivityTrail";
import {
  ActionButton,
  AgentAvatar,
  ChatBubble,
  DetailCard,
  FactHypothesisCard,
  InlineStatus,
  QuickActions,
} from "./components/ChatPrimitives";
import { ContextInspector } from "./components/ContextInspector";
import { PacketModal } from "./components/PacketModal";
import { PullRequestModal } from "./components/PullRequestModal";
import {
  agents,
  CASE_ID,
  knowledgeChoices,
  packetFiles,
  PACKET_VERSION,
  pullRequest,
} from "./data";
import type {
  AgentKey,
  KnowledgeChoice,
  OwnerApprovalStatus,
} from "./types";
import { createPacketZip } from "./zip";

type StepState = Record<AgentKey, number>;
type TypedReplies = Record<AgentKey, Record<number, string>>;

const initialSteps: StepState = { onsite: 0, fixer: 0, manager: 0 };
const initialReplies: TypedReplies = { onsite: {}, fixer: {}, manager: {} };
const DEFAULT_WORKING_PHASES = ["Thinking…", "Preparing response…"];
const INVESTIGATE_PHASES = [
  "Reading local machine signals…",
  "Looking for a supported failure pattern…",
];
const DRAFT_PACKET_PHASES = [
  "Reviewing local observations…",
  "Drafting sanitized summary…",
];
const REVIEW_PACKET_PHASES = [
  "Comparing the draft against the boundary rules…",
  "Preparing the review view…",
];
const FINALIZE_PACKET_PHASES = [
  "Binding packet identity and checksum…",
  "Assembling the reviewed bundle…",
];
const OPEN_CASE_PHASES = [
  "Loading the reviewed packet…",
  "Separating facts from hypotheses…",
];
const EXPERIMENT_PHASES = [
  "Weighing the two outcome branches…",
  "Drafting the experiment plan…",
];
const DIAGNOSE_PHASES = [
  "Reading the reviewed packet…",
  "Inspecting the stage-settle code path…",
];
const NOTE_PHASES = [
  "Reading the note…",
  "Classifying supported vs. speculative context…",
];
const DRAFT_SURFACES_PHASES = [
  "Matching retained context to each surface…",
  "Drafting follow-through…",
];
const STAKEHOLDER_DRAFT_PHASES = [
  "Drafting the stakeholder update…",
  "Assembling the receipt…",
];

const ONSITE_STEP_PHASES: Partial<Record<number, readonly string[]>> = {
  0: INVESTIGATE_PHASES,
  2: DRAFT_PACKET_PHASES,
  3: REVIEW_PACKET_PHASES,
  4: FINALIZE_PACKET_PHASES,
};
const FIXER_STEP_PHASES: Partial<Record<number, readonly string[]>> = {
  0: OPEN_CASE_PHASES,
  1: EXPERIMENT_PHASES,
  2: DIAGNOSE_PHASES,
};
const MANAGER_STEP_PHASES: Partial<Record<number, readonly string[]>> = {
  0: NOTE_PHASES,
  1: DRAFT_SURFACES_PHASES,
  2: STAKEHOLDER_DRAFT_PHASES,
};

function agentFromHash(): AgentKey {
  const key = window.location.hash.replace("#", "") as AgentKey;
  return key in agents ? key : "onsite";
}

function RowList({ children }: { children: ReactNode }) {
  return <ul className="compact-list">{children}</ul>;
}

export default function App() {
  const [activeAgent, setActiveAgent] = useState<AgentKey>(agentFromHash);
  const [steps, setSteps] = useState<StepState>(initialSteps);
  const [typedReplies, setTypedReplies] =
    useState<TypedReplies>(initialReplies);
  const [composerValue, setComposerValue] = useState("");
  const [packetSent, setPacketSent] = useState(false);
  const [packetModalOpen, setPacketModalOpen] = useState(false);
  const [pullRequestModalOpen, setPullRequestModalOpen] = useState(false);
  const [unsafeExportTried, setUnsafeExportTried] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [knowledgeBlocked, setKnowledgeBlocked] = useState(false);
  const [promotionBlocked, setPromotionBlocked] = useState(false);
  const [knowledgePromoted, setKnowledgePromoted] = useState(false);
  const [ownerApprovalStatus, setOwnerApprovalStatus] =
    useState<OwnerApprovalStatus>("not-requested");
  const [futureCaseOpen, setFutureCaseOpen] = useState(false);
  const [selectedKnowledge, setSelectedKnowledge] = useState<
    Set<KnowledgeChoice["id"]>
  >(new Set(["diagnostic"]));
  const [showCue, setShowCue] = useState(false);
  const [showInspector, setShowInspector] = useState(false);
  const [stageMode, setStageMode] = useState(false);
  const [workingPhase, setWorkingPhase] = useState<number | null>(null);
  const [workingPhases, setWorkingPhases] = useState<readonly string[]>(
    DEFAULT_WORKING_PHASES,
  );
  const workingRef = useRef(false);
  const workingTimersRef = useRef<number[]>([]);
  const streamRef = useRef<HTMLDivElement>(null);

  const agent = agents[activeAgent];
  const step = steps[activeAgent];

  const applyAgentStep = useCallback((key: AgentKey, value: number) => {
    setSteps((current) => ({ ...current, [key]: value }));
  }, []);

  const TOTAL_WORKING_MS = 2400;

  const runAgentAction = useCallback(
    (action: () => void, phases: readonly string[] = DEFAULT_WORKING_PHASES) => {
      if (workingRef.current) return;
      workingRef.current = true;
      const stepMs = TOTAL_WORKING_MS / phases.length;
      setWorkingPhases(phases);
      setWorkingPhase(0);
      workingTimersRef.current = phases.slice(1).map((_, index) =>
        window.setTimeout(() => setWorkingPhase(index + 1), stepMs * (index + 1)),
      );
      workingTimersRef.current.push(
        window.setTimeout(() => {
          action();
          workingRef.current = false;
          setWorkingPhase(null);
          workingTimersRef.current = [];
        }, TOTAL_WORKING_MS),
      );
    },
    [],
  );

  const setAgentStep = useCallback(
    (key: AgentKey, value: number, phases?: readonly string[]) => {
      if (phases) runAgentAction(() => applyAgentStep(key, value), phases);
      else applyAgentStep(key, value);
    },
    [applyAgentStep, runAgentAction],
  );

  const selectAgent = useCallback((key: AgentKey) => {
    if (workingRef.current) return;
    setActiveAgent(key);
    setComposerValue("");
  }, []);

  const replyFor = useCallback(
    (key: AgentKey, atStep: number, fallback: string) =>
      typedReplies[key][atStep] ?? fallback,
    [typedReplies],
  );

  const downloadPacket = useCallback(() => {
    const blob = createPacketZip(packetFiles);
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${CASE_ID}-reviewed-sanitized-packet.zip`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    setDownloaded(true);
  }, []);

  const sendPacket = useCallback(() => {
    setPacketSent(true);
    applyAgentStep("onsite", 6);
  }, [applyAgentStep]);

  const validateKnowledgeSelection = useCallback(() => {
    const valid =
      selectedKnowledge.size === 1 && selectedKnowledge.has("diagnostic");
    if (!valid) {
      setKnowledgeBlocked(true);
      return;
    }
    setKnowledgeBlocked(false);
    applyAgentStep("fixer", 7);
  }, [applyAgentStep, selectedKnowledge]);

  const requestOwnerApproval = useCallback(() => {
    setOwnerApprovalStatus("pending");
  }, []);

  const recordOwnerApproval = useCallback(() => {
    setOwnerApprovalStatus("approved");
    setKnowledgePromoted(true);
    applyAgentStep("fixer", 8);
  }, [applyAgentStep]);

  const toggleStageMode = useCallback(() => {
    setStageMode((current) => {
      const next = !current;
      if (next) {
        setShowInspector(false);
        setShowCue(false);
      }
      return next;
    });
  }, []);

  const toggleKnowledge = useCallback((id: KnowledgeChoice["id"]) => {
    setSelectedKnowledge((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setKnowledgeBlocked(false);
  }, []);

  const handleTypedAction = useCallback(
    (text: string) => {
      setTypedReplies((current) => ({
        ...current,
        [activeAgent]: {
          ...current[activeAgent],
          [step]: text,
        },
      }));

      if (activeAgent === "onsite") {
        if (step === 3 && /\b(send|export|transfer)\b/i.test(text)) {
          setUnsafeExportTried(true);
          return;
        }
        if (step < 5)
          setAgentStep("onsite", step + 1, ONSITE_STEP_PHASES[step]);
        else if (step === 5) sendPacket();
        return;
      }

      if (activeAgent === "fixer") {
        if (!packetSent) return;
        if (step < 6)
          setAgentStep("fixer", step + 1, FIXER_STEP_PHASES[step]);
        else if (step === 6) validateKnowledgeSelection();
        else if (step === 7) {
          if (
            ownerApprovalStatus === "pending" &&
            /\b(approve|accept|record|decision)\b/i.test(text)
          )
            recordOwnerApproval();
          else if (/\b(owner|request|review)\b/i.test(text))
            requestOwnerApproval();
          else setPromotionBlocked(true);
        }
        return;
      }

      if (step < 3)
        setAgentStep("manager", step + 1, MANAGER_STEP_PHASES[step]);
    },
    [
      activeAgent,
      ownerApprovalStatus,
      packetSent,
      recordOwnerApproval,
      requestOwnerApproval,
      sendPacket,
      setAgentStep,
      step,
      validateKnowledgeSelection,
    ],
  );

  const submitComposer = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      const value = composerValue.trim();
      if (!value) return;
      handleTypedAction(value);
      setComposerValue("");
    },
    [composerValue, handleTypedAction],
  );

  const resetAll = useCallback(() => {
    workingTimersRef.current.forEach(window.clearTimeout);
    workingTimersRef.current = [];
    workingRef.current = false;
    setWorkingPhase(null);
    setActiveAgent("onsite");
    setSteps(initialSteps);
    setTypedReplies(initialReplies);
    setComposerValue("");
    setPacketSent(false);
    setPacketModalOpen(false);
    setPullRequestModalOpen(false);
    setUnsafeExportTried(false);
    setDownloaded(false);
    setKnowledgeBlocked(false);
    setPromotionBlocked(false);
    setKnowledgePromoted(false);
    setOwnerApprovalStatus("not-requested");
    setFutureCaseOpen(false);
    setSelectedKnowledge(new Set(["diagnostic"]));
  }, []);

  useEffect(
    () => () => {
      workingTimersRef.current.forEach(window.clearTimeout);
    },
    [],
  );

  const toggleFullscreen = useCallback(async () => {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  }, []);

  useEffect(() => {
    window.history.replaceState(null, "", `#${activeAgent}`);
  }, [activeAgent]);

  useEffect(() => {
    streamRef.current?.scrollTo({
      top: streamRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [
    activeAgent,
    downloaded,
    futureCaseOpen,
    knowledgeBlocked,
    ownerApprovalStatus,
    packetSent,
    promotionBlocked,
    step,
    unsafeExportTried,
    workingPhase,
    stageMode,
  ]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      ) {
        return;
      }

      if (event.key === "1") selectAgent("onsite");
      else if (event.key === "2") selectAgent("fixer");
      else if (event.key === "3") selectAgent("manager");
      else if (event.key.toLowerCase() === "r") resetAll();
      else if (event.key.toLowerCase() === "f") void toggleFullscreen();
      else if (event.key.toLowerCase() === "n") setShowCue((value) => !value);
      else if (event.key.toLowerCase() === "s") toggleStageMode();
      else if (event.key === "Escape") {
        setPacketModalOpen(false);
        setPullRequestModalOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [resetAll, selectAgent, toggleFullscreen, toggleStageMode]);

  const renderOnsiteConversation = () => (
    <>
      <ChatBubble
        role="system"
        author="System"
        tone="alert"
      >
        <span className="system-alert-heading">
          <svg
            className="alert-icon"
            viewBox="0 0 20 20"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M10 2.2 18.4 17H1.6L10 2.2Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <line
              x1="10"
              y1="7.6"
              x2="10"
              y2="11.6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="10" cy="14.1" r="0.95" fill="currentColor" />
          </svg>
          <strong>Alignment failed</strong>
        </span>
        <span className="message-secondary">
          A repeated failure pattern was detected after X-axis movement.
        </span>
        <span className="message-timestamp">Started 09:41 local time</span>
      </ChatBubble>
      <ChatBubble role="agent" author={agents.onsite.name}>
        I can investigate the pattern inside the restricted fab workspace and
        help prepare a sanitized packet for offsite engineering.
        <strong className="bubble-question">
          Start a local investigation?
        </strong>
      </ChatBubble>

      {step >= 1 ? (
        <>
          <ChatBubble role="user" author="Field engineer">
            {replyFor("onsite", 0, "Start the local investigation.")}
          </ChatBubble>
          <ChatBubble role="agent" author={agents.onsite.name}>
            <DetailCard
              eyebrow="Local analysis"
              title="One supported pattern, one useful question"
              tone="blue"
            >
              <RowList>
                <li>Failure follows X-axis movement.</li>
                <li>Prolonged settling precedes the alignment error.</li>
                <li>Imaging confidence appears acceptable.</li>
                <li>A retry does not recover.</li>
              </RowList>
              <div className="question-callout">
                Does vibration continue through the measurement window?
              </div>
            </DetailCard>
            <p>
              I am keeping raw lines, timestamps, identifiers, filenames, and
              exact machine values local.
            </p>
          </ChatBubble>
          <ActionActivity agent="onsite" step={1} />
        </>
      ) : null}

      {step >= 2 ? (
        <>
          <ChatBubble role="user" author="Field engineer">
            {replyFor(
              "onsite",
              1,
              "Yes. Vibration continues through measurement. Maintenance history is not available yet.",
            )}
          </ChatBubble>
          <ChatBubble role="agent" author={agents.onsite.name}>
            That observation raises confidence in the stage-settling path, but
            it does not establish a mechanical cause.
            <strong className="bubble-question">
              Create a sanitized draft for review?
            </strong>
          </ChatBubble>
          <ActionActivity agent="onsite" step={2} />
        </>
      ) : null}

      {step >= 3 ? (
        <>
          <ChatBubble role="user" author="Field engineer">
            {replyFor("onsite", 2, "Create the sanitized draft packet.")}
          </ChatBubble>
          <ChatBubble role="agent" author={agents.onsite.name}>
            <DetailCard
              eyebrow="Draft · fab-side only"
              title="Sanitized debug packet"
              tone="purple"
            >
              <div className="packet-summary-grid">
                <div>
                  <span>Facts</span>
                  <strong>Relative symptom sequence</strong>
                </div>
                <div>
                  <span>Hypothesis</span>
                  <strong>Stage path · moderate confidence</strong>
                </div>
                <div>
                  <span>Open gap</span>
                  <strong>Maintenance history unresolved</strong>
                </div>
                <div>
                  <span>Redactions</span>
                  <strong>Restricted and exact values removed</strong>
                </div>
              </div>
            </DetailCard>
            <p>
              This is useful, but it is not authorized to leave the fab. Please
              review the wording and boundary record.
            </p>
          </ChatBubble>
          <ActionActivity agent="onsite" step={3} />
        </>
      ) : null}

      {unsafeExportTried ? (
        <ChatBubble
          role="system"
          author="Transfer validator"
          tone="blocked"
          label="Export refused"
        >
          <strong>Missing approved review status.</strong>
          <span className="message-secondary">
            The draft remains local. No offsite artifact was created.
          </span>
        </ChatBubble>
      ) : null}

      {step >= 4 ? (
        <>
          <ChatBubble role="user" author="Field engineer">
            {replyFor("onsite", 3, "Review the packet with me.")}
          </ChatBubble>
          <ChatBubble role="agent" author={agents.onsite.name}>
            <DetailCard
              eyebrow="Human review"
              title="What will cross—and what will not"
              tone="blue"
            >
              <div className="boundary-columns">
                <div>
                  <span>Included</span>
                  <p>
                    Supported sequence, confidence, missing evidence, next
                    experiment, reviewer metadata.
                  </p>
                </div>
                <div>
                  <span>Stays onsite</span>
                  <p>
                    Raw logs, exact values, timestamps, restricted identifiers,
                    and local filenames.
                  </p>
                </div>
              </div>
            </DetailCard>
            <p>
              The packet still says the mechanical cause is unknown. You remain
              the release authority.
            </p>
          </ChatBubble>
          <ActionActivity agent="onsite" step={4} />
        </>
      ) : null}

      {step >= 5 ? (
        <>
          <ChatBubble role="user" author="Field engineer">
            {replyFor(
              "onsite",
              4,
              "The wording is accurate. I approve this sanitized packet for transfer.",
            )}
          </ChatBubble>
          <ChatBubble
            role="system"
            author="Transfer validator"
            tone="success"
            label="Validation passed"
          >
            Human review, packet structure, redaction scan, identity, and
            checksum are bound to the same export.
          </ChatBubble>
          <ChatBubble role="agent" author={agents.onsite.name}>
            <DetailCard
              eyebrow="Ready for handoff"
              title="Reviewed sanitized packet"
              tone="green"
            >
              <div className="file-row">
                {packetFiles.map((file) => (
                  <span key={file.name}>{file.name}</span>
                ))}
              </div>
              <code className="packet-version">{PACKET_VERSION}</code>
            </DetailCard>
            <p>
              You can inspect or download the exact bundle before sending it to
              the offsite engineer.
            </p>
          </ChatBubble>
          {downloaded ? (
            <ChatBubble
              role="system"
              author="Browser"
              tone="success"
              label="Download created"
            >
              The ZIP contains only the three reviewed transfer artifacts.
            </ChatBubble>
          ) : null}
          <ActionActivity agent="onsite" step={5} />
        </>
      ) : null}

      {step >= 6 ? (
        <>
          <ChatBubble role="user" author="Field engineer">
            {replyFor(
              "onsite",
              5,
              "Send the reviewed packet to the Fixer Agent.",
            )}
          </ChatBubble>
          <ChatBubble
            role="system"
            author="Handoff service"
            tone="success"
            label="Packet admitted"
          >
            The engineering-side importer independently validated the reviewed
            bundle. The Fixer Agent has one new field issue.
          </ChatBubble>
          <ChatBubble role="agent" author={agents.onsite.name}>
            Handoff complete. The restricted evidence is still onsite; only the
            reviewed context crossed the boundary.
          </ChatBubble>
          <ActionActivity agent="onsite" step={6} />
        </>
      ) : null}
    </>
  );

  const renderFixerConversation = () => {
    if (!packetSent) {
      return (
        <>
          <ChatBubble
            role="system"
            author="Inbox"
            tone="default"
            label="Waiting for reviewed context"
          >
            No field issue has crossed the fab boundary yet.
          </ChatBubble>
          <ChatBubble role="agent" author={agents.fixer.name}>
            I will only open a case from a reviewed packet admitted by the
            engineering-side validator. I cannot inspect the raw fab workspace.
          </ChatBubble>
        </>
      );
    }

    return (
      <>
        <ChatBubble
          role="system"
          author="Engineering inbox"
          tone="alert"
          label="New field issue"
        >
          <strong>{CASE_ID} · Fine alignment failure</strong>
          <span className="message-secondary">
            Reviewed packet available · assigned engineer: Engineer
          </span>
        </ChatBubble>
        <ChatBubble role="agent" author={agents.fixer.name}>
          I have a reviewed sanitized packet and can combine it with code, test
          access, and approved component guidance.
          <strong className="bubble-question">Open the case?</strong>
        </ChatBubble>

        {step >= 1 ? (
          <>
            <ChatBubble role="user" author="Engineer">
              {replyFor("fixer", 0, "Open the field issue.")}
            </ChatBubble>
            <ChatBubble role="agent" author={agents.fixer.name}>
              <DetailCard
                eyebrow="Decision workspace"
                title="Facts stay separate from hypotheses"
                tone="purple"
              >
                <FactHypothesisCard />
              </DetailCard>
              <p>
                The smallest useful next step is an experiment that separates
                stage settling from a stage-to-imaging interaction.
              </p>
            </ChatBubble>
            <ActionActivity agent="fixer" step={1} />
          </>
        ) : null}

        {step >= 2 ? (
          <>
            <ChatBubble role="user" author="Engineer">
              {replyFor("fixer", 1, "Prepare the stage-settling experiment.")}
            </ChatBubble>
            <ChatBubble role="agent" author={agents.fixer.name}>
              <DetailCard
                eyebrow="Discriminating experiment"
                title="One test, two meaningful branches"
                tone="blue"
              >
                <div className="branch-grid">
                  <div>
                    <span>If settling normalizes</span>
                    <strong>and alignment recovers</strong>
                    <p>The stage path is supported.</p>
                  </div>
                  <div>
                    <span>If settling normalizes</span>
                    <strong>but alignment still fails</strong>
                    <p>Investigate stage-to-imaging before changing imaging.</p>
                  </div>
                </div>
              </DetailCard>
              <p>
                The onsite field engineer owns physical intervention. You own
                diagnosis, experiment design, and verification.
              </p>
            </ChatBubble>
            <ActionActivity agent="fixer" step={2} />
          </>
        ) : null}

        {step >= 3 ? (
          <>
            <ChatBubble role="user" author="Engineer">
              {replyFor(
                "fixer",
                2,
                "Run the diagnostic and inspect the stage-settle code path.",
              )}
            </ChatBubble>
            <ChatBubble
              role="system"
              author="Investigation workspace"
              tone="warning"
              label="Hybrid finding"
            >
              Onsite inspection supports an unhealthy stage damper. Code review
              also found that alignment can start after one in-position sample
              without checking velocity or consecutive stability.
            </ChatBubble>
            <ChatBubble role="agent" author={agents.fixer.name}>
              <DetailCard
                eyebrow="Two fixes · different owners"
                title="Restore the tool and harden the software"
                tone="purple"
              >
                <div className="hybrid-fix-grid">
                  <div>
                    <span>Physical recovery</span>
                    <strong>Service the degraded stage damper</strong>
                    <p>Owner: onsite field engineer</p>
                  </div>
                  <div>
                    <span>Software resilience</span>
                    <strong>Strengthen the stage-settle gate</strong>
                    <p>Owner: Engineer · code review required</p>
                  </div>
                </div>
                <div className="failing-test-row">
                  <span>Failing reproduction</span>
                  <strong>
                    Motion simulator starts alignment while velocity is still
                    unstable
                  </strong>
                </div>
              </DetailCard>
              <p>
                The software must require stable position and velocity for a
                consecutive window before alignment begins. Unhealthy hardware
                should fail with a useful stage diagnostic—not a generic
                alignment error.
              </p>
            </ChatBubble>
            <ActionActivity agent="fixer" step={3} />
          </>
        ) : null}

        {step >= 4 ? (
          <>
            <ChatBubble role="user" author="Engineer">
              {replyFor("fixer", 3, "Show the proposed code changes.")}
            </ChatBubble>
            <ChatBubble role="agent" author={agents.fixer.name}>
              <DetailCard
                eyebrow={`Proposed diff · ${pullRequest.repository}`}
                title={pullRequest.title}
                tone="green"
              >
                <div className="mini-diff standard-detail">
                  <div className="mini-remove">
                    − settle on one in-position sample
                  </div>
                  <div className="mini-add">
                    + require position and velocity stability
                  </div>
                  <div className="mini-add">
                    + require consecutive stable samples
                  </div>
                  <div className="mini-add">
                    + return an actionable stage diagnostic
                  </div>
                </div>
                <div className="stage-only stage-diff-summary">
                  <div>
                    <span>Before</span>
                    <strong>One position sample could start alignment</strong>
                  </div>
                  <div>
                    <span>After</span>
                    <strong>Position + velocity must stay stable</strong>
                  </div>
                </div>
                <div className="proposal-meta">
                  <span>2 files</span>
                  <span>+{pullRequest.additions} −{pullRequest.deletions}</span>
                  <span>unit tests included</span>
                </div>
              </DetailCard>
              <p>
                The patch changes the runtime guard and adds regression tests.
                It is still a proposal; no repository has been modified.
              </p>
            </ChatBubble>
            <ActionActivity agent="fixer" step={4} />
          </>
        ) : null}

        {step >= 5 ? (
          <>
            <ChatBubble role="user" author="Engineer">
              {replyFor(
                "fixer",
                4,
                `Create pull request #${pullRequest.number} for review.`,
              )}
            </ChatBubble>
            <ChatBubble role="agent" author={agents.fixer.name}>
              <DetailCard
                eyebrow="Mock pull request · open"
                title={`#${pullRequest.number} ${pullRequest.title}`}
                tone="blue"
              >
                <div className="pull-request-card">
                  <div className="pr-repository-row">
                    <span>{pullRequest.repository}</span>
                    <InlineStatus tone="warning">review required</InlineStatus>
                  </div>
                  <p>{pullRequest.summary}</p>
                  <div className="pr-checks">
                    <span>✓ Type check</span>
                    <span>✓ Unit tests</span>
                    <span>✓ Motion simulator</span>
                    <span>○ Human review</span>
                  </div>
                  <code>
                    {pullRequest.branch} → {pullRequest.base}
                  </code>
                  <div className="rollout-line">
                    Canary rollout · watch stage-not-stable rate and alignment
                    success
                  </div>
                  <button
                    type="button"
                    className="action-button action-secondary pr-diff-button"
                    onClick={() => setPullRequestModalOpen(true)}
                  >
                    Show pull request diff
                  </button>
                </div>
              </DetailCard>
              <p>
                The agent drafted the change. Engineer still owns the code, test
                evidence, reviewer choice, and merge decision.
              </p>
            </ChatBubble>
            <ActionActivity agent="fixer" step={5} />
          </>
        ) : null}

        {step >= 6 ? (
          <>
            <ChatBubble role="user" author="Engineer">
              {replyFor(
                "fixer",
                5,
                "Proceed after code review, deployment, onsite service, and verification.",
              )}
            </ChatBubble>
            <ChatBubble
              role="system"
              author="Demo timeline"
              tone="warning"
              label="Explicit time jump"
            >
              The pull request is reviewed, merged, and deployed. The onsite
              field engineer services the degraded damper. Engineer then verifies
              five repeated runs.
            </ChatBubble>
            <ChatBubble role="agent" author={agents.fixer.name}>
              <DetailCard
                eyebrow="Verified result"
                title="Hardware recovered · software guard active"
                tone="green"
              >
                <div className="verification-grid standard-detail">
                  <div>
                    <span>Pull request</span>
                    <strong>#{pullRequest.number} merged</strong>
                  </div>
                  <div>
                    <span>Field service</span>
                    <strong>Stage damper restored</strong>
                  </div>
                  <div>
                    <span>Verification</span>
                    <strong>5 runs passed</strong>
                  </div>
                </div>
                <div className="stage-only stage-result-summary">
                  <strong>PR merged · damper restored · 5/5 runs passed</strong>
                  <span>The case is closed. Reuse still needs a new decision.</span>
                </div>
              </DetailCard>
              <p>
                The case is closed. Which part should be proposed as reusable
                guidance for the next engineer?
              </p>
              <div className="knowledge-selector">
                {knowledgeChoices.map((choice) => (
                  <label
                    key={choice.id}
                    className={
                      selectedKnowledge.has(choice.id) ? "is-selected" : ""
                    }
                  >
                    <input
                      type="checkbox"
                      checked={selectedKnowledge.has(choice.id)}
                      onChange={() => toggleKnowledge(choice.id)}
                    />
                    <span>
                      <strong>{choice.title}</strong>
                      <small>{choice.detail}</small>
                    </span>
                    <InlineStatus
                      tone={
                        choice.verdict === "reusable" ? "success" : "warning"
                      }
                    >
                      {choice.verdict}
                    </InlineStatus>
                  </label>
                ))}
              </div>
            </ChatBubble>
            <ActionActivity agent="fixer" step={6} />
          </>
        ) : null}

        {knowledgeBlocked ? (
          <ChatBubble
            role="system"
            author="Knowledge validator"
            tone="blocked"
            label="Selection needs revision"
          >
            Case-specific cause or actions cannot become default component
            guidance. Keep only the narrow, reusable diagnostic rule.
          </ChatBubble>
        ) : null}

        {step >= 7 ? (
          <>
            <ChatBubble role="user" author="Engineer">
              {replyFor(
                "fixer",
                6,
                "Propose only the reusable guardrail and diagnostic.",
              )}
            </ChatBubble>
            <ChatBubble role="agent" author={agents.fixer.name}>
              <DetailCard
                eyebrow="Promotion proposal"
                title="Stage-settling guardrail + diagnostic"
                tone="purple"
              >
                <p>
                  Require both position and velocity to remain stable for the
                  configured window before alignment. If the guard rejects
                  motion, run the approved stage-settling diagnostic before
                  changing imaging configuration.
                </p>
                <div className="proposal-meta">
                  <span>Source case: {CASE_ID}</span>
                  <span>Code: PR #{pullRequest.number}</span>
                  <span>Limitation: no default physical cause</span>
                </div>
              </DetailCard>
              <p>
                The proposal is ready. Shared component knowledge is still
                unchanged.
              </p>
            </ChatBubble>
            <ActionActivity agent="fixer" step={7} />
          </>
        ) : null}

        {promotionBlocked ? (
          <ChatBubble
            role="system"
            author="Knowledge gate"
            tone="blocked"
            label="Promotion refused"
          >
            Human approval record is missing. A resolved case cannot rewrite
            shared guidance on its own.
          </ChatBubble>
        ) : null}

        {ownerApprovalStatus === "pending" ? (
          <>
            <ChatBubble role="user" author="Engineer">
              Request Motion Controls owner review. Do not update shared
              guidance yet.
            </ChatBubble>
            <ChatBubble
              role="system"
              author="Approval workflow"
              tone="warning"
              label="Owner decision pending"
            >
              <strong>Shared component guidance is unchanged.</strong>
              <span className="message-secondary">
                Motion Controls received the source case, PR reference, proposed
                scope, and explicit no-default-cause limitation.
              </span>
            </ChatBubble>
            <ActionActivity agent="fixer" step={8} />
          </>
        ) : null}

        {step >= 8 ? (
          <>
            <ChatBubble role="user" author="Motion Controls owner">
              I reviewed the code reference, diagnostic scope, source trail, and
              limitations. I approve this reusable guidance.
              <span className="approval-signature">
                Named human decision · Motion Controls
              </span>
            </ChatBubble>
            <ChatBubble
              role="system"
              author="Knowledge service"
              tone="success"
              label="Shared guidance updated"
            >
              One software guardrail and diagnostic were promoted with source,
              pull request, reviewer, limitations, and ownership. The old case
              actions and physical cause were not carried forward.
            </ChatBubble>
            <ChatBubble role="agent" author={agents.fixer.name}>
              A future engineer will see the code safeguard and a better first
              diagnostic—not this case's conclusion.
            </ChatBubble>
          </>
        ) : null}

        {futureCaseOpen ? (
          <>
            <ChatBubble
              role="system"
              author="Demo timeline"
              tone="alert"
              label="Six months later · cold start"
            >
              A new engineer opens a similar post-X-axis alignment failure. No
              engineer from the original case is available.
            </ChatBubble>
            <ChatBubble role="agent" author={agents.fixer.name}>
              <DetailCard
                eyebrow="Six months later · scoped retrieval · approved guidance"
                title="Start with the stage-settling diagnostic"
                tone="green"
              >
                <div className="cold-start-grid">
                  <div>
                    <span>Retrieved guidance</span>
                    <strong>
                      Require stable position and velocity for the configured
                      window before alignment.
                    </strong>
                  </div>
                  <div>
                    <span>Source</span>
                    <strong>
                      {CASE_ID} · PR #{pullRequest.number} · Motion Controls
                      approval
                    </strong>
                  </div>
                  <div>
                    <span>Limitation</span>
                    <strong>
                      Use only for the approved settling symptom pattern; this
                      guidance does not establish a mechanical cause.
                    </strong>
                  </div>
                  <div>
                    <span>Next action</span>
                    <strong>
                      Run the stage-settling diagnostic. If motion normalizes but
                      alignment still fails, inspect stage-to-imaging interaction.
                    </strong>
                  </div>
                  <div className="cold-start-non-assumption">
                    <span>Explicit non-assumption</span>
                    <strong>
                      Do not assume a damaged damper or repeat the old case's
                      service actions.
                    </strong>
                  </div>
                </div>
              </DetailCard>
              <p>
                The second brain shortens reconstruction without preselecting the
                diagnosis.
              </p>
            </ChatBubble>
          </>
        ) : null}
      </>
    );
  };

  const renderManagerConversation = () => (
    <>
      <ChatBubble
        role="system"
        author="Private capture"
        tone="alert"
        label="Manager-provided note"
      >
        <strong>Post-stand-up note ready to process</strong>
        <span className="message-secondary">
          Visible only in this manager workspace.
        </span>
      </ChatBubble>
      <ChatBubble role="agent" author={agents.manager.name}>
        I can turn your note into professional follow-through. I will classify
        each fragment before anything becomes durable memory.
        <DetailCard
          eyebrow="Unprocessed capture"
          title="Mobile App Migration"
          tone="pink"
        >
          <RowList>
            <li>Auth migration is behind because QA login keeps failing.</li>
            <li>
              Rahul may unblock by Thursday if infrastructure provides test
              credentials.
            </li>
            <li>Tell Maya the rollout risk is medium, not low.</li>
            <li>I promised Priya I would review staffing.</li>
            <li className="rejected-input">
              “Priya seemed off today.”{" "}
              <span>Input only · requires a memory decision</span>
            </li>
          </RowList>
        </DetailCard>
      </ChatBubble>

      {step >= 1 ? (
        <>
          <ChatBubble role="user" author="Manager">
            {replyFor("manager", 0, "Process this note.")}
          </ChatBubble>
          <ChatBubble role="agent" author={agents.manager.name}>
            <div className="memory-decision-grid">
              <DetailCard eyebrow="Remember" title="Supported context" tone="blue">
                <p>
                  Migration risk, QA login blocker, Maya update, and the
                  manager's staffing promise.
                </p>
              </DetailCard>
              <DetailCard
                eyebrow="Keep uncertain"
                title="Conditional timing"
                tone="purple"
              >
                <p>
                  Rahul <strong>may</strong> unblock by Thursday{" "}
                  <strong>if</strong> credentials arrive.
                </p>
              </DetailCard>
              <DetailCard
                eyebrow="Reject"
                title="People judgment"
                tone="pink"
              >
                <p>
                  “Priya seemed off” is not supported professional context and
                  is not retained.
                </p>
              </DetailCard>
            </div>
            <p>
              I can now create reviewable follow-through from the retained
              context.
            </p>
          </ChatBubble>
          <ActionActivity agent="manager" step={1} />
        </>
      ) : null}

      {step >= 2 ? (
        <>
          <ChatBubble role="user" author="Manager">
            {replyFor("manager", 1, "Create my follow-through drafts.")}
          </ChatBubble>
          <ChatBubble role="agent" author={agents.manager.name}>
            <DetailCard
              eyebrow="Draft surfaces"
              title="Useful context at the next decision"
              tone="green"
            >
              <div className="surface-list">
                <div>
                  <span>Today</span>
                  <strong>Daily brief</strong>
                  <p>Risk, blocker, and the few follow-ups that matter.</p>
                </div>
                <div>
                  <span>1:1</span>
                  <strong>Conversation continuity</strong>
                  <p>Agreed staffing follow-up—not a dossier.</p>
                </div>
                <div>
                  <span>Update</span>
                  <strong>Maya stakeholder draft</strong>
                  <p>Medium risk, dependency, and conditional timing.</p>
                </div>
              </div>
            </DetailCard>
            <p>Nothing has been sent. Every surface requires your review.</p>
          </ChatBubble>
          <ActionActivity agent="manager" step={2} />
        </>
      ) : null}

      {step >= 3 ? (
        <>
          <ChatBubble role="user" author="Manager">
            {replyFor("manager", 2, "Show me the Maya draft and receipt.")}
          </ChatBubble>
          <ChatBubble role="agent" author={agents.manager.name}>
            <DetailCard
              eyebrow="Draft · human review required"
              title="Stakeholder update for Maya"
              tone="pink"
            >
              <blockquote>
                The auth migration rollout risk is medium. QA login remains
                blocked on test credentials from infrastructure. Thursday is a
                possibility, not a confirmed recovery date. I will update you
                when ownership and timing are confirmed.
              </blockquote>
            </DetailCard>
            <div className="receipt-strip">
              <span>Receipt</span>
              <strong>Remembered 4</strong>
              <strong>Uncertain 1</strong>
              <strong>Rejected 1</strong>
              <strong>External actions 0</strong>
            </div>
            <p>
              Professional continuity survived. Uncertainty stayed visible.
              Speculative judgment did not become memory.
            </p>
          </ChatBubble>
          <ActionActivity agent="manager" step={3} />
        </>
      ) : null}
    </>
  );

  const renderQuickActions = () => {
    if (activeAgent === "onsite") {
      if (step === 0) {
        return (
          <ActionButton
            onClick={() =>
              setAgentStep("onsite", 1, ONSITE_STEP_PHASES[0])
            }
          >
            Start local investigation
          </ActionButton>
        );
      }
      if (step === 1) {
        return (
          <ActionButton onClick={() => setAgentStep("onsite", 2)}>
            Confirm onsite observation
          </ActionButton>
        );
      }
      if (step === 2) {
        return (
          <ActionButton
            onClick={() =>
              setAgentStep("onsite", 3, ONSITE_STEP_PHASES[2])
            }
          >
            Create sanitized draft
          </ActionButton>
        );
      }
      if (step === 3) {
        return (
          <>
            <ActionButton
              variant="danger"
              onClick={() => setUnsafeExportTried(true)}
            >
              Send now
            </ActionButton>
            <ActionButton
              variant="primary"
              onClick={() =>
                setAgentStep("onsite", 4, ONSITE_STEP_PHASES[3])
              }
            >
              Review packet
            </ActionButton>
          </>
        );
      }
      if (step === 4) {
        return (
          <ActionButton
            onClick={() =>
              setAgentStep("onsite", 5, ONSITE_STEP_PHASES[4])
            }
          >
            Approve reviewed transfer
          </ActionButton>
        );
      }
      if (step === 5) {
        return (
          <>
            <ActionButton
              variant="secondary"
              onClick={() => setPacketModalOpen(true)}
            >
              View contents
            </ActionButton>
            <ActionButton variant="secondary" onClick={downloadPacket}>
              Download .zip
            </ActionButton>
            <ActionButton onClick={sendPacket}>Send to Fixer</ActionButton>
          </>
        );
      }
      return (
        <ActionButton onClick={() => selectAgent("fixer")}>
          Open Fixer Agent
        </ActionButton>
      );
    }

    if (activeAgent === "fixer") {
      if (!packetSent) {
        return (
          <ActionButton onClick={() => selectAgent("onsite")}>
            Return to OnSite Agent
          </ActionButton>
        );
      }
      if (step === 0) {
        return (
          <ActionButton
            onClick={() => setAgentStep("fixer", 1, FIXER_STEP_PHASES[0])}
          >
            Open field issue
          </ActionButton>
        );
      }
      if (step === 1) {
        return (
          <ActionButton
            onClick={() => setAgentStep("fixer", 2, FIXER_STEP_PHASES[1])}
          >
            Prepare stage-settling experiment
          </ActionButton>
        );
      }
      if (step === 2) {
        return (
          <ActionButton
            onClick={() => setAgentStep("fixer", 3, FIXER_STEP_PHASES[2])}
          >
            Run diagnostic + inspect code
          </ActionButton>
        );
      }
      if (step === 3) {
        return (
          <ActionButton
            onClick={() => {
              applyAgentStep("fixer", 4);
              if (!stageMode) setPullRequestModalOpen(true);
            }}
          >
            Review proposed diff
          </ActionButton>
        );
      }
      if (step === 4) {
        return (
          <>
            {!stageMode ? (
              <ActionButton
                variant="secondary"
                onClick={() => setPullRequestModalOpen(true)}
              >
                Open full diff
              </ActionButton>
            ) : null}
            <ActionButton onClick={() => setAgentStep("fixer", 5)}>
              Create pull request
            </ActionButton>
          </>
        );
      }
      if (step === 5) {
        return (
          <>
            <ActionButton
              variant="secondary"
              onClick={() => setPullRequestModalOpen(true)}
            >
              Show diff
            </ActionButton>
            <ActionButton onClick={() => setAgentStep("fixer", 6)}>
              Simulate review + deploy + verify
            </ActionButton>
          </>
        );
      }
      if (step === 6) {
        return (
          <ActionButton onClick={validateKnowledgeSelection}>
            Review knowledge selection
          </ActionButton>
        );
      }
      if (step === 7) {
        if (ownerApprovalStatus === "pending") {
          return (
            <ActionButton onClick={recordOwnerApproval}>
              Motion Controls owner: approve
            </ActionButton>
          );
        }
        return (
          <>
            <ActionButton
              variant="danger"
              onClick={() => setPromotionBlocked(true)}
            >
              Promote now
            </ActionButton>
            <ActionButton onClick={requestOwnerApproval}>
              Request owner review
            </ActionButton>
          </>
        );
      }
      if (!futureCaseOpen) {
        return (
          <ActionButton onClick={() => setFutureCaseOpen(true)}>
            Six months later: open cold start
          </ActionButton>
        );
      }
      return (
        <ActionButton variant="secondary" onClick={() => selectAgent("manager")}>
          Open Manager Assistant
        </ActionButton>
      );
    }

    if (step === 0) {
      return (
        <ActionButton
          onClick={() =>
            setAgentStep("manager", 1, MANAGER_STEP_PHASES[0])
          }
        >
          Process the note
        </ActionButton>
      );
    }
    if (step === 1) {
      return (
        <ActionButton
          onClick={() =>
            setAgentStep("manager", 2, MANAGER_STEP_PHASES[1])
          }
        >
          Create follow-through drafts
        </ActionButton>
      );
    }
    if (step === 2) {
      return (
        <ActionButton
          onClick={() =>
            setAgentStep("manager", 3, MANAGER_STEP_PHASES[2])
          }
        >
          Review Maya draft + receipt
        </ActionButton>
      );
    }
    return (
      <ActionButton variant="secondary" onClick={resetAll}>
        Restart guided demo
      </ActionButton>
    );
  };

  return (
    <div
      className={`app-shell${workingPhase !== null ? " is-working" : ""}${
        stageMode ? " stage-mode" : ""
      }`}
    >
      <header className="product-header">
        <div className="brand-lockup">
          <span className="brand-mark" aria-hidden="true" />
          <div>
            <strong>Second Brain</strong>
            <span>Agent workspace</span>
          </div>
        </div>
        <div className="demo-mode" role="note">
          <span className="demo-dot" aria-hidden="true" />
          Demo app
        </div>
        <div className="header-actions">
          <button
            type="button"
            className="secondary-control"
            onClick={() => setShowInspector((value) => !value)}
          >
            {showInspector ? "Hide context" : "Show context"}
          </button>
          <button
            type="button"
            className="secondary-control"
            onClick={() => setShowCue((value) => !value)}
          >
            {showCue ? "Hide cue" : "Show cue"}
          </button>
          <button
            type="button"
            className="stage-mode-toggle"
            aria-pressed={stageMode}
            onClick={toggleStageMode}
          >
            {stageMode ? "Exit stage view" : "Stage view"}
          </button>
          <button type="button" onClick={() => void toggleFullscreen()}>
            Fullscreen
          </button>
          <button type="button" className="secondary-control" onClick={resetAll}>
            Reset
          </button>
        </div>
      </header>

      <div
        className={`workspace-grid${showInspector ? " inspector-open" : ""}`}
      >
        <AgentRail
          activeAgent={activeAgent}
          steps={steps}
          packetSent={packetSent}
          onSelect={selectAgent}
        />

        <main className="chat-workspace">
          <header className="chat-header">
            <div className="chat-identity">
              <AgentAvatar agent={agent} size="large" />
              <div>
                <h1>{agent.name}</h1>
                <span>
                  {agent.subtitle} ·{" "}
                  <InlineStatus tone="success">available</InlineStatus>
                </span>
              </div>
            </div>
            <div className="scope-pill">
              <span className="lock-icon" aria-hidden="true" />
              Role-scoped context
            </div>
          </header>

          <div className="conversation-stream" ref={streamRef}>
            <div className="conversation-inner">
              <div className="conversation-date">
                <span>Guided scenario</span>
              </div>
              {activeAgent === "onsite"
                ? renderOnsiteConversation()
                : activeAgent === "fixer"
                  ? renderFixerConversation()
                  : renderManagerConversation()}
              {workingPhase !== null ? (
                <div className="ai-working" role="status" aria-live="polite">
                  <div className="ai-working-orb" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="ai-working-copy">
                    <strong>{workingPhases[workingPhase]}</strong>
                    <div className="ai-working-stages" aria-hidden="true">
                      {workingPhases.map((label, index) => (
                        <span
                          className={
                            index < workingPhase
                              ? "is-complete"
                              : index === workingPhase
                                ? "is-active"
                                : ""
                          }
                          key={label}
                        >
                          {label.replace("…", "")}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <QuickActions>{renderQuickActions()}</QuickActions>
              )}
            </div>
          </div>

          <form className="chat-composer" onSubmit={submitComposer}>
            <div className="composer-box">
              <textarea
                aria-label={`Message ${agent.name}`}
                value={composerValue}
                onChange={(event) => setComposerValue(event.target.value)}
                placeholder={`Message ${agent.shortName}…`}
                rows={1}
                disabled={workingPhase !== null}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    event.currentTarget.form?.requestSubmit();
                  }
                }}
              />
              <button
                type="submit"
                className="send-button"
                disabled={!composerValue.trim() || workingPhase !== null}
                aria-label="Send message"
              >
                ↑
              </button>
            </div>
            <p>
              Guided demo: typed input is matched to this rehearsed workflow.
              Suggested actions are safest on stage.
            </p>
          </form>
        </main>

        {showInspector ? (
          <ContextInspector
            activeAgent={activeAgent}
            step={step}
            packetSent={packetSent}
            knowledgePromoted={knowledgePromoted}
            showCue={showCue}
            onClose={() => setShowInspector(false)}
          />
        ) : null}
      </div>

      <PacketModal
        open={packetModalOpen}
        onClose={() => setPacketModalOpen(false)}
        onDownload={downloadPacket}
      />
      <PullRequestModal
        open={pullRequestModalOpen}
        created={steps.fixer >= 5}
        onClose={() => setPullRequestModalOpen(false)}
        onCreate={() => setAgentStep("fixer", 5)}
      />
    </div>
  );
}
