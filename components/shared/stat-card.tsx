import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Card } from "@/components/ui/card";

/** Primer-style stat card: hairline-bordered, dense padding, large numeral. */
export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  trend,
  className,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  icon?: React.ElementType;
  trend?: { value: string; direction: "up" | "down" | "flat" };
  className?: string;
}) {
  return (
    <Card className={cn("p-4 flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-[var(--color-fg-muted)]">{label}</span>
        {Icon && <Icon className="size-3.5 text-[var(--color-fg-muted)]" aria-hidden />}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-semibold leading-none tabular-nums tracking-tight text-[var(--color-fg)]">
          {value}
        </span>
        {trend && <TrendPill {...trend} />}
      </div>
      {hint && <div className="text-[11px] text-[var(--color-fg-muted)] mt-0.5">{hint}</div>}
    </Card>
  );
}

function TrendPill({ value, direction }: { value: string; direction: "up" | "down" | "flat" }) {
  const color =
    direction === "up"
      ? "text-[var(--color-success-emphasis)] bg-[var(--color-success-muted)]"
      : direction === "down"
        ? "text-[var(--color-danger-emphasis)] bg-[var(--color-danger-muted)]"
        : "text-[var(--color-fg-muted)] bg-[var(--color-canvas-subtle)]";
  const arrow = direction === "up" ? "↑" : direction === "down" ? "↓" : "→";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums",
        color,
      )}
    >
      {arrow} {value}
    </span>
  );
}

/** Horizontal bar for language percentages. */
export function LanguageBar({
  segments,
  className,
}: {
  segments: { name: string; percentage: number; color: string }[];
  className?: string;
} & HTMLAttributes<HTMLDivElement>) {
  if (segments.length === 0) return null;
  return (
    <div
      className={cn("flex h-2 w-full overflow-hidden rounded-full bg-[var(--color-canvas-subtle)]", className)}
      role="img"
      aria-label="Language breakdown"
    >
      {segments.map((s) => (
        <div
          key={s.name}
          className="h-full transition-all"
          style={{ width: `${s.percentage}%`, backgroundColor: s.color }}
          title={`${s.name}: ${s.percentage.toFixed(1)}%`}
        />
      ))}
    </div>
  );
}
