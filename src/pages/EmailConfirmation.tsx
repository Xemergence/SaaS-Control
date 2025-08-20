import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmailConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        // Log all search params for debugging
        const allParams: Record<string, string> = {};
        searchParams.forEach((value, key) => {
          allParams[key] = value;
        });
        console.log("All URL parameters:", allParams);
        setDebugInfo(allParams);

        // Handle error parameters from URL first
        const error = searchParams.get("error");
        const errorDescription = searchParams.get("error_description");
        const errorCode = searchParams.get("error_code");

        if (error) {
          console.error("Email confirmation error from URL:", {
            error,
            errorDescription,
            errorCode,
          });

          // If we get a database error, we can try to sign in anyway
          if (
            error === "server_error" &&
            errorDescription?.includes("Database error granting user") &&
            retryCount < 3
          ) {
            // Try to get the session directly - the user might be created in auth but had issues with the profile
            const { data: sessionData } = await supabase.auth.getSession();

            if (sessionData.session) {
              console.log("User already has a session despite database error");
              setStatus("success");
              setMessage(
                "Email confirmed successfully! You are now signed in.",
              );

              // Redirect to home page after a short delay
              setTimeout(() => {
                navigate("/");
              }, 1500);
              return;
            }

            // Increment retry count and try again
            setRetryCount((prev) => prev + 1);
            setMessage("Retrying email confirmation...");

            // Wait a moment before retrying
            setTimeout(() => {
              window.location.reload();
            }, 2000);
            return;
          }

          setStatus("error");

          // Provide more specific error messages
          if (
            error === "server_error" &&
            errorDescription?.includes("Database error granting user")
          ) {
            setMessage(
              "There was a temporary issue with your account setup. Please try signing in with your email and password, or contact support if the issue persists.",
            );
          } else {
            setMessage(
              decodeURIComponent(errorDescription || error).replace(/\+/g, " "),
            );
          }
          return;
        }

        // Check if user is already authenticated
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (session && session.user) {
          console.log("User already has a session:", session.user.id);
          
          // Check if email is confirmed
          if (session.user.email_confirmed_at) {
            console.log("Email already confirmed at:", session.user.email_confirmed_at);
            
            // Create user profile entry in public.users table first
            const { error: userInsertError } = await supabase
              .from("users")
              .upsert(
                [
                  {
                    id: session.user.id,
                    email: session.user.email!,
                    full_name: session.user.user_metadata?.full_name || null,
                    avatar_url: session.user.user_metadata?.avatar_url || null,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                  },
                ],
                { onConflict: "id" },
              );

            if (userInsertError) {
              console.error("Error creating user entry:", userInsertError);
            }

            // Verify that the user profile exists
            const { data: profileData, error: profileError } = await supabase
              .from("user_profiles")
              .select("*")
              .eq("id", session.user.id)
              .single();

            if (profileError || !profileData) {
              console.log("User profile not found, creating it manually");

              // Try to create the user profile manually
              const { error: insertError } = await supabase
                .from("user_profiles")
                .upsert(
                  [
                    {
                      id: session.user.id,
                      role: "user",
                      subscription_tier: "free",
                      created_at: new Date().toISOString(),
                      updated_at: new Date().toISOString(),
                    },
                  ],
                  { onConflict: "id" },
                );

              if (insertError) {
                console.error("Error creating user profile:", insertError);
              }
            }

            setStatus("success");
            setMessage("Email confirmed successfully! You are now signed in.");
            setTimeout(() => {
              navigate("/");
            }, 1500);
            return;
          } else {
            console.log("User session exists but email not confirmed yet");
          }
        }

        // Handle token-based confirmation
        const token_hash = searchParams.get("token_hash");
        const type = searchParams.get("type") || "signup";
        
        // Also check URL hash for token (fallback)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get("access_token");
        
        // Also check for confirmation_token in the URL
        const confirmationToken = searchParams.get("confirmation_token");
        
        // Try all possible token sources
        const finalToken = token_hash || accessToken || confirmationToken;

        if (!finalToken) {
          setStatus("error");
          setMessage(
            "Invalid or missing confirmation token. Please check your email for the correct confirmation link.",
          );
          return;
        }

        console.log("Attempting to verify token:", {
          type,
          hasToken: !!finalToken,
          tokenSource: token_hash ? "token_hash" : accessToken ? "access_token" : "confirmation_token",
        });

        // Try different verification methods
        let verificationResult;
        
        // First try verifyOtp
        try {
          verificationResult = await supabase.auth.verifyOtp({
            token_hash: finalToken,
            type: type as any,
          });
        } catch (verifyError) {
          console.error("OTP verification error:", verifyError);
          
          // If that fails, try to exchange the token for a session
          try {
            verificationResult = await supabase.auth.exchangeCodeForSession(finalToken);
          } catch (exchangeError) {
            console.error("Token exchange error:", exchangeError);
            verificationResult = { data: {}, error: exchangeError };
          }
        }

        const { data, error: verifyError } = verificationResult;

        if (verifyError) {
          console.error("Token verification error:", verifyError);
          setStatus("error");

          // Provide more helpful error messages
          if (verifyError.message.includes("expired")) {
            setMessage(
              "Your confirmation link has expired. Please request a new confirmation email.",
            );
          } else if (verifyError.message.includes("invalid")) {
            setMessage(
              "Invalid confirmation link. Please check your email for the correct link or request a new one.",
            );
          } else {
            setMessage(verifyError.message);
          }
          return;
        }

        // Check if we have a user from the verification
        const user = data.user || (data.session && data.session.user);

        if (user) {
          console.log("Email confirmation successful:", user.id);

          // Create user profile entry in public.users table first
          const { error: userInsertError } = await supabase
            .from("users")
            .upsert(
              [
                {
                  id: user.id,
                  email: user.email!,
                  full_name: user.user_metadata?.full_name || null,
                  avatar_url: user.user_metadata?.avatar_url || null,
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                },
              ],
              { onConflict: "id" },
            );

          if (userInsertError) {
            console.error("Error creating user entry:", userInsertError);
          }

          // Verify that the user profile exists
          const { data: profileData, error: profileError } = await supabase
            .from("user_profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (profileError || !profileData) {
            console.log("User profile not found, creating it manually");

            // Try to create the user profile manually
            const { error: insertError } = await supabase
              .from("user_profiles")
              .upsert(
                [
                  {
                    id: user.id,
                    role: "user",
                    subscription_tier: "free",
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                  },
                ],
                { onConflict: "id" },
              );

            if (insertError) {
              console.error("Error creating user profile:", insertError);
            }
          }

          setStatus("success");
          setMessage("Email confirmed successfully! You are now signed in.");

          // Redirect to home page after 2 seconds
          setTimeout(() => {
            navigate("/");
          }, 1500);
        } else {
          setStatus("error");
          setMessage(
            "Failed to confirm email. Please try again or contact support.",
          );
        }
      } catch (error: any) {
        console.error("Email confirmation error:", error);
        setStatus("error");
        setMessage(
          "An unexpected error occurred during email confirmation. Please try again or contact support.",
        );
      }
    };

    confirmEmail();
  }, [searchParams, navigate, retryCount]);

  return (
    <div className="min-h-screen bg-[#121219] text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#1a1e2d] rounded-lg p-8 text-center border border-gray-700">
        {status === "loading" && (
          <>
            <Loader2 className="h-16 w-16 animate-spin text-purple-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Confirming Email</h1>
            <p className="text-gray-400">
              {retryCount > 0
                ? `Retrying email confirmation (attempt ${retryCount}/3)...`
                : "Please wait while we confirm your email address..."}
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2 text-green-400">
              Email Confirmed!
            </h1>
            <p className="text-gray-400 mb-6">{message}</p>
            <p className="text-sm text-gray-500 mb-4">
              Redirecting you to the home page...
            </p>
            <Button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Go to Home Page
            </Button>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2 text-red-400">
              Confirmation Failed
            </h1>
            <p className="text-gray-400 mb-6">{message}</p>
            {debugInfo && (
              <div className="mb-4 text-left p-2 bg-gray-800 rounded text-xs overflow-auto max-h-32">
                <p className="font-bold mb-1">Debug Info:</p>
                <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
              </div>
            )}
            <div className="space-y-3">
              <Button
                onClick={() => navigate("/")}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Return to Home
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="w-full border-gray-600 text-white hover:bg-gray-700"
              >
                Try Again
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailConfirmation;