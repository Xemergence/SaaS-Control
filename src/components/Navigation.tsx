import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Home, Sparkles, Users, HeartHandshake, ShoppingCart } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const fallbackLogo = "/images/logo-black.png";
  const preferredLogo =
    theme === "dark" ? "/images/logo-dark.svg" : "/images/logo-light.svg";
  const sectionIds = useMemo(
    () => ["hero", "features", "innovation", "timeline", "team", "integrations"],
    [],
  );

  const handleHomeClick = (event: React.MouseEvent) => {
    handleSectionClick("hero", event);
  };

  // Add smooth scroll handler for navigation links
  const handleSectionClick = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();

    // If we're not on the home page, navigate there first
    if (location.pathname !== "/") {
      navigate("/", { replace: true });
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // If we're already on the home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setActiveSection(sectionId);
    }

    // Close mobile menu if open
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 6);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const originalOverflow = document.body.style.overflow;

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow || "";
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileMenuOpen]);


  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const header = document.querySelector("header");
    const getOffset = () =>
      (header ? header.getBoundingClientRect().height : 72) + 24;

    const updateActiveSection = () => {
      const offset = getOffset();
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top - offset <= 0 && rect.bottom - offset > 0) {
          current = id;
          break;
        }
        if (rect.top - offset > 0) {
          break;
        }
      }

      setActiveSection((prev) => (prev === current ? prev : current));
    };

    let ticking = false;
    const handle = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", handle, { passive: true });
    window.addEventListener("resize", handle);
    return () => {
      window.removeEventListener("scroll", handle);
      window.removeEventListener("resize", handle);
    };
  }, [location.pathname, sectionIds]);

  const isHomeRoute = location.pathname === "/";
  const isFeaturesActive =
    isHomeRoute && ["features", "innovation"].includes(activeSection);
  const isTeamActive = isHomeRoute && activeSection === "team";
  const isIndustryActive = isHomeRoute && activeSection === "integrations";

  const headerClasses = cn(
    "sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-300 ease-out",
    isScrolled
      ? "bg-background/90 border-[color:var(--color-border-strong)] shadow-[var(--shadow-sm)]"
      : "bg-background/95 border-[color:var(--color-border-subtle)] shadow-none",
  );

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === "/") {
      event.preventDefault();
      window.location.reload();
    } else {
      setMobileMenuOpen(false);
      navigate("/", { replace: false });
    }
  };

  const navItems = [
    { id: "hero", label: "Home", kind: "section" as const, icon: Home },
    { id: "features", label: "Features", kind: "section" as const, icon: Sparkles },
    { id: "team", label: "Team", kind: "section" as const, icon: Users },
    { id: "integrations", label: "Industry Solutions", kind: "section" as const, icon: HeartHandshake },
    { id: "products", label: "3D Products", kind: "route" as const, href: "/3d-products", icon: ShoppingCart },
  ];

  const isNavItemActive = (item: (typeof navItems)[number]) => {
    if (item.kind === "route") {
      return location.pathname === item.href;
    }

    switch (item.id) {
      case "hero":
        return isHomeRoute && activeSection === "hero";
      case "features":
        return isFeaturesActive;
      case "team":
        return isTeamActive;
      case "integrations":
        return isIndustryActive;
      default:
        return false;
    }
  };

  return (
    <header className={headerClasses}>
      <div
        className={cn(
          "container mx-auto flex items-center justify-between px-3 sm:px-4 transition-[padding] duration-300 ease-out",
          isScrolled ? "py-2 sm:py-2" : "py-2.5 sm:py-3"
        )}
      >
        <Link
          to="/"
          className="flex items-center gap-2 sm:gap-3"
          onClick={handleLogoClick}
        >
          <img
            src={preferredLogo}
            alt="xEmergence Logo"
            className="h-6 w-auto sm:h-7 object-contain transition-transform duration-300 ease-out hover:scale-[1.02]"
            onError={(e) => {
              if (!e.currentTarget.src.includes("logo-black.png")) {
                e.currentTarget.src = fallbackLogo;
              }
            }}
          />
          <span className="text-base sm:text-lg font-bold text-foreground">xEmergence</span>
        </Link>

        {/* Mobile menu button */}
        <button
          type="button"
          className="p-3 text-foreground transition-colors hover:text-primary focus:outline-none md:hidden"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden flex-1 items-center justify-center space-x-7 md:flex">
          <Link
            to="/"
            onClick={handleHomeClick}
            className={cn(
              "flex items-center gap-2 text-[1.08rem] font-normal tracking-tight transition-colors",
              isHomeRoute
                ? activeSection === "hero"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground dark:text-white dark:hover:text-primary"
                : isActive("/")
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground dark:text-white dark:hover:text-primary",
            )}
          >
            <Home className="h-4 w-4" />
            <span className="hidden lg:inline">Home</span>
          </Link>
          <a
            href="#features"
            onClick={(e) => handleSectionClick("features", e)}
            className={cn(
              "flex items-center gap-2 cursor-pointer text-[1.08rem] font-normal tracking-tight transition-colors",
              isFeaturesActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground dark:text-white dark:hover:text-primary",
            )}
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden lg:inline">Features</span>
          </a>
          <a
            href="#team"
            onClick={(e) => handleSectionClick("team", e)}
            className={cn(
              "flex items-center gap-2 cursor-pointer text-[1.08rem] font-normal tracking-tight transition-colors",
              isTeamActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground dark:text-white dark:hover:text-primary",
            )}
          >
            <Users className="h-4 w-4" />
            <span className="hidden lg:inline">Team</span>
          </a>
          <a
            href="#integrations"
            onClick={(e) => handleSectionClick("integrations", e)}
            className={cn(
              "flex items-center gap-2 cursor-pointer text-[1.08rem] font-normal tracking-tight transition-colors",
              isIndustryActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground dark:text-white dark:hover:text-primary",
            )}
          >
            <HeartHandshake className="h-4 w-4" />
            <span className="hidden lg:inline">Industry Solutions</span>
          </a>
          <span className="hidden text-[0.95rem] text-muted-foreground dark:text-white/60 lg:inline">|</span>
          <Link
            to="/3d-products"
            className={cn(
              "flex items-center gap-2 text-[1.08rem] font-normal tracking-tight transition-colors",
              isActive("/3d-products") ? "text-primary" : "text-muted-foreground hover:text-foreground dark:text-white dark:hover:text-primary",
            )}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden lg:inline">3D Products</span>
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="w-full border-t border-border/60 bg-background/98 p-4 shadow-lg shadow-primary/10 backdrop-blur-xl md:hidden"
          >
              <nav className="flex flex-col space-y-3 text-foreground">
                <Link
                  to="/"
                  onClick={(event) => {
                    handleHomeClick(event);
                    setMobileMenuOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-3 text-base font-normal transition-colors",
                    isHomeRoute
                      ? activeSection === "hero"
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground dark:text-white dark:hover:text-primary"
                      : isActive("/")
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground dark:text-white dark:hover:text-primary",
                  )}
                >
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>
                <a
                  href="#features"
                  onClick={(e) => handleSectionClick("features", e)}
                  className={cn(
                    "flex items-center gap-3 cursor-pointer text-base font-normal transition-colors",
                    isFeaturesActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground dark:text-white dark:hover:text-primary",
                  )}
                >
                  <Sparkles className="h-5 w-5" />
                  <span>Features</span>
                </a>
                <a
                  href="#team"
                  onClick={(e) => handleSectionClick("team", e)}
                  className={cn(
                    "flex items-center gap-3 cursor-pointer text-base font-normal transition-colors",
                    isTeamActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground dark:text-white dark:hover:text-primary",
                  )}
                >
                  <Users className="h-5 w-5" />
                  <span>Team</span>
                </a>
                <a
                  href="#integrations"
                  onClick={(e) => handleSectionClick("integrations", e)}
                  className={cn(
                    "flex items-center gap-3 cursor-pointer text-base font-normal transition-colors",
                    isIndustryActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground dark:text-white dark:hover:text-primary",
                  )}
                >
                  <HeartHandshake className="h-5 w-5" />
                  <span>Industry Solutions</span>
                </a>
                <div className="mt-4 border-t border-border/60 pt-4">
                  <Link
                    to="/3d-products"
                    className={cn(
                      "flex items-center gap-3 text-base font-normal transition-colors",
                      isActive("/3d-products") ? "text-primary" : "text-muted-foreground hover:text-foreground dark:text-white dark:hover:text-primary"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>3D Products</span>
                  </Link>
                </div>
                <div className="pt-2">
                  <ThemeToggle />
                </div>
              </nav>
            </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;

