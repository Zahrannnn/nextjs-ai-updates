"use client";

import { useTheme } from "@/components/layout/theme-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { GithubIcon } from "@/components/ui/github-icon";
import { CheckIcon, LogOutIcon } from "lucide-react";
import { signOut } from "@/lib/auth-client";
import { cn } from "@/utils/cn";
import { themes } from "../constants/themes";

export function SettingsForm({
  user,
}: {
  user: { name?: string | null; email?: string | null; image?: string | null };
}) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your GitHub account, used to sign in and fetch data.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-3">
          <Avatar src={user.image} alt={user.name ?? ""} size={48} />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold leading-tight">{user.name}</p>
            <p className="text-xs text-[var(--color-fg-muted)] truncate">{user.email}</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium bg-[var(--color-success-muted)] text-[var(--color-success-emphasis)]">
            <span className="size-1.5 rounded-full bg-current" />
            Connected
          </span>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Choose how the dashboard looks. Synced across your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-3">
            {themes.map(({ value, icon: Icon, label, description }) => {
              const active = theme === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTheme(value)}
                  className={cn(
                    "relative flex flex-col items-start gap-1.5 p-3 rounded-md border text-left transition-colors",
                    active
                      ? "border-[var(--color-accent-emphasis)] bg-[var(--color-accent-muted)]"
                      : "border-[var(--color-border)] hover:border-[var(--color-fg-subtle)]",
                  )}
                >
                  {active && (
                    <CheckIcon className="absolute top-2 right-2 size-3.5 text-[var(--color-accent-emphasis)]" />
                  )}
                  <Icon className="size-4 text-[var(--color-fg)]" />
                  <span className="text-sm font-semibold">{label}</span>
                  <span className="text-xs text-[var(--color-fg-muted)]">{description}</span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Connected accounts</CardTitle>
          <CardDescription>Manage the services linked to this dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 p-3 rounded-md border border-[var(--color-border)]">
            <span className="size-8 rounded-md bg-[var(--color-canvas-subtle)] border border-[var(--color-border)] flex items-center justify-center">
              <GithubIcon className="size-4 text-[var(--color-fg)]" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">GitHub</p>
              <p className="text-xs text-[var(--color-fg-muted)] truncate">{user.name}</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-success-emphasis)]">
              <span className="size-1.5 rounded-full bg-[var(--color-success-emphasis)]" />
              Active
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Session</CardTitle>
          <CardDescription>Sign out of this dashboard. Your data is kept.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="destructive"
            onClick={() => signOut()}
            className="gap-2"
          >
            <LogOutIcon className="size-3.5" />
            Sign out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
