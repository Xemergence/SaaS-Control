import React, { useRef, useEffect, useId, useState, RefObject } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Globe from "@/components/magicui/globe";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Feature251 section – 2x2 mosaic that matches the provided reference image
const Feature251: React.FC = () => {
  const containerRef1 = useRef<HTMLDivElement>(null);
  const containerRef2 = useRef<HTMLDivElement>(null);

  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <section className="relative isolate">
      <div
        className="absolute inset-0 -z-10 opacity-95 transition-opacity duration-500 bg-aura-light dark:hidden"
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 hidden overflow-hidden dark:block" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(110,114,255,0.35),transparent_60%),radial-gradient(circle_at_85%_25%,rgba(232,74,248,0.32),transparent_62%),radial-gradient(circle_at_50%_80%,rgba(14,116,212,0.25),transparent_68%),linear-gradient(160deg,#040312_0%,#0a0f2a_45%,#01000f_100%)]" />
      </div>
      <div className="pointer-events-none absolute -top-32 left-1/4 -z-10 h-64 w-64 rounded-full bg-primary/25 blur-[140px] dark:bg-primary/40" />
      <div className="pointer-events-none absolute -bottom-40 right-1/5 -z-10 h-72 w-72 rounded-full bg-sky-400/25 blur-[150px] dark:bg-fuchsia-500/30" />
      <div className="container relative py-20 md:py-24">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Badge
            variant="outline"
            className="inline-flex items-center justify-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary"
          >
            Our Approach
          </Badge>
          <h2 className="mt-4 text-balance text-3xl font-bold leading-tight text-foreground md:text-5xl">
            Built for Innovation
          </h2>
        </div>
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:items-stretch">
            <div className="grid gap-6">
              {/* 1st Card */}
              <Card
                className="group relative min-h-[24rem] overflow-visible rounded-[2rem] border-[1.25px] border-[color:var(--color-border-strong)] bg-gradient-to-br from-white/85 via-white/75 to-white/55 shadow-[0_32px_96px_-48px_rgba(120,85,255,0.45)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_44px_120px_-48px_rgba(139,92,246,0.55)] dark:from-white/[0.12] dark:via-white/[0.08] dark:to-white/[0.05] dark:shadow-[0_42px_120px_-64px_rgba(71,45,155,0.65)]"
              >
                <CardHeader className="space-y-3 px-8 pt-8 text-left">
                  <h3 className="text-balance text-2xl font-semibold leading-tight text-foreground md:text-[28px]">
                    Customizable Workflows
                  </h3>
                  <p className="text-balance text-base leading-relaxed text-muted-foreground">
                    Orchestrate manufacturing, IoT, and analytics tasks from one adaptive canvas. Drag trusted tools into governed pipelines, automate dependencies, and let BOS adjust instantly as production data or customer demand shifts.
                  </p>
                </CardHeader>
                <CardContent
                  ref={containerRef1}
                  className="relative h-[18rem] px-8 pb-10"
                >
                  <IconCard
                    ref={div1Ref}
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/google-icon.svg"
                    className="mb-6"
                  />
                  <IconCard
                    ref={div2Ref}
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/figma-icon.svg"
                    className="translate-x-24 sm:translate-x-28"
                  />
                  <IconCard
                    ref={div3Ref}
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/notion-icon.svg"
                    className="mt-6"
                  />
                  <IconCard
                    ref={div5Ref}
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                    className="absolute right-10 top-1/2 -translate-y-1/2"
                  />

                  <div
                    ref={div4Ref}
                    className="absolute left-1/2 top-1/2 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-500/50 bg-purple-600/20 shadow-lg shadow-purple-500/50"
                  />

                  {/* Connectors */}
                  <AnimatedBeam
                    duration={3}
                    containerRef={containerRef1}
                    fromRef={div1Ref}
                    curvature={38}
                    toRef={div4Ref}
                    gradientStartColor="#9333ea"
                    gradientStopColor="#3b82f6"
                  />
                  <AnimatedBeam
                    duration={3}
                    containerRef={containerRef1}
                    fromRef={div2Ref}
                    toRef={div4Ref}
                    gradientStartColor="#9333ea"
                    gradientStopColor="#3b82f6"
                  />
                  <AnimatedBeam
                    duration={3}
                    containerRef={containerRef1}
                    fromRef={div3Ref}
                    curvature={-38}
                    toRef={div4Ref}
                    gradientStartColor="#9333ea"
                    gradientStopColor="#3b82f6"
                  />
                  <AnimatedBeam
                    duration={3}
                    containerRef={containerRef1}
                    fromRef={div5Ref}
                    curvature={-18}
                    toRef={div4Ref}
                    gradientStartColor="#3b82f6"
                    gradientStopColor="#9333ea"
                  />
                </CardContent>
              </Card>

              {/* 4th Card */}
              <Card
                className="group relative min-h-[24rem] overflow-hidden rounded-[2rem] border-[1.25px] border-[color:var(--color-border-strong)] bg-gradient-to-br from-white/85 via-white/65 to-white/45 shadow-[0_32px_96px_-48px_rgba(120,85,255,0.38)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_44px_120px_-48px_rgba(125,86,255,0.5)] dark:from-white/[0.1] dark:via-white/[0.06] dark:to-white/[0.04] dark:shadow-[0_42px_120px_-64px_rgba(55,38,140,0.6)]"
              >
                <CardHeader className="relative z-10 space-y-3 px-8 pt-8 text-left">
                  <h3 className="text-balance text-2xl font-semibold leading-tight text-foreground md:text-[28px]">
                    Trusted by 100k Users
                  </h3>
                  <p className="text-balance text-base leading-relaxed text-muted-foreground">
                    Deliver BOS experiences that scale globally with verified uptime, hardened access controls, and compliance reporting. Our automation backbone powers 100k+ daily users across regulated manufacturing, healthcare, and smart city deployments.
                  </p>
                </CardHeader>
                <CardContent className="relative flex h-[18rem] items-end justify-end">
                  <Globe className="-bottom-12 left-auto right-[-14%] size-[440px] translate-x-0 opacity-80 saturate-[1.1]" />
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6">
              {/* 2nd Card */}
              <Card
                className="group relative min-h-[24rem] rounded-[2rem] border-[1.25px] border-[color:var(--color-border-strong)] bg-gradient-to-br from-white/85 via-white/70 to-white/50 shadow-[0_28px_90px_-50px_rgba(67,112,255,0.45)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_40px_110px_-52px_rgba(67,112,255,0.55)] dark:from-white/[0.12] dark:via-white/[0.08] dark:to-white/[0.05]"
              >
                <CardHeader className="space-y-3 px-8 pt-8 text-left">
                  <h3 className="text-balance text-2xl font-semibold leading-tight text-foreground md:text-[28px]">
                    Smart Task Tracking
                  </h3>
                  <p className="text-balance text-base leading-relaxed text-muted-foreground">
                    Monitor milestones, alerts, and work orders in a single signal stack. BOS unifies shop-floor telemetry with service tickets so every owner sees dependencies before bottlenecks surface.
                  </p>
                </CardHeader>
                <CardContent
                  ref={containerRef2}
                  className="relative flex h-[18rem] flex-col items-center justify-between px-8 pb-10"
                >
                  <IconCard
                    ref={div6Ref}
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                    className="mb-6"
                  />
                  <IconCard
                    ref={div7Ref}
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/g2-icon.svg"
                    className="mt-6"
                  />
                  <AnimatedBeam
                    duration={3}
                    containerRef={containerRef2}
                    fromRef={div6Ref}
                    direction="vertical"
                    curvature={42}
                    toRef={div7Ref}
                    gradientStartColor="#3b82f6"
                    gradientStopColor="#9333ea"
                  />
                </CardContent>
              </Card>

              {/* 3rd Card */}
              <Card
                className="group relative flex min-h-[24rem] flex-col rounded-[2rem] border-[1.25px] border-[color:var(--color-border-strong)] bg-gradient-to-br from-white/85 via-white/70 to-white/48 shadow-[0_28px_90px_-50px_rgba(45,197,123,0.32)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_40px_110px_-52px_rgba(45,197,123,0.45)] dark:from-white/[0.1] dark:via-white/[0.07] dark:to-white/[0.05]"
              >
                <CardContent className="flex flex-1 items-center justify-center px-8 pt-12">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                    className="size-28 drop-shadow-lg md:size-32"
                    alt="Integration placeholder"
                  />
                </CardContent>
                <CardHeader className="mt-auto space-y-3 px-8 pb-8 text-left">
                  <h3 className="text-balance text-2xl font-semibold leading-tight text-foreground md:text-[28px]">
                    Seamless Integration & Real-Time Collaboration
                  </h3>
                  <p className="text-balance text-base leading-relaxed text-muted-foreground">
                    Launch secure integrations without custom code debt. Prebuilt connectors map ERP, MES, and finance records into shared models while in-line coauthoring keeps engineering, ops, and vendors aligned in real time.
                  </p>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature251 };

// Icon card with proper ref support
const IconCard = React.forwardRef<
  HTMLDivElement,
  { src: string; className?: string }
>(({ src, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative z-10 flex size-14 items-center justify-center rounded-xl border-[1.15px] border-[color:var(--color-border-soft)] bg-muted/50 backdrop-blur-md shadow-lg shadow-primary/10 transition-all duration-300 hover:border-[color:var(--color-border-strong)] hover:shadow-primary/30 dark:bg-muted/60",
        className,
      )}
    >
      <img src={src} alt="Icon" className="size-5 drop-shadow-md" />
      <HandleIcon className="absolute -top-3 left-1/2 size-6 -translate-x-1/2 text-muted-foreground/40" />
      <HandleIcon className="absolute -bottom-3 left-1/2 size-6 -translate-x-1/2 text-muted-foreground/40" />
      <HandleIcon className="absolute -left-3 top-1/2 size-6 -translate-y-1/2 rotate-90 text-muted-foreground/40" />
      <HandleIcon className="absolute -right-3 top-1/2 size-6 -translate-y-1/2 rotate-90 text-muted-foreground/40" />
    </div>
  );
});
IconCard.displayName = "IconCard";

const HandleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width="14"
    height="5"
    viewBox="0 0 14 5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1="0.543457"
      y1="0.972656"
      x2="0.543457"
      y2="4.625"
      stroke="currentColor"
      strokeOpacity="0.4"
    />
    <line
      x1="4.54346"
      y1="0.972656"
      x2="4.54346"
      y2="4.625"
      stroke="currentColor"
      strokeOpacity="0.4"
    />
    <line
      x1="8.54346"
      y1="0.972656"
      x2="8.54346"
      y2="4.625"
      stroke="currentColor"
      strokeOpacity="0.4"
    />
    <line
      x1="12.5435"
      y1="0.972656"
      x2="12.5435"
      y2="4.625"
      stroke="currentColor"
      strokeOpacity="0.4"
    />
  </svg>
);

// Animated connector (adapted from MagicUI animated-beam)
export interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
  direction?: "horizontal" | "vertical";
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = Math.random() * 3 + 4,
  delay = 0,
  pathColor = "#6b7280",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
  direction = "horizontal",
}) => {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  const gradientCoordinates =
    direction === "vertical"
      ? reverse
        ? {
            x1: ["0%", "0%"],
            x2: ["0%", "0%"],
            y1: ["90%", "-10%"],
            y2: ["100%", "0%"],
          }
        : {
            x1: ["0%", "0%"],
            x2: ["0%", "0%"],
            y1: ["10%", "110%"],
            y2: ["0%", "100%"],
          }
      : reverse
        ? {
            x1: ["90%", "-10%"],
            x2: ["100%", "0%"],
            y1: ["0%", "0%"],
            y2: ["0%", "0%"],
          }
        : {
            x1: ["10%", "110%"],
            x2: ["0%", "100%"],
            y1: ["0%", "0%"],
            y2: ["0%", "0%"],
          };

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const rectA = fromRef.current.getBoundingClientRect();
        const rectB = toRef.current.getBoundingClientRect();

        const svgWidth = containerRect.width;
        const svgHeight = containerRect.height;
        setSvgDimensions({ width: svgWidth, height: svgHeight });

        const startX =
          rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
        const startY =
          rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
        const endX =
          rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
        const endY =
          rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

        const controlY = startY - curvature;
        const d = `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`;
        setPathD(d);
      }
    };

    const resizeObserver = new ResizeObserver(() => updatePath());
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    updatePath();
    return () => resizeObserver.disconnect();
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      className={cn(
        "pointer-events-none absolute left-0 top-0 transform-gpu stroke-2",
        className,
      )}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        strokeWidth={pathWidth}
        stroke={`url(#${id})`}
        strokeOpacity="1"
        strokeLinecap="round"
      />
      <defs>
        <motion.linearGradient
          className="transform-gpu"
          id={id}
          gradientUnits="userSpaceOnUse"
          initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
          animate={{
            x1: gradientCoordinates.x1,
            x2: gradientCoordinates.x2,
            y1: gradientCoordinates.y1,
            y2: gradientCoordinates.y2,
          }}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1],
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0"></stop>
          <stop stopColor={gradientStartColor}></stop>
          <stop offset="32.5%" stopColor={gradientStopColor}></stop>
          <stop
            offset="100%"
            stopColor={gradientStopColor}
            stopOpacity="0"
          ></stop>
        </motion.linearGradient>
      </defs>
    </svg>
  );
};
