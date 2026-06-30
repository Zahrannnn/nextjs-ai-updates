"use client";

import { useTheme } from "./theme-provider";
import { Avatar } from "@/components/ui/avatar";
import { GithubIcon } from "@/components/ui/github-icon";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  DropdownTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/auth-client";
import { SunIcon, MoonIcon, LogOutIcon, UserIcon, MonitorIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/cn";

interface HeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function Header({ user }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-end gap-2 h-12 px-4 border-b border-[var(--color-border)] bg-[var(--color-canvas)]/80 backdrop-blur-md">
      <div className="flex items-center gap-1">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 h-7 px-2 rounded-md text-xs font-medium text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-canvas-subtle)] transition-colors"
          aria-label="Open GitHub"
        >
          <GithubIcon className="size-3.5" />
          GitHub
        </a>
        <Dropdown>
          <DropdownTrigger
            className="size-7 rounded-md hover:bg-[var(--color-canvas-subtle)] data-[state=open]:bg-[var(--color-canvas-subtle)] transition-colors"
            aria-label="Theme"
          >
            {theme === "dark" ? (
              <MoonIcon className="size-4 text-[var(--color-fg-muted)]" />
            ) : theme === "light" ? (
              <SunIcon className="size-4 text-[var(--color-fg-muted)]" />
            ) : (
              <MonitorIcon className="size-4 text-[var(--color-fg-muted)]" />
            )}
          </DropdownTrigger>
          <DropdownContent align="end" className="min-w-[10rem]">
            <DropdownLabel>Appearance</DropdownLabel>
            <DropdownSeparator />
            <DropdownItem onClick={() => setTheme("light")} active={theme === "light"}>
              <div className={cn("size-2 rounded-full shrink-0", theme === "light" && "bg-[var(--color-accent-emphasis)]")} />
              <SunIcon className="size-3.5" /> Light
            </DropdownItem>
            <DropdownItem onClick={() => setTheme("dark")} active={theme === "dark"}>
              <div className={cn("size-2 rounded-full shrink-0", theme === "dark" && "bg-[var(--color-accent-emphasis)]")} />
              <MoonIcon className="size-3.5" /> Dark
            </DropdownItem>
            <DropdownItem onClick={() => setTheme("system")} active={theme === "system"}>
              <div className={cn("size-2 rounded-full shrink-0", theme === "system" && "bg-[var(--color-accent-emphasis)]")} />
              <MonitorIcon className="size-3.5" /> System
            </DropdownItem>
          </DropdownContent>
        </Dropdown>

        <Dropdown>
          <DropdownTrigger className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-emphasis)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-canvas)] ml-1 hover:ring-2 hover:ring-[var(--color-accent-muted)] transition-all">
            <Avatar src={user.image} alt={user.name ?? ""} size={28} />
          </DropdownTrigger>
          <DropdownContent align="end" className="min-w-[14rem]">
            <div className="px-3 py-2.5 border-b border-[var(--color-border-muted)]">
              <p className="text-sm font-semibold leading-tight">{user.name}</p>
              <p className="text-xs text-[var(--color-fg-muted)] truncate mt-0.5">{user.email}</p>
            </div>
            <DropdownItem onClick={() => router.push("/dashboard/settings")}>
              <UserIcon className="size-3.5" /> Profile settings
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem
              onClick={async () => {
                await signOut();
              }}
              destructive
            >
              <LogOutIcon className="size-3.5" /> Sign out
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>
    </header>
  );
}
