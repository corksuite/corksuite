import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AnimationWrapper } from "@/components/shared/animation-wrapper";
import { PageContainer } from "@/components/shared/page-container";
import { Button } from "@/components/ui/button";
import { marketingSections, publicRoutes } from "@/config/routes";

export function CTASection() {
  return (
    <section id={marketingSections.about} className="scroll-mt-20 pb-24">
      <PageContainer>
        <AnimationWrapper>
          <div className="relative overflow-hidden rounded-3xl bg-foreground px-6 py-16 text-center sm:px-16 sm:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_0%,color-mix(in_oklch,var(--color-primary)_35%,transparent),transparent)]"
            />
            <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-background text-balance sm:text-4xl">
                Ready to build without switching apps?
              </h2>
              <p className="text-lg leading-8 text-background/70">
                Create your workspace today and bring your team&apos;s projects,
                conversations, and knowledge together.
              </p>
              <Button
                size="lg"
                render={<Link href={publicRoutes.register} />}
                className="h-11 px-6 text-sm"
              >
                Create Workspace
                <ArrowRight data-icon="inline-end" className="size-4" />
              </Button>
            </div>
          </div>
        </AnimationWrapper>
      </PageContainer>
    </section>
  );
}
