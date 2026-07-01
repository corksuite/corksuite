import Link from "next/link";
import { Boxes, ShieldCheck, Sparkles } from "lucide-react";

import { Logo, LogoMark } from "@/components/shared/logo";
import { brand } from "@/config/brand";
import { publicRoutes } from "@/config/routes";

const benefits = [
  {
    icon: Boxes,
    title: "One workspace for everything",
    description: "Projects, tasks, chat, and documents—without the app-switching.",
  },
  {
    icon: Sparkles,
    title: "AI-powered productivity",
    description: "Summarize, draft, and automate work so your team moves faster.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-grade security",
    description: "RBAC, encryption, and audit logs with privacy-first defaults.",
  },
];

/**
 * Split-screen auth layout: a branded value-proposition panel on the left and
 * the authentication card on the right. The left panel is hidden on mobile.
 */
export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh w-full lg:grid-cols-2">
      {/* Brand panel */}
      <aside className="relative hidden overflow-hidden bg-foreground p-10 text-background lg:flex lg:flex-col lg:justify-between">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_0%,color-mix(in_oklch,var(--color-primary)_30%,transparent),transparent)]"
        />
        <div className="relative">
          <Link
            href={publicRoutes.home}
            className="inline-flex items-center gap-2.5"
          >
            <LogoMark className="size-9 text-background" />
            <span className="font-heading text-lg font-semibold">
              {brand.shortName}
            </span>
          </Link>
        </div>

        <div className="relative max-w-md">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance">
            Everything your organization needs, in one intelligent workspace.
          </h2>
          <ul className="mt-10 flex flex-col gap-6">
            {benefits.map((benefit) => (
              <li key={benefit.title} className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-background/10 text-background">
                  <benefit.icon className="size-5" />
                </span>
                <div className="space-y-1">
                  <p className="font-medium">{benefit.title}</p>
                  <p className="text-sm leading-6 text-background/70">
                    {benefit.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-sm text-background/50">
          &copy; {new Date().getFullYear()} Cork. Trusted by teams that value focus.
        </p>
      </aside>

      {/* Auth card */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-10">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Logo size="md" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
