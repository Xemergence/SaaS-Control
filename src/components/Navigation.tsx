import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, User, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";
import AuthDialog from "@/components/auth/AuthDialog";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#121219]">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
            xE
          </div>
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
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`text-sm transition-colors ${isActive("/") ? "text-purple-400" : "text-white hover:text-purple-400"}`}
          >
            Home
          </Link>
          <a
            href="#features"
            className="text-sm text-white hover:text-purple-400 transition-colors"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-sm text-white hover:text-purple-400 transition-colors"
          >
            Pricing
          </a>
          <a
            href="#team"
            className="text-sm text-white hover:text-purple-400 transition-colors"
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

        <div className="hidden md:flex items-center gap-3">
          {loading ? (
            <div className="h-9 w-20 bg-gray-700 animate-pulse rounded"></div>
          ) : user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1e2d] rounded-lg border border-gray-700">
                <User className="h-4 w-4 text-purple-400" />
                <span className="text-sm text-white">
                  {user.user_metadata?.full_name || user.email?.split("@")[0]}
                </span>
              </div>
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <AuthDialog
                mode="signin"
                trigger={
                  <Button
                    variant="ghost"
                    className="text-white hover:text-purple-400 hover:bg-transparent"
                  >
                    Sign In
                  </Button>
                }
              />
              <AuthDialog
                mode="signup"
                trigger={
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                    Sign Up
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                }
              />
            </div>
          )}
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
              <a
                href="#features"
                className="text-sm text-white hover:text-purple-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-sm text-white hover:text-purple-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#team"
                className="text-sm text-white hover:text-purple-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
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
              {user ? (
                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#121219] rounded-lg">
                    <User className="h-4 w-4 text-purple-400" />
                    <span className="text-sm text-white">
                      {user.user_metadata?.full_name ||
                        user.email?.split("@")[0]}
                    </span>
                  </div>
                  <Button
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300 hover:text-white"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 pt-4">
                  <AuthDialog
                    mode="signin"
                    trigger={
                      <Button
                        variant="outline"
                        className="w-full border-gray-600 text-white hover:text-purple-400"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign In
                      </Button>
                    }
                  />
                  <AuthDialog
                    mode="signup"
                    trigger={
                      <Button
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 w-full"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign Up
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    }
                  />
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
