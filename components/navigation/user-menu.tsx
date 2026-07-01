"use client";

import Link from "next/link";
import {
  Building2,
  ChevronsUpDown,
  LogOut,
  Settings,
  UserCircle,
} from "lucide-react";

import { useAuth } from "@/contexts/auth-context";
import { workspaceRoutes } from "@/config/routes";
import { getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type UserMenuProps = {
  /** Show name + email next to the avatar (used in the sidebar footer). */
  showDetails?: boolean;
};

export function UserMenu({ showDetails = false }: UserMenuProps) {
  const { user, profile, currentOrganization, signOut } = useAuth();

  const name = profile?.display_name?.trim() || user?.email || "Account";
  const email = user?.email ?? "";

  const avatar = (
    <Avatar className="size-8 bg-primary/10">
      <AvatarFallback className="text-primary">
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          showDetails ? (
            <Button
              variant="ghost"
              className="h-auto w-full justify-start gap-2.5 px-2 py-1.5"
              aria-label="Open account menu"
            />
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Open account menu"
            />
          )
        }
      >
        {avatar}
        {showDetails ? (
          <>
            <span className="flex min-w-0 flex-1 flex-col text-left">
              <span className="truncate text-sm font-medium">{name}</span>
              {email ? (
                <span className="truncate text-xs text-muted-foreground">
                  {email}
                </span>
              ) : null}
            </span>
            <ChevronsUpDown className="size-4 text-muted-foreground" />
          </>
        ) : null}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-64">
        <DropdownMenuLabel className="flex items-center gap-2.5 py-2">
          {avatar}
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium text-foreground">
              {name}
            </span>
            {email ? (
              <span className="truncate text-xs font-normal text-muted-foreground">
                {email}
              </span>
            ) : null}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem render={<Link href={workspaceRoutes.profile} />}>
            <UserCircle />
            My Profile
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href={workspaceRoutes.account} />}>
            <Settings />
            Account Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Building2 />
          <span className="flex min-w-0 flex-col">
            Switch Organization
            {currentOrganization ? (
              <span className="truncate text-xs text-muted-foreground">
                {currentOrganization.name}
              </span>
            ) : null}
          </span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive" onClick={() => signOut()}>
          <LogOut />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
