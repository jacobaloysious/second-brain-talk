import { agentOrder, agents } from "../data";
import type { AgentKey } from "../types";
import { AgentAvatar } from "./ChatPrimitives";

interface AgentRailProps {
  activeAgent: AgentKey;
  steps: Record<AgentKey, number>;
  packetSent: boolean;
  onSelect: (agent: AgentKey) => void;
}

export function AgentRail({
  activeAgent,
  steps,
  packetSent,
  onSelect,
}: AgentRailProps) {
  const badgeFor = (agent: AgentKey) => {
    if (agent === "fixer" && packetSent && steps.fixer === 0) return "1";
    if (agent === "manager" && steps.manager === 0) return "1 note";
    return null;
  };

  return (
    <nav className="agent-rail" aria-label="Agent conversations">
      <div className="rail-heading">
        <span>Workspaces</span>
        <strong>Role-scoped agents</strong>
      </div>

      <div className="agent-tabs">
        {agentOrder.map((key, index) => {
          const agent = agents[key];
          const badge = badgeFor(key);
          const active = key === activeAgent;
          const complete =
            steps[key] >= agent.totalSteps - 1 ||
            (key === "onsite" && packetSent);

          return (
            <button
              type="button"
              className={`agent-tab ${active ? "is-active" : ""}`}
              aria-current={active ? "page" : undefined}
              onClick={() => onSelect(key)}
              key={key}
            >
              <AgentAvatar agent={agent} />
              <span className="agent-tab-copy">
                <strong>{agent.name}</strong>
                <small>{agent.subtitle}</small>
              </span>
              {badge ? <span className="tab-badge">{badge}</span> : null}
              {complete ? (
                <span className="tab-complete" aria-label="Complete">
                  ✓
                </span>
              ) : null}
              <span className="shortcut-number" aria-hidden="true">
                {index + 1}
              </span>
            </button>
          );
        })}
      </div>

      <div className="rail-principle">
        <span className="principle-mark" aria-hidden="true" />
        <p>
          Same foundation.
          <br />
          Different permissions.
        </p>
      </div>
    </nav>
  );
}
