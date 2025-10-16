import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

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
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background to-background dark:from-slate-950 dark:via-slate-950 dark:to-slate-950" />
      <div className="absolute inset-0 -z-10 opacity-60 blur-3xl">
        <div className="pointer-events-none absolute inset-y-16 inset-x-6 rounded-full bg-gradient-to-r from-primary/20 via-purple-500/10 to-blue-500/20 dark:from-primary/40 dark:via-purple-500/30 dark:to-blue-500/40" />
      </div>
      <div className="container relative">
        <div className="flex flex-col gap-3 text-center md:text-left">
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Journey to Product Launch
          </h1>
          <p className="mx-auto max-w-2xl text-balance text-base text-muted-foreground md:mx-0">
            Follow the essential steps to bring your innovative idea to market
            and ensure a successful product debut.
          </p>
        </div>

        <div className="border-border/70 bg-card/80 mt-12 flex flex-col gap-8 rounded-3xl border p-6 shadow-lg shadow-primary/10 backdrop-blur-md transition-colors sm:p-12 lg:p-16">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2 text-left">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
                Guidance from industry leaders
              </p>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Map your path from concept to launch-day victory.
              </h2>
            </div>
            <Button className="order-last rounded-full px-6 py-2 text-sm font-semibold shadow-lg shadow-primary/25">
              Request a demo
            </Button>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
            <div className="relative mx-auto w-full max-w-[6rem] lg:mx-0 lg:h-full lg:w-auto">
              <div className="grid h-full w-4 justify-center gap-10 lg:h-4 lg:w-[640px] lg:grid-cols-3 lg:items-center">
                <div className="absolute inset-0 left-1/2 w-px -translate-x-1/2 bg-muted lg:static lg:h-px lg:w-full lg:translate-x-0" />
                <span className="relative top-3 size-2 rounded-full bg-muted lg:top-0" />
                <span className="relative top-3 size-2 rounded-full bg-muted lg:top-0" />
                <span className="relative top-3 size-2 rounded-full bg-muted lg:top-0" />
              </div>
              <div className="animate-timeline-reveal absolute inset-0 grid h-full w-4 justify-center gap-10 lg:h-4 lg:w-[640px] lg:grid-cols-3 lg:items-center">
                <div className="absolute inset-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-primary via-fuchsia-500 to-sky-500 lg:static lg:h-px lg:w-full lg:translate-x-0" />
                <span className="relative top-3 size-2 rounded-full bg-primary shadow-lg shadow-primary/40 lg:top-0" />
                <span className="relative top-3 size-2 rounded-full bg-fuchsia-500 shadow-lg shadow-fuchsia-500/40 lg:top-0" />
                <span className="relative top-3 size-2 rounded-full bg-sky-500 shadow-lg shadow-sky-500/40 lg:top-0" />
              </div>
            </div>

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {TIMELINE_STEPS.map((step) => (
                <article
                  key={step.id}
                  className="flex h-full flex-col justify-between gap-5 rounded-2xl border border-border/40 bg-background/40 p-6 shadow-inner shadow-primary/5 transition hover:border-primary/40 hover:shadow-primary/20 dark:bg-background/60"
                >
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-px overflow-hidden rounded-md border border-border/40 text-xs font-semibold uppercase tracking-wider">
                      <span className="bg-background px-3 py-1 text-muted-foreground">
                        {step.id}
                      </span>
                      <span className="bg-muted/50 px-3 py-1 text-foreground">
                        {step.label}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold leading-snug">
                      {step.heading}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Progress
                        value={step.progress}
                        className="h-1.5 flex-1 bg-muted [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-purple-500"
                      />
                      <span className="w-10 text-right text-xs font-medium text-muted-foreground">
                        {step.progress}%
                      </span>
                    </div>
                    <p className="text-xs font-medium text-muted-foreground/80">
                      {step.duration}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
        @keyframes timeline-reveal-mobile {
          from { clip-path: inset(0 0 100% 0); }
          to { clip-path: inset(0 0 0 0); }
        }

        @keyframes timeline-reveal-desktop {
          from { clip-path: inset(0 100% 0 0); }
          to { clip-path: inset(0 0 0 0); }
        }

        .animate-timeline-reveal {
          animation: timeline-reveal-mobile 6s ease forwards;
        }

        @media (min-width: 1024px) {
          .animate-timeline-reveal {
            animation: timeline-reveal-desktop 6s ease forwards;
          }
        }
        `}
      </style>
    </section>
  );
};

export { Timeline13 };
