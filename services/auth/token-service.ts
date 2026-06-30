export type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

export const tokenStorageKeys = {
  accessToken: "corksuite.access-token",
  refreshToken: "corksuite.refresh-token",
} as const;
