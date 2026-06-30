import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

/* Primer-style button: 6px radius, no shadow, hairline borders, green primary.
   Heights: sm=28 md=32 lg=36 icon=32. */

const variants = {
  default:
    "bg-[var(--color-success-emphasis)] text-[var(--color-success-fg)] hover:bg-[var(--color-success)] border border-transparent",
  destructive:
    "bg-[var(--color-danger-emphasis)] text-[var(--color-danger-fg)] hover:bg-[var(--color-danger)] border border-transparent",
  outline:
    "bg-[var(--color-canvas)] text-[var(--color-fg)] border border-[var(--color-border)] hover:bg-[var(--color-canvas-subtle)]",
  secondary:
    "bg-[var(--color-canvas-subtle)] text-[var(--color-fg)] border border-[var(--color-border)] hover:bg-[var(--color-border-muted)]",
  ghost:
    "bg-transparent text-[var(--color-fg)] border border-transparent hover:bg-[var(--color-canvas-subtle)]",
  link:
    "bg-transparent text-[var(--color-accent-emphasis)] border border-transparent hover:underline px-0 h-auto",
  primary:
    "bg-[var(--color-success-emphasis)] text-[var(--color-success-fg)] hover:bg-[var(--color-success)] border border-transparent font-semibold",
} as const;

const sizes = {
  sm: "h-7 px-2.5 text-xs gap-1.5",
  md: "h-8 px-3 text-sm gap-1.5",
  lg: "h-9 px-4 text-sm gap-2",
  icon: "size-8 p-0",
  "icon-sm": "size-7 p-0",
} as const;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  pending?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", pending, disabled, children, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-emphasis)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-canvas)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
          sizes[size],
          variants[variant],
          className,
        )}
        disabled={disabled || pending}
        {...props}
      >
        {pending && (
          <svg className="animate-spin size-3.5" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";
