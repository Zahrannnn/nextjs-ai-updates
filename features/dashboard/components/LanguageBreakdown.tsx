import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LanguageBar } from "@/components/shared/stat-card";
import { getLanguageColor } from "@/lib/languages";
import { getLanguageBreakdown } from "../api/dashboard";

export async function LanguageBreakdown({ accessToken }: { accessToken: string }) {
  const languages = await getLanguageBreakdown(accessToken);

  if (languages.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Languages</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[var(--color-fg-muted)]">
            No language data yet. Add repositories with code to see the breakdown.
          </p>
        </CardContent>
      </Card>
    );
  }

  const segments = languages.map((l) => ({
    name: l.name,
    percentage: l.percentage,
    color: getLanguageColor(l.name),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Languages</CardTitle>
        <p className="text-xs text-[var(--color-fg-muted)] mt-0.5">
          Byte-weighted across {languages.length} languages
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <LanguageBar segments={segments} />
        <ul className="space-y-1.5">
          {languages.map((lang) => (
            <li key={lang.name} className="flex items-center gap-2.5 text-sm">
              <span
                className="size-2.5 rounded-full shrink-0"
                style={{ backgroundColor: getLanguageColor(lang.name) }}
                aria-hidden
              />
              <span className="flex-1 text-[var(--color-fg)]">{lang.name}</span>
              <span className="text-[var(--color-fg-muted)] tabular-nums text-xs">
                {lang.percentage.toFixed(1)}%
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
