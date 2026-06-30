import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarIcon, GitForkIcon, BookOpenIcon, SearchIcon } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { getLanguageColor } from "@/lib/languages";
import { timeAgo } from "@/lib/format";
import { getRepos } from "../api/repositories";

export async function RepositoryList({
  accessToken,
  searchParams,
}: {
  accessToken: string;
  searchParams?: { q?: string; sort?: string; page?: string };
}) {
  const result = await getRepos(accessToken, searchParams);
  const repos = result.items;

  if (repos.length === 0) {
    const q = searchParams?.q;
    return (
      <EmptyState
        icon={q ? SearchIcon : BookOpenIcon}
        title={q ? `No results for "${q}"` : "No repositories yet"}
        description={
          q
            ? "Try a different search term, or change the sort order."
            : "Once you create or are added to repositories, they will appear here."
        }
      />
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-[var(--color-fg-muted)]">
        <p>
          Showing{" "}
          <span className="text-[var(--color-fg)] font-semibold tabular-nums">
            {repos.length.toLocaleString()}
          </span>{" "}
          of{" "}
          <span className="text-[var(--color-fg)] font-semibold tabular-nums">
            {result.total_count.toLocaleString()}
          </span>{" "}
          {searchParams?.q ? "results" : "repositories"}
        </p>
      </div>
      <ul className="grid gap-3">
        {repos.map((repo: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
          <li key={repo.id}>
            <Link
              href={`/dashboard/repositories/${repo.owner.login}/${repo.name}`}
              className="block group"
            >
              <Card className="p-4 hover:border-[var(--color-fg-subtle)] transition-colors">
                <div className="flex items-start gap-2.5 min-w-0">
                  <BookOpenIcon className="size-4 text-[var(--color-fg-muted)] mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-[var(--color-accent-emphasis)] truncate group-hover:underline">
                        {repo.name}
                      </h3>
                      {repo.fork && (
                        <Badge variant="outline" size="sm">Fork</Badge>
                      )}
                      {repo.visibility === "private" && (
                        <Badge variant="primary" size="sm">Private</Badge>
                      )}
                      {repo.archived && (
                        <Badge variant="secondary" size="sm">Archived</Badge>
                      )}
                    </div>
                    {repo.description && (
                      <p className="text-sm text-[var(--color-fg-muted)] mt-1 line-clamp-2">
                        {repo.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 mt-2.5 text-xs text-[var(--color-fg-muted)]">
                      {repo.language && (
                        <span className="flex items-center gap-1.5">
                          <span
                            className="size-2.5 rounded-full"
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
                      {repo.updated_at && (
                        <span className="hidden sm:inline">Updated {timeAgo(repo.updated_at)}</span>
                      )}
                    </div>
                    {repo.topics?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {repo.topics.slice(0, 6).map((topic: string) => (
                          <Badge key={topic} variant="accent" size="sm">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
