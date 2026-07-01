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

/** In-page anchors used by the marketing landing page and navbar. */
export const marketingSections = {
  features: "features",
  solutions: "solutions",
  security: "security",
  about: "about",
} as const;

export const marketingNavigation: NavigationItem[] = [
  { label: "Features", href: `#${marketingSections.features}` },
  { label: "Solutions", href: `#${marketingSections.solutions}` },
  { label: "Security", href: `#${marketingSections.security}` },
  { label: "About", href: `#${marketingSections.about}` },
];

export type FooterColumn = {
  title: string;
  links: NavigationItem[];
};

export const footerNavigation: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: `#${marketingSections.features}` },
      { label: "Solutions", href: `#${marketingSections.solutions}` },
      { label: "Security", href: `#${marketingSections.security}` },
      { label: "Get Started", href: publicRoutes.register },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: `#${marketingSections.about}` },
      { label: "Changelog", href: `#${marketingSections.about}` },
      { label: "Support", href: `#${marketingSections.about}` },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: `#${marketingSections.about}` },
      { label: "Privacy", href: `#${marketingSections.about}` },
      { label: "Terms", href: `#${marketingSections.about}` },
    ],
  },
];
