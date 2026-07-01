import { PageContainer } from "@/components/shared/page-container";
import { cn } from "@/lib/utils";

type SectionProps = React.ComponentProps<"section"> & {
  /** When false, children render full-bleed without the centered container. */
  contained?: boolean;
  containerClassName?: string;
};

/**
 * Vertical rhythm wrapper for marketing sections. Applies consistent block
 * padding and (by default) wraps children in a PageContainer.
 */
export function Section({
  className,
  containerClassName,
  contained = true,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-20 sm:py-28", className)} {...props}>
      {contained ? (
        <PageContainer className={containerClassName}>{children}</PageContainer>
      ) : (
        children
      )}
    </section>
  );
}
