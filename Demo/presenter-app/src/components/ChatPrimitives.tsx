import type { ReactNode } from "react";
import type { AgentDefinition, MessageRole, MessageTone } from "../types";

export function AgentAvatar({
  agent,
  size = "medium",
}: {
  agent: AgentDefinition;
  size?: "small" | "medium" | "large";
}) {
  return (
    <span
      className={`agent-avatar avatar-${agent.accent} avatar-${size}`}
      aria-hidden="true"
    >
      {agent.initials}
    </span>
  );
}

export function ChatBubble({
  role,
  author,
  children,
  tone = "default",
  label,
}: {
  role: MessageRole;
  author: string;
  children: ReactNode;
  tone?: MessageTone;
  label?: string;
}) {
  if (role === "system") {
    return (
      <div className={`system-message tone-${tone}`} role="status">
        <span className="system-icon" aria-hidden="true" />
        <div>
          {label ? <span className="message-label">{label}</span> : null}
          <div>{children}</div>
        </div>
      </div>
    );
  }

  return (
    <article className={`chat-message role-${role}`}>
      <div className="message-author">{author}</div>
      <div className={`message-bubble tone-${tone}`}>{children}</div>
    </article>
  );
}

export function QuickActions({
  children,
  label = "Suggested actions",
}: {
  children: ReactNode;
  label?: string;
}) {
  return (
    <div className="quick-action-block">
      <span>{label}</span>
      <div className="quick-actions">{children}</div>
    </div>
  );
}

export function ActionButton({
  children,
  onClick,
  variant = "primary",
  disabled = false,
}: {
  children: ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger" | "quiet";
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      className={`action-button action-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function DetailCard({
  title,
  eyebrow,
  children,
  tone = "neutral",
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  tone?: "neutral" | "blue" | "purple" | "pink" | "green";
}) {
  return (
    <section className={`detail-card card-${tone}`}>
      {eyebrow ? <span className="card-eyebrow">{eyebrow}</span> : null}
      <h3>{title}</h3>
      {children}
    </section>
  );
}

export function FactHypothesisCard() {
  return (
    <div className="fact-hypothesis-grid">
      <div>
        <span className="column-label label-fact">Supported facts</span>
        <ul>
          <li>Failure follows X-axis movement</li>
          <li>Prolonged settling precedes failure</li>
          <li>Imaging confidence appears acceptable</li>
          <li>Vibration continues through measurement</li>
        </ul>
      </div>
      <div>
        <span className="column-label label-hypothesis">Hypotheses</span>
        <ul>
          <li>Stage-settling path is suspicious</li>
          <li>Stage-to-imaging interaction remains possible</li>
          <li>Mechanical cause is not established</li>
        </ul>
      </div>
    </div>
  );
}

export function InlineStatus({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "success" | "warning" | "blocked";
}) {
  return <span className={`inline-status status-${tone}`}>{children}</span>;
}
