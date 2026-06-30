import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { FavoritesList } from "@/features/favorites";
import { PageHeader } from "@/components/shared/section-header";

export const metadata = { title: "Favorites" };

export default async function FavoritesPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Library"
        title="Favorites"
        description="Repositories and developers you've bookmarked for quick access."
      />
      <Suspense fallback={null}>
        <FavoritesList userId={session.user.id} />
      </Suspense>
    </div>
  );
}
