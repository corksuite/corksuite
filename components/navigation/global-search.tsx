"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";

import { useCommandPalette } from "@/contexts/command-palette-context";
import {
  createActions,
  primarySection,
  workspaceSection,
} from "@/config/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

/** Header trigger that opens the command palette. Styled as a search input. */
export function GlobalSearch({ className }: { className?: string }) {
  const { setOpen } = useCommandPalette();

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={cn(
        "group flex h-9 w-full items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm text-muted-foreground outline-none transition-colors hover:border-ring/40 hover:bg-muted/40 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
      aria-label="Search"
    >
      <Search className="size-4 shrink-0" />
      <span className="flex-1 text-left">Search…</span>
      <kbd className="hidden items-center gap-0.5 rounded border border-border bg-muted px-1.5 font-sans text-[10px] font-medium text-muted-foreground sm:inline-flex">
        ⌘K
      </kbd>
    </button>
  );
}

/**
 * Command palette placeholder. Real fuzzy search and command execution land
 * later; for now it surfaces quick navigation and create shortcuts.
 */
export function CommandPalette() {
  const { open, setOpen } = useCommandPalette();
  const router = useRouter();

  const navItems = [...primarySection.items, ...workspaceSection.items];

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        className="top-24 max-w-lg translate-y-0 gap-0 overflow-hidden p-0 sm:max-w-lg"
      >
        <DialogTitle className="sr-only">Search</DialogTitle>
        <DialogDescription className="sr-only">
          Search across Cork or jump to a page.
        </DialogDescription>

        <div className="flex items-center gap-2 border-b border-border px-3.5">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            autoFocus
            placeholder="Search projects, tasks, documents…"
            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
            Jump to
          </p>
          {navItems.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => go(item.href)}
              className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm outline-none transition-colors hover:bg-muted focus-visible:bg-muted"
            >
              <item.icon className="size-4 text-muted-foreground" />
              <span className="flex-1 text-left">{item.label}</span>
              <ArrowRight className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          ))}

          <p className="px-2 pb-1.5 pt-3 text-xs font-medium text-muted-foreground">
            Create
          </p>
          {createActions.map((action) => (
            <button
              key={action.id}
              type="button"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm outline-none transition-colors hover:bg-muted focus-visible:bg-muted"
            >
              <action.icon className="size-4 text-muted-foreground" />
              <span className="flex-1 text-left">{action.label}</span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
