import React, { useRef, useEffect, useId, useState, RefObject } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Globe from "@/components/magicui/globe";
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
    <section className="relative overflow-hidden py-20 md:py-24">
      <div
        className="absolute inset-0 -z-10 opacity-95 transition-opacity duration-500 dark:hidden"
        style={{
          backgroundColor: "#fefcff",
          backgroundImage:
            "radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%), radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 hidden overflow-hidden dark:block" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(110,114,255,0.35),transparent_60%),radial-gradient(circle_at_85%_25%,rgba(232,74,248,0.32),transparent_62%),radial-gradient(circle_at_50%_80%,rgba(14,116,212,0.25),transparent_68%),linear-gradient(160deg,#040312_0%,#0a0f2a_45%,#01000f_100%)]" />
      </div>
      <div className="pointer-events-none absolute -top-32 left-1/4 -z-10 h-64 w-64 rounded-full bg-primary/25 blur-[140px] dark:bg-primary/40" />
      <div className="pointer-events-none absolute -bottom-40 right-1/5 -z-10 h-72 w-72 rounded-full bg-sky-400/25 blur-[150px] dark:bg-fuchsia-500/30" />
      <div className="container relative">
        <div className="mx-auto flex max-w-6xl flex-wrap items-stretch justify-center gap-5">
          {/* 1st Card */}
          <Card className="group relative h-96 w-full rounded-3xl border border-border/60 bg-gradient-to-br from-muted/50 via-card to-background/80 backdrop-blur-xl shadow-[0_40px_120px_-60px_rgba(147,51,234,0.35)] transition-all duration-300 hover:border-primary/50 hover:shadow-primary/30 md:w-[660px]">
            <CardHeader className="pb-2 text-left">
              <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                Customizable Workflows
              </h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt Lorem ipsum dolor sit amet,
                consectetur
              </p>
            </CardHeader>
            <CardContent
              ref={containerRef1}
              className="relative ml-5 h-[calc(24rem-5.5rem)]"
            >
              <IconCard
                ref={div1Ref}
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/google-icon.svg"
                className="mb-3"
              />
              <IconCard
                ref={div2Ref}
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/figma-icon.svg"
                className="translate-x-32"
              />
              <IconCard
                ref={div3Ref}
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/notion-icon.svg"
                className="mt-3"
              />
              <IconCard
                ref={div5Ref}
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                className="absolute right-12 top-1/2 -translate-y-1/2"
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
                curvature={40}
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
                curvature={-40}
                toRef={div4Ref}
                gradientStartColor="#9333ea"
                gradientStopColor="#3b82f6"
              />
              <AnimatedBeam
                duration={3}
                containerRef={containerRef1}
                fromRef={div4Ref}
                toRef={div5Ref}
                gradientStartColor="#9333ea"
                gradientStopColor="#3b82f6"
              />
            </CardContent>
          </Card>

          {/* 2nd Card */}
          <Card className="group h-96 w-full rounded-3xl border border-border/60 bg-gradient-to-br from-muted/40 via-card to-background/80 backdrop-blur-xl shadow-[0_40px_120px_-70px_rgba(59,130,246,0.35)] transition-all duration-300 hover:border-blue-500/50 hover:shadow-blue-500/30 md:w-[332px]">
            <CardHeader className="pb-2 text-left">
              <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                Smart Task Tracking
              </h3>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              </p>
            </CardHeader>
            <CardContent
              ref={containerRef2}
              className="relative flex h-[calc(24rem-5.5rem)] flex-col items-center justify-between"
            >
              <IconCard
                ref={div6Ref}
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                className="mb-3"
              />
              <IconCard
                ref={div7Ref}
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/g2-icon.svg"
                className="mt-3"
              />
              <AnimatedBeam
                duration={3}
                containerRef={containerRef2}
                fromRef={div6Ref}
                direction="vertical"
                curvature={40}
                toRef={div7Ref}
                gradientStartColor="#3b82f6"
                gradientStopColor="#9333ea"
              />
            </CardContent>
          </Card>

          {/* 3rd Card */}
          <Card className="group relative flex h-96 w-full flex-col rounded-3xl border border-border/60 bg-gradient-to-br from-muted/40 via-card to-background/80 backdrop-blur-xl shadow-[0_40px_120px_-70px_rgba(34,197,94,0.25)] transition-all duration-300 hover:border-emerald-400/60 hover:shadow-emerald-400/20 md:w-[332px]">
            <CardContent className="flex-1">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                className="mt-5 size-32 drop-shadow-lg"
                alt="Integration placeholder"
              />
            </CardContent>
            <CardHeader className="mt-auto text-left">
              <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                Seamless Integration & Real-Time Collaboration
              </h3>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              </p>
            </CardHeader>
          </Card>

          {/* 4th Card */}
          <Card className="group relative h-96 w-full overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-muted/40 via-card to-background/80 backdrop-blur-xl shadow-[0_40px_120px_-60px_rgba(147,51,234,0.35)] transition-all duration-300 hover:border-primary/50 hover:shadow-primary/30 md:w-[660px]">
            <CardHeader className="relative z-10 pb-2 text-left">
              <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                Trusted by 100k Users
              </h3>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt Lorem ipsum dolor sit amet,
                consectetur
              </p>
            </CardHeader>
            <CardContent className="relative">
              {/* Position the globe peeking from the bottom right, similar to the reference */}
              <Globe className="-top-6 left-auto right-[-10%] translate-x-0 opacity-70 saturate-[1.15]" />
            </CardContent>
          </Card>
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
        "relative z-10 flex size-14 items-center justify-center rounded-xl border border-border/60 bg-muted/50 backdrop-blur-md shadow-lg shadow-primary/10 transition-all duration-300 hover:border-primary/50 hover:shadow-primary/30 dark:bg-muted/60",
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
