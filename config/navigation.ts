import {
  Calendar,
  CalendarPlus,
  FilePlus,
  FileText,
  FolderKanban,
  FolderPlus,
  Home,
  Inbox,
  KeyRound,
  ListChecks,
  MessageSquare,
  ScrollText,
  Settings,
  ShieldCheck,
  Sparkles,
  UserPlus,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import type { Permission } from "@/hooks/use-permissions";
import { adminRoutes, workspaceRoutes } from "@/config/routes";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type NavSection = {
  id: string;
  /** Optional heading shown above the group (hidden when the rail is collapsed). */
  label?: string;
  items: NavItem[];
  /** When set, the section only renders if the user holds this permission. */
  requiresPermission?: Permission;
};

/**
 * Primary sidebar navigation. Ordered by section as the shell renders them:
 * primary → workspace → administration (permission-gated). Settings is pinned
 * separately at the very bottom of the rail.
 */
export const primarySection: NavSection = {
  id: "primary",
  items: [
    { label: "Home", href: workspaceRoutes.dashboard, icon: Home },
    { label: "Inbox", href: workspaceRoutes.inbox, icon: Inbox },
    { label: "AI", href: workspaceRoutes.ai, icon: Sparkles },
  ],
};

export const workspaceSection: NavSection = {
  id: "workspace",
  label: "Workspace",
  items: [
    { label: "Projects", href: workspaceRoutes.projects, icon: FolderKanban },
    { label: "Tasks", href: workspaceRoutes.tasks, icon: ListChecks },
    { label: "Calendar", href: workspaceRoutes.calendar, icon: Calendar },
    { label: "Documents", href: workspaceRoutes.documents, icon: FileText },
    { label: "Chat", href: workspaceRoutes.chat, icon: MessageSquare },
  ],
};

export const adminSection: NavSection = {
  id: "administration",
  label: "Administration",
  requiresPermission: "admin.access",
  items: [
    { label: "Users", href: adminRoutes.users, icon: Users },
    { label: "Teams", href: adminRoutes.teams, icon: UsersRound },
    { label: "Roles", href: adminRoutes.roles, icon: ShieldCheck },
    { label: "Permissions", href: adminRoutes.permissions, icon: KeyRound },
    { label: "Audit Logs", href: adminRoutes.auditLogs, icon: ScrollText },
  ],
};

export const sidebarSections: NavSection[] = [
  primarySection,
  workspaceSection,
  adminSection,
];

export const settingsItem: NavItem = {
  label: "Settings",
  href: workspaceRoutes.settings,
  icon: Settings,
};

/** Actions surfaced by the header "Create" menu. Placeholder handlers for now. */
export type CreateAction = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export const createActions: CreateAction[] = [
  { id: "project", label: "New Project", icon: FolderPlus },
  { id: "task", label: "New Task", icon: ListChecks },
  { id: "document", label: "New Document", icon: FilePlus },
  { id: "meeting", label: "New Meeting", icon: CalendarPlus },
  { id: "invite", label: "Invite User", icon: UserPlus },
];

/** Placeholder organizations until the API-backed org service is wired up. */
export type OrganizationOption = {
  id: string;
  name: string;
  plan: string;
};

export const placeholderOrganizations: OrganizationOption[] = [
  { id: "acme", name: "Acme Inc", plan: "Business" },
  { id: "personal", name: "Personal", plan: "Free" },
  { id: "marketing", name: "Marketing", plan: "Team" },
  { id: "engineering", name: "Engineering", plan: "Team" },
];
