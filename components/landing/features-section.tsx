import { FolderKanban, MessagesSquare, Library } from "lucide-react";

import { FeatureCard, type FeatureCardProps } from "@/components/landing/feature-card";
import { AnimationWrapper } from "@/components/shared/animation-wrapper";
import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { marketingSections } from "@/config/routes";

const features: FeatureCardProps[] = [
  {
    icon: FolderKanban,
    title: "Project Management",
    description:
      "Plan, track, and ship work with flexible views built for how teams actually operate.",
    items: ["Kanban boards", "Timeline & roadmap", "Tasks & subtasks", "Planning"],
  },
  {
    icon: MessagesSquare,
    title: "Communication",
    description:
      "Keep conversations next to the work, so context is never lost between tools.",
    items: ["Channels", "Huddles", "Team messaging", "Notifications"],
  },
  {
    icon: Library,
    title: "Knowledge & Documents",
    description:
      "A secure home for your organization's knowledge, searchable and always in sync.",
    items: ["Secure documents", "AI search", "Permissions", "Version history"],
  },
];

export function FeaturesSection() {
  return (
    <Section id={marketingSections.features} className="scroll-mt-20">
      <SectionHeader
        eyebrow="Everything in one place"
        title="Replace a dozen tools with one workspace"
        description="Cork brings projects, communication, and knowledge together—so your team stops switching apps and starts executing."
      />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {features.map((feature, index) => (
          <AnimationWrapper key={feature.title} delay={index * 100}>
            <FeatureCard {...feature} />
          </AnimationWrapper>
        ))}
      </div>
    </Section>
  );
}
