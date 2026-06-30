import type { LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";

/** Primer-style empty state: hairline-bordered container, centered icon + copy. */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  compact = false,
}: {
  icon?: LucideIcon;
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center rounded-md border border-dashed border-[var(--color-border)] bg-[var(--color-canvas-subtle)]",
        compact ? "py-8 px-4" : "py-14 px-6",
        className,
      )}
    >
      {Icon && (
        <div
          className={cn(
            "flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-canvas)] text-[var(--color-fg-muted)]",
            compact ? "size-10 mb-3" : "size-12 mb-4",
          )}
        >
          <Icon className={compact ? "size-5" : "size-6"} aria-hidden />
        </div>
      )}
      <h3 className={cn("font-semibold text-[var(--color-fg)]", compact ? "text-sm" : "text-base")}>
        {title}
      </h3>
      {description && (
        <p
          className={cn(
            "text-[var(--color-fg-muted)] max-w-sm mt-1",
            compact ? "text-xs" : "text-sm",
          )}
        >
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
