"use client";

import { Plus } from "lucide-react";

import { createActions } from "@/config/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function CreateMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button size="lg" aria-label="Create new">
            <Plus className="size-4" />
            <span className="hidden sm:inline">Create</span>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="min-w-52">
        {createActions.map((action) => (
          <DropdownMenuItem key={action.id}>
            <action.icon />
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
