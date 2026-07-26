import { agents, CASE_ID, PACKET_VERSION, presenterCues } from "../data";
import type { AgentKey } from "../types";
import { InlineStatus } from "./ChatPrimitives";

interface ContextInspectorProps {
  activeAgent: AgentKey;
  step: number;
  packetSent: boolean;
  knowledgePromoted: boolean;
  showCue: boolean;
  onClose: () => void;
}

export function ContextInspector({
  activeAgent,
  step,
  packetSent,
  knowledgePromoted,
  showCue,
  onClose,
}: ContextInspectorProps) {
  const agent = agents[activeAgent];
  const progress = Math.min(
    100,
    Math.round(((step + 1) / agent.totalSteps) * 100),
  );
  const cue =
    presenterCues[activeAgent][
      Math.min(step, presenterCues[activeAgent].length - 1)
    ];

  return (
    <aside className="context-inspector" aria-label="Agent scope and context">
      <div className="inspector-header">
        <span>Context inspector</span>
        <div className="inspector-header-actions">
          <InlineStatus tone="neutral">Scoped</InlineStatus>
          <button type="button" onClick={onClose} aria-label="Hide context inspector">
            ×
          </button>
        </div>
      </div>

      <section className="inspector-section scope-summary">
        <h2>{agent.shortName} boundary</h2>
        <p>{agent.scope}</p>
      </section>

      <section className="inspector-section">
        <h3>Can see</h3>
        <ul className="scope-list list-can">
          {agent.canSee.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="inspector-section">
        <h3>Cannot see or do</h3>
        <ul className="scope-list list-cannot">
          {agent.cannotSee.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="inspector-section human-owner">
        <span>Human decision owner</span>
        <p>{agent.humanOwner}</p>
      </section>

      <section className="inspector-section case-state">
        <div className="section-title-row">
          <h3>Workflow state</h3>
          <span>{progress}%</span>
        </div>
        <div className="progress-track">
          <span style={{ width: `${progress}%` }} />
        </div>
        {activeAgent !== "manager" ? (
          <dl>
            <div>
              <dt>Case</dt>
              <dd>{CASE_ID}</dd>
            </div>
            <div>
              <dt>Packet</dt>
              <dd>{packetSent ? "Transferred" : "Fab-side only"}</dd>
            </div>
            <div>
              <dt>Shared knowledge</dt>
              <dd>{knowledgePromoted ? "Updated" : "Unchanged"}</dd>
            </div>
          </dl>
        ) : (
          <dl>
            <div>
              <dt>Source</dt>
              <dd>Manager note</dd>
            </div>
            <div>
              <dt>Outputs</dt>
              <dd>Drafts only</dd>
            </div>
            <div>
              <dt>External action</dt>
              <dd>None</dd>
            </div>
          </dl>
        )}
      </section>

      {packetSent && activeAgent === "fixer" ? (
        <section className="inspector-section packet-identity">
          <span>Admitted packet</span>
          <code>{PACKET_VERSION}</code>
        </section>
      ) : null}

      {showCue ? (
        <section className="inspector-section presenter-cue">
          <span>Presenter cue</span>
          <p>{cue}</p>
        </section>
      ) : null}
    </aside>
  );
}
