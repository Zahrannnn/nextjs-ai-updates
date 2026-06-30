import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function PageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="p-4 space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-7 w-14" />
          </Card>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card><CardContent className="space-y-3"><Skeleton className="h-5 w-32" /><Skeleton className="h-24 w-full" /></CardContent></Card>
        <Card><CardContent className="space-y-3"><Skeleton className="h-5 w-32" /><Skeleton className="h-24 w-full" /></CardContent></Card>
      </div>
    </div>
  );
}

export function ListSkeleton({ count = 5, withDescription = true }: { count?: number; withDescription?: boolean }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="p-3 flex items-center gap-3">
          <Skeleton className={withDescription ? "h-9 w-9 rounded-full" : "h-8 w-8 rounded-md"} />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3.5 w-2/3" />
            {withDescription && <Skeleton className="h-3 w-1/2" />}
          </div>
        </Card>
      ))}
    </div>
  );
}
