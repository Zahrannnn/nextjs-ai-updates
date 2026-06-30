"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export function UserSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (e.target.value) params.set("q", e.target.value);
        else params.delete("q");
        params.set("page", "1");
        router.push(`?${params.toString()}`);
      });
    },
    [router, searchParams],
  );

  return (
    <div className="relative max-w-md">
      <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-[var(--color-fg-muted)]" />
      <Input
        defaultValue={searchParams.get("q") ?? ""}
        onChange={handleSearch}
        placeholder="Search GitHub users…"
        className="pl-8"
        aria-label="Search users"
      />
    </div>
  );
}
