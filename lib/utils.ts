import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Derive up to two uppercase initials from a name or email for avatar
 * fallbacks. Falls back to the first character, or "?" when empty.
 */
export function getInitials(value?: string | null): string {
  if (!value) return "?"
  const source = value.includes("@") ? value.split("@")[0] : value
  const parts = source.trim().split(/[\s._-]+/).filter(Boolean)
  if (parts.length === 0) return "?"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}
