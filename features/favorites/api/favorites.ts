import { prisma } from "@/lib/db";

export async function getFavorites(userId: string) {
  "use cache";
  const [repos, users] = await Promise.all([
    prisma.favoriteRepository.findMany({ where: { userId }, orderBy: { createdAt: "desc" } }),
    prisma.favoriteUser.findMany({ where: { userId }, orderBy: { createdAt: "desc" } }),
  ]);
  return { repos, users };
}
