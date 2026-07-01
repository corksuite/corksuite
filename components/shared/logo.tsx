import Link from "next/link";

import { brand } from "@/config/brand";
import { cn } from "@/lib/utils";

type LogoSize = "sm" | "md" | "lg";

const markSizes: Record<LogoSize, string> = {
  sm: "size-7",
  md: "size-9",
  lg: "size-11",
};

const wordmarkSizes: Record<LogoSize, string> = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-xl",
};

/**
 * Cork brand mark rendered as inline SVG so it stays crisp and inherits
 * theme colors: a midnight circular "C", a center dot, and an electric-blue
 * branching arrow representing connection and forward execution.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      role="img"
      aria-hidden="true"
      className={cn("text-foreground", className)}
    >
      <rect width="40" height="40" rx="10" className="fill-foreground/[0.04]" />
      <path
        d="M29 11 A13 13 0 1 1 29 29"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <circle cx="20" cy="20" r="2.6" fill="currentColor" />
      <path
        d="M20 20 L29 11"
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.5 11 L29 11 L29 15.5"
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type LogoProps = {
  href?: string | null;
  size?: LogoSize;
  showWordmark?: boolean;
  className?: string;
};

export function Logo({
  href = "/",
  size = "md",
  showWordmark = true,
  className,
}: LogoProps) {
  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={markSizes[size]} />
      {showWordmark ? (
        <span
          className={cn(
            "font-heading font-semibold tracking-tight text-foreground",
            wordmarkSizes[size],
          )}
        >
          {brand.shortName}
        </span>
      ) : null}
    </span>
  );

  if (!href) {
    return content;
  }

  return (
    <Link
      href={href}
      aria-label={brand.name}
      className="inline-flex rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      {content}
    </Link>
  );
}
