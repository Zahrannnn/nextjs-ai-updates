"use client";

import { useMemo, useState, useTransition } from "react";
import { SparklesIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/utils/cn";
import { promptTypes, formatInsight } from "../constants/insights";
import type { PromptType } from "../types";

export function AIExplainClient({
  name,
  insights,
}: {
  name: string;
  insights: Record<PromptType, string>;
}) {
  const [promptType, setPromptType] = useState<PromptType>("explain");
  const [isPending, startTransition] = useTransition();

  const labels = useMemo(
    () => Object.fromEntries(promptTypes.map((p) => [p.key, p.label.toLowerCase()])),
    [],
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-1 p-0.5 rounded-md border border-[var(--color-border)] bg-[var(--color-canvas-subtle)] w-fit">
        {promptTypes.map((pt) => {
          const Icon = pt.icon;
          const active = promptType === pt.key;
          return (
            <button
              key={pt.key}
              type="button"
              onClick={() => startTransition(() => setPromptType(pt.key))}
              disabled={isPending}
              className={cn(
                "inline-flex items-center gap-1.5 h-7 px-2.5 text-xs font-medium rounded-sm transition-colors",
                active
                  ? "bg-[var(--color-canvas)] text-[var(--color-fg)] border border-[var(--color-border)] shadow-sm"
                  : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]",
              )}
            >
              <Icon className="size-3.5" />
              {pt.label}
            </button>
          );
        })}
      </div>
      <Card>
        <CardHeader className="flex-row items-center gap-2 space-y-0">
          <SparklesIcon className="size-4 text-[var(--color-success-emphasis)]" />
          <CardTitle>AI {labels[promptType]}</CardTitle>
          <span className="ml-auto text-[10px] uppercase tracking-wider text-[var(--color-fg-muted)]">
            Beta
          </span>
        </CardHeader>
        <CardContent>
          {isPending ? (
            <div className="space-y-2 animate-pulse">
              <div className="h-3 rounded bg-[var(--color-canvas-subtle)] w-3/4" />
              <div className="h-3 rounded bg-[var(--color-canvas-subtle)] w-1/2" />
              <div className="h-3 rounded bg-[var(--color-canvas-subtle)] w-5/6" />
            </div>
          ) : (
            <div
              key={promptType}
              className="text-sm leading-relaxed text-[var(--color-fg)] whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: formatInsight(insights[promptType]) }}
            />
          )}
          <p className="text-[10px] text-[var(--color-fg-muted)] mt-3 pt-3 border-t border-[var(--color-border-muted)]">
            Generated from <span className="font-mono">{name}</span> metadata · Always verify with the source.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
