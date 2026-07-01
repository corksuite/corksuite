import {
  FileClock,
  Fingerprint,
  KeyRound,
  Lock,
  ServerCog,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { AnimationWrapper } from "@/components/shared/animation-wrapper";
import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { marketingSections } from "@/config/routes";

type SecurityItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const items: SecurityItem[] = [
  {
    icon: KeyRound,
    title: "RBAC",
    description:
      "Scoped, auditable roles and permissions built around your organization.",
  },
  {
    icon: Lock,
    title: "Encryption",
    description: "Data encrypted in transit and at rest with modern standards.",
  },
  {
    icon: Fingerprint,
    title: "Privacy",
    description: "Privacy-first defaults. Your data is never used to train models.",
  },
  {
    icon: ServerCog,
    title: "Data Sovereignty",
    description:
      "Cloud, self-hosted, or enterprise deployments—your data, your rules.",
  },
  {
    icon: FileClock,
    title: "Audit Logs",
    description: "Every action is traceable with a complete, exportable history.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description: "SSO, MFA, and passkeys with enterprise-grade controls.",
  },
];

export function SecuritySection() {
  return (
    <Section id={marketingSections.security} className="scroll-mt-20">
      <SectionHeader
        eyebrow="Security & Privacy"
        title="Your organization's knowledge stays yours"
        description="Cork is built privacy-first, with the controls and guarantees enterprises require and every team deserves."
      />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <AnimationWrapper key={item.title} delay={(index % 3) * 90}>
            <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/15">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <item.icon className="size-5" />
              </span>
              <h3 className="mt-1 font-heading text-base font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
            </div>
          </AnimationWrapper>
        ))}
      </div>
    </Section>
  );
}
