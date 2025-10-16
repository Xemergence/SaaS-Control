import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path;
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
    }

    // Close mobile menu if open
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/90 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/images/logo-black.png"
            alt="Logo"
            className="h-10 w-10 rounded-full border border-border/60 bg-muted object-cover"
          />
          <span className="text-xl font-bold text-foreground">xEmergence</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="text-foreground transition-colors hover:text-primary focus:outline-none md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden flex-1 items-center justify-center space-x-6 md:flex">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors ${isActive("/") ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            Home
          </Link>
          <a
            href="#features"
            onClick={(e) => handleSectionClick("features", e)}
            className="cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </a>
          <a
            href="#pricing"
            onClick={(e) => handleSectionClick("pricing", e)}
            className="cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </a>
          <a
            href="#team"
            onClick={(e) => handleSectionClick("team", e)}
            className="cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Team
          </a>
          <div className="mx-2 h-4 w-px bg-border/60" />
          <Link
            to="/3d-products"
            className={`text-sm font-medium transition-colors ${isActive("/3d-products") ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            3D Products
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="absolute left-0 right-0 top-full border-t border-border/60 bg-background/98 p-4 shadow-lg shadow-primary/10 md:hidden">
            <nav className="flex flex-col space-y-4 text-foreground">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors ${isActive("/") ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <a
                href="#features"
                onClick={(e) => handleSectionClick("features", e)}
                className="cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Features
              </a>
              <a
                href="#pricing"
                onClick={(e) => handleSectionClick("pricing", e)}
                className="cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Pricing
              </a>
              <a
                href="#team"
                onClick={(e) => handleSectionClick("team", e)}
                className="cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Team
              </a>
              <div className="mt-4 border-t border-border/60 pt-4">
                <Link
                  to="/3d-products"
                  className={`text-sm font-medium transition-colors ${isActive("/3d-products") ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  3D Products
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
