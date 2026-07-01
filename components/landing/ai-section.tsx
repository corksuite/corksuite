import { ArrowUp, Sparkles } from "lucide-react";

import { AnimationWrapper } from "@/components/shared/animation-wrapper";
import { Section } from "@/components/shared/section";
import { Badge } from "@/components/ui/badge";
import { LogoMark } from "@/components/shared/logo";
import { marketingSections } from "@/config/routes";
import { cn } from "@/lib/utils";

const conversation = [
  {
    role: "user" as const,
    text: "Summarize yesterday's planning meeting and turn the decisions into tasks.",
  },
  {
    role: "assistant" as const,
    text: "Here's a summary with 3 decisions. I've drafted 5 tasks in the Q3 Launch project and assigned owners based on the discussion.",
  },
];

function ChatBubble({
  role,
  text,
}: {
  role: "user" | "assistant";
  text: string;
}) {
  const isAssistant = role === "assistant";
  return (
    <div className={cn("flex gap-3", isAssistant ? "" : "flex-row-reverse")}>
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-lg",
          isAssistant
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground",
        )}
      >
        {isAssistant ? (
          <Sparkles className="size-4" />
        ) : (
          <span className="text-xs font-semibold">You</span>
        )}
      </span>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6",
          isAssistant
            ? "rounded-tl-sm bg-muted text-foreground"
            : "rounded-tr-sm bg-primary text-primary-foreground",
        )}
      >
        {text}
      </div>
    </div>
  );
}

export function AISection() {
  return (
    <Section
      id={marketingSections.solutions}
      className="scroll-mt-20 bg-foreground text-background"
      contained={false}
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-8">
        <AnimationWrapper className="flex flex-col gap-6">
          <Badge className="w-fit gap-1.5 border-transparent bg-background/10 text-background">
            <Sparkles className="size-3" />
            Cork AI
          </Badge>
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Think.
            <br />
            Plan.
            <br />
            <span className="text-primary-foreground/60">Execute.</span>
          </h2>
          <p className="max-w-lg text-lg leading-8 text-background/70 text-pretty">
            Use AI to summarize meetings, draft documents, organize projects,
            automate repetitive work, and accelerate execution.
          </p>
          <ul className="grid gap-3 pt-2 text-sm text-background/80 sm:grid-cols-2">
            {[
              "Summarize meetings",
              "Draft documents",
              "Organize projects",
              "Automate busywork",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <span className="flex size-5 items-center justify-center rounded-full bg-primary/25 text-primary-foreground">
                  <Sparkles className="size-2.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </AnimationWrapper>

        <AnimationWrapper delay={120}>
          <div className="rounded-2xl border border-background/10 bg-background/[0.04] p-4 shadow-2xl backdrop-blur">
            <div className="flex items-center gap-2 border-b border-background/10 pb-3">
              <LogoMark className="size-6 text-background" />
              <span className="text-sm font-medium text-background">
                Cork Assistant
              </span>
              <span className="ml-auto flex items-center gap-1.5 text-xs text-background/60">
                <span className="size-1.5 rounded-full bg-success" />
                Online
              </span>
            </div>
            <div className="flex flex-col gap-4 py-5">
              {conversation.map((message) => (
                <ChatBubble key={message.role} {...message} />
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-background/10 bg-background/5 px-3 py-2">
              <span className="flex-1 text-sm text-background/50">
                Ask Cork to plan your week…
              </span>
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <ArrowUp className="size-4" />
              </span>
            </div>
          </div>
        </AnimationWrapper>
      </div>
    </Section>
  );
}
