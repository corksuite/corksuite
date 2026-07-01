"use client";

import * as React from "react";

const COLLAPSED_STORAGE_KEY = "corksuite.sidebar-collapsed";
const COLLAPSED_EVENT = "cork:sidebar-collapsed";

function subscribeCollapsed(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(COLLAPSED_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(COLLAPSED_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getCollapsedSnapshot(): string {
  if (typeof window === "undefined") return "false";
  return window.localStorage.getItem(COLLAPSED_STORAGE_KEY) ?? "false";
}

function getCollapsedServerSnapshot(): string {
  return "false";
}

function writeCollapsed(value: boolean): void {
  window.localStorage.setItem(COLLAPSED_STORAGE_KEY, String(value));
  window.dispatchEvent(new Event(COLLAPSED_EVENT));
}

type SidebarContextValue = {
  /** Desktop rail collapsed to icon-only width. Persisted across sessions. */
  collapsed: boolean;
  toggleCollapsed: () => void;
  setCollapsed: (value: boolean) => void;
  /** Mobile off-canvas drawer open state (ephemeral). */
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
  toggleMobile: () => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const collapsed =
    React.useSyncExternalStore(
      subscribeCollapsed,
      getCollapsedSnapshot,
      getCollapsedServerSnapshot,
    ) === "true";

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const setCollapsed = React.useCallback(
    (value: boolean) => writeCollapsed(value),
    [],
  );

  const toggleCollapsed = React.useCallback(
    () => writeCollapsed(getCollapsedSnapshot() !== "true"),
    [],
  );

  const toggleMobile = React.useCallback(
    () => setMobileOpen((previous) => !previous),
    [],
  );

  const value = React.useMemo<SidebarContextValue>(
    () => ({
      collapsed,
      toggleCollapsed,
      setCollapsed,
      mobileOpen,
      setMobileOpen,
      toggleMobile,
    }),
    [collapsed, toggleCollapsed, setCollapsed, mobileOpen, toggleMobile],
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export function useSidebar(): SidebarContextValue {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
