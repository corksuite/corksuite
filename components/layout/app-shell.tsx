import Image from "next/image";
import Link from "next/link";

import { brand } from "@/config/brand";
import { workspaceNavigation } from "@/config/routes";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-dvh flex-1 bg-background text-foreground">
      <aside className="hidden w-64 border-r border-border bg-muted/30 px-4 py-5 md:block">
        <Link href="/dashboard" className="flex items-center gap-3">
          <Image
            src={brand.assets.lockup}
            alt={brand.name}
            width={44}
            height={44}
            priority
            className="size-11 rounded-md object-contain"
          />
          <span className="text-lg font-semibold">{brand.name}</span>
        </Link>
        <nav className="mt-8 grid gap-1">
          {workspaceNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center border-b border-border px-4 md:hidden">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src={brand.assets.mark}
              alt={brand.name}
              width={28}
              height={28}
              priority
              className="size-7 rounded-md object-contain"
            />
            <span className="text-base font-semibold">{brand.name}</span>
          </Link>
        </header>
        <main className="flex flex-1">{children}</main>
      </div>
    </div>
  );
}
