import { environment } from "@/config/environment";
import { apiEndpoints } from "@/services/api/endpoints";
import { readAccessToken, readRefreshToken } from "@/modules/auth/services/session";
import type {
  AuthResult,
  AuthSession,
  FieldErrors,
  LoginInput,
  RegisterInput,
} from "@/modules/auth/types";

type ApiEnvelope<TData> = {
  success: boolean;
  message: string;
  data?: TData;
  errors?: FieldErrors;
};

const GENERIC_ERROR = "Something went wrong. Please try again.";

async function postAuth<TData>(
  path: string,
  body: Record<string, unknown>,
): Promise<{ ok: boolean; data?: TData; message: string; errors?: FieldErrors }> {
  let response: Response;
  try {
    response = await fetch(`${environment.apiBaseUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    // Network / server unreachable.
    return { ok: false, message: "Unable to reach the server. Check your connection." };
  }

  let payload: ApiEnvelope<TData> | null = null;
  try {
    payload = (await response.json()) as ApiEnvelope<TData>;
  } catch {
    payload = null;
  }

  if (!response.ok || !payload?.success) {
    return {
      ok: false,
      message: payload?.message ?? GENERIC_ERROR,
      errors: payload?.errors,
    };
  }

  return { ok: true, data: payload.data, message: payload.message };
}

export async function loginUser(input: LoginInput): Promise<AuthResult> {
  const result = await postAuth<AuthSession>(apiEndpoints.auth.login, {
    email: input.email,
    password: input.password,
  });

  if (!result.ok || !result.data) {
    return { ok: false, message: result.message, errors: result.errors };
  }
  return { ok: true, data: result.data };
}

/**
 * Best-effort sign out. Notifies the API so it can revoke the refresh token,
 * but never throws: local session teardown must succeed even if the network
 * call fails, so the caller always ends up logged out on the client.
 */
export async function logoutUser(): Promise<void> {
  const accessToken = readAccessToken();
  const refreshToken = readRefreshToken();
  try {
    await fetch(`${environment.apiBaseUrl}${apiEndpoints.auth.logout}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      body: JSON.stringify(refreshToken ? { refresh: refreshToken } : {}),
    });
  } catch {
    // Server unreachable — the client still clears its session.
  }
}

export async function registerUser(input: RegisterInput): Promise<AuthResult> {
  const result = await postAuth<AuthSession>(apiEndpoints.auth.register, {
    email: input.email,
    password: input.password,
    ...(input.displayName ? { display_name: input.displayName } : {}),
  });

  if (!result.ok || !result.data) {
    return { ok: false, message: result.message, errors: result.errors };
  }
  return { ok: true, data: result.data };
}
