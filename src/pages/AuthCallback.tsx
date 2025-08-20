import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Log all search params for debugging
        const allParams: Record<string, string> = {};
        searchParams.forEach((value, key) => {
          allParams[key] = value;
        });
        console.log("All URL parameters:", allParams);
        setDebugInfo(allParams);

        // First check for error parameters in the URL
        const error = searchParams.get("error");
        const errorDescription = searchParams.get("error_description");
        const errorCode = searchParams.get("error_code");

        if (error) {
          console.error("Auth callback error from URL:", {
            error,
            errorDescription,
            errorCode,
          });

          // If we get a database error but have a code, we can try to sign in anyway
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
              setMessage("Authentication successful! You are now signed in.");

              // Redirect to home page after a short delay
              setTimeout(() => {
                navigate("/");
              }, 1500);
              return;
            }

            // Increment retry count and try again
            setRetryCount((prev) => prev + 1);
            setMessage("Retrying authentication...");

            // Wait a moment before retrying
            setTimeout(() => {
              window.location.reload();
            }, 2000);
            return;
          }

          setStatus("error");

          // Provide specific error messages based on the error type
          if (
            error === "server_error" &&
            errorDescription?.includes("Database error granting user")
          ) {
            setMessage(
              "There was an issue setting up your account in our database. Please try signing in with your email and password, or contact support if the problem persists.",
            );
          } else {
            setMessage(
              decodeURIComponent(errorDescription || error).replace(
                /\+/g,
                " ",
              ) ||
                "An authentication error occurred. Please try signing in again.",
            );
          }
          return;
        }

        // Get the code from the URL for successful authentication
        const code = searchParams.get("code");

        if (!code) {
          setStatus("error");
          setMessage(
            "No authentication code found in the URL. Please try signing in again.",
          );
          return;
        }

        console.log("Attempting to exchange code for session");

        // Exchange the code for a session
        const { data, error: exchangeError } =
          await supabase.auth.exchangeCodeForSession(code);

        if (exchangeError) {
          console.error("Error exchanging code for session:", exchangeError);
          setStatus("error");
          setMessage(
            exchangeError.message ||
              "Failed to authenticate. Please try signing in again.",
          );
          return;
        }

        if (data.session) {
          console.log(
            "Authentication successful for user:",
            data.session.user.id,
          );

          try {
            // Create user profile entry in public.users table first
            const { error: userInsertError } = await supabase
              .from("users")
              .upsert(
                [
                  {
                    id: data.session.user.id,
                    email: data.session.user.email!,
                    full_name: data.session.user.user_metadata?.full_name || null,
                    avatar_url:
                      data.session.user.user_metadata?.avatar_url || null,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                  },
                ],
                { onConflict: "id" },
              );

            if (userInsertError) {
              console.error("Error creating user entry:", userInsertError);
            }
          } catch (err) {
            console.error("Error during user creation:", err);
          }

          try {
            // Verify that the user profile exists
            const { data: profileData, error: profileError } = await supabase
              .from("user_profiles")
              .select("*")
              .eq("id", data.session.user.id)
              .single();

            if (profileError || !profileData) {
              console.log("User profile not found, creating it manually");

              // Try to create the user profile manually
              const { error: insertError } = await supabase
                .from("user_profiles")
                .upsert(
                  [
                    {
                      id: data.session.user.id,
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
          } catch (err) {
            console.error("Error during profile check/creation:", err);
          }

          setStatus("success");
          setMessage("Authentication successful! You are now signed in.");

          // Redirect to home page after a short delay
          setTimeout(() => {
            navigate("/");
          }, 1500);
        } else {
          setStatus("error");
          setMessage("Failed to create session. Please try signing in again.");
        }
      } catch (error: any) {
        console.error("Auth callback error:", error);
        setStatus("error");
        setMessage(
          "An unexpected error occurred. Please try signing in again.",
        );
      }
    };

    handleCallback();
  }, [searchParams, navigate, retryCount]);

  return (
    <div className="min-h-screen bg-[#121219] text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#1a1e2d] rounded-lg p-8 text-center border border-gray-700">
        {status === "loading" && (
          <>
            <Loader2 className="h-16 w-16 animate-spin text-purple-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Authenticating</h1>
            <p className="text-gray-400">
              {retryCount > 0
                ? `Retrying authentication (attempt ${retryCount}/3)...`
                : "Please wait while we complete your authentication..."}
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2 text-green-400">
              Authentication Successful!
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
              Authentication Failed
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

export default AuthCallback;