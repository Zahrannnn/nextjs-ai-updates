export interface DashboardStats {
  totalRepos: number;
  totalFollowers: number;
  totalFollowing: number;
  totalStars: number;
  uniqueLanguages: number;
  topLanguage: string | null;
}

export interface LanguageItem {
  name: string;
  bytes: number;
  percentage: number;
}
