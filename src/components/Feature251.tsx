import React from "react";
import BentoGrid from '@/components/shadcn-studio/blocks/bento-grid-07/bento-grid-07';

// Feature251 section – Our Approach with Bento Grid
const Feature251: React.FC = () => {
  return (
    <section id="innovation" className="relative isolate overflow-hidden py-20 sm:py-28">
      <div
        className="absolute inset-0 -z-30 bg-[linear-gradient(160deg,_rgba(248,246,255,0.92)_0%,_rgba(240,244,255,0.78)_32%,_rgba(247,242,255,0.92)_64%,_rgba(250,248,255,0.98)_100%)] transition-opacity duration-500 dark:hidden"
        aria-hidden
      />
      <div className="absolute inset-0 -z-30 hidden overflow-hidden opacity-95 transition-opacity duration-500 dark:block" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(102,109,255,0.28),transparent_58%),radial-gradient(circle_at_88%_26%,rgba(226,73,247,0.28),transparent_62%),radial-gradient(circle_at_50%_88%,rgba(18,129,214,0.24),transparent_72%),linear-gradient(160deg,#040312_0%,#090f25_40%,#040015_100%)]" />
      </div>
      <div className="pointer-events-none absolute -top-40 left-1/3 -z-20 h-72 w-72 rounded-full bg-primary/25 blur-[160px] dark:bg-primary/35" />
      <div className="pointer-events-none absolute -bottom-48 right-1/4 -z-20 h-80 w-80 rounded-full bg-sky-400/25 blur-[170px] dark:bg-fuchsia-500/30" />
      <div className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-[480px] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.55),_transparent_65%)] dark:bg-[radial-gradient(ellipse_at_center,_rgba(77,86,255,0.18),_transparent_70%)]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border/40 bg-background/70 p-1 shadow-[0_60px_160px_-80px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.08]">
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-[2.4rem] bg-[radial-gradient(circle_at_12%_10%,rgba(126,87,255,0.18),transparent_65%),radial-gradient(circle_at_88%_90%,rgba(59,130,246,0.22),transparent_65%)] opacity-80 dark:bg-[radial-gradient(circle_at_12%_12%,rgba(126,87,255,0.26),transparent_68%),radial-gradient(circle_at_85%_85%,rgba(236,72,153,0.22),transparent_70%)]" />
          <div className="rounded-[2.3rem] border border-border/20 bg-background/80 dark:border-white/10 dark:bg-white/[0.05]">
            <BentoGrid />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature251 };
