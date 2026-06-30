type ComingSoonProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function ComingSoon({ eyebrow, title, description }: ComingSoonProps) {
  return (
    <section className="flex min-h-dvh flex-1 items-center bg-background px-6 py-10">
      <div className="mx-auto grid w-full max-w-5xl gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
        <div className="space-y-5">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {eyebrow}
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            {description ??
              "This route is part of the frontend architecture scaffold and is ready for its domain implementation."}
          </p>
        </div>
        <div className="border-l border-border pl-6">
          <p className="text-sm font-medium text-foreground">Coming soon</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Domain files live outside the App Router so pages stay focused on routing.
          </p>
        </div>
      </div>
    </section>
  );
}
