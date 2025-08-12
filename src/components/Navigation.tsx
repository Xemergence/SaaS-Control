import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#121219]">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
            xE
          </div>
          <span className="text-xl font-bold">xEmergence</span>
        </div>

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
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`text-sm transition-colors ${isActive("/") ? "text-purple-400" : "text-white hover:text-purple-400"}`}
          >
            Home
          </Link>
          <Link
            to="/#features"
            className="text-sm text-white hover:text-purple-400 transition-colors"
          >
            Features
          </Link>
          <Link
            to="/#pricing"
            className="text-sm text-white hover:text-purple-400 transition-colors"
          >
            Pricing
          </Link>
          <Link
            to="/#team"
            className="text-sm text-white hover:text-purple-400 transition-colors"
          >
            Team
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/3d-products"
            className={`text-sm transition-colors ${isActive("/3d-products") ? "text-purple-400" : "text-white hover:text-purple-400"}`}
          >
            3D Products
          </Link>
          <Button className="bg-purple-600 hover:bg-purple-700">
            Sign Up
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

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
              <Link
                to="/#features"
                className="text-sm text-white hover:text-purple-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                to="/#pricing"
                className="text-sm text-white hover:text-purple-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="/#team"
                className="text-sm text-white hover:text-purple-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Team
              </Link>
              <Link
                to="/3d-products"
                className={`text-sm transition-colors ${isActive("/3d-products") ? "text-purple-400" : "text-white hover:text-purple-400"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                3D Products
              </Link>
              <Button
                className="bg-purple-600 hover:bg-purple-700 w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
