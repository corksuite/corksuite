"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Logo } from "@/components/shared/logo";
import { PageContainer } from "@/components/shared/page-container";
import { Button } from "@/components/ui/button";
import {
  NotificationButton,
  ThemeToggle,
  UserMenu,
} from "@/components/navigation";
import { useAuth } from "@/contexts/auth-context";
import {
  marketingNavigation,
  publicRoutes,
  workspaceRoutes,
} from "@/config/routes";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { isAuthenticated, isLoading } = useAuth();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-200",
        scrolled || open
          ? "border-border bg-background/80 backdrop-blur-md"
          : "border-transparent bg-background/0",
      )}
    >
      <PageContainer>
        <nav className="flex h-16 items-center justify-between gap-4">
          <Logo size="md" />

          <div className="hidden items-center gap-1 md:flex">
            {marketingNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-1.5 md:flex">
            {isLoading ? (
              // Reserve space during the initial auth read to avoid layout shift.
              <div aria-hidden className="h-9 w-40" />
            ) : isAuthenticated ? (
              <>
                <NotificationButton />
                <ThemeToggle />
                <UserMenu />
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="lg"
                  render={<Link href={publicRoutes.login} />}
                >
                  Sign In
                </Button>
                <Button size="lg" render={<Link href={publicRoutes.register} />}>
                  Get Started
                </Button>
              </>
            )}
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="flex size-9 items-center justify-center rounded-lg text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </PageContainer>

      {open ? (
        <div className="border-t border-border bg-background md:hidden">
          <PageContainer className="flex flex-col gap-1 py-4">
            {marketingNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              {isAuthenticated ? (
                <div className="flex items-center justify-between gap-2">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    render={
                      <Link
                        href={workspaceRoutes.dashboard}
                        onClick={() => setOpen(false)}
                      />
                    }
                  >
                    Go to workspace
                  </Button>
                  <ThemeToggle />
                  <UserMenu />
                </div>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    render={
                      <Link
                        href={publicRoutes.login}
                        onClick={() => setOpen(false)}
                      />
                    }
                  >
                    Sign In
                  </Button>
                  <Button
                    size="lg"
                    className="w-full"
                    render={
                      <Link
                        href={publicRoutes.register}
                        onClick={() => setOpen(false)}
                      />
                    }
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </PageContainer>
        </div>
      ) : null}
    </header>
  );
}
