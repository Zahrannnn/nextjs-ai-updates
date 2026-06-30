import type { RepoMeta } from "../types";
import { createGitHubClient } from "@/lib/github";

export async function getRepoMeta(accessToken: string, owner: string, name: string): Promise<RepoMeta> {
  "use cache";
  const github = createGitHubClient(accessToken);
  const repo = await github.getRepo(owner, name);
  return {
    name,
    description: repo.description ?? "",
    language: repo.language ?? "",
    topics: repo.topics ?? [],
  };
}
