"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { logoutUser } from "@/modules/auth/api/auth-api";
import {
  clearSession,
  readSession,
  readSessionRaw,
  subscribeToSession,
} from "@/modules/auth/services/session";
import { publicRoutes } from "@/config/routes";
import type {
  AuthOrganization,
  AuthProfile,
  AuthSession,
  AuthUser,
} from "@/modules/auth/types";

type AuthContextValue = {
  /** Full cached session, or `null` when signed out. */
  session: AuthSession | null;
  user: AuthUser | null;
  profile: AuthProfile | null;
  organizations: AuthOrganization[];
  currentOrganization: AuthOrganization | null;
  isAuthenticated: boolean;
  /** True until the client has hydrated and read the persisted session. */
  isLoading: boolean;
  /** Best-effort API logout, local teardown, and redirect to the landing page. */
  signOut: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

// Server render and initial client hydration both see `null`; the store then
// re-renders with the real value, matching next-themes' hydration strategy.
const serverSnapshot = () => null;
// Returns `false` on the server, `true` once hydrated — without setState-in-effect.
const subscribeNoop = () => () => {};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const rawSession = React.useSyncExternalStore(
    subscribeToSession,
    readSessionRaw,
    serverSnapshot,
  );
  const hydrated = React.useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  const session = React.useMemo<AuthSession | null>(() => {
    if (!rawSession) return null;
    try {
      return JSON.parse(rawSession) as AuthSession;
    } catch {
      return null;
    }
  }, [rawSession]);

  const signOut = React.useCallback(async () => {
    // Tear down local state first so the UI reflects sign-out immediately
    // (the session store notifies subscribers), then notify the API.
    const logout = logoutUser();
    clearSession();
    router.push(publicRoutes.home);
    await logout;
  }, [router]);

  const value = React.useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      profile: session?.profile ?? null,
      organizations: session?.organizations ?? [],
      currentOrganization: session?.current_organization ?? null,
      isAuthenticated: hydrated && session !== null,
      isLoading: !hydrated,
      signOut,
    }),
    [session, hydrated, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
}

// Re-exported for callers that want a one-off read outside React.
export { readSession };
