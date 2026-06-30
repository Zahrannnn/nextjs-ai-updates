import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarStack } from "@/components/ui/avatar";
import Link from "next/link";
import { getContributors } from "../api/repositories";

export async function RepoContributors({
  accessToken,
  owner,
  name,
}: {
  accessToken: string;
  owner: string;
  name: string;
}) {
  const contributors = await getContributors(accessToken, owner, name);

  if (contributors.length === 0) return null;

  const top10 = contributors.slice(0, 10);
  const total = contributors.length;
  const totalCommits = contributors.reduce(
    (sum: number, c: { contributions: number }) => sum + c.contributions,
    0,
  );
  const top = top10[0] as { contributions: number; login?: string };
  const topPct = totalCommits > 0 ? (top.contributions / totalCommits) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contributors</CardTitle>
        <p className="text-xs text-[var(--color-fg-muted)] mt-0.5">
          <span className="text-[var(--color-fg)] tabular-nums">{total}</span> contributors ·{" "}
          <span className="text-[var(--color-fg)] tabular-nums">{totalCommits.toLocaleString()}</span> commits
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3 pb-3 border-b border-[var(--color-border-muted)]">
          <AvatarStack
            users={top10.map((c: any) => ({ src: c.avatar_url, alt: c.login, login: c.login }))} // eslint-disable-line @typescript-eslint/no-explicit-any
            size={28}
            max={6}
          />
          <div className="min-w-0 text-xs">
            <p className="text-[var(--color-fg-muted)] truncate">
              <Link
                href={`/dashboard/users/${top.login}`}
                className="font-semibold text-[var(--color-fg)] hover:text-[var(--color-accent-emphasis)]"
              >
                {top.login}
              </Link>{" "}
              leads at {topPct.toFixed(0)}%
            </p>
          </div>
        </div>
        <ul className="space-y-2">
          {top10.map((c: any, i: number) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
            <li key={c.id}>
              <Link
                href={`/dashboard/users/${c.login}`}
                className="flex items-center gap-2.5 group"
              >
                <span className="text-[10px] font-semibold text-[var(--color-fg-subtle)] w-4 tabular-nums">
                  {i + 1}
                </span>
                <Avatar src={c.avatar_url} alt={c.login} size={20} />
                <span className="flex-1 text-sm text-[var(--color-fg)] group-hover:text-[var(--color-accent-emphasis)] truncate">
                  {c.login}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-16 h-1.5 rounded-full bg-[var(--color-canvas-subtle)] overflow-hidden">
                    <div
                      className="h-full bg-[var(--color-success-emphasis)]"
                      style={{ width: `${(c.contributions / top.contributions) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-[var(--color-fg-muted)] tabular-nums w-12 text-right">
                    {c.contributions.toLocaleString()}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
