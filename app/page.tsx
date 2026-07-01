import type { Metadata } from "next";

import { AISection } from "@/components/landing/ai-section";
import { CTASection } from "@/components/landing/cta-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { Navbar } from "@/components/landing/navbar";
import { SecuritySection } from "@/components/landing/security-section";

export const metadata: Metadata = {
  title: "One workspace. Every workflow.",
  description:
    "Plan projects, collaborate with your team, manage documents, and execute faster with AI—all inside one secure platform.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturesSection />
        <AISection />
        <SecuritySection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
