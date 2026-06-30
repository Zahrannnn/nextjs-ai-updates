export interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name?: string | null;
  bio?: string | null;
  location?: string | null;
  company?: string | null;
  blog?: string | null;
  email?: string | null;
  twitter_username?: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  type: string;
}

export interface GitHubOrg {
  id: number;
  login: string;
  avatar_url: string;
}
