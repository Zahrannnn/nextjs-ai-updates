import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

/** Primer-style page header: eyebrow + title + description + actions. */
export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-end justify-between gap-6 mb-6", className)}>
      <div className="min-w-0">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-fg-muted)] mb-1">
            {eyebrow}
          </p>
        )}
        <h1 className="text-2xl font-semibold leading-tight tracking-tight text-[var(--color-fg)]">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-[var(--color-fg-muted)] mt-1.5 max-w-2xl">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}

/** Section header for in-page sections, with optional count badge. */
export function SectionHeader({
  title,
  count,
  action,
  className,
  ...props
}: {
  title: string;
  count?: number | string;
  action?: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center justify-between gap-3 mb-3", className)}
      {...props}
    >
      <div className="flex items-center gap-2 min-w-0">
        <h2 className="text-sm font-semibold text-[var(--color-fg)] truncate">{title}</h2>
        {count !== undefined && (
          <span className="text-xs font-medium text-[var(--color-fg-muted)] tabular-nums">
            {typeof count === "number" ? count.toLocaleString() : count}
          </span>
        )}
      </div>
      {action}
    </div>
  );
}
