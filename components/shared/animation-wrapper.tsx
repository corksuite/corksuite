"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type AnimationWrapperProps = React.ComponentProps<"div"> & {
  /** Delay in ms before the reveal transition starts once in view. */
  delay?: number;
};

/**
 * Subtle reveal-on-scroll wrapper. Uses IntersectionObserver + CSS transitions
 * (no animation library) to fade and lift content into view once, respecting
 * users who prefer reduced motion.
 */
export function AnimationWrapper({
  className,
  delay = 0,
  style,
  children,
  ...props
}: AnimationWrapperProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      // Reveal immediately without animation; defer the state update so it
      // isn't applied synchronously inside the effect body.
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms", ...style }}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none",
        visible
          ? "translate-y-0 opacity-100 blur-0"
          : "translate-y-4 opacity-0 blur-[2px]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
