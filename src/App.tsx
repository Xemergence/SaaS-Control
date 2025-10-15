import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import ProductStore from "./pages/ProductStore";
import AdminDashboard from "./pages/AdminDashboard";
import OrderTracking from "./pages/OrderTracking";
import AccountOverview from "./pages/AccountOverview";
import Navigation from "./components/Navigation";
import {
  supabase,
  getUserProfile,
  canAccessDashboard,
  type UserProfile,
} from "./lib/supabase";
import type { User } from "@supabase/supabase-js";
import EmailConfirmation from "./pages/EmailConfirmation";
import AuthCallback from "./pages/AuthCallback";
import NFCKeychains from "./pages/NFCKeychains";

// Protected Route Component
const ProtectedRoute = ({
  children,
  requiresAuth = true,
  requiresDashboardAccess = false,
}: {
  children: React.ReactNode;
  requiresAuth?: boolean;
  requiresDashboardAccess?: boolean;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(session?.user ?? null);

        if (session?.user) {
          const profile = await getUserProfile(session.user.id);
          setUserProfile(profile);
        }
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

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

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (requiresAuth && !user) {
    return <Navigate to="/" replace />;
  }

  if (requiresDashboardAccess && !canAccessDashboard(userProfile)) {
    return <Navigate to="/orders" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <div className="min-h-screen bg-[#121219] text-white">
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/3d-products" element={<ProductStore />} />
          <Route path="/nfc-keychains" element={<NFCKeychains />} />
          <Route path="/auth/confirm" element={<EmailConfirmation />} />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                requiresAuth={true}
                requiresDashboardAccess={true}
              >
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute requiresAuth={true}>
                <OrderTracking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute requiresAuth={true}>
                <AccountOverview />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
