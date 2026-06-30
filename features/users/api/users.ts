import { createGitHubClient } from "@/lib/github";

export async function getUser(accessToken: string, username: string) {
  "use cache";
  const github = createGitHubClient(accessToken);
  const [user, orgs, repos] = await Promise.all([
    github.getUser(username),
    github.getUserOrgs(username),
    github.getUserRepos(username, { sort: "stars", perPage: 6 }),
  ]);
  return { user, orgs, repos };
}

export async function getUserRepos(accessToken: string, username: string) {
  "use cache";
  const github = createGitHubClient(accessToken);
  return github.getUserRepos(username, { sort: "stars", perPage: 12 });
}

export async function searchUsers(accessToken: string, query: string, page: number = 1) {
  "use cache";
  if (!query) return { items: [], total_count: 0 };
  const github = createGitHubClient(accessToken);
  return github.searchUsers(query, { page });
}
