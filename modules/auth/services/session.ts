import { tokenStorageKeys } from "@/services/auth/token-service";
import type { AuthSession } from "@/modules/auth/types";

/**
 * Client-side session store. Tokens live under stable keys for the HTTP client,
 * and the full session payload is cached so the UI (navbar, user menu, org
 * switcher) can render identity without a round-trip. A production build would
 * move tokens to secure, httpOnly cookies issued by the API.
 */
const SESSION_KEY = "corksuite.session";

/**
 * Dispatched on the window whenever the session is written or cleared so that
 * auth-aware UI updates in the same tab without a page refresh. Cross-tab sync
 * is handled by the native `storage` event.
 */
export const AUTH_CHANGE_EVENT = "cork:auth-change";

function emitAuthChange(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

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
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  emitAuthChange();
}

/**
 * Raw persisted session string, or `null`. Returning the stable string (rather
 * than a freshly parsed object) lets `useSyncExternalStore` compare snapshots
 * by reference without tearing.
 */
export function readSessionRaw(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(SESSION_KEY);
}

export function readSession(): AuthSession | null {
  const raw = readSessionRaw();
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

/** Subscribe to same-tab (custom event) and cross-tab (storage) session changes. */
export function subscribeToSession(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(AUTH_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(AUTH_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function readAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(tokenStorageKeys.accessToken);
}

export function readRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(tokenStorageKeys.refreshToken);
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(tokenStorageKeys.accessToken);
  window.localStorage.removeItem(tokenStorageKeys.refreshToken);
  window.localStorage.removeItem(SESSION_KEY);
  emitAuthChange();
}
