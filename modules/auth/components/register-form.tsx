"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";

import { AuthField } from "@/modules/auth/components/auth-field";
import { SocialButtons } from "@/modules/auth/components/social-buttons";
import { registerUser } from "@/modules/auth/api/auth-api";
import { persistSession } from "@/modules/auth/services/session";
import type { FieldErrors } from "@/modules/auth/types";
import { firstError, isValidEmail, passwordIssues } from "@/modules/auth/utils/form";
import { Button } from "@/components/ui/button";
import { publicRoutes, workspaceRoutes } from "@/config/routes";

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [errors, setErrors] = React.useState<FieldErrors>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setErrors({});

    const data = new FormData(event.currentTarget);
    const fullName = String(data.get("fullName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const confirmPassword = String(data.get("confirmPassword") ?? "");

    const nextErrors: FieldErrors = {};
    if (!fullName) nextErrors.fullName = ["Enter your full name."];
    if (!isValidEmail(email)) nextErrors.email = ["Enter a valid email address."];

    const pwIssues = passwordIssues(password);
    if (pwIssues.length > 0) nextErrors.password = [pwIssues.join(", ") + "."];
    if (password && confirmPassword !== password) {
      nextErrors.confirmPassword = ["Passwords do not match."];
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);
    const result = await registerUser({ email, password, displayName: fullName });
    setLoading(false);

    if (result.ok) {
      persistSession(result.data);
      router.push(workspaceRoutes.dashboard);
      return;
    }

    // Surface the API's display_name errors under the full-name field.
    const mapped = { ...(result.errors ?? {}) };
    if (mapped.display_name) mapped.fullName = mapped.display_name;
    setErrors(mapped);
    setFormError(
      firstError(result.errors, "non_field_errors") ?? result.message,
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Create your workspace
        </h1>
        <p className="text-sm text-muted-foreground">
          Start bringing your team&apos;s work together in one place.
        </p>
      </div>

      {formError ? (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span>{formError}</span>
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        <AuthField
          id="fullName"
          name="fullName"
          label="Full Name"
          placeholder="Ada Lovelace"
          autoComplete="name"
          autoFocus
          error={firstError(errors, "fullName")}
        />

        <AuthField
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="you@company.com"
          autoComplete="email"
          error={firstError(errors, "email")}
        />

        <AuthField
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          label="Password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          error={firstError(errors, "password")}
          endAdornment={
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((value) => !value)}
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </Button>
          }
        />

        <AuthField
          id="confirmPassword"
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          label="Confirm Password"
          placeholder="Re-enter your password"
          autoComplete="new-password"
          error={firstError(errors, "confirmPassword")}
        />

        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="mt-1 h-10 w-full"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : null}
          {loading ? "Creating account…" : "Create Account"}
        </Button>
      </form>

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or continue with</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <SocialButtons />

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href={publicRoutes.login}
          className="font-medium text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
