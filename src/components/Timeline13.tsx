import { Progress } from "@/components/ui/progress";

const Timeline13 = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="flex flex-col mb-8">
          <h1 className="mb-2 text-3xl font-semibold text-white md:text-5xl">
            Journey to Product Launch
          </h1>
          <p className="text-muted-foreground max-w-2xl text-gray-400">
            Follow the essential steps to bring your innovative idea to market
            and ensure a successful product debut.
          </p>
        </div>
        <div className="border-border bg-card mt-8 flex flex-col gap-6 rounded-2xl border border-gray-700/30 bg-gradient-to-br from-[#1a1e2d]/60 to-[#0e0f15]/50 backdrop-blur-md shadow-xl shadow-purple-500/15 p-4 sm:p-8 lg:p-11">
          <div className="contents items-center justify-between sm:flex">
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              Guidance from industry leaders
            </h2>
          </div>
          <div className="mt-3 flex gap-4 sm:flex-col">
            <div className="relative">
              <div className="grid h-full w-4 justify-center gap-10 sm:h-4 sm:w-auto sm:grid-cols-3 sm:items-center">
                <div className="bg-ring absolute inset-0 left-1/2 w-px -translate-x-1/2 bg-gray-700/50 sm:inset-auto sm:left-auto sm:h-px sm:w-full sm:-translate-x-0" />
                <span className="bg-ring relative top-3 size-2 rounded-full bg-gray-700/50 sm:top-0" />
                <span className="bg-ring relative top-3 size-2 rounded-full bg-gray-700/50 sm:top-0" />
                <span className="bg-ring relative top-3 size-2 rounded-full bg-gray-700/50 sm:top-0" />
              </div>
              <div className="animate-timeline-reveal absolute inset-0 grid h-full w-4 justify-center gap-10 sm:h-4 sm:w-auto sm:grid-cols-3 sm:items-center">
                <div className="bg-primary absolute inset-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/50 sm:inset-auto sm:left-auto sm:h-px sm:w-full sm:-translate-x-0" />
                <span className="bg-primary relative top-3 size-2 rounded-full bg-purple-600 shadow-lg shadow-purple-500/50 sm:top-0" />
                <span className="bg-primary relative top-3 size-2 rounded-full bg-blue-600 shadow-lg shadow-blue-500/50 sm:top-0" />
                <span className="bg-primary relative top-3 size-2 rounded-full bg-purple-600 shadow-lg shadow-purple-500/50 sm:top-0" />
              </div>
            </div>
            <div className="grid gap-10 sm:grid-cols-3">
              <div className="flex h-full flex-col justify-between gap-4">
                <div className="flex flex-col">
                  <div className="bg-border border-border flex h-8 w-fit items-center gap-px overflow-hidden rounded-md border border-gray-700/40 text-sm font-medium shadow-md">
                    <span className="bg-background grid h-full place-items-center bg-[#0e0f15] px-2 text-white">
                      01
                    </span>
                    <span className="bg-background grid h-full place-items-center bg-[#0e0f15] px-2 text-white">
                      Ideation
                    </span>
                  </div>
                  <h3 className="mt-5 font-medium text-white">
                    Brainstorm and validate your concept
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm text-gray-400">
                    Gather insights from market research, customer interviews,
                    and competitor analysis to refine your product idea.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={15}
                      className="h-1.5 flex-1 bg-gray-800/50 [&>div]:bg-gradient-to-r [&>div]:from-purple-600 [&>div]:to-purple-500 [&>div]:shadow-lg [&>div]:shadow-purple-500/50"
                    />
                    <span className="text-muted-foreground w-8 text-right text-xs text-gray-400 font-medium">
                      15%
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-1 text-xs text-gray-500">
                    ~2 weeks
                  </p>
                </div>
              </div>
              <div className="flex h-full flex-col justify-between gap-4">
                <div className="flex flex-col">
                  <div className="bg-border border-border flex h-8 w-fit items-center gap-px overflow-hidden rounded-md border border-gray-700/40 text-sm font-medium shadow-md">
                    <span className="bg-background grid h-full place-items-center bg-[#0e0f15] px-2 text-white">
                      02
                    </span>
                    <span className="bg-background grid h-full place-items-center bg-[#0e0f15] px-2 text-white">
                      Development
                    </span>
                  </div>
                  <h3 className="mt-5 font-medium text-white">
                    Build your MVP
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm text-gray-400">
                    Design, prototype, and develop the minimum viable product.
                    Iterate quickly based on early feedback and testing.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={85}
                      className="h-1.5 flex-1 bg-gray-800/50 [&>div]:bg-gradient-to-r [&>div]:from-blue-600 [&>div]:to-blue-500 [&>div]:shadow-lg [&>div]:shadow-blue-500/50"
                    />
                    <span className="text-muted-foreground w-8 text-right text-xs text-gray-400 font-medium">
                      85%
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-1 text-xs text-gray-500">
                    ~6 weeks
                  </p>
                </div>
              </div>
              <div className="flex h-full flex-col justify-between gap-4">
                <div className="flex flex-col">
                  <div className="bg-border border-border flex h-8 w-fit items-center gap-px overflow-hidden rounded-md border border-gray-700/40 text-sm font-medium shadow-md">
                    <span className="bg-background grid h-full place-items-center bg-[#0e0f15] px-2 text-white">
                      03
                    </span>
                    <span className="bg-background grid h-full place-items-center bg-[#0e0f15] px-2 text-white">
                      Launch
                    </span>
                  </div>
                  <h3 className="mt-5 font-medium text-white">Go to market</h3>
                  <p className="text-muted-foreground mt-2 text-sm text-gray-400">
                    Execute your launch plan with marketing campaigns, outreach,
                    and customer support to maximize impact and adoption.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={100}
                      className="h-1.5 flex-1 bg-gray-800/50 [&>div]:bg-gradient-to-r [&>div]:from-purple-600 [&>div]:to-blue-600 [&>div]:shadow-lg [&>div]:shadow-purple-500/50"
                    />
                    <span className="text-muted-foreground w-8 text-right text-xs text-gray-400 font-medium">
                      100%
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-1 text-xs text-gray-500">
                    Launch complete
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
        /* Mobile: Top to bottom animation */
        @keyframes timeline-reveal-mobile {
          from {
            clip-path: inset(0 0 100% 0);
          }
          to {
            clip-path: inset(0% 0 0 0);
          }
        }
        
        /* Desktop: Left to right animation */
        @keyframes timeline-reveal-desktop {
          from {
            clip-path: inset(0 100% 0 0);
          }
          to {
            clip-path: inset(0 0% 0 0);
          }
        }
        
        .animate-timeline-reveal {
          animation: timeline-reveal-mobile 5s linear;
        }
        
        @media (min-width: 640px) {
          .animate-timeline-reveal {
            animation: timeline-reveal-desktop 5s linear;
          }
        }
        `}
      </style>
    </section>
  );
};

export { Timeline13 };
