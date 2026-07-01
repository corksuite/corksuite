"use client";

import { SidebarProvider, useSidebar } from "@/contexts/sidebar-context";
import { CommandPaletteProvider } from "@/contexts/command-palette-context";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { CommandPalette } from "@/components/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type AppShellProps = {
  children: React.ReactNode;
};

/**
 * Content region. Offsets below the fixed header and to the right of the fixed
 * desktop rail, and is the only part of the shell that scrolls.
 */
function ShellMain({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <main
      style={{ "--rail-w": collapsed ? "72px" : "260px" } as React.CSSProperties}
      className={cn(
        "min-h-dvh pt-16 transition-[padding] duration-200 ease-in-out",
        "lg:pl-(--rail-w)",
      )}
    >
      {children}
    </main>
  );
}

/**
 * The authenticated application shell: a fixed header, a fixed collapsible
 * sidebar, and a scrollable content area. Wraps every workspace page.
 */
export function AppShell({ children }: AppShellProps) {
  return (
    <SidebarProvider>
      <CommandPaletteProvider>
        <TooltipProvider>
          <div className="min-h-dvh bg-background text-foreground">
            <Header />
            <Sidebar />
            <ShellMain>{children}</ShellMain>
            <CommandPalette />
          </div>
        </TooltipProvider>
      </CommandPaletteProvider>
    </SidebarProvider>
  );
}
