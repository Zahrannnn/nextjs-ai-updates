import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

/* Primer-style input: 32px height, 6px radius, hairline border, focus ring. */

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-8 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-canvas)] px-2.5 py-1 text-sm text-[var(--color-fg)] shadow-none transition-colors placeholder:text-[var(--color-fg-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-emphasis)] focus-visible:ring-offset-1 focus-visible:border-[var(--color-accent-emphasis)] disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:bg-transparent file:text-sm file:font-medium",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
