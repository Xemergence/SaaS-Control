import React from "react";
import BentoGrid from '@/components/shadcn-studio/blocks/bento-grid-07/bento-grid-07';

// Feature251 section – Our Approach with Bento Grid
const Feature251: React.FC = () => {
  return (
    <section id="innovation" className="relative isolate">
      <div
        className="absolute inset-0 -z-10 opacity-95 transition-opacity duration-500 bg-aura-light dark:hidden"
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 hidden overflow-hidden dark:block" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(110,114,255,0.35),transparent_60%),radial-gradient(circle_at_85%_25%,rgba(232,74,248,0.32),transparent_62%),radial-gradient(circle_at_50%_80%,rgba(14,116,212,0.25),transparent_68%),linear-gradient(160deg,#040312_0%,#0a0f2a_45%,#01000f_100%)]" />
      </div>
      <div className="pointer-events-none absolute -top-32 left-1/4 -z-10 h-64 w-64 rounded-full bg-primary/25 blur-[140px] dark:bg-primary/40" />
      <div className="pointer-events-none absolute -bottom-40 right-1/5 -z-10 h-72 w-72 rounded-full bg-sky-400/25 blur-[150px] dark:bg-fuchsia-500/30" />
      <BentoGrid />
    </section>
  );
};

export { Feature251 };
