import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarIcon, BookmarkIcon, UsersIcon, ExternalLinkIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { removeFavoriteRepo, removeFavoriteUser } from "../actions";
import { EmptyState } from "@/components/shared/empty-state";
import { getLanguageColor } from "@/lib/languages";
import { getFavorites } from "../api/favorites";

function RemoveRepoButton({ id }: { id: string }) {
  return (
    <form action={removeFavoriteRepo}>
      <input type="hidden" name="id" value={id} />
      <Button
        type="submit"
        variant="ghost"
        size="icon-sm"
        className="text-[var(--color-fg-muted)] hover:text-[var(--color-danger-emphasis)] hover:bg-[var(--color-danger-muted)]"
        aria-label="Remove from favorites"
      >
        <Trash2Icon className="size-3.5" />
      </Button>
    </form>
  );
}

function RemoveUserButton({ id }: { id: string }) {
  return (
    <form action={removeFavoriteUser}>
      <input type="hidden" name="id" value={id} />
      <Button
        type="submit"
        variant="ghost"
        size="icon-sm"
        className="text-[var(--color-fg-muted)] hover:text-[var(--color-danger-emphasis)] hover:bg-[var(--color-danger-muted)]"
        aria-label="Remove from favorites"
      >
        <Trash2Icon className="size-3.5" />
      </Button>
    </form>
  );
}

export async function FavoritesList({ userId }: { userId: string }) {
  const { repos, users } = await getFavorites(userId);
  const total = repos.length + users.length;

  if (total === 0) {
    return (
      <EmptyState
        icon={BookmarkIcon}
        title="No favorites yet"
        description="Bookmark repositories and save developer profiles from anywhere in the dashboard. They'll appear here for quick access."
      />
    );
  }

  return (
    <div className="space-y-6">
      {repos.length > 0 && (
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-2">
              <BookmarkIcon className="size-4 text-[var(--color-fg-muted)]" />
              <CardTitle>Bookmarked repositories</CardTitle>
            </div>
            <Badge variant="secondary" size="sm">{repos.length}</Badge>
          </CardHeader>
          <ul className="divide-y divide-[var(--color-border-muted)]">
            {repos.map((repo: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
              <li key={repo.id} className="px-4 py-3 flex items-center gap-3 group">
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/dashboard/repositories/${repo.repoOwner}/${repo.repoName}`}
                    className="text-sm font-semibold text-[var(--color-accent-emphasis)] hover:underline truncate flex items-center gap-1.5"
                  >
                    {repo.repoFullName}
                    <ExternalLinkIcon className="size-3 text-[var(--color-fg-subtle)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  {repo.repoDescription && (
                    <p className="text-xs text-[var(--color-fg-muted)] line-clamp-1 mt-0.5">
                      {repo.repoDescription}
                    </p>
                  )}
                  <div className="flex items-center gap-3 mt-1 text-xs text-[var(--color-fg-muted)]">
                    {repo.repoLanguage && (
                      <span className="flex items-center gap-1">
                        <span
                          className="size-2 rounded-full"
                          style={{ backgroundColor: getLanguageColor(repo.repoLanguage) }}
                        />
                        {repo.repoLanguage}
                      </span>
                    )}
                    <span className="flex items-center gap-1 tabular-nums">
                      <StarIcon className="size-3" /> {repo.repoStars.toLocaleString()}
                    </span>
                  </div>
                </div>
                <RemoveRepoButton id={repo.id} />
              </li>
            ))}
          </ul>
        </Card>
      )}

      {users.length > 0 && (
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-2">
              <UsersIcon className="size-4 text-[var(--color-fg-muted)]" />
              <CardTitle>Saved developers</CardTitle>
            </div>
            <Badge variant="secondary" size="sm">{users.length}</Badge>
          </CardHeader>
          <ul className="grid gap-2 sm:grid-cols-2 p-3">
            {users.map((saved: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
              <li key={saved.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-[var(--color-canvas-subtle)] transition-colors group">
                <Link href={`/dashboard/users/${saved.savedUsername}`} className="shrink-0">
                  <Avatar src={saved.savedAvatarUrl} alt={saved.savedUsername} size={36} />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/dashboard/users/${saved.savedUsername}`}
                    className="text-sm font-semibold text-[var(--color-fg)] hover:text-[var(--color-accent-emphasis)] truncate block"
                  >
                    {saved.savedUsername}
                  </Link>
                  {saved.savedBio && (
                    <p className="text-xs text-[var(--color-fg-muted)] line-clamp-1">
                      {saved.savedBio}
                    </p>
                  )}
                </div>
                <RemoveUserButton id={saved.id} />
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
