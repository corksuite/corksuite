import type { FieldErrors } from "@/modules/auth/types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value);
}

/** Return the first error message for a field, if any. */
export function firstError(
  errors: FieldErrors | undefined,
  key: string,
): string | undefined {
  const messages = errors?.[key];
  return messages && messages.length > 0 ? messages[0] : undefined;
}

export function passwordIssues(password: string): string[] {
  const issues: string[] = [];
  if (password.length < 8) issues.push("At least 8 characters");
  if (!/[A-Za-z]/.test(password)) issues.push("At least one letter");
  if (!/\d/.test(password)) issues.push("At least one number");
  return issues;
}
