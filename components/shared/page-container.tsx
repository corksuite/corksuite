import { cn } from "@/lib/utils";

type PageContainerProps = React.ComponentProps<"div">;

/**
 * Centered, width-constrained horizontal container used across marketing and
 * auth surfaces to keep content aligned to a consistent measure.
 */
export function PageContainer({ className, ...props }: PageContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-6 lg:px-8", className)}
      {...props}
    />
  );
}
