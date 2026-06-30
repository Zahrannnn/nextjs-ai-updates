import type { ElementType } from "react";

export type PromptType = "explain" | "summary" | "architecture" | "complexity" | "technologies";

export interface RepoMeta {
  name: string;
  description: string;
  language: string;
  topics: string[];
}

export interface PromptTypeConfig {
  key: PromptType;
  label: string;
  icon: ElementType;
}

export interface AIExplainForRepoProps {
  accessToken: string;
  owner: string;
  name: string;
}

export interface AIExplainClientProps {
  name: string;
  insights: Record<PromptType, string>;
}
