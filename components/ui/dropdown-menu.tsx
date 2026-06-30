"use client";

import { createContext, useContext, useState, useRef, useEffect, type ReactNode } from "react";
import { cn } from "@/utils/cn";

type DropdownContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
};

const DropdownContext = createContext<DropdownContextType | null>(null);

function useDropdown() {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error("Dropdown compound components must be used within Dropdown");
  return ctx;
}

export function Dropdown({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <DropdownContext.Provider value={{ open, setOpen, triggerRef, contentRef }}>
      <div className="relative">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export function DropdownTrigger({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen, triggerRef } = useDropdown();
  return (
    <button
      ref={triggerRef}
      type="button"
      className={cn("relative inline-flex items-center justify-center outline-none", className)}
      onClick={() => setOpen(!open)}
      aria-expanded={open}
      aria-haspopup="menu"
      data-state={open ? "open" : "closed"}
      {...props}
    >
      {children}
    </button>
  );
}

export function DropdownContent({
  children,
  className,
  align = "start",
}: {
  children: ReactNode;
  className?: string;
  align?: "start" | "end";
}) {
  const { open, contentRef } = useDropdown();
  if (!open) return null;
  const origin = align === "end" ? "top-right" : "top-left";
  return (
    <div
      ref={contentRef}
      role="menu"
      data-state={open ? "open" : "closed"}
      className={cn(
        "absolute z-50 mt-1.5 min-w-[12rem] overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-canvas-overlay)] p-1 text-[var(--color-fg)]",
        align === "end" ? "right-0" : "left-0",
        className,
      )}
      style={{
        animation: `dropdownEnter 150ms ease-out`,
        transformOrigin: origin === "top-right" ? "top right" : "top left",
      }}
    >
      <style>{`@keyframes dropdownEnter { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }`}</style>
      {children}
    </div>
  );
}

export function DropdownItem({
  children,
  className,
  active,
  destructive,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  destructive?: boolean;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      className={cn(
        "flex w-full cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
        active
          ? "bg-[var(--color-canvas-subtle)] text-[var(--color-fg)] font-semibold"
          : "text-[var(--color-fg)] hover:bg-[var(--color-canvas-subtle)]",
        destructive && "text-[var(--color-danger-emphasis)] hover:bg-[var(--color-danger-muted)]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function DropdownSeparator() {
  return <div className="my-1 h-px bg-[var(--color-border-muted)]" role="separator" />;
}

export function DropdownLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-fg-muted)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
