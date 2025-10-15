import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

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
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#121219]/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/images/logo-black.png"
            alt="Logo"
            className="h-10 w-10 rounded-full border border-gray-700 object-cover bg-black"
          />
          <span className="text-xl font-bold">xEmergence</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center space-x-6 flex-1">
          <Link
            to="/"
            className={`text-sm transition-colors ${isActive("/") ? "text-purple-400" : "text-white hover:text-purple-400"}`}
          >
            Home
          </Link>
          <a
            href="#features"
            onClick={(e) => handleSectionClick("features", e)}
            className="text-sm text-white hover:text-purple-400 transition-colors cursor-pointer"
          >
            Features
          </a>
          <a
            href="#pricing"
            onClick={(e) => handleSectionClick("pricing", e)}
            className="text-sm text-white hover:text-purple-400 transition-colors cursor-pointer"
          >
            Pricing
          </a>
          <a
            href="#team"
            onClick={(e) => handleSectionClick("team", e)}
            className="text-sm text-white hover:text-purple-400 transition-colors cursor-pointer"
          >
            Team
          </a>
          <div className="h-4 w-px bg-gray-600 mx-2"></div>
          <Link
            to="/3d-products"
            className={`text-sm transition-colors ${isActive("/3d-products") ? "text-purple-400" : "text-white hover:text-purple-400"}`}
          >
            3D Products
          </Link>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#1a1e2d] border-t border-gray-800 p-4 shadow-lg">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`text-sm transition-colors ${isActive("/") ? "text-purple-400" : "text-white hover:text-purple-400"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <a
                href="#features"
                onClick={(e) => handleSectionClick("features", e)}
                className="text-sm text-white hover:text-purple-400 transition-colors cursor-pointer"
              >
                Features
              </a>
              <a
                href="#pricing"
                onClick={(e) => handleSectionClick("pricing", e)}
                className="text-sm text-white hover:text-purple-400 transition-colors cursor-pointer"
              >
                Pricing
              </a>
              <a
                href="#team"
                onClick={(e) => handleSectionClick("team", e)}
                className="text-sm text-white hover:text-purple-400 transition-colors cursor-pointer"
              >
                Team
              </a>
              <div className="border-t border-gray-700 pt-4 mt-4">
                <Link
                  to="/3d-products"
                  className={`text-sm transition-colors ${isActive("/3d-products") ? "text-purple-400" : "text-white hover:text-purple-400"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  3D Products
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
