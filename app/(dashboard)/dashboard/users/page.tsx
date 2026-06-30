import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UserSearch, UserSearchResults } from "@/features/users";
import { PageHeader } from "@/components/shared/section-header";
import { ListSkeleton } from "@/components/shared/loading-skeleton";

export const metadata = { title: "Users" };

export default async function UsersPage(props: {
  searchParams?: Promise<{ q?: string; page?: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const searchParams = await props.searchParams;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Search"
        title="Users"
        description="Search GitHub users and explore public profiles, repositories, and contribution history."
      />

      <UserSearch />

      <Suspense
        fallback={
          <ListSkeleton count={6} withDescription />
        }
      >
        <UserSearchResults accessToken={session.accessToken as string} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
