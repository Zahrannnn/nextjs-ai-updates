import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UsersIcon, SearchXIcon } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { searchUsers } from "../api/users";

export async function UserSearchResults({
  accessToken,
  searchParams,
}: {
  accessToken: string;
  searchParams?: { q?: string; page?: string };
}) {
  const query = searchParams?.q ?? "";
  const page = parseInt(searchParams?.page ?? "1", 10);
  const result = await searchUsers(accessToken, query, page);

  if (!query) {
    return (
      <EmptyState
        icon={UsersIcon}
        title="Find GitHub users"
        description="Search by username, full name, or organization to explore public profiles, repositories, and contribution patterns."
      />
    );
  }

  if (result.items.length === 0) {
    return (
      <EmptyState
        icon={SearchXIcon}
        title={`No users found for "${query}"`}
        description="Try a different search term, or check the spelling."
      />
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-[var(--color-fg-muted)]">
        <p>
          <span className="text-[var(--color-fg)] font-semibold tabular-nums">
            {result.total_count.toLocaleString()}
          </span>{" "}
          results
        </p>
        {result.total_count > 30 && (
          <p>
            Page <span className="text-[var(--color-fg)] font-semibold">{page}</span>
          </p>
        )}
      </div>
      <ul className="grid gap-2 sm:grid-cols-2">
        {result.items.map((user: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
          <li key={user.id}>
            <Link href={`/dashboard/users/${user.login}`} className="block group">
              <Card className="p-3 hover:border-[var(--color-fg-subtle)] transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar src={user.avatar_url} alt={user.login} size={40} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-[var(--color-fg)] truncate group-hover:text-[var(--color-accent-emphasis)]">
                        {user.login}
                      </p>
                      {user.type === "Organization" && (
                        <Badge variant="accent" size="sm">Org</Badge>
                      )}
                    </div>
                    {user.bio && (
                      <p className="text-xs text-[var(--color-fg-muted)] line-clamp-1 mt-0.5">
                        {user.bio}
                      </p>
                    )}
                    {user.location && (
                      <p className="text-[10px] text-[var(--color-fg-subtle)] mt-0.5 truncate">
                        {user.location}
                      </p>
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
