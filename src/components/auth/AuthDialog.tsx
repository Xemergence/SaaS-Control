import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { ArrowRight, Mail, Lock, User, Loader2 } from "lucide-react";

interface AuthDialogProps {
  mode: "signin" | "signup";
  trigger: React.ReactNode;
}

const AuthDialog = ({ mode, trigger }: AuthDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [currentMode, setCurrentMode] = useState(mode);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (currentMode === "signup") {
        // Use environment-based redirect URL
        const baseUrl = window.location.origin;
        const redirectUrl = `${baseUrl}/auth/callback`;

        console.log("Using redirect URL:", redirectUrl);

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
            emailRedirectTo: redirectUrl,
          },
        });

        if (error) {
          // Handle specific signup errors
          if (error.message.includes("already registered")) {
            setError(
              "An account with this email already exists. Please sign in instead.",
            );
            // Automatically switch to sign-in mode
            setTimeout(() => {
              setCurrentMode("signin");
              setError("");
              setMessage("Please sign in with your existing account.");
            }, 2000);
            return;
          }
          throw error;
        }

        if (data.user) {
          if (data.user.email_confirmed_at) {
            // User is immediately confirmed (email confirmation disabled)
            setMessage("Account created successfully! You are now signed in.");
            setTimeout(() => {
              setOpen(false);
              window.location.reload();
            }, 1500);
          } else {
            // Email confirmation required
            setMessage(
              "Account created! Please check your email and click the confirmation link to complete your registration. You can then sign in.",
            );
            // Switch to sign-in mode after showing the message
            setTimeout(() => {
              setCurrentMode("signin");
              setMessage("Please sign in after confirming your email.");
            }, 3000);
          }
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          // Handle specific sign-in errors
          if (error.message.includes("Invalid login credentials")) {
            setError(
              "Invalid email or password. Please check your credentials and try again.",
            );
          } else if (error.message.includes("Email not confirmed")) {
            setError(
              "Please confirm your email address before signing in. Check your inbox for the confirmation link.",
            );
          } else {
            setError(error.message);
          }
          return;
        }

        setMessage("Successfully signed in!");
        setTimeout(() => {
          setOpen(false);
          window.location.reload();
        }, 1000);
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      setError(
        error.message || "An unexpected error occurred. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setFullName("");
    setMessage("");
    setError("");
    setCurrentMode(mode);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) resetForm();
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-[#1a1e2d] border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {currentMode === "signup" ? "Create Account" : "Welcome Back"}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-400">
            {currentMode === "signup"
              ? "Join xEmergence to transform your business data"
              : "Sign in to access your dashboard"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {currentMode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10 bg-[#121219] border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-[#121219] border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-[#121219] border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                required
                minLength={6}
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-md bg-red-900/20 border border-red-500/20">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {message && (
            <div className="p-3 rounded-md bg-green-900/20 border border-green-500/20">
              <p className="text-sm text-green-400">{message}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {currentMode === "signup"
                  ? "Creating Account..."
                  : "Signing In..."}
              </>
            ) : (
              <>
                {currentMode === "signup" ? "Create Account" : "Sign In"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        <div className="text-center text-sm text-gray-400">
          {currentMode === "signup" ? (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setCurrentMode("signin");
                  setError("");
                  setMessage("");
                }}
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                Sign in
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setCurrentMode("signup");
                  setError("");
                  setMessage("");
                }}
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                Sign up
              </button>
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
