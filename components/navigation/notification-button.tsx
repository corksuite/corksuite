"use client";

import Link from "next/link";
import { Bell, CheckCheck } from "lucide-react";

import { workspaceRoutes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NotificationItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
};

// Placeholder feed — replaced by the notifications service later.
const PLACEHOLDER: NotificationItem[] = [
  {
    id: "1",
    title: "Project Atlas updated",
    description: "Dana moved 3 tasks to In Review.",
    time: "2m ago",
    unread: true,
  },
  {
    id: "2",
    title: "New comment",
    description: "You were mentioned in “Q3 Roadmap”.",
    time: "1h ago",
    unread: true,
  },
  {
    id: "3",
    title: "Meeting reminder",
    description: "Design sync starts in 30 minutes.",
    time: "3h ago",
    unread: false,
  },
];

export function NotificationButton() {
  const unreadCount = PLACEHOLDER.filter((n) => n.unread).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
          />
        }
      >
        <Bell className="size-4" />
        {unreadCount > 0 ? (
          <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-primary ring-2 ring-background" />
        ) : null}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-80 p-0">
        <div className="flex items-center justify-between px-3 py-2.5">
          <p className="text-sm font-semibold">Notifications</p>
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-md text-xs font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
          >
            <CheckCheck className="size-3.5" />
            Mark all as read
          </button>
        </div>
        <DropdownMenuSeparator className="mx-0 my-0" />

        <div className="max-h-80 overflow-y-auto py-1">
          {PLACEHOLDER.map((item) => (
            <DropdownMenuItem
              key={item.id}
              closeOnClick={false}
              className="items-start gap-3 rounded-none px-3 py-2.5"
            >
              <span
                className={cnDot(item.unread)}
                aria-hidden
              />
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-medium text-foreground">
                    {item.title}
                  </span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {item.time}
                  </span>
                </span>
                <span className="line-clamp-2 text-xs text-muted-foreground">
                  {item.description}
                </span>
              </span>
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator className="mx-0 my-0" />
        <div className="p-1">
          <DropdownMenuItem
            render={<Link href={workspaceRoutes.notifications} />}
            className="justify-center text-sm font-medium text-primary"
          >
            See all
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function cnDot(unread: boolean): string {
  return unread
    ? "mt-1.5 size-2 shrink-0 rounded-full bg-primary"
    : "mt-1.5 size-2 shrink-0 rounded-full bg-transparent";
}
