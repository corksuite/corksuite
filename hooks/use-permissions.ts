"use client";

import * as React from "react";

import { useAuth } from "@/contexts/auth-context";

/**
 * Placeholder permission model. Real RBAC will resolve permissions from the
 * authenticated session's roles once the API exposes them; until then this
 * grants everything to signed-in users so admin surfaces are reachable during
 * development. Swap the body—not the call sites—when RBAC lands.
 */
export type Permission =
  | "admin.access"
  | "users.manage"
  | "teams.manage"
  | "roles.manage"
  | "permissions.manage"
  | "audit.read";

export function usePermissions() {
  const { isAuthenticated } = useAuth();

  // Placeholder grant set. Swap for real, permission-keyed lookups once the
  // session exposes roles/permissions — call sites won't need to change.
  const granted = React.useMemo<ReadonlySet<Permission>>(
    () =>
      isAuthenticated
        ? new Set<Permission>([
            "admin.access",
            "users.manage",
            "teams.manage",
            "roles.manage",
            "permissions.manage",
            "audit.read",
          ])
        : new Set<Permission>(),
    [isAuthenticated],
  );

  const can = React.useCallback(
    (permission: Permission): boolean => granted.has(permission),
    [granted],
  );

  return { can };
}
