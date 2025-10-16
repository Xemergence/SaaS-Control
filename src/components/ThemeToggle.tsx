import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-pressed={isDark}
      aria-label={`Activate ${isDark ? "light" : "dark"} theme`}
      onClick={toggleTheme}
      className={cn(
        "relative flex size-11 items-center justify-center rounded-full border-[1.5px] transition-[box-shadow,transform,background-color] duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
        isDark
          ? "bg-transparent text-foreground hover:bg-white/10"
          : "bg-white text-black hover:bg-white"
      )}
      style={{
        borderColor: isDark ? "rgba(240,240,245,0.8)" : "#0a0a0f",
        boxShadow: isDark ? "var(--shadow-xs)" : "var(--shadow-xs)",
      }}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-[6px] rounded-full border transition-colors duration-200",
          isDark ? "border-white/60 bg-white/8" : "border-black/30 bg-white"
        )}
      />
      <Sun
        className={cn(
          "relative z-10 size-[18px] transition-all duration-200",
          isDark ? "scale-75 opacity-0" : "scale-100 opacity-100"
        )}
      />
      <Moon
        className={cn(
          "absolute z-10 size-[18px] transition-all duration-200",
          isDark ? "scale-100 opacity-100" : "scale-75 opacity-0"
        )}
      />
      <span className="sr-only">
        Toggle {isDark ? "light" : "dark"} theme
      </span>
    </Button>
  );
};
