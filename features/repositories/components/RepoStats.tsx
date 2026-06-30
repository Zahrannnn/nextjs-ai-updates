import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LanguageBar } from "@/components/shared/stat-card";
import { CalendarIcon, ScaleIcon, TagIcon, GitBranchIcon, AlertCircleIcon } from "lucide-react";
import { getLanguageColor } from "@/lib/languages";
import { getRepoInfo } from "../api/repositories";
import { formatDate } from "../constants/markdown";

export async function RepoStats({
  accessToken,
  owner,
  name,
}: {
  accessToken: string;
  owner: string;
  name: string;
}) {
  const { repo, languages, branches, latestRelease } = await getRepoInfo(accessToken, owner, name);
  const langEntries = Object.entries(languages as Record<string, number>).sort(
    ([, a], [, b]) => b - a,
  );
  const totalBytes = langEntries.reduce((a, [, b]) => a + b, 0);
  const topLangs = langEntries.slice(0, 5);
  const segments = topLangs.map(([lang, bytes]) => ({
    name: lang,
    percentage: totalBytes > 0 ? (bytes / totalBytes) * 100 : 0,
    color: getLanguageColor(lang),
  }));

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2.5 text-sm">
          {repo.license && (
            <div className="flex items-center gap-2 text-[var(--color-fg-muted)]">
              <ScaleIcon className="size-3.5 shrink-0" />
              <span className="truncate">{repo.license.name}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-[var(--color-fg-muted)]">
            <CalendarIcon className="size-3.5 shrink-0" />
            <span>Created {formatDate(repo.created_at)}</span>
          </div>
          <div className="flex items-center gap-2 text-[var(--color-fg-muted)]">
            <GitBranchIcon className="size-3.5 shrink-0" />
            <span>
              <span className="text-[var(--color-fg)] tabular-nums">{branches.length}</span> branches
            </span>
          </div>
          {latestRelease && (
            <div className="flex items-center gap-2 text-[var(--color-fg-muted)]">
              <TagIcon className="size-3.5 shrink-0" />
              <a
                href={latestRelease.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-accent-emphasis)] font-mono text-xs truncate"
              >
                {latestRelease.tag_name}
              </a>
            </div>
          )}
          {repo.open_issues_count > 0 && (
            <a
              href={`${repo.html_url}/issues`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[var(--color-fg-muted)] hover:text-[var(--color-accent-emphasis)]"
            >
              <AlertCircleIcon className="size-3.5 shrink-0" />
              <span>
                <span className="text-[var(--color-fg)] tabular-nums">{repo.open_issues_count.toLocaleString()}</span> open
              </span>
            </a>
          )}
        </CardContent>
      </Card>

      {segments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Languages</CardTitle>
            <p className="text-xs text-[var(--color-fg-muted)] mt-0.5">
              Byte-weighted across {segments.length} languages
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <LanguageBar segments={segments} />
            <ul className="space-y-1.5">
              {segments.map((lang) => (
                <li key={lang.name} className="flex items-center gap-2.5 text-sm">
                  <span
                    className="size-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: lang.color }}
                    aria-hidden
                  />
                  <span className="flex-1">{lang.name}</span>
                  <span className="text-[var(--color-fg-muted)] tabular-nums text-xs">
                    {lang.percentage.toFixed(1)}%
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </>
  );
}
