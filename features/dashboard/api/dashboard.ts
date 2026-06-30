import type { DashboardStats, LanguageItem } from "../types";
import { createGitHubClient } from "@/lib/github";

export async function getStats(accessToken: string): Promise<DashboardStats> {
  "use cache";
  const github = createGitHubClient(accessToken);
  const user = await github.getCurrentUser(accessToken);
  const repos = await github.getUserRepos(user.login, { perPage: 100, type: "owner" });

  const totalStars = repos.reduce(
    (sum: number, repo: { stargazers_count?: number }) => sum + (repo.stargazers_count ?? 0),
    0,
  );
  const languages: Record<string, number> = repos.reduce(
    (acc: Record<string, number>, repo: { language?: string | null }) => {
      if (repo.language) acc[repo.language] = (acc[repo.language] ?? 0) + 1;
      return acc;
    },
    {},
  );

  return {
    totalRepos: user.public_repos,
    totalFollowers: user.followers,
    totalFollowing: user.following,
    totalStars,
    uniqueLanguages: Object.keys(languages).length,
    topLanguage: Object.entries(languages).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null,
  };
}

export async function getLanguageBreakdown(accessToken: string): Promise<LanguageItem[]> {
  "use cache";
  const github = createGitHubClient(accessToken);
  const user = await github.getCurrentUser(accessToken);
  const repos = await github.getUserRepos(user.login, { perPage: 100, type: "owner" });

  const languageBytes: Record<string, number> = {};
  for (const repo of repos) {
    if (repo.language) {
      const bytes = await github.getRepoLanguages(repo.owner.login, repo.name);
      for (const [lang, count] of Object.entries(bytes as Record<string, number>)) {
        languageBytes[lang] = (languageBytes[lang] ?? 0) + count;
      }
    }
  }

  const totalBytes = Object.values(languageBytes).reduce((a, b) => a + b, 0);
  return Object.entries(languageBytes)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: (bytes / totalBytes) * 100,
    }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 6);
}
