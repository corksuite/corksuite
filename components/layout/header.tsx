"use client";

import { Menu, PanelLeft } from "lucide-react";

import { useSidebar } from "@/contexts/sidebar-context";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import {
  CreateMenu,
  GlobalSearch,
  NotificationButton,
  ThemeToggle,
  UserMenu,
} from "@/components/navigation";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";

export function Header() {
  const { toggleCollapsed, toggleMobile } = useSidebar();

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-3 backdrop-blur-md sm:px-4">
      {/* Left: navigation controls + breadcrumbs */}
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Open navigation"
          onClick={toggleMobile}
        >
          <Menu className="size-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hidden lg:inline-flex"
          aria-label="Toggle sidebar"
          onClick={toggleCollapsed}
        >
          <PanelLeft className="size-4" />
        </Button>

        <div className="lg:hidden">
          <Logo href="/dashboard" size="sm" showWordmark={false} />
        </div>

        <div className="hidden min-w-0 lg:block">
          <Breadcrumbs />
        </div>
      </div>

      {/* Center: global search */}
      <div className="hidden max-w-md flex-1 justify-center md:flex">
        <GlobalSearch />
      </div>

      {/* Right: actions */}
      <div className="flex flex-1 items-center justify-end gap-1 sm:gap-1.5">
        <CreateMenu />
        <NotificationButton />
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
}
