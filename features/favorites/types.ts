export interface FavoriteRepoItem {
  id: string;
  repoFullName: string;
  repoOwner: string;
  repoName: string;
  repoDescription: string | null;
  repoUrl: string;
  repoLanguage: string | null;
  repoStars: number;
}

export interface FavoriteUserItem {
  id: string;
  savedUsername: string;
  savedAvatarUrl: string | null;
  savedBio: string | null;
}
