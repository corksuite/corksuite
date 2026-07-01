"use client";

import * as React from "react";

type CommandPaletteContextValue = {
  open: boolean;
  setOpen: (value: boolean) => void;
  toggle: () => void;
};

const CommandPaletteContext =
  React.createContext<CommandPaletteContextValue | null>(null);

/**
 * Shared open-state for the global search / command palette so the header
 * input, the sidebar "Search" action, and the ⌘K / Ctrl-K shortcut all drive
 * the same surface.
 */
export function CommandPaletteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  const toggle = React.useCallback(() => setOpen((prev) => !prev), []);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggle]);

  const value = React.useMemo<CommandPaletteContextValue>(
    () => ({ open, setOpen, toggle }),
    [open, toggle],
  );

  return (
    <CommandPaletteContext.Provider value={value}>
      {children}
    </CommandPaletteContext.Provider>
  );
}

export function useCommandPalette(): CommandPaletteContextValue {
  const context = React.useContext(CommandPaletteContext);
  if (!context) {
    throw new Error(
      "useCommandPalette must be used within a CommandPaletteProvider.",
    );
  }
  return context;
}
