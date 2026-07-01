"use client";

import * as React from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/auth-context";

/**
 * Application-wide client providers mounted once in the root layout. Auth and
 * theme state live here so every surface—marketing and workspace alike—shares
 * a single source of truth.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
