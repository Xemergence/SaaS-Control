import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";

const OPTIONS = [
  { key: "light", icon: Sun, label: "Activate light theme" },
  { key: "dark", icon: Moon, label: "Activate dark theme" },
] as const;

export const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const activeBackdrop =
    theme === "dark" ? "bg-white/25" : "bg-secondary";
  const inactiveColor =
    theme === "dark" ? "text-white/45" : "text-muted-foreground";

  return (
    <div
      className={cn(
        "relative isolate flex h-8 items-center rounded-full bg-background/90 p-1 ring-1 ring-border shadow-[0_12px_40px_-24px_rgba(25,18,72,0.6)]",
        className,
      )}
    >
      {OPTIONS.map(({ key, icon: Icon, label }) => {
        const isActive = theme === key;
        return (
          <button
            key={key}
            type="button"
            aria-label={label}
            className="relative flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-200 hover:scale-[1.05]"
            onClick={() => setTheme(key)}
          >
            {isActive && (
              <motion.div
                className={cn(
                  "absolute inset-0 rounded-full shadow-[0_8px_20px_-12px_rgba(72,64,180,0.6)]",
                  activeBackdrop,
                )}
                layoutId="theme-toggle-thumb"
                transition={{ type: "spring", duration: 0.45, bounce: 0.32 }}
              />
            )}
            <Icon
              className={cn(
                "relative z-10 h-4 w-4",
                isActive ? "text-foreground" : inactiveColor,
              )}
            />
          </button>
        );
      })}
    </div>
  );
};
