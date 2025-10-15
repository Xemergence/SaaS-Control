import React from "react";
import { cn } from "@/lib/utils";

interface GlobeProps {
  className?: string;
  size?: number; // px
}

// Lightweight dotted globe approximation (keeps bundle small)
// Positioned absolutely inside a relatively positioned parent
export const Globe: React.FC<GlobeProps> = ({ className, size = 420 }) => {
  const s = size;
  return (
    <div
      className={cn(
        "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        className
      )}
      style={{ width: s, height: s }}
    >
      <svg
        width={s}
        height={s}
        viewBox={`0 0 ${s} ${s}`}
        className="opacity-80"
      >
        <defs>
          <radialGradient id="g" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="60%" stopColor="#8b5cf6" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#111827" stopOpacity="0" />
          </radialGradient>
          <mask id="fadeMask">
            <rect width="100%" height="100%" fill="url(#g)" />
          </mask>
          <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="#9ca3af" opacity="0.4" />
          </pattern>
        </defs>

        {/* Dotted sphere */}
        <g mask="url(#fadeMask)">
          <circle cx={s / 2} cy={s / 2} r={s / 2.2} fill="url(#dots)" />
          {/* Subtle meridian */}
          <ellipse
            cx={s / 2}
            cy={s / 2}
            rx={s / 3}
            ry={s / 2.2}
            fill="none"
            stroke="#6b7280"
            strokeOpacity="0.15"
          />
        </g>
      </svg>
    </div>
  );
};

export default Globe;
