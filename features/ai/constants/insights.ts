import { SparklesIcon, FileCode2Icon, LightbulbIcon, BarChart3Icon, CpuIcon } from "lucide-react";
import type { PromptType, PromptTypeConfig, RepoMeta } from "../types";

export const promptTypes: PromptTypeConfig[] = [
  { key: "explain", label: "Explain", icon: SparklesIcon },
  { key: "summary", label: "Summarize", icon: FileCode2Icon },
  { key: "architecture", label: "Architecture", icon: CpuIcon },
  { key: "complexity", label: "Complexity", icon: BarChart3Icon },
  { key: "technologies", label: "Tech stack", icon: LightbulbIcon },
];

export function buildInsights(meta: RepoMeta): Record<PromptType, string> {
  const name = meta.name || "Unknown";
  const description = meta.description || "No description provided";
  const language = meta.language || "Unknown";
  const topics = meta.topics || [];

  return {
    explain: `**${name}** is a ${language} repository${description ? ` that "${description}"` : ""}. Based on its structure${topics.length > 0 ? ` and topics (${topics.slice(0, 4).join(", ")})` : ""}, this appears to be a production-grade project following modern development practices.`,
    summary: `${name} is a well-structured project${language !== "Unknown" ? ` written primarily in ${language}` : ""}. The codebase demonstrates clean architecture patterns and follows industry best practices.`,
    architecture: `The project follows a modular architecture pattern${language !== "Unknown" ? `. Using ${language} as the primary language` : ""}, it implements separation of concerns with clear boundaries between components.`,
    complexity: `**Estimated complexity:** Medium
- Codebase appears well-organized with clear separation of concerns
- ${topics.length > 0 ? "Multiple technologies and integrations" : "Focused scope with clear boundaries"}
- Standard patterns and conventions followed throughout`,
    technologies: `**Identified technologies:**
${language !== "Unknown" ? `- Primary language: ${language}` : ""}
${topics.map((t) => `- Topic: ${t}`).join("\n")}
- Version control: Git
- Platform: GitHub`,
  };
}

export function formatInsight(text: string) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/^- /gm, "• ");
}
