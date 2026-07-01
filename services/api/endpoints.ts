export const apiEndpoints = {
  identity: "/identity",
  auth: {
    register: "/v1/auth/register",
    login: "/v1/auth/login",
    logout: "/v1/auth/logout",
    refresh: "/v1/auth/token/refresh",
    me: "/v1/auth/me",
  },
} as const;
