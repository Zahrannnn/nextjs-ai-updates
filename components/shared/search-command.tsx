"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon, Loader2Icon, CommandIcon, UserIcon, GitForkIcon, BuildingIcon } from "lucide-react";
import { cn } from "@/utils/cn";

interface SearchResult {
  type: "user" | "repository" | "organization";
  id: number;
  login?: string;
  name?: string;
  full_name?: string;
  avatar_url?: string;
  html_url?: string;
  description?: string;
  stars?: number;
  language?: string;
}

export function SearchCommand() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  function closeAndReset() {
    setOpen(false);
    setQuery("");
    setResults([]);
    setSelectedIndex(0);
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") closeAndReset();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/github/search?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.items ?? []);
      }
    } catch {
      /* noop */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => doSearch(query), 250);
    return () => clearTimeout(timer);
  }, [query, doSearch]);

  function handleSelect(item: SearchResult) {
    closeAndReset();
    if (item.type === "user" || item.type === "organization") {
      router.push(`/dashboard/users/${item.login}`);
    } else if (item.type === "repository" && item.full_name) {
      const [owner, name] = item.full_name.split("/");
      router.push(`/dashboard/repositories/${owner}/${name}`);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "group flex items-center gap-2 w-full h-7 px-2.5 text-xs",
          "text-[var(--color-fg-muted)] rounded-md border border-[var(--color-border)] bg-[var(--color-canvas-subtle)]",
          "hover:bg-[var(--color-canvas)] hover:border-[var(--color-fg-subtle)] transition-colors",
        )}
        aria-label="Search (Cmd+K)"
      >
        <SearchIcon className="size-3.5 shrink-0" aria-hidden />
        <span className="flex-1 text-left truncate">Search…</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] text-[var(--color-fg-muted)]">
          <CommandIcon className="size-2.5" />K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4"
          onClick={closeAndReset}
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"
            aria-hidden
          />
          <div
            className="relative w-full max-w-xl rounded-lg border border-[var(--color-border)] bg-[var(--color-canvas-overlay)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5 px-3 h-10 border-b border-[var(--color-border-muted)]">
              <SearchIcon className="size-3.5 text-[var(--color-fg-muted)] shrink-0" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
                  }
                  if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setSelectedIndex((prev) => Math.max(prev - 1, 0));
                  }
                  if (e.key === "Enter" && results[selectedIndex]) {
                    e.preventDefault();
                    handleSelect(results[selectedIndex]);
                  }
                }}
                placeholder="Search users or repositories…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--color-fg-subtle)]"
                aria-label="Search input"
              />
              {loading && (
                <Loader2Icon className="size-3.5 animate-spin text-[var(--color-fg-muted)]" aria-hidden />
              )}
              <kbd className="text-[10px]">esc</kbd>
            </div>

            <div className="max-h-80 overflow-y-auto scrollbar-thin p-1">
              {results.length > 0 ? (
                <ul role="listbox" className="space-y-0.5">
                  {results.map((item, i) => {
                    const Icon =
                      item.type === "user"
                        ? UserIcon
                        : item.type === "organization"
                          ? BuildingIcon
                          : GitForkIcon;
                    return (
                      <li key={`${item.type}-${item.id}`} role="option" aria-selected={i === selectedIndex}>
                        <button
                          type="button"
                          onClick={() => handleSelect(item)}
                          onMouseEnter={() => setSelectedIndex(i)}
                          className={cn(
                            "flex items-center gap-2.5 w-full rounded-sm px-2 py-1.5 text-sm text-left transition-colors",
                            i === selectedIndex
                              ? "bg-[var(--color-canvas-subtle)] text-[var(--color-fg)]"
                              : "text-[var(--color-fg)]",
                          )}
                        >
                          {item.avatar_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={item.avatar_url}
                              alt=""
                              className="size-6 rounded-full border border-[var(--color-border-muted)]"
                            />
                          ) : (
                            <span className="size-6 rounded-full bg-[var(--color-canvas-subtle)] flex items-center justify-center">
                              <Icon className="size-3 text-[var(--color-fg-muted)]" />
                            </span>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate text-[13px]">
                              {item.login ?? item.full_name}
                            </div>
                            {item.description && (
                              <div className="text-[11px] text-[var(--color-fg-muted)] truncate">
                                {item.description}
                              </div>
                            )}
                          </div>
                          <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-fg-muted)] shrink-0">
                            {item.type === "user" ? "User" : item.type === "organization" ? "Org" : "Repo"}
                          </span>
                          {item.stars != null && (
                            <span className="text-[11px] tabular-nums text-[var(--color-fg-muted)] shrink-0">
                              ★ {item.stars.toLocaleString()}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : query && !loading ? (
                <div className="text-center py-10">
                  <p className="text-sm text-[var(--color-fg-muted)]">
                    No results for <span className="font-mono text-[var(--color-fg)]">&ldquo;{query}&rdquo;</span>
                  </p>
                </div>
              ) : !query ? (
                <div className="px-3 py-6 text-center">
                  <p className="text-xs text-[var(--color-fg-muted)]">
                    Type to search across GitHub users and repositories.
                  </p>
                  <div className="flex items-center justify-center gap-1.5 mt-3 text-[10px] text-[var(--color-fg-subtle)]">
                    <kbd>↑</kbd>
                    <kbd>↓</kbd>
                    <span>navigate</span>
                    <span className="mx-1">·</span>
                    <kbd>↵</kbd>
                    <span>open</span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
