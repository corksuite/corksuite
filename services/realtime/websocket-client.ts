import { environment } from "@/config/environment";

export function createWorkspaceSocket(path: string, token?: string) {
  const url = new URL(`${environment.websocketBaseUrl}${path}`);

  if (token) {
    url.searchParams.set("token", token);
  }

  return new WebSocket(url);
}
