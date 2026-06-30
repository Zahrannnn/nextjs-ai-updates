"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon, ArrowUpDownIcon, CheckIcon } from "lucide-react";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  DropdownTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "../constants/sort-options";

export function RepositorySearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const currentSort = searchParams.get("sort") ?? "updated";
  const currentLabel = sortOptions.find((o) => o.value === currentSort)?.label ?? "Sort";

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

  const handleSort = useCallback(
    (sort: string) => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", sort);
        params.set("page", "1");
        router.push(`?${params.toString()}`);
      });
    },
    [router, searchParams],
  );

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="relative flex-1 min-w-[200px] max-w-md">
        <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-[var(--color-fg-muted)]" />
        <Input
          defaultValue={searchParams.get("q") ?? ""}
          onChange={handleSearch}
          placeholder="Search repositories…"
          className="pl-8"
          aria-label="Search repositories"
        />
      </div>

      <Dropdown>
        <DropdownTrigger className="inline-flex items-center gap-1.5 h-8 px-2.5 text-sm font-medium rounded-md border border-[var(--color-border)] bg-[var(--color-canvas)] text-[var(--color-fg)] hover:bg-[var(--color-canvas-subtle)] transition-colors">
          <ArrowUpDownIcon className="size-3.5 text-[var(--color-fg-muted)]" />
          <span className="hidden sm:inline text-[var(--color-fg-muted)]">Sort:</span>
          {currentLabel}
        </DropdownTrigger>
        <DropdownContent align="end" className="min-w-[12rem]">
          <DropdownLabel>Sort by</DropdownLabel>
          <DropdownSeparator />
          {sortOptions.map((opt) => (
            <DropdownItem
              key={opt.value}
              onClick={() => handleSort(opt.value)}
              active={currentSort === opt.value}
            >
              {opt.label}
              {currentSort === opt.value && <CheckIcon className="size-3.5 ml-auto" />}
            </DropdownItem>
          ))}
        </DropdownContent>
      </Dropdown>
    </div>
  );
}
