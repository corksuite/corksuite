import type { NavigationItem } from "@/types/navigation";

export const publicRoutes = {
  home: "/",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
} as const;

export const workspaceRoutes = {
  dashboard: "/dashboard",
  organizations: "/organizations",
  identity: "/identity",
  projects: "/projects",
  tasks: "/tasks",
  documents: "/documents",
  chat: "/chat",
  huddles: "/huddles",
  notifications: "/notifications",
  ai: "/ai",
} as const;

export const workspaceNavigation: NavigationItem[] = [
  { label: "Dashboard", href: workspaceRoutes.dashboard },
  { label: "Organizations", href: workspaceRoutes.organizations },
  { label: "Identity", href: workspaceRoutes.identity },
  { label: "Projects", href: workspaceRoutes.projects },
  { label: "Tasks", href: workspaceRoutes.tasks },
  { label: "Documents", href: workspaceRoutes.documents },
  { label: "Chat", href: workspaceRoutes.chat },
  { label: "Huddles", href: workspaceRoutes.huddles },
  { label: "Notifications", href: workspaceRoutes.notifications },
  { label: "AI", href: workspaceRoutes.ai },
];
