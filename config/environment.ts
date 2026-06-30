export const environment = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api",
  websocketBaseUrl:
    process.env.NEXT_PUBLIC_WS_BASE_URL ?? "ws://localhost:8000/ws",
} as const;
