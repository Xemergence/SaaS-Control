import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const TIMELINE_STEPS = [
  {
    id: "01",
    label: "Ideation",
    heading: "Brainstorm and validate your concept",
    description:
      "Gather insights from market research, customer interviews, and competitor analysis to refine your product idea.",
    progress: 15,
    duration: "~2 weeks",
  },
  {
    id: "02",
    label: "Development",
    heading: "Build your MVP",
    description:
      "Design, prototype, and develop the minimum viable product. Iterate quickly based on early feedback and testing.",
    progress: 85,
    duration: "~6 weeks",
  },
  {
    id: "03",
    label: "Launch",
    heading: "Go to market",
    description:
      "Execute your launch plan with marketing campaigns, outreach, and customer support to maximize impact and adoption.",
    progress: 100,
    duration: "Launch complete",
  },
];

const Timeline13 = () => {
  return (
    <section
      id="timeline"
      className="section-divider section-divider--short relative isolate scroll-mt-32 bg-[color:var(--color-surface)] py-24 transition-colors dark:bg-[color:var(--color-surface)] sm:py-32 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-border/80"
    >
      <div className="container relative max-w-6xl">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <div className="flex justify-center">
            <Badge className="transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow hover:bg-primary/80 inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              Timeline
            </Badge>
          </div>
          <p className="text-center text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Journey Mapping
          </p>
          <h1 className="text-balance text-center text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            Journey to Product Launch
          </h1>
          <p className="text-balance text-center text-base text-muted-foreground md:text-lg">
            Follow the essential milestones that move your idea from spark to
            launch-day triumph, with clear ownership and measurable progress.
          </p>
        </div>

        <div className="relative mt-16 overflow-hidden rounded-[2.75rem] border-[1.25px] border-[color:var(--color-border-strong)] bg-[color:var(--primary-foreground)] p-8 shadow-[0_40px_120px_-60px_rgba(72,56,149,0.45)] backdrop-blur-2xl transition-colors dark:bg-[color:var(--color-surface)] dark:shadow-[0_60px_160px_-80px_rgba(16,15,60,0.8)] sm:p-12 lg:p-16">
          {/* Light theme aura background for inner container */}
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-90 bg-aura-light dark:hidden" />
          {/* Dark theme aura background for inner container */}
          <div className="pointer-events-none absolute inset-0 -z-10 hidden opacity-90 bg-aura-dark dark:block" />
          {/* Additional dark theme gradient blur */}
          <div className="absolute inset-0 -z-10 hidden opacity-70 blur-[120px] transition-opacity dark:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(167,139,250,0.3),transparent_60%),radial-gradient(circle_at_90%_30%,rgba(59,130,246,0.28),transparent_60%),radial-gradient(circle_at_50%_100%,rgba(236,72,153,0.32),transparent_65%)]" />
          </div>

          <div className="relative flex flex-col gap-10 text-center sm:text-left md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <p className="text-sm font-medium uppercase tracking-[0.32em] text-muted-foreground">
                Guidance from industry leaders
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                Map your path from concept to launch-day victory.
              </h2>
            </div>
          </div>

          <div className="relative mt-14">
            <div className="pointer-events-none absolute left-[1.25rem] top-10 h-[calc(100%-2.5rem)] w-px rounded-full bg-gradient-to-b from-primary/40 via-fuchsia-500/40 to-sky-500/40 md:left-0 md:top-10 md:h-px md:w-full md:bg-gradient-to-r" />

            <div className="relative grid gap-12 md:grid-cols-3">
              {TIMELINE_STEPS.map((step) => (
                <article
                  key={step.id}
                  className="relative flex h-full flex-col gap-6 rounded-2xl border-[1.25px] border-[color:var(--color-border-strong)] bg-white/85 p-6 pt-14 text-left shadow-[0_28px_60px_-48px_rgba(64,45,145,0.5)] backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-[0_36px_72px_-40px_rgba(103,63,201,0.55)] dark:bg-white/[0.04]"
                >
                  <span className="absolute left-[1.25rem] top-8 size-3 rounded-full border border-primary/50 bg-gradient-to-br from-primary/80 via-fuchsia-500/80 to-sky-500/80 shadow-[0_0_25px_rgba(126,87,255,0.55)] md:hidden" />
                  <span className="absolute left-1/2 top-8 hidden size-3 -translate-x-1/2 rounded-full border border-white/60 bg-gradient-to-r from-primary/80 via-fuchsia-500/80 to-sky-500/80 shadow-[0_0_25px_rgba(126,87,255,0.55)] md:block" />

                  <div
                    className="inline-flex items-center gap-px overflow-hidden rounded-full border-[1.25px] border-[color:var(--color-border-soft)] bg-transparent text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground backdrop-blur-sm dark:text-white/70"
                  >
                    <span className="bg-transparent px-3 py-1 text-foreground dark:text-white/90">
                      {step.id}
                    </span>
                    <span className="bg-transparent px-3 py-1 text-muted-foreground dark:text-white/80">
                      {step.label}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold leading-snug text-foreground md:text-xl">
                      {step.heading}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-auto space-y-3">
                    <div className="flex items-center gap-3">
                      <Progress
                        value={step.progress}
                        className="h-1.5 flex-1 overflow-hidden rounded-full border border-[color:var(--color-border-soft)] bg-muted/60 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:via-fuchsia-500 [&>div]:to-sky-500"
                      />
                      <span className="w-12 text-right text-xs font-medium text-muted-foreground">
                        {step.progress}%
                      </span>
                    </div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/80">
                      {step.duration}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Timeline13 };
