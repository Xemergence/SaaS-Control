-- Fix email confirmation and user creation issues
-- This migration addresses the 'Database error granting user' issue with improved SECURITY DEFINER function

-- First, clean up existing problematic triggers and functions
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Create a robust function to handle new user creation with SECURITY DEFINER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  new_role TEXT := 'user';
  new_tier TEXT := 'free';
BEGIN
  -- Always create the user record regardless of email confirmation status
  -- This ensures the user exists in the public schema as soon as they're created in auth
  INSERT INTO public.users (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    avatar_url = EXCLUDED.avatar_url,
    updated_at = NOW();
  
  -- Also create the user profile
  INSERT INTO public.user_profiles (id, role, subscription_tier)
  VALUES (NEW.id, new_role, new_tier)
  ON CONFLICT (id) DO UPDATE SET
    -- Don't override existing role or tier if already set
    role = COALESCE(public.user_profiles.role, new_role),
    subscription_tier = COALESCE(public.user_profiles.subscription_tier, new_tier),
    updated_at = NOW();
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't prevent user creation
    RAISE LOG 'Error in handle_new_user for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- Create trigger for new user creation that runs on both INSERT and UPDATE
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Temporarily disable RLS to ensure the trigger works without permission issues
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles DISABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON public.users TO anon, authenticated, service_role;
GRANT ALL ON public.user_profiles TO anon, authenticated, service_role;

-- Re-enable RLS with proper policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create simplified policies for users table
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Service role can manage users" ON public.users;
CREATE POLICY "Service role can manage users" ON public.users
  FOR ALL USING (auth.role() = 'service_role');

-- Create simplified policies for user_profiles table
DROP POLICY IF EXISTS "Users can view own user profile" ON public.user_profiles;
CREATE POLICY "Users can view own user profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own user profile" ON public.user_profiles;
CREATE POLICY "Users can update own user profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Service role can manage user profiles" ON public.user_profiles;
CREATE POLICY "Service role can manage user profiles" ON public.user_profiles
  FOR ALL USING (auth.role() = 'service_role');

-- Admin policies
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
CREATE POLICY "Admins can view all users" ON public.users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'subadmin')
    )
  );

DROP POLICY IF EXISTS "Admins can view all user profiles" ON public.user_profiles;
CREATE POLICY "Admins can view all user profiles" ON public.user_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'subadmin')
    )
  );

-- Enable realtime (handle existing publications gracefully)
DO $$
BEGIN
  -- Add users table to realtime
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.users;
  EXCEPTION
    WHEN duplicate_object THEN
      NULL; -- Table already in publication
    WHEN undefined_object THEN
      NULL; -- Publication doesn't exist yet
  END;
  
  -- Add user_profiles table to realtime
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.user_profiles;
  EXCEPTION
    WHEN duplicate_object THEN
      NULL; -- Table already in publication
    WHEN undefined_object THEN
      NULL; -- Publication doesn't exist yet
  END;
END $$;