import { Check, type LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  items: string[];
  className?: string;
};

/**
 * Marketing feature card: an icon badge, a heading, a short description, and a
 * checklist of capabilities. Used in the features grid.
 */
export function FeatureCard({
  icon: Icon,
  title,
  description,
  items,
  className,
}: FeatureCardProps) {
  return (
    <Card
      className={cn(
        "h-full gap-5 p-6 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-foreground/5 hover:ring-foreground/15",
        className,
      )}
    >
      <CardHeader className="p-0">
        <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-5" />
        </span>
        <CardTitle className="mt-4 text-lg">{title}</CardTitle>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="grid gap-2.5">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 text-sm text-foreground/80"
            >
              <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
                <Check className="size-2.5" strokeWidth={3.5} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
