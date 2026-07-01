"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";

import { useAuth } from "@/contexts/auth-context";
import { placeholderOrganizations } from "@/config/navigation";
import { cn, getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type OrganizationSwitcherProps = {
  /** Icon-only trigger for the collapsed sidebar rail. */
  collapsed?: boolean;
};

function OrgMark({ name }: { name: string }) {
  return (
    <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-semibold text-primary">
      {getInitials(name)}
    </span>
  );
}

export function OrganizationSwitcher({
  collapsed = false,
}: OrganizationSwitcherProps) {
  const { currentOrganization } = useAuth();

  // Seed selection from the session, falling back to the first placeholder org.
  const [selectedId, setSelectedId] = React.useState(
    () => currentOrganization?.id ?? placeholderOrganizations[0]?.id ?? "",
  );

  const organizations = React.useMemo(() => {
    if (
      currentOrganization &&
      !placeholderOrganizations.some((org) => org.id === currentOrganization.id)
    ) {
      return [
        { id: currentOrganization.id, name: currentOrganization.name, plan: "" },
        ...placeholderOrganizations,
      ];
    }
    return placeholderOrganizations;
  }, [currentOrganization]);

  const active =
    organizations.find((org) => org.id === selectedId) ?? organizations[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            aria-label="Switch organization"
            className={cn(
              "h-auto py-1.5",
              collapsed
                ? "w-full justify-center px-0"
                : "w-full justify-start gap-2 px-2",
            )}
          />
        }
      >
        <OrgMark name={active?.name ?? "Cork"} />
        {!collapsed ? (
          <>
            <span className="flex min-w-0 flex-1 flex-col text-left">
              <span className="truncate text-sm font-semibold text-foreground">
                {active?.name}
              </span>
              {active?.plan ? (
                <span className="truncate text-xs text-muted-foreground">
                  {active.plan}
                </span>
              ) : null}
            </span>
            <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
          </>
        ) : null}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="min-w-64"
        side={collapsed ? "right" : "bottom"}
      >
        <DropdownMenuLabel>Organizations</DropdownMenuLabel>
        {organizations.map((org) => (
          <DropdownMenuItem
            key={org.id}
            onClick={() => setSelectedId(org.id)}
            closeOnClick
          >
            <OrgMark name={org.name} />
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="truncate font-medium">{org.name}</span>
              {org.plan ? (
                <span className="truncate text-xs text-muted-foreground">
                  {org.plan}
                </span>
              ) : null}
            </span>
            {org.id === active?.id ? (
              <Check className="size-4 text-primary" />
            ) : null}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Plus />
          Create Organization
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
