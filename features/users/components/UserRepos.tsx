import { Card, CardContent } from "@/components/ui/card";
import { StarIcon, GitForkIcon, BookOpenIcon } from "lucide-react";
import Link from "next/link";
import { getLanguageColor } from "@/lib/languages";
import { getUserRepos } from "../api/users";

export async function UserRepos({
  accessToken,
  username,
}: {
  accessToken: string;
  username: string;
}) {
  const repos = await getUserRepos(accessToken, username);

  if (repos.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p className="text-sm text-[var(--color-fg-muted)]">No public repositories</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <div className="px-4 py-2.5 border-b border-[var(--color-border-muted)] flex items-center justify-between">
        <h3 className="text-sm font-semibold">Repositories</h3>
        <span className="text-xs text-[var(--color-fg-muted)] tabular-nums">
          {repos.length} {repos.length === 1 ? "repo" : "repos"}
        </span>
      </div>
      <ul className="divide-y divide-[var(--color-border-muted)]">
        {repos.slice(0, 10).map((repo: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
          <li key={repo.id}>
            <Link
              href={`/dashboard/repositories/${repo.owner.login}/${repo.name}`}
              className="block px-4 py-3 hover:bg-[var(--color-canvas-subtle)] transition-colors"
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <BookOpenIcon className="size-3.5 text-[var(--color-fg-muted)] mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-[var(--color-accent-emphasis)] truncate">
                      {repo.name}
                    </span>
                    {repo.fork && (
                      <span className="text-[10px] uppercase tracking-wider text-[var(--color-fg-muted)]">fork</span>
                    )}
                    {repo.visibility === "private" && (
                      <span className="text-[10px] uppercase tracking-wider text-[var(--color-fg-muted)]">private</span>
                    )}
                  </div>
                  {repo.description && (
                    <p className="text-xs text-[var(--color-fg-muted)] mt-0.5 line-clamp-2">
                      {repo.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-[var(--color-fg-muted)]">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span
                          className="size-2 rounded-full"
                          style={{ backgroundColor: getLanguageColor(repo.language) }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1 tabular-nums">
                      <StarIcon className="size-3" /> {repo.stargazers_count.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1 tabular-nums">
                      <GitForkIcon className="size-3" /> {repo.forks_count.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
