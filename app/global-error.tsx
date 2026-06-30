"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            "var(--font-inter), ui-sans-serif, system-ui, -apple-system, sans-serif",
          background: "var(--color-canvas-subtle)",
          color: "var(--color-fg)",
        }}
      >
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="flex flex-col items-center text-center max-w-md">
            <h1 className="text-xl font-semibold tracking-tight">Critical error</h1>
            <p className="text-sm mt-2" style={{ color: "var(--color-fg-muted)" }}>
              {error.message || "A critical error occurred. Please refresh the page."}
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-5 inline-flex items-center justify-center rounded-md h-8 px-3 text-sm font-medium"
              style={{
                background: "var(--color-success-emphasis)",
                color: "var(--color-success-fg)",
              }}
            >
              Refresh
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
