import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/empty-state";
import {
  MapPinIcon,
  Building2Icon,
  LinkIcon,
  MailIcon,
  CalendarIcon,
  BriefcaseIcon,
  BookOpenIcon,
  GitForkIcon,
  StarIcon,
} from "lucide-react";
import Link from "next/link";
import { getLanguageColor } from "@/lib/languages";
import { getUser } from "../api/users";

export async function UserProfile({
  accessToken,
  username,
}: {
  accessToken: string;
  username: string;
}) {
  const { user, orgs, repos } = await getUser(accessToken, username);
  const isOrg = user.type === "Organization";

  return (
    <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
      <Card>
        <CardContent className="p-5 flex flex-col items-center text-center">
          <Avatar src={user.avatar_url} alt={user.login} size={96} className="mb-3" />
          <h1 className="text-lg font-semibold leading-tight">{user.name ?? user.login}</h1>
          <p className="text-sm text-[var(--color-fg-muted)]">
            {isOrg ? user.login : `@${user.login}`}
          </p>
          {isOrg && (
            <Badge variant="accent" className="mt-2">
              <BriefcaseIcon className="size-3" /> Organization
            </Badge>
          )}
          {user.bio && (
            <p className="text-sm mt-3 text-[var(--color-fg)]">{user.bio}</p>
          )}

          <div className="w-full space-y-2 mt-4 text-left text-sm">
            {user.company && (
              <div className="flex items-center gap-2 text-[var(--color-fg-muted)]">
                <Building2Icon className="size-3.5 shrink-0" />
                <span className="truncate">{user.company}</span>
              </div>
            )}
            {user.location && (
              <div className="flex items-center gap-2 text-[var(--color-fg-muted)]">
                <MapPinIcon className="size-3.5 shrink-0" />
                <span className="truncate">{user.location}</span>
              </div>
            )}
            {user.blog && (
              <div className="flex items-center gap-2 text-[var(--color-fg-muted)]">
                <LinkIcon className="size-3.5 shrink-0" />
                <Link
                  href={user.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-accent-emphasis)] truncate"
                >
                  {user.blog.replace(/^https?:\/\//, "")}
                </Link>
              </div>
            )}
            {user.twitter_username && (
              <div className="flex items-center gap-2 text-[var(--color-fg-muted)]">
                <span className="size-3.5 inline-flex items-center justify-center text-xs font-semibold">𝕏</span>
                <Link
                  href={`https://twitter.com/${user.twitter_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-accent-emphasis)]"
                >
                  @{user.twitter_username}
                </Link>
              </div>
            )}
            {user.email && (
              <div className="flex items-center gap-2 text-[var(--color-fg-muted)]">
                <MailIcon className="size-3.5 shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-[var(--color-fg-muted)]">
              <CalendarIcon className="size-3.5 shrink-0" />
              <span>Joined {new Date(user.created_at).toLocaleDateString(undefined, { month: "short", year: "numeric" })}</span>
            </div>
          </div>

          <div className="w-full grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-[var(--color-border-muted)]">
            <div className="text-center">
              <p className="text-lg font-semibold tabular-nums">{user.public_repos.toLocaleString()}</p>
              <p className="text-[10px] uppercase tracking-wider text-[var(--color-fg-muted)]">Repos</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold tabular-nums">{user.followers.toLocaleString()}</p>
              <p className="text-[10px] uppercase tracking-wider text-[var(--color-fg-muted)]">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold tabular-nums">{user.following.toLocaleString()}</p>
              <p className="text-[10px] uppercase tracking-wider text-[var(--color-fg-muted)]">Following</p>
            </div>
          </div>

          <Link
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-4 inline-flex items-center justify-center gap-2 h-8 px-3 text-sm font-medium rounded-md border border-[var(--color-border)] bg-[var(--color-canvas)] text-[var(--color-fg)] hover:bg-[var(--color-canvas-subtle)] transition-colors"
          >
            View on GitHub
          </Link>
        </CardContent>
      </Card>

      <div className="space-y-4 min-w-0">
        {orgs.length > 0 && (
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Organizations</CardTitle>
              <Badge variant="secondary" size="sm">{orgs.length}</Badge>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {orgs.map((org: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                  <Link
                    key={org.id}
                    href={`/dashboard/users/${org.login}`}
                    className="flex flex-col items-center gap-1.5 group"
                    title={org.login}
                  >
                    <Avatar src={org.avatar_url} alt={org.login} size={48} square />
                    <span className="text-[11px] text-[var(--color-fg-muted)] group-hover:text-[var(--color-fg)] truncate max-w-[64px]">
                      {org.login}
                    </span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>{isOrg ? "Public repositories" : "Pinned repositories"}</CardTitle>
              <p className="text-xs text-[var(--color-fg-muted)] mt-0.5">
                {isOrg
                  ? `Top ${repos.length} of ${user.public_repos} by stars`
                  : `${user.public_repos} public repos · top ${repos.length} by stars`}
              </p>
            </div>
            <Link
              href={`/dashboard/users`}
              className="text-xs text-[var(--color-accent-emphasis)] hover:underline"
            >
              Browse all
            </Link>
          </CardHeader>
          {repos.length === 0 ? (
            <CardContent>
              <EmptyState
                icon={BookOpenIcon}
                title="No public repositories"
                description={`${user.login} hasn't published any public repositories yet.`}
                compact
              />
            </CardContent>
          ) : (
            <ul className="divide-y divide-[var(--color-border-muted)]">
              {repos.map((repo: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                <li key={repo.id}>
                  <Link
                    href={`/dashboard/repositories/${repo.owner.login}/${repo.name}`}
                    className="block px-4 py-3 hover:bg-[var(--color-canvas-subtle)] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3 min-w-0">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <BookOpenIcon className="size-3.5 text-[var(--color-fg-muted)] shrink-0" />
                          <span className="font-semibold text-sm text-[var(--color-accent-emphasis)] truncate">
                            {repo.name}
                          </span>
                          {repo.fork && (
                            <Badge variant="outline" size="sm">Fork</Badge>
                          )}
                          {repo.visibility === "private" && (
                            <Badge variant="secondary" size="sm">Private</Badge>
                          )}
                        </div>
                        {repo.description && (
                          <p className="text-xs text-[var(--color-fg-muted)] mt-1 line-clamp-2">
                            {repo.description}
                          </p>
                        )}
                        <div className="flex items-center gap-3 mt-2 text-xs text-[var(--color-fg-muted)]">
                          {repo.language && (
                            <span className="flex items-center gap-1">
                              <span
                                className="size-2 rounded-full"
                                style={{ backgroundColor: getLanguageColor(repo.language) }}
                              />
                              {repo.language}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <StarIcon className="size-3" /> {repo.stargazers_count.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitForkIcon className="size-3" /> {repo.forks_count.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
