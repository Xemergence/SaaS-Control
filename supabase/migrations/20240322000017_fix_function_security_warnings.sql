-- Fix Function Search Path Mutable warnings and other security issues

-- Note: Auth configuration is managed through Supabase dashboard/API, not database
-- Removing setup_email_confirmation function as it tries to access non-existent auth.config table

-- Fix log_sign_in function with secure search path
CREATE OR REPLACE FUNCTION public.log_sign_in()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Log successful sign-ins
  INSERT INTO public.sign_in_logs (
    user_id,
    email,
    success,
    ip_address,
    user_agent
  ) VALUES (
    NEW.id,
    NEW.email,
    true,
    NEW.last_sign_in_at::text,
    'system'
  );
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Don't fail the sign-in if logging fails
    RETURN NEW;
END;
$$;

-- Update handle_new_user function with secure search path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_email text;
  user_name text;
BEGIN
  -- Get user details
  user_email := NEW.email;
  user_name := COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(user_email, '@', 1));
  
  -- Insert into public.users table
  INSERT INTO public.users (
    id,
    email,
    full_name,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    user_email,
    user_name,
    NOW(),
    NOW()
  ) ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, users.full_name),
    updated_at = NOW();
  
  -- Insert into user_profiles table
  INSERT INTO public.user_profiles (
    id,
    role,
    subscription_tier,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    'user',
    'free',
    NOW(),
    NOW()
  ) ON CONFLICT (id) DO UPDATE SET
    updated_at = NOW();
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the user creation
    RAISE LOG 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$;

-- Recreate triggers to ensure they use the updated functions
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

DROP TRIGGER IF EXISTS on_auth_user_signin ON auth.users;
CREATE TRIGGER on_auth_user_signin
  AFTER UPDATE OF last_sign_in_at ON auth.users
  FOR EACH ROW 
  WHEN (OLD.last_sign_in_at IS DISTINCT FROM NEW.last_sign_in_at)
  EXECUTE FUNCTION public.log_sign_in();

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO supabase_auth_admin;
GRANT EXECUTE ON FUNCTION public.log_sign_in() TO supabase_auth_admin;

-- Note: Auth configuration (JWT expiry, password requirements, etc.) 
-- must be managed through Supabase dashboard or Management API
-- Cannot be set via direct database access

-- Ensure RLS is properly configured
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sign_in_logs ENABLE ROW LEVEL SECURITY;

-- Update RLS policies to be more secure
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema';