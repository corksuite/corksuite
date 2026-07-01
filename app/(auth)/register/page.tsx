import type { Metadata } from "next";

import { AuthShell, RegisterForm } from "@/modules/auth";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create your Cork workspace.",
};

export default function RegisterPage() {
  return (
    <AuthShell>
      <RegisterForm />
    </AuthShell>
  );
}
