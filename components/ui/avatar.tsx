import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import Image from "next/image";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  size?: number;
  fallback?: string;
  square?: boolean;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt = "", size = 32, fallback, square = false, ...props }, ref) => {
    const radiusClass = square ? "rounded-md" : "rounded-full";
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden bg-[var(--color-canvas-subtle)] border border-[var(--color-border-muted)] flex-shrink-0",
          radiusClass,
          className,
        )}
        style={{ width: size, height: size }}
        {...props}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={size}
            height={size}
            className={cn("object-cover", radiusClass)}
            unoptimized={src.endsWith(".gif")}
            priority
          />
        ) : (
          <div
            className={cn(
              "flex items-center justify-center w-full h-full text-[var(--color-fg-muted)] bg-[var(--color-canvas-subtle)] font-semibold",
              size <= 24 ? "text-[10px]" : size <= 40 ? "text-xs" : "text-sm",
            )}
            aria-label={alt}
          >
            {fallback ?? alt?.charAt(0)?.toUpperCase() ?? "?"}
          </div>
        )}
      </div>
    );
  },
);
Avatar.displayName = "Avatar";

/** Stacked avatar row with overlap, common in commit/contributor lists. */
export function AvatarStack({
  users,
  size = 20,
  max = 5,
  className,
}: {
  users: { src?: string | null; alt?: string; login?: string }[];
  size?: number;
  max?: number;
  className?: string;
}) {
  const shown = users.slice(0, max);
  const remaining = users.length - shown.length;
  return (
    <div className={cn("flex items-center -space-x-1.5", className)}>
      {shown.map((u, i) => (
        <div
          key={`${u.login ?? i}`}
          className="ring-2 ring-[var(--color-canvas)] rounded-full"
        >
          <Avatar src={u.src} alt={u.alt ?? u.login ?? ""} size={size} fallback={u.login?.charAt(0)} />
        </div>
      ))}
      {remaining > 0 && (
        <div
          className="ring-2 ring-[var(--color-canvas)] rounded-full bg-[var(--color-canvas-subtle)] border border-[var(--color-border-muted)] flex items-center justify-center text-[10px] font-semibold text-[var(--color-fg-muted)]"
          style={{ width: size, height: size }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}
