-- Comprehensive fix for email confirmation and user creation issues

-- 1. Create or replace the user profile creation trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Insert into public.users table first
  INSERT INTO public.users (id, email, full_name, avatar_url, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, users.full_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, users.avatar_url),
    updated_at = NOW();

  -- Insert into user_profiles table
  INSERT INTO public.user_profiles (id, role, subscription_tier, created_at, updated_at)
  VALUES (
    NEW.id,
    'user',
    'free',
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    updated_at = NOW();

  -- Log the sign-in attempt
  INSERT INTO public.sign_in_logs (user_id, email, success, created_at)
  VALUES (NEW.id, NEW.email, true, NOW())
  ON CONFLICT DO NOTHING;

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the user creation
    RAISE LOG 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$;

-- 2. Drop existing trigger if it exists and create new one
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 3. Create or replace function for handling sign-in logs
CREATE OR REPLACE FUNCTION public.log_sign_in(user_id UUID, user_email TEXT, success BOOLEAN DEFAULT true)
RETURNS VOID
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.sign_in_logs (user_id, email, success, created_at)
  VALUES (user_id, user_email, success, NOW())
  ON CONFLICT DO NOTHING;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail
    RAISE LOG 'Error in log_sign_in: %', SQLERRM;
END;
$$;

-- 4. Update RLS policies to be more permissive for user creation
DROP POLICY IF EXISTS "Users can read own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Service role can manage all profiles" ON user_profiles;

CREATE POLICY "Users can read own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Service role can manage all profiles" ON user_profiles
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow profile creation during signup" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id OR auth.role() = 'service_role');

-- 5. Update users table policies
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Service role can manage all users" ON users;

CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Service role can manage all users" ON users
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow user creation during signup" ON users
  FOR INSERT WITH CHECK (auth.uid() = id OR auth.role() = 'service_role');

-- 6. Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.users TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.user_profiles TO anon, authenticated;
GRANT INSERT ON public.sign_in_logs TO anon, authenticated;

-- 7. Enable realtime for relevant tables (only if not already added)
DO $
BEGIN
  -- Add users table to realtime publication if not already present
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'users'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE users;
  END IF;
  
  -- Add user_profiles table to realtime publication if not already present
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'user_profiles'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE user_profiles;
  END IF;
END $;

-- 8. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_sign_in_logs_user_id ON sign_in_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_sign_in_logs_created_at ON sign_in_logs(created_at DESC);

-- 9. Update financial metrics with default data if empty
INSERT INTO financial_metrics (date, total_revenue, total_orders, new_users, active_subscriptions)
SELECT 
  CURRENT_DATE,
  0,
  0,
  0,
  0
WHERE NOT EXISTS (SELECT 1 FROM financial_metrics WHERE date = CURRENT_DATE);
