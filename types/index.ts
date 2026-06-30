// GitHub API response types
export interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  type: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  owner: GitHubUser;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  master_branch?: string;
  default_branch: string;
  topics: string[];
  license: { key: string; name: string; spdx_id: string; url: string } | null;
  visibility: string;
}

export interface GitHubCommit {
  sha: string;
  commit: {
    author: { name: string; email: string; date: string };
    committer: { name: string; email: string; date: string };
    message: string;
  };
  author: GitHubUser | null;
  committer: GitHubUser | null;
  html_url: string;
}

export interface GitHubBranch {
  name: string;
  commit: { sha: string; url: string };
  protected: boolean;
}

export interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  draft: boolean;
  prerelease: boolean;
  created_at: string;
  published_at: string;
  html_url: string;
  assets: { name: string; download_count: number }[];
}

export interface GitHubContributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: string;
}

export interface GitHubSearchResult<T> {
  total_count: number;
  incomplete_results: boolean;
  items: T[];
}

export interface ContributionCollection {
  totalCommitContributions: number;
  totalPullRequestContributions: number;
  totalIssueContributions: number;
  totalRepositoryContributions: number;
  totalPullRequestReviewContributions: number;
  contributionCalendar: {
    totalContributions: number;
    weeks: {
      contributionDays: {
        contributionCount: number;
        date: string;
        color: string;
      }[];
    }[];
  };
}

// App-specific types
export interface DashboardStats {
  totalRepos: number;
  totalFollowers: number;
  totalFollowing: number;
  totalStars: number;
  languages: { name: string; count: number; color: string }[];
  contributions: ContributionCollection | null;
}

export interface FavoriteRepo {
  id: string;
  repoFullName: string;
  repoName: string;
  repoOwner: string;
  repoDescription: string | null;
  repoUrl: string;
  repoLanguage: string | null;
  repoStars: number;
  notes: string | null;
  createdAt: Date;
}

export interface FavoriteUser {
  id: string;
  savedUsername: string;
  savedAvatarUrl: string | null;
  savedBio: string | null;
  createdAt: Date;
}

export interface Collection {
  id: string;
  name: string;
  description: string | null;
  isPublic: boolean;
  items: CollectionItem[];
  createdAt: Date;
}

export interface CollectionItem {
  id: string;
  type: "REPOSITORY" | "USER";
  itemId: string;
  collectionId: string;
}

export type Theme = "dark" | "light" | "system";

export interface SearchResult {
  type: "user" | "repository" | "organization";
  id: number;
  login?: string;
  name?: string;
  full_name?: string;
  avatar_url?: string;
  html_url?: string;
  description?: string;
  stars?: number;
  language?: string;
}
