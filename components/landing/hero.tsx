import Link from "next/link";
import { ArrowRight, PlayCircle, ShieldCheck } from "lucide-react";

import { DashboardPreview } from "@/components/landing/dashboard-preview";
import { AnimationWrapper } from "@/components/shared/animation-wrapper";
import { PageContainer } from "@/components/shared/page-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { publicRoutes } from "@/config/routes";

/**
 * Landing hero: value proposition and primary CTAs on the left, a realistic
 * product preview on the right.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
      {/* Ambient background wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,color-mix(in_oklch,var(--color-primary)_12%,transparent),transparent)]"
      />
      <PageContainer>
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div className="flex flex-col items-start gap-7">
            <AnimationWrapper>
              <Badge variant="outline" className="gap-1.5 py-1 pl-1.5">
                <span className="flex size-4 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <ShieldCheck className="size-2.5" />
                </span>
                One secure workspace for your whole org
              </Badge>
            </AnimationWrapper>

            <AnimationWrapper delay={60}>
              <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
                One workspace.
                <br />
                <span className="text-primary">Every workflow.</span>
              </h1>
            </AnimationWrapper>

            <AnimationWrapper delay={120}>
              <p className="max-w-xl text-lg leading-8 text-muted-foreground text-pretty">
                Plan projects, collaborate with your team, manage documents, and
                execute faster with AI—all inside one secure platform.
              </p>
            </AnimationWrapper>

            <AnimationWrapper delay={180}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  size="lg"
                  render={<Link href={publicRoutes.register} />}
                  className="h-11 px-5 text-sm"
                >
                  Get Started
                  <ArrowRight data-icon="inline-end" className="size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  render={<Link href="#solutions" />}
                  className="h-11 px-5 text-sm"
                >
                  <PlayCircle data-icon="inline-start" className="size-4" />
                  View Demo
                </Button>
              </div>
            </AnimationWrapper>

            <AnimationWrapper delay={240}>
              <dl className="flex flex-wrap gap-x-8 gap-y-3 pt-2">
                {[
                  { value: "1", label: "Unified workspace" },
                  { value: "10x", label: "Faster execution" },
                  { value: "SOC 2", label: "Enterprise ready" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <dt className="font-heading text-xl font-semibold text-foreground">
                      {stat.value}
                    </dt>
                    <dd className="text-sm text-muted-foreground">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </AnimationWrapper>
          </div>

          <AnimationWrapper delay={160} className="w-full">
            <DashboardPreview />
          </AnimationWrapper>
        </div>
      </PageContainer>
    </section>
  );
}
