"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import {
  LayoutDashboardIcon,
  GitForkIcon,
  UsersIcon,
  HeartIcon,
  SettingsIcon,
  MenuIcon,
  X,
  SearchIcon,
} from "lucide-react";
import { useState } from "react";
import { SearchCommand } from "@/components/shared/search-command";
import { GithubIcon } from "@/components/ui/github-icon";
import { Avatar } from "@/components/ui/avatar";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
  { href: "/dashboard/repositories", label: "Repositories", icon: GitForkIcon },
  { href: "/dashboard/users", label: "Users", icon: UsersIcon },
  { href: "/dashboard/favorites", label: "Favorites", icon: HeartIcon },
  { href: "/dashboard/settings", label: "Settings", icon: SettingsIcon },
] as const;

export function Sidebar({ user }: { user?: { name?: string | null; image?: string | null } }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-[var(--color-border)] bg-[var(--color-canvas)]/80 backdrop-blur-md px-3 h-12 lg:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 -ml-1.5 rounded-md text-[var(--color-fg-muted)] hover:bg-[var(--color-canvas-subtle)] hover:text-[var(--color-fg)]"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="size-4" /> : <MenuIcon className="size-4" />}
        </button>
        <Link href="/dashboard" className="flex items-center gap-2 text-sm font-semibold">
          <GithubIcon className="size-4 text-[var(--color-fg)]" />
          <span>Dashboard</span>
        </Link>
        <div className="flex-1" />
        <button
          onClick={() => {
            const ev = new KeyboardEvent("keydown", { key: "k", ctrlKey: true });
            document.dispatchEvent(ev);
          }}
          className="p-1.5 rounded-md text-[var(--color-fg-muted)] hover:bg-[var(--color-canvas-subtle)]"
          aria-label="Search"
        >
          <SearchIcon className="size-4" />
        </button>
      </header>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-[1px] lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-60 border-r border-[var(--color-border)] bg-[var(--color-canvas)] flex flex-col transition-transform duration-200 lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
        aria-label="Dashboard navigation"
      >
        <div className="flex items-center gap-2 px-3 h-12 border-b border-[var(--color-border)]">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm font-semibold text-[var(--color-fg)]">
            <GithubIcon className="size-5 text-[var(--color-fg)]" />
            <span>Dashboard</span>
          </Link>
          <span className="ml-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-fg-muted)] bg-[var(--color-canvas-subtle)] border border-[var(--color-border)] rounded-full px-1.5 py-0.5">
            Pro
          </span>
        </div>

        <div className="p-2 border-b border-[var(--color-border-muted)]">
          <SearchCommand />
        </div>

        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto scrollbar-thin">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href + "/"));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors",
                  isActive
                    ? "bg-[var(--color-canvas-subtle)] text-[var(--color-fg)] font-semibold"
                    : "text-[var(--color-fg-muted)] hover:bg-[var(--color-canvas-subtle)] hover:text-[var(--color-fg)]",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="size-4 shrink-0" aria-hidden />
                <span className="truncate">{item.label}</span>
                {isActive && (
                  <span className="ml-auto size-1.5 rounded-full bg-[var(--color-success-emphasis)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {user && (
          <div className="p-2 border-t border-[var(--color-border)]">
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[var(--color-canvas-subtle)]"
            >
              <Avatar src={user.image ?? null} alt={user.name ?? ""} size={24} />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[var(--color-fg)] truncate">
                  {user.name}
                </p>
                <p className="text-[10px] text-[var(--color-fg-muted)] truncate">View settings</p>
              </div>
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
