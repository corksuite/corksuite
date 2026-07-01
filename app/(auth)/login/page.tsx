import type { Metadata } from "next";

import { AuthShell, LoginForm } from "@/modules/auth";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Cork workspace.",
};

export default function LoginPage() {
  return (
    <AuthShell>
      <LoginForm />
    </AuthShell>
  );
}
