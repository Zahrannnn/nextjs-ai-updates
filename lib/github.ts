// GitHub API client with both REST and GraphQL support
// Uses Next.js 16 caching via next: { revalidate } where appropriate

type GitHubToken = string;

interface GitHubOptions {
  token: GitHubToken;
}

export class GitHubClient {
  private token: GitHubToken;
  private baseUrl = "https://api.github.com";
  private graphqlUrl = "https://api.github.com/graphql";

  constructor(options: GitHubOptions) {
    this.token = options.token;
  }

  private get headers() {
    return {
      Authorization: `Bearer ${this.token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "GitHub-Dashboard-Pro",
    };
  }

  // REST API methods
  async getUser(username: string) {
    const res = await fetch(`${this.baseUrl}/users/${username}`, {
      headers: this.headers,
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    return res.json();
  }

  async getCurrentUser(token: string) {
    const res = await fetch(`${this.baseUrl}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "GitHub-Dashboard-Pro",
      },
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    return res.json();
  }

  async getUserRepos(username: string, options?: { page?: number; perPage?: number; sort?: string; type?: string }) {
    const params = new URLSearchParams({
      page: String(options?.page ?? 1),
      per_page: String(options?.perPage ?? 30),
      sort: options?.sort ?? "updated",
      type: options?.type ?? "all",
    });
    const res = await fetch(`${this.baseUrl}/users/${username}/repos?${params}`, {
      headers: this.headers,
      next: { revalidate: 120 },
    });
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    return res.json();
  }

  async getRepo(owner: string, name: string) {
    const res = await fetch(`${this.baseUrl}/repos/${owner}/${name}`, {
      headers: this.headers,
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    return res.json();
  }

  async getRepoReadme(owner: string, name: string) {
    const res = await fetch(`${this.baseUrl}/repos/${owner}/${name}/readme`, {
      headers: { ...this.headers, Accept: "application/vnd.github.raw+json" },
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return res.text();
  }

  async getRepoLanguages(owner: string, name: string) {
    const res = await fetch(`${this.baseUrl}/repos/${owner}/${name}/languages`, {
      headers: this.headers,
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    return res.json();
  }

  async getRepoContributors(owner: string, name: string, options?: { page?: number; perPage?: number }) {
    const params = new URLSearchParams({
      page: String(options?.page ?? 1),
      per_page: String(options?.perPage ?? 30),
    });
    const res = await fetch(`${this.baseUrl}/repos/${owner}/${name}/contributors?${params}`, {
      headers: this.headers,
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    return res.json();
  }

  async getRepoCommits(owner: string, name: string, options?: { page?: number; perPage?: number; sha?: string }) {
    const params = new URLSearchParams({
      page: String(options?.page ?? 1),
      per_page: String(options?.perPage ?? 30),
    });
    if (options?.sha) params.set("sha", options.sha);
    const res = await fetch(`${this.baseUrl}/repos/${owner}/${name}/commits?${params}`, {
      headers: this.headers,
      next: { revalidate: 120 },
    });
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    return res.json();
  }

  async getRepoBranches(owner: string, name: string) {
    const res = await fetch(`${this.baseUrl}/repos/${owner}/${name}/branches`, {
      headers: this.headers,
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    return res.json();
  }

  async getRepoReleases(owner: string, name: string, options?: { page?: number; perPage?: number }) {
    const params = new URLSearchParams({
      page: String(options?.page ?? 1),
      per_page: String(options?.perPage ?? 10),
    });
    const res = await fetch(`${this.baseUrl}/repos/${owner}/${name}/releases?${params}`, {
      headers: this.headers,
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    return res.json();
  }

  async getUserOrgs(username: string) {
    const res = await fetch(`${this.baseUrl}/users/${username}/orgs`, {
      headers: this.headers,
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    return res.json();
  }

  async searchRepositories(query: string, options?: { page?: number; perPage?: number; sort?: string; order?: string }) {
    const params = new URLSearchParams({
      q: query,
      page: String(options?.page ?? 1),
      per_page: String(options?.perPage ?? 30),
      sort: options?.sort ?? "stars",
      order: options?.order ?? "desc",
    });
    const res = await fetch(`${this.baseUrl}/search/repositories?${params}`, {
      headers: this.headers,
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    return res.json();
  }

  async searchUsers(query: string, options?: { page?: number; perPage?: number }) {
    const params = new URLSearchParams({
      q: query,
      page: String(options?.page ?? 1),
      per_page: String(options?.perPage ?? 30),
    });
    const res = await fetch(`${this.baseUrl}/search/users?${params}`, {
      headers: this.headers,
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    return res.json();
  }

  // GraphQL API for complex queries
  async graphql<T = unknown>(query: string, variables?: Record<string, unknown>): Promise<T> {
    const res = await fetch(this.graphqlUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        "User-Agent": "GitHub-Dashboard-Pro",
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`GitHub GraphQL error: ${res.status}`);
    const data = await res.json();
    if (data.errors) throw new Error(data.errors[0]?.message ?? "GraphQL error");
    return data.data;
  }

  async getUserContributions(username: string) {
    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            totalCommitContributions
            totalPullRequestContributions
            totalIssueContributions
            totalRepositoryContributions
            totalPullRequestReviewContributions
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                  color
                }
              }
            }
          }
        }
      }
    `;
    return this.graphql<ContributionsResponse>(query, { username });
  }
}

interface ContributionDay {
  contributionCount: number;
  date: string;
  color: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

interface ContributionsCollection {
  totalCommitContributions: number;
  totalPullRequestContributions: number;
  totalIssueContributions: number;
  totalRepositoryContributions: number;
  totalPullRequestReviewContributions: number;
  contributionCalendar: ContributionCalendar;
}

interface ContributionsResponse {
  user: {
    contributionsCollection: ContributionsCollection;
  };
}

export function createGitHubClient(token: string) {
  return new GitHubClient({ token });
}
