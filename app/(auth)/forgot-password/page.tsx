import type { Metadata } from "next";

import { AuthShell, ForgotPasswordForm } from "@/modules/auth";

export const metadata: Metadata = {
  title: "Reset password",
  description: "Reset your Cork account password.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell>
      <ForgotPasswordForm />
    </AuthShell>
  );
}
