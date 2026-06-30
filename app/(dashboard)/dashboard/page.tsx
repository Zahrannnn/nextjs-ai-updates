import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardStatsGrid, ContributionGraph, LanguageBreakdown, DashboardSkeleton } from "@/features/dashboard";
import { PageHeader } from "@/components/shared/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { createGitHubClient } from "@/lib/github";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = { title: "Dashboard" };

async function getViewer(accessToken: string) {
  "use cache";
  const github = createGitHubClient(accessToken);
  return github.getCurrentUser(accessToken);
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const user = await getViewer(session.accessToken as string);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Overview"
        title={`Welcome back, ${user.name ?? user.login}`}
        description="A snapshot of your GitHub presence, contribution pace, and code mix."
      />

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardStatsGrid accessToken={session.accessToken as string} />
      </Suspense>

      <div className="grid gap-4 lg:grid-cols-2">
        <Suspense
          fallback={
            <Card>
              <CardContent className="space-y-3 py-8">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-24 w-full" />
              </CardContent>
            </Card>
          }
        >
          <ContributionGraph accessToken={session.accessToken as string} />
        </Suspense>
        <Suspense
          fallback={
            <Card>
              <CardContent className="space-y-3 py-8">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-2 w-full" />
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-3 w-full" />
                ))}
              </CardContent>
            </Card>
          }
        >
          <LanguageBreakdown accessToken={session.accessToken as string} />
        </Suspense>
      </div>
    </div>
  );
}
