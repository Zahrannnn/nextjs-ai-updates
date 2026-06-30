import { StatCard } from "@/components/shared/stat-card";
import { GitForkIcon, UsersIcon, UserPlusIcon, StarIcon, Code2Icon, GitPullRequestIcon } from "lucide-react";
import { AnimatedNumber } from "./AnimatedNumber";
import { getStats } from "../api/dashboard";

export async function DashboardStatsGrid({ accessToken }: { accessToken: string }) {
  const stats = await getStats(accessToken);

  const cards = [
    {
      label: "Public repositories",
      value: <AnimatedNumber value={stats.totalRepos} />,
      icon: GitForkIcon,
      hint: "Owned & public",
    },
    {
      label: "Stars received",
      value: <AnimatedNumber value={stats.totalStars} />,
      icon: StarIcon,
      hint: stats.totalStars > 0 ? `Across ${stats.totalRepos} repos` : "Earn your first star",
    },
    {
      label: "Followers",
      value: <AnimatedNumber value={stats.totalFollowers} />,
      icon: UsersIcon,
    },
    {
      label: "Following",
      value: <AnimatedNumber value={stats.totalFollowing} />,
      icon: UserPlusIcon,
    },
    {
      label: "Languages",
      value: <AnimatedNumber value={stats.uniqueLanguages} />,
      icon: Code2Icon,
      hint: stats.topLanguage ? `Top: ${stats.topLanguage}` : undefined,
    },
    {
      label: "Open pull requests",
      value: <span className="text-[var(--color-fg-subtle)]">—</span>,
      icon: GitPullRequestIcon,
      hint: "Coming soon",
    },
  ];

  return (
    <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
      {cards.map((card) => (
        <StatCard
          key={card.label}
          label={card.label}
          value={card.value}
          icon={card.icon}
          hint={card.hint}
        />
      ))}
    </div>
  );
}
