import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, ArrowRight, User, LogOut, BarChart3, Settings, Crown, Star } from "lucide-react";
import { supabase, getUserProfile, canAccessDashboard, type UserProfile } from "@/lib/supabase";
import AuthDialog from "@/components/auth/AuthDialog";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Add smooth scroll handler for navigation links
  const handleSectionClick = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If we're already on the home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    // Close mobile menu if open
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    loadUserData();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const profile = await getUserProfile(session.user.id);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserData = async () => {
    try {
      // Get initial session
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const profile = await getUserProfile(session.user.id);
        setUserProfile(profile);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setMobileMenuOpen(false);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="h-4 w-4 text-red-400" />;
      case 'subadmin': return <Star className="h-4 w-4 text-purple-400" />;
      default: return <User className="h-4 w-4 text-blue-400" />;
    }
  };

  const getUserDisplayName = () => {
    return userProfile?.full_name || user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  };

  const getUserInitials = () => {
    const name = getUserDisplayName();
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
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
            onClick={(e) => handleSectionClick('features', e)}
            className="text-sm text-white hover:text-purple-400 transition-colors cursor-pointer"
          >
            Features
          </a>
          <a
            href="#pricing"
            onClick={(e) => handleSectionClick('pricing', e)}
            className="text-sm text-white hover:text-purple-400 transition-colors cursor-pointer"
          >
            Pricing
          </a>
          <a
            href="#team"
            onClick={(e) => handleSectionClick('team', e)}
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

        <div className="hidden md:flex items-center gap-3">
          {loading ? (
            <div className="h-9 w-20 bg-gray-700 animate-pulse rounded"></div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 hover:bg-gray-800">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={userProfile?.avatar_url} />
                    <AvatarFallback className="bg-purple-600 text-white text-sm">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-gray-900 border-gray-700" align="end">
                <div className="flex items-center gap-3 p-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={userProfile?.avatar_url} />
                    <AvatarFallback className="bg-purple-600 text-white">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {getUserDisplayName()}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {getRoleIcon(userProfile?.role || 'user')}
                      <span className="text-xs text-gray-400 capitalize">
                        {userProfile?.role || 'user'}
                      </span>
                    </div>
                  </div>
                </div>
                <DropdownMenuSeparator className="bg-gray-700" />
                
                {canAccessDashboard(userProfile) && (
                  <DropdownMenuItem asChild>
                    <Link 
                      to="/dashboard" 
                      className="flex items-center gap-2 text-white hover:bg-gray-800 cursor-pointer"
                    >
                      <BarChart3 className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                
                <DropdownMenuItem asChild>
                  <Link 
                    to="/orders" 
                    className="flex items-center gap-2 text-white hover:bg-gray-800 cursor-pointer"
                  >
                    <User className="h-4 w-4" />
                    Track Orders
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuItem asChild>
                  <Link 
                    to="/account" 
                    className="flex items-center gap-2 text-white hover:bg-gray-800 cursor-pointer"
                  >
                    <Settings className="h-4 w-4" />
                    Account Overview
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem 
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-red-400 hover:bg-gray-800 cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                onClick={(e) => handleSectionClick('features', e)}
                className="text-sm text-white hover:text-purple-400 transition-colors cursor-pointer"
              >
                Features
              </a>
              <a
                href="#pricing"
                onClick={(e) => handleSectionClick('pricing', e)}
                className="text-sm text-white hover:text-purple-400 transition-colors cursor-pointer"
              >
                Pricing
              </a>
              <a
                href="#team"
                onClick={(e) => handleSectionClick('team', e)}
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
              
              {user ? (
                <div className="space-y-3 pt-4 border-t border-gray-700">
                  <div className="flex items-center gap-3 px-3 py-2 bg-[#121219] rounded-lg">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userProfile?.avatar_url} />
                      <AvatarFallback className="bg-purple-600 text-white text-xs">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{getUserDisplayName()}</p>
                      <div className="flex items-center gap-1">
                        {getRoleIcon(userProfile?.role || 'user')}
                        <span className="text-xs text-gray-400 capitalize">
                          {userProfile?.role || 'user'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {canAccessDashboard(userProfile) && (
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <BarChart3 className="h-4 w-4" />
                      Dashboard
                    </Link>
                  )}
                  
                  <Link
                    to="/orders"
                    className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    Track Orders
                  </Link>
                  
                  <Link
                    to="/account"
                    className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4" />
                    Account Overview
                  </Link>
                  
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="w-full border-red-600 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 pt-4 border-t border-gray-700">
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