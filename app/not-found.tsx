import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestionIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto size-12 rounded-md border border-[var(--color-border)] bg-[var(--color-canvas)] flex items-center justify-center mb-4">
          <FileQuestionIcon className="size-6 text-[var(--color-fg-muted)]" />
        </div>
        <p className="text-5xl font-bold tracking-tight text-[var(--color-fg-muted)] tabular-nums">404</p>
        <h1 className="text-lg font-semibold tracking-tight mt-2">Page not found</h1>
        <p className="text-sm text-[var(--color-fg-muted)] mt-2">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        </p>
        <div className="mt-5">
          <Link href="/dashboard">
            <Button size="sm">Go to dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
