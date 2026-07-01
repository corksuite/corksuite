"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, MailCheck } from "lucide-react";

import { AuthField } from "@/modules/auth/components/auth-field";
import { firstError, isValidEmail } from "@/modules/auth/utils/form";
import type { FieldErrors } from "@/modules/auth/types";
import { Button } from "@/components/ui/button";
import { publicRoutes } from "@/config/routes";

export function ForgotPasswordForm() {
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [errors, setErrors] = React.useState<FieldErrors>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});

    if (!isValidEmail(email.trim())) {
      setErrors({ email: ["Enter a valid email address."] });
      return;
    }

    // NOTE: the cork-api does not yet expose a password-reset endpoint. We
    // optimistically show a confirmation; wire this to the real endpoint once
    // it exists. We never reveal whether an account matches the address.
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col gap-6 text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-success/10 text-success">
          <MailCheck className="size-6" />
        </span>
        <div className="space-y-2">
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
            Check your inbox
          </h1>
          <p className="text-sm text-muted-foreground">
            If an account exists for{" "}
            <span className="font-medium text-foreground">{email}</span>, we&apos;ve
            sent a link to reset your password.
          </p>
        </div>
        <Button
          variant="outline"
          size="lg"
          className="h-10 w-full"
          render={<Link href={publicRoutes.login} />}
        >
          <ArrowLeft data-icon="inline-start" className="size-4" />
          Back to sign in
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Reset your password
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter the email associated with your account and we&apos;ll send you a
          reset link.
        </p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        <AuthField
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="you@company.com"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={firstError(errors, "email")}
        />
        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="h-10 w-full"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : null}
          {loading ? "Sending…" : "Send reset link"}
        </Button>
      </form>

      <Link
        href={publicRoutes.login}
        className="mx-auto flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to sign in
      </Link>
    </div>
  );
}
