import { Badge } from "@/components/ui/badge";
import { StarIcon, GitForkIcon, EyeIcon, ExternalLinkIcon, BookOpenIcon } from "lucide-react";
import Link from "next/link";
import { getLanguageColor } from "@/lib/languages";
import { getRepo } from "../api/repositories";

export async function RepoHeader({
  accessToken,
  owner,
  name,
}: {
  accessToken: string;
  owner: string;
  name: string;
}) {
  const repo = await getRepo(accessToken, owner, name);

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <BookOpenIcon className="size-4 text-[var(--color-fg-muted)] shrink-0" />
            <h1 className="text-xl font-semibold tracking-tight">
              <Link
                href={`/dashboard/users/${owner}`}
                className="text-[var(--color-fg-muted)] hover:text-[var(--color-accent-emphasis)]"
              >
                {owner}
              </Link>
              <span className="text-[var(--color-fg-subtle)] mx-1">/</span>
              <Link
                href={`/dashboard/repositories/${owner}/${name}`}
                className="text-[var(--color-fg)] hover:text-[var(--color-accent-emphasis)]"
              >
                {name}
              </Link>
            </h1>
            {repo.license && (
              <Badge variant="secondary" size="sm">
                {repo.license.spdx_id}
              </Badge>
            )}
            {repo.visibility === "private" && (
              <Badge variant="primary" size="sm">Private</Badge>
            )}
          </div>
          {repo.description && (
            <p className="text-sm text-[var(--color-fg-muted)] mt-1.5">{repo.description}</p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-1.5 h-7 px-2.5 text-xs font-medium rounded-md border border-[var(--color-border)] bg-[var(--color-canvas)] text-[var(--color-fg)] hover:bg-[var(--color-canvas-subtle)] transition-colors"
            aria-label="Star this repository"
          >
            <StarIcon className="size-3.5" /> Star
          </button>
          <Link
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 h-7 px-2.5 text-xs font-medium rounded-md bg-[var(--color-success-emphasis)] text-[var(--color-success-fg)] hover:bg-[var(--color-success)] transition-colors"
          >
            <ExternalLinkIcon className="size-3.5" /> Open
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[var(--color-fg-muted)]">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              className="size-2.5 rounded-full"
              style={{ backgroundColor: getLanguageColor(repo.language) }}
              aria-hidden
            />
            <span className="text-[var(--color-fg)]">{repo.language}</span>
          </span>
        )}
        <Link
          href={`${repo.html_url}/stargazers`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-[var(--color-fg)]"
        >
          <StarIcon className="size-3.5" />{" "}
          <span className="tabular-nums">{repo.stargazers_count.toLocaleString()}</span> stars
        </Link>
        <Link
          href={`${repo.html_url}/forks`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-[var(--color-fg)]"
        >
          <GitForkIcon className="size-3.5" />{" "}
          <span className="tabular-nums">{repo.forks_count.toLocaleString()}</span> forks
        </Link>
        <span className="flex items-center gap-1">
          <EyeIcon className="size-3.5" />{" "}
          <span className="tabular-nums">{repo.watchers_count.toLocaleString()}</span> watching
        </span>
      </div>

      {repo.topics?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {repo.topics.map((topic: string) => (
            <Link
              key={topic}
              href={`https://github.com/topics/${topic}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Badge variant="accent" size="sm">
                {topic}
              </Badge>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
