import type { ReactNode } from "react";

export type AgentKey = "onsite" | "fixer" | "manager";

export type MessageRole = "agent" | "user" | "system";

export type OwnerApprovalStatus = "not-requested" | "pending" | "approved";

export type MessageTone =
  | "default"
  | "alert"
  | "success"
  | "warning"
  | "blocked";

export interface AgentDefinition {
  key: AgentKey;
  name: string;
  shortName: string;
  subtitle: string;
  initials: string;
  scope: string;
  canSee: string[];
  cannotSee: string[];
  humanOwner: string;
  accent: string;
  totalSteps: number;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  author: string;
  text?: string;
  label?: string;
  tone?: MessageTone;
  content?: ReactNode;
}

export interface PacketFile {
  name: string;
  description: string;
  content: string;
}

export interface KnowledgeChoice {
  id: "diagnostic" | "damper" | "actions";
  title: string;
  detail: string;
  verdict: "reusable" | "case-specific";
}

export interface DiffLine {
  type: "context" | "add" | "remove" | "header";
  oldLine?: number;
  newLine?: number;
  content: string;
}

export interface PullRequestFile {
  path: string;
  additions: number;
  deletions: number;
  lines: DiffLine[];
}

export interface PullRequestDefinition {
  repository: string;
  number: number;
  title: string;
  branch: string;
  base: string;
  author: string;
  summary: string;
  additions: number;
  deletions: number;
  files: PullRequestFile[];
}
