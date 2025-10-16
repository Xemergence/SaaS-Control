import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={`Activate ${theme === "dark" ? "light" : "dark"} theme`}
      className="relative flex size-9 items-center justify-center rounded-full border border-border/60 bg-card/60 shadow-sm transition-colors hover:border-primary/40 hover:bg-accent hover:text-accent-foreground"
      onClick={toggleTheme}
    >
      <Sun className="size-4 rotate-0 scale-100 transition-all duration-200 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-4 rotate-90 scale-0 transition-all duration-200 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">
        Toggle {theme === "dark" ? "light" : "dark"} theme
      </span>
    </Button>
  );
};
