import { tokenStorageKeys } from "@/services/auth/token-service";
import type { AuthSession } from "@/modules/auth/types";

/**
 * Persist the authenticated session's tokens on the client. This is a minimal
 * localStorage-backed store; a production build would move to secure,
 * httpOnly cookies issued by the API.
 */
export function persistSession(session: AuthSession): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    tokenStorageKeys.accessToken,
    session.tokens.access,
  );
  window.localStorage.setItem(
    tokenStorageKeys.refreshToken,
    session.tokens.refresh,
  );
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(tokenStorageKeys.accessToken);
  window.localStorage.removeItem(tokenStorageKeys.refreshToken);
}
