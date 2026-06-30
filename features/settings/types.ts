export interface SettingsUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export interface ThemeOption {
  value: "light" | "dark" | "system";
  icon: React.ElementType;
  label: string;
  description: string;
}
