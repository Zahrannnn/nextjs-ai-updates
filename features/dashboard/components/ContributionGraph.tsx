import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { createGitHubClient } from "@/lib/github";

export async function ContributionGraph({ accessToken }: { accessToken: string }) {
  const github = createGitHubClient(accessToken);
  const user = await github.getCurrentUser(accessToken);
  const data = await github.getUserContributions(user.login);
  const contributions = data.user.contributionsCollection;

  const weeks = contributions.contributionCalendar.weeks.slice(-52);
  const totalContributions = contributions.contributionCalendar.totalContributions;
  const maxCount = Math.max(
    ...weeks.flatMap((w) => w.contributionDays.map((d) => d.contributionCount)),
    1,
  );

  const level = (count: number) => {
    if (count === 0) return 0;
    const ratio = count / maxCount;
    if (ratio < 0.25) return 1;
    if (ratio < 0.5) return 2;
    if (ratio < 0.75) return 3;
    return 4;
  };

  const palette = [
    "var(--color-canvas-subtle)",
    "var(--color-success-muted)",
    "color-mix(in srgb, var(--color-success-emphasis) 40%, transparent)",
    "color-mix(in srgb, var(--color-success-emphasis) 70%, transparent)",
    "var(--color-success-emphasis)",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contribution activity</CardTitle>
        <p className="text-xs text-[var(--color-fg-muted)] mt-0.5">
          <span className="text-[var(--color-fg)] font-semibold tabular-nums">
            {totalContributions.toLocaleString()}
          </span>{" "}
          contributions in the last year
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex gap-[3px] overflow-x-auto pb-2 scrollbar-thin">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.contributionDays.map((day, di) => {
                const lvl = level(day.contributionCount);
                return (
                  <div
                    key={di}
                    className="size-[10px] rounded-[2px] border border-[var(--color-border-muted)]"
                    style={{ backgroundColor: palette[lvl] }}
                    title={`${day.contributionCount} contributions on ${day.date}`}
                    role="img"
                    aria-label={`${day.contributionCount} contributions on ${day.date}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5 mt-2 text-[10px] text-[var(--color-fg-muted)]">
          <span>Less</span>
          {palette.map((color, i) => (
            <div
              key={i}
              className="size-[10px] rounded-[2px] border border-[var(--color-border-muted)]"
              style={{ backgroundColor: color }}
            />
          ))}
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  );
}
