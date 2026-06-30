import { cn } from "@/utils/cn";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-[5px] bg-[var(--color-canvas-subtle)]",
        className,
      )}
      {...props}
    />
  );
}
