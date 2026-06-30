"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangleIcon } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto size-12 rounded-md border border-[var(--color-border)] bg-[var(--color-canvas)] flex items-center justify-center mb-4">
          <AlertTriangleIcon className="size-6 text-[var(--color-danger-emphasis)]" />
        </div>
        <h1 className="text-lg font-semibold tracking-tight">Something went wrong</h1>
        <p className="text-sm text-[var(--color-fg-muted)] mt-2">
          {error.message || "An unexpected error occurred. Try again, or head back to the dashboard."}
        </p>
        {error.digest && (
          <p className="text-[10px] text-[var(--color-fg-subtle)] font-mono mt-2">
            {error.digest}
          </p>
        )}
        <div className="flex items-center justify-center gap-2 mt-5">
          <Button onClick={reset} variant="default" size="sm">
            Try again
          </Button>
          <Button onClick={() => (window.location.href = "/dashboard")} variant="outline" size="sm">
            Go to dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
