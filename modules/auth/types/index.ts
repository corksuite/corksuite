/** Types mirroring the cork-api authentication contract (`/api/v1/auth`). */

export type AuthTokens = {
  access: string;
  refresh: string;
};

export type AuthUser = {
  id: string;
  email: string;
  username?: string;
  is_active?: boolean;
  is_verified?: boolean;
};

export type AuthProfile = {
  id: string;
  display_name: string | null;
  first_name?: string | null;
  last_name?: string | null;
};

export type AuthOrganization = {
  id: string;
  name: string;
  slug: string;
};

/** Shape of the `data` payload returned by register/login. */
export type AuthSession = {
  user: AuthUser;
  profile: AuthProfile;
  organizations: AuthOrganization[];
  current_organization: AuthOrganization | null;
  tokens: AuthTokens;
};

/** Field-keyed validation errors, e.g. `{ email: ["Already in use."] }`. */
export type FieldErrors = Record<string, string[]>;

export type AuthResult =
  | { ok: true; data: AuthSession }
  | { ok: false; message: string; errors?: FieldErrors };

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  email: string;
  password: string;
  displayName?: string;
};
