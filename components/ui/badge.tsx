import { type HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

/* Primer-style badge: 2px 10px padding, 999px radius (full pill), 11px font, subtle. */

const badgeVariants = {
  default:
    "bg-[var(--color-neutral-muted)] text-[var(--color-fg)] border-transparent",
  primary:
    "bg-[var(--color-success-muted)] text-[var(--color-success-emphasis)] border-transparent",
  accent:
    "bg-[var(--color-accent-muted)] text-[var(--color-accent-emphasis)] border-transparent",
  secondary:
    "bg-[var(--color-canvas-subtle)] text-[var(--color-fg)] border border-[var(--color-border)]",
  destructive:
    "bg-[var(--color-danger-muted)] text-[var(--color-danger-emphasis)] border-transparent",
  attention:
    "bg-[var(--color-attention-muted)] text-[var(--color-attention-emphasis)] border-transparent",
  outline: "bg-transparent text-[var(--color-fg)] border border-[var(--color-border)]",
} as const;

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof badgeVariants;
  size?: "sm" | "md";
}

export function Badge({ className, variant = "default", size = "md", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border font-medium leading-none whitespace-nowrap",
        size === "sm" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-[11px]",
        badgeVariants[variant],
        className,
      )}
      {...props}
    />
  );
}
