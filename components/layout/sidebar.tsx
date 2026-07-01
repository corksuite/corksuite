"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, type LucideIcon } from "lucide-react";

import { useSidebar } from "@/contexts/sidebar-context";
import { useCommandPalette } from "@/contexts/command-palette-context";
import { usePermissions } from "@/hooks/use-permissions";
import { sidebarSections, settingsItem } from "@/config/navigation";
import { OrganizationSwitcher } from "@/components/navigation/organization-switcher";
import { Logo, LogoMark } from "@/components/shared/logo";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

function useIsActive() {
  const pathname = usePathname();
  return React.useCallback(
    (href: string) => pathname === href || pathname.startsWith(href + "/"),
    [pathname],
  );
}

type RailRowProps = {
  label: string;
  icon: LucideIcon;
  active?: boolean;
  collapsed: boolean;
  href?: string;
  onClick?: () => void;
  onNavigate?: () => void;
};

/** A single sidebar row rendered as a link or button, tooltip'd when collapsed. */
function RailRow({
  label,
  icon: Icon,
  active,
  collapsed,
  href,
  onClick,
  onNavigate,
}: RailRowProps) {
  const className = cn(
    "group/row flex h-9 items-center gap-3 rounded-lg text-sm font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
    collapsed ? "w-9 justify-center px-0" : "w-full px-3",
    active
      ? "bg-accent text-accent-foreground"
      : "text-muted-foreground hover:bg-muted hover:text-foreground",
  );

  const inner = (
    <>
      <Icon className="size-4.5 shrink-0" />
      {!collapsed ? <span className="truncate">{label}</span> : null}
    </>
  );

  const row = href ? (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={className}
    >
      {inner}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={className}>
      {inner}
    </button>
  );

  if (!collapsed) return row;

  return (
    <Tooltip>
      <TooltipTrigger render={row} />
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}

/** Inner rail content shared by the desktop rail and the mobile drawer. */
function SidebarContent({
  onNavigate,
  forceExpanded = false,
}: {
  onNavigate?: () => void;
  /** The mobile drawer always shows the full rail, even when desktop is collapsed. */
  forceExpanded?: boolean;
}) {
  const { collapsed: railCollapsed } = useSidebar();
  const collapsed = forceExpanded ? false : railCollapsed;
  const { setOpen } = useCommandPalette();
  const { can } = usePermissions();
  const isActive = useIsActive();

  return (
    <div className="flex h-full flex-col gap-2 overflow-hidden">
      {/* Top: brand + organization */}
      <div className="flex flex-col gap-2 px-3 pt-3">
        <div className={cn("flex h-9 items-center", collapsed && "justify-center")}>
          {collapsed ? (
            <Link href="/dashboard" aria-label="Cork" className="outline-none">
              <LogoMark className="size-7" />
            </Link>
          ) : (
            <Logo href="/dashboard" size="sm" />
          )}
        </div>
        <OrganizationSwitcher collapsed={collapsed} />
      </div>

      {/* Scrollable navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        {/* Search action opens the command palette */}
        <div className="pb-1">
          <RailRow
            label="Search"
            icon={Search}
            collapsed={collapsed}
            onClick={() => setOpen(true)}
          />
        </div>

        {sidebarSections.map((section) => {
          if (section.requiresPermission && !can(section.requiresPermission)) {
            return null;
          }
          return (
            <div key={section.id} className="pt-3">
              {section.label && !collapsed ? (
                <p className="px-3 pb-1.5 text-xs font-medium tracking-wide text-muted-foreground/80">
                  {section.label}
                </p>
              ) : null}
              <div className="flex flex-col gap-0.5">
                {section.items.map((item) => (
                  <RailRow
                    key={item.href}
                    label={item.label}
                    icon={item.icon}
                    href={item.href}
                    active={isActive(item.href)}
                    collapsed={collapsed}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Bottom: Settings pinned */}
      <div className="border-t border-border px-3 py-3">
        <RailRow
          label={settingsItem.label}
          icon={settingsItem.icon}
          href={settingsItem.href}
          active={isActive(settingsItem.href)}
          collapsed={collapsed}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
}

export function Sidebar() {
  const { collapsed, mobileOpen, setMobileOpen } = useSidebar();

  return (
    <>
      {/* Desktop rail — fixed, below the header */}
      <aside
        data-collapsed={collapsed}
        style={{ width: collapsed ? 72 : 260 }}
        className="fixed left-0 top-16 bottom-0 z-30 hidden shrink-0 border-r border-border bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-in-out lg:block"
      >
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!mobileOpen}
      >
        <div
          onClick={() => setMobileOpen(false)}
          className={cn(
            "absolute inset-0 bg-foreground/20 backdrop-blur-xs transition-opacity duration-200",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <aside
          className={cn(
            "absolute left-0 top-0 h-full w-65 border-r border-border bg-sidebar text-sidebar-foreground shadow-xl transition-transform duration-200 ease-in-out",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <SidebarContent forceExpanded onNavigate={() => setMobileOpen(false)} />
        </aside>
      </div>
    </>
  );
}
