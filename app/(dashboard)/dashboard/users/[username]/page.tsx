import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UserProfile } from "@/features/users";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = { title: "User profile" };

export default async function UserPage(props: {
  params: Promise<{ username: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const { username } = await props.params;

  return (
    <div className="space-y-4">
      <Suspense
        fallback={
          <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
            <Card>
              <CardContent className="p-5 flex flex-col items-center gap-3">
                <Skeleton className="size-24 rounded-full" />
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-3 w-20" />
                <div className="w-full space-y-2 mt-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-3 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className="space-y-4">
              <Skeleton className="h-32 w-full rounded-md" />
              <Skeleton className="h-64 w-full rounded-md" />
            </div>
          </div>
        }
      >
        <UserProfile accessToken={session.accessToken as string} username={username} />
      </Suspense>
    </div>
  );
}
