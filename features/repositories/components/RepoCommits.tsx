import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { GitCommitIcon } from "lucide-react";
import Link from "next/link";
import { timeAgo } from "@/lib/format";
import { getCommits } from "../api/repositories";

export async function RepoCommits({
  accessToken,
  owner,
  name,
}: {
  accessToken: string;
  owner: string;
  name: string;
}) {
  const commits = await getCommits(accessToken, owner, name);

  if (commits.length === 0) return null;

  return (
    <Card>
      <CardHeader className="flex-row items-center gap-2 space-y-0">
        <GitCommitIcon className="size-4 text-[var(--color-fg-muted)]" />
        <CardTitle>Recent commits</CardTitle>
        <Link
          href={`https://github.com/${owner}/${name}/commits`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-xs text-[var(--color-fg-muted)] hover:text-[var(--color-accent-emphasis)]"
        >
          View all →
        </Link>
      </CardHeader>
      <ul className="divide-y divide-[var(--color-border-muted)]">
        {commits.map((commit: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
          <li key={commit.sha} className="px-4 py-2.5">
            <div className="flex items-start gap-2.5 min-w-0">
              <Avatar
                src={commit.author?.avatar_url}
                alt={commit.commit.author.name}
                size={20}
                fallback={commit.commit.author.name.charAt(0)}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[var(--color-fg)] truncate">
                  {commit.commit.message.split("\n")[0]}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-[var(--color-fg-muted)] mt-0.5 flex-wrap">
                  <span className="font-medium text-[var(--color-fg)]">{commit.commit.author.name}</span>
                  <span>committed</span>
                  <span>{timeAgo(commit.commit.author.date)}</span>
                  <span className="text-[var(--color-fg-subtle)]">·</span>
                  <Link
                    href={commit.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] hover:text-[var(--color-accent-emphasis)]"
                  >
                    {commit.sha.slice(0, 7)}
                  </Link>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
