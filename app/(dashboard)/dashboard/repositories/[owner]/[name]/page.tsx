import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { RepoHeader, RepoReadme, RepoStats, RepoContributors, RepoCommits } from "@/features/repositories";
import { AIExplainForRepo } from "@/features/ai";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = { title: "Repository" };

export default async function RepoPage(props: {
  params: Promise<{ owner: string; name: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const { owner, name } = await props.params;

  return (
    <div className="space-y-4">
      <Suspense
        fallback={
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Skeleton className="size-4" />
              <Skeleton className="h-6 w-48" />
            </div>
            <Skeleton className="h-3 w-72" />
            <div className="flex gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-3 w-20" />
              ))}
            </div>
          </div>
        }
      >
        <RepoHeader accessToken={session.accessToken as string} owner={owner} name={name} />
      </Suspense>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4 min-w-0">
          <Suspense
            fallback={
              <Card>
                <CardContent className="space-y-3 py-8">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </CardContent>
              </Card>
            }
          >
            <AIExplainForRepo
              accessToken={session.accessToken as string}
              owner={owner}
              name={name}
            />
          </Suspense>
          <Suspense
            fallback={
              <Card>
                <CardContent className="space-y-3 py-8">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </CardContent>
              </Card>
            }
          >
            <RepoReadme accessToken={session.accessToken as string} owner={owner} name={name} />
          </Suspense>
          <Suspense
            fallback={
              <Card>
                <CardContent className="space-y-3 py-8">
                  <Skeleton className="h-4 w-32" />
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
                </CardContent>
              </Card>
            }
          >
            <RepoCommits accessToken={session.accessToken as string} owner={owner} name={name} />
          </Suspense>
        </div>
        <div className="space-y-4 min-w-0">
          <Suspense
            fallback={
              <Card>
                <CardContent className="space-y-3 py-8">
                  <Skeleton className="h-4 w-24" />
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-3 w-full" />
                  ))}
                </CardContent>
              </Card>
            }
          >
            <RepoStats accessToken={session.accessToken as string} owner={owner} name={name} />
          </Suspense>
          <Suspense
            fallback={
              <Card>
                <CardContent className="space-y-3 py-8">
                  <Skeleton className="h-4 w-32" />
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-6 w-full" />
                  ))}
                </CardContent>
              </Card>
            }
          >
            <RepoContributors accessToken={session.accessToken as string} owner={owner} name={name} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
