import {
  Activity,
  Bell,
  Calendar,
  CheckSquare,
  FileText,
  FolderKanban,
  Home,
  MessageSquare,
  Search,
  Settings,
  Sparkles,
} from "lucide-react";

import { LogoMark } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

const railIcons = [Home, FolderKanban, CheckSquare, MessageSquare, FileText];

function PanelCard({
  title,
  icon: Icon,
  accent,
  children,
  className,
}: {
  title: string;
  icon: typeof Home;
  accent?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-border bg-card p-3.5",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "flex size-6 items-center justify-center rounded-md",
            accent
              ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground",
          )}
        >
          <Icon className="size-3.5" />
        </span>
        <span className="text-xs font-medium text-foreground">{title}</span>
      </div>
      {children}
    </div>
  );
}

function Bar({ width, tone = "muted" }: { width: string; tone?: "muted" | "brand" | "success" }) {
  const toneClass =
    tone === "brand"
      ? "bg-primary"
      : tone === "success"
        ? "bg-success"
        : "bg-muted-foreground/25";
  return (
    <span className={cn("block h-1.5 rounded-full", toneClass)} style={{ width }} />
  );
}

/**
 * Realistic in-product dashboard mock used as the hero visual. Composed purely
 * of styled primitives (no screenshot) so it stays crisp and theme-aware.
 */
export function DashboardPreview({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      {/* Soft ambient glow behind the frame */}
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 rounded-[2rem] bg-primary/10 blur-3xl"
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-foreground/10 ring-1 ring-foreground/5">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-destructive/40" />
            <span className="size-2.5 rounded-full bg-warning/50" />
            <span className="size-2.5 rounded-full bg-success/50" />
          </div>
          <div className="mx-auto flex items-center gap-2 rounded-md bg-background px-3 py-1 text-[10px] text-muted-foreground ring-1 ring-border">
            <Search className="size-3" />
            app.cork.io/workspace
          </div>
          <Bell className="size-3.5 text-muted-foreground" />
        </div>

        <div className="flex">
          {/* Icon rail */}
          <div className="hidden w-12 flex-col items-center gap-4 border-r border-border bg-muted/30 py-4 sm:flex">
            <LogoMark className="size-6" />
            <div className="flex flex-col gap-3">
              {railIcons.map((Icon, index) => (
                <span
                  key={index}
                  className={cn(
                    "flex size-7 items-center justify-center rounded-lg",
                    index === 0
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  <Icon className="size-4" />
                </span>
              ))}
            </div>
            <Settings className="mt-auto size-4 text-muted-foreground" />
          </div>

          {/* Main content grid */}
          <div className="flex-1 space-y-3 p-3.5">
            <div className="flex items-center justify-between">
              <div className="space-y-1.5">
                <div className="h-2.5 w-28 rounded-full bg-foreground/80" />
                <div className="h-2 w-20 rounded-full bg-muted-foreground/30" />
              </div>
              <span className="rounded-md bg-primary px-2.5 py-1 text-[10px] font-medium text-primary-foreground">
                New project
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <PanelCard title="Projects" icon={FolderKanban} accent>
                <div className="space-y-2">
                  <Bar width="80%" tone="brand" />
                  <Bar width="55%" />
                  <Bar width="65%" />
                </div>
              </PanelCard>

              <PanelCard title="Tasks" icon={CheckSquare}>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="size-3 rounded-[4px] border border-success bg-success/20" />
                    <Bar width="70%" tone="success" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="size-3 rounded-[4px] border border-muted-foreground/40" />
                    <Bar width="50%" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="size-3 rounded-[4px] border border-muted-foreground/40" />
                    <Bar width="60%" />
                  </div>
                </div>
              </PanelCard>

              <PanelCard title="Chat" icon={MessageSquare}>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-[8px] font-semibold text-primary">
                      AK
                    </span>
                    <span className="h-4 flex-1 rounded-lg rounded-tl-none bg-muted" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex size-5 items-center justify-center rounded-full bg-success/15 text-[8px] font-semibold text-success">
                      MR
                    </span>
                    <span className="h-4 w-3/4 rounded-lg rounded-tl-none bg-muted" />
                  </div>
                </div>
              </PanelCard>

              <PanelCard title="Documents" icon={FileText}>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="size-3 text-muted-foreground" />
                    <Bar width="75%" />
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="size-3 text-muted-foreground" />
                    <Bar width="60%" />
                  </div>
                </div>
              </PanelCard>

              <PanelCard title="AI Assistant" icon={Sparkles} accent className="col-span-2">
                <div className="flex items-start gap-2.5 rounded-lg bg-primary/5 p-2.5">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <Sparkles className="size-3.5" />
                  </span>
                  <div className="flex-1 space-y-1.5 pt-0.5">
                    <Bar width="90%" />
                    <Bar width="70%" />
                  </div>
                </div>
              </PanelCard>

              <PanelCard title="Calendar" icon={Calendar}>
                <div className="grid grid-cols-4 gap-1">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <span
                      key={index}
                      className={cn(
                        "h-4 rounded-[4px]",
                        index === 2 || index === 5
                          ? "bg-primary/25"
                          : "bg-muted",
                      )}
                    />
                  ))}
                </div>
              </PanelCard>

              <PanelCard title="Activity" icon={Activity}>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary" />
                    <Bar width="65%" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-success" />
                    <Bar width="80%" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-warning" />
                    <Bar width="45%" />
                  </div>
                </div>
              </PanelCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
