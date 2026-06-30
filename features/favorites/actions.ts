"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addFavoriteRepo(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const repoFullName = formData.get("repoFullName") as string;
  const [owner, name] = repoFullName.split("/");

  await prisma.favoriteRepository.create({
    data: {
      userId: session.user.id,
      repoId: repoFullName,
      repoFullName,
      repoName: name,
      repoOwner: owner,
      repoDescription: formData.get("repoDescription") as string | null,
      repoUrl: formData.get("repoUrl") as string,
      repoLanguage: formData.get("repoLanguage") as string | null,
      repoStars: parseInt(formData.get("repoStars") as string, 10) || 0,
    },
  });

  revalidatePath("/dashboard/favorites");
}

export async function removeFavoriteRepo(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  await prisma.favoriteRepository.delete({
    where: { id, userId: session.user.id },
  });

  revalidatePath("/dashboard/favorites");
}

export async function addFavoriteUser(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const username = formData.get("username") as string;

  await prisma.favoriteUser.create({
    data: {
      userId: session.user.id,
      savedUserId: username,
      savedUsername: username,
      savedAvatarUrl: formData.get("avatarUrl") as string | null,
      savedBio: formData.get("bio") as string | null,
    },
  });

  revalidatePath("/dashboard/favorites");
}

export async function removeFavoriteUser(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  await prisma.favoriteUser.delete({
    where: { id, userId: session.user.id },
  });

  revalidatePath("/dashboard/favorites");
}

export async function createCollection(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.collection.create({
    data: {
      userId: session.user.id,
      name: formData.get("name") as string,
      description: formData.get("description") as string | null,
      isPublic: formData.get("isPublic") === "true",
    },
  });

  revalidatePath("/dashboard/favorites");
}
