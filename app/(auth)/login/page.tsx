import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LoginButton } from "./login-button";
import { GithubIcon } from "@/components/ui/github-icon";
import { SparklesIcon, GitForkIcon, UsersIcon, BarChart3Icon, LockIcon } from "lucide-react";

export const metadata = { title: "Sign in" };

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  const features = [
    { icon: BarChart3Icon, text: "Stats, contributions, language breakdowns" },
    { icon: UsersIcon, text: "Search users and pin favorites" },
    { icon: GitForkIcon, text: "Deep-dive on any repository" },
    { icon: SparklesIcon, text: "AI-generated repo insights" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-canvas-subtle)] px-4 py-8">
      <div className="w-full max-w-md">
        <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-canvas)] p-6 shadow-sm">
          <div className="flex flex-col items-center text-center gap-3 mb-6">
            <div className="size-12 rounded-md border border-[var(--color-border)] bg-[var(--color-canvas)] flex items-center justify-center">
              <GithubIcon className="size-6 text-[var(--color-fg)]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">Sign in to GitHub Dashboard</h1>
              <p className="text-sm text-[var(--color-fg-muted)] mt-1.5">
                Explore profiles, repos, and contributions.
              </p>
            </div>
          </div>

          <LoginButton />

          <p className="text-[11px] text-[var(--color-fg-muted)] text-center mt-4 leading-relaxed">
            By signing in, you authorize this app to read your public GitHub profile and
            repositories. We never write to your account.
          </p>
        </div>

        <ul className="mt-4 rounded-md border border-[var(--color-border)] bg-[var(--color-canvas)] divide-y divide-[var(--color-border-muted)]">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <li key={f.text} className="flex items-center gap-3 px-3.5 py-2.5 text-sm text-[var(--color-fg-muted)]">
                <Icon className="size-3.5 text-[var(--color-fg-subtle)] shrink-0" aria-hidden />
                <span>{f.text}</span>
              </li>
            );
          })}
          <li className="flex items-center gap-3 px-3.5 py-2.5 text-xs text-[var(--color-fg-subtle)]">
            <LockIcon className="size-3 shrink-0" aria-hidden />
            <span>OAuth via GitHub · We do not store your password</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
