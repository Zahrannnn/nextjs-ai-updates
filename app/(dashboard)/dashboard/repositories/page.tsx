import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { RepositoryList, RepositorySearch } from "@/features/repositories";
import { PageHeader } from "@/components/shared/section-header";
import { ListSkeleton } from "@/components/shared/loading-skeleton";

export const metadata = { title: "Repositories" };

export default async function RepositoriesPage(props: {
  searchParams?: Promise<{ q?: string; sort?: string; page?: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const searchParams = await props.searchParams;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Browse"
        title="Repositories"
        description="Browse, search, and sort your own public repositories or filter by keyword."
      />

      <RepositorySearch />

      <Suspense fallback={<ListSkeleton count={5} />}>
        <RepositoryList
          accessToken={session.accessToken as string}
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
}
