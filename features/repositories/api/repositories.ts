import { createGitHubClient } from "@/lib/github";

export async function getRepo(accessToken: string, owner: string, name: string) {
  "use cache";
  const github = createGitHubClient(accessToken);
  return github.getRepo(owner, name);
}

export async function getRepoInfo(accessToken: string, owner: string, name: string) {
  "use cache";
  const github = createGitHubClient(accessToken);
  const [repo, languages, branches, releases] = await Promise.all([
    github.getRepo(owner, name),
    github.getRepoLanguages(owner, name),
    github.getRepoBranches(owner, name),
    github.getRepoReleases(owner, name, { perPage: 1 }),
  ]);
  return { repo, languages, branches, latestRelease: releases[0] ?? null };
}

export async function getCommits(accessToken: string, owner: string, name: string) {
  "use cache";
  const github = createGitHubClient(accessToken);
  return github.getRepoCommits(owner, name, { perPage: 8 });
}

export async function getContributors(accessToken: string, owner: string, name: string) {
  "use cache";
  const github = createGitHubClient(accessToken);
  return github.getRepoContributors(owner, name, { perPage: 10 });
}

export async function getReadme(accessToken: string, owner: string, name: string) {
  "use cache";
  const github = createGitHubClient(accessToken);
  return github.getRepoReadme(owner, name);
}

export async function getRepos(accessToken: string, searchParams?: { q?: string; sort?: string; page?: string }) {
  "use cache";
  const github = createGitHubClient(accessToken);
  const user = await github.getCurrentUser(accessToken);

  if (searchParams?.q) {
    const query = `${searchParams.q} user:${user.login}`;
    const sort = (searchParams.sort as "stars" | "updated" | "created" | "name") ?? "stars";
    const page = parseInt(searchParams.page ?? "1", 10);
    const result = await github.searchRepositories(query, { sort, page });
    return { items: result.items, total_count: result.total_count };
  }

  const sort = (searchParams?.sort as "updated" | "created" | "name" | "stars") ?? "updated";
  const page = parseInt(searchParams?.page ?? "1", 10);
  const repos = await github.getUserRepos(user.login, { sort, page, perPage: 30 });
  return { items: repos, total_count: user.public_repos };
}
