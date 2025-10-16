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
    <section
      id="timeline"
      className="relative isolate overflow-hidden py-24 sm:py-32"
    >
      <div
        className="absolute inset-0 -z-20 opacity-95 transition-opacity duration-500 dark:hidden"
        style={{
          backgroundColor: "#fefcff",
          backgroundImage:
            "radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%), radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-20 hidden overflow-hidden dark:block"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(110,114,255,0.35),transparent_60%),radial-gradient(circle_at_85%_25%,rgba(232,74,248,0.32),transparent_62%),radial-gradient(circle_at_50%_80%,rgba(14,116,212,0.25),transparent_68%),linear-gradient(160deg,#040312_0%,#0a0f2a_45%,#01000f_100%)]" />
      </div>
      <div
        className="absolute -top-36 left-1/4 -z-10 h-64 w-64 rounded-full bg-primary/20 blur-[160px] dark:bg-primary/40"
        aria-hidden
      />
      <div
        className="absolute -bottom-48 right-1/6 -z-10 h-80 w-80 rounded-full bg-fuchsia-400/25 blur-[160px] dark:bg-fuchsia-500/40"
        aria-hidden
      />

      <div className="container relative max-w-6xl">
        <div className="mx-auto max-w-3xl space-y-4 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Journey Mapping
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            Journey to Product Launch
          </h1>
          <p className="text-balance text-base text-muted-foreground md:text-lg">
            Follow the essential milestones that move your idea from spark to
            launch-day triumph, with clear ownership and measurable progress.
          </p>
        </div>

        <div className="relative mt-16 overflow-hidden rounded-[2.75rem] border border-border/60 bg-white/75 p-8 shadow-[0_40px_120px_-60px_rgba(72,56,149,0.45)] backdrop-blur-2xl transition-colors dark:border-white/10 dark:bg-white/[0.05] dark:shadow-[0_60px_160px_-80px_rgba(16,15,60,0.8)] sm:p-12 lg:p-16">
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
                  className="relative flex h-full flex-col gap-6 rounded-2xl border border-border/60 bg-white/80 p-6 pt-14 text-left shadow-[0_28px_60px_-48px_rgba(64,45,145,0.5)] backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_36px_72px_-40px_rgba(103,63,201,0.55)] dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <span className="absolute left-[1.25rem] top-8 size-3 rounded-full border border-primary/50 bg-gradient-to-br from-primary/80 via-fuchsia-500/80 to-sky-500/80 shadow-[0_0_25px_rgba(126,87,255,0.55)] md:hidden" />
                  <span className="absolute left-1/2 top-8 hidden size-3 -translate-x-1/2 rounded-full border border-white/60 bg-gradient-to-r from-primary/80 via-fuchsia-500/80 to-sky-500/80 shadow-[0_0_25px_rgba(126,87,255,0.55)] md:block" />

                  <div className="inline-flex items-center gap-px overflow-hidden rounded-full border border-border/50 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground dark:border-white/15 dark:text-white/70">
                    <span className="bg-white/70 px-3 py-1 text-foreground dark:bg-white/[0.02] dark:text-white/90">
                      {step.id}
                    </span>
                    <span className="bg-muted/60 px-3 py-1 text-muted-foreground dark:bg-white/[0.05] dark:text-white/80">
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
                        className="h-1.5 flex-1 bg-muted/60 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:via-fuchsia-500 [&>div]:to-sky-500"
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
