-- Implement proper Row Level Security (RLS) policies based on user roles
-- This migration also fixes the authentication error during email confirmation

-- First, let's create the tables if they don't exist yet
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  order_number TEXT NOT NULL,
  product_type TEXT NOT NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  design_file_url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.financial_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  total_revenue NUMERIC(14, 2) NOT NULL,
  total_orders INTEGER NOT NULL,
  new_users INTEGER NOT NULL,
  active_subscriptions INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.sign_in_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  email TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  success BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fix the handle_new_user function to always create user records regardless of email confirmation status
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Always create the user record regardless of email confirmation status
  INSERT INTO public.users (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, users.full_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, users.avatar_url),
    updated_at = NOW();
  
  -- Always create the user profile record
  INSERT INTO public.user_profiles (id, role, subscription_tier)
  VALUES (NEW.id, 'user', 'free')
  ON CONFLICT (id) DO UPDATE SET
    -- Don't override existing role or tier if already set
    role = COALESCE(public.user_profiles.role, 'user'),
    subscription_tier = COALESCE(public.user_profiles.subscription_tier, 'free'),
    updated_at = NOW();
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't prevent user creation
    RAISE LOG 'Error in handle_new_user for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- Drop and recreate the trigger to ensure it runs on both INSERT and UPDATE
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Temporarily disable RLS on all tables to set up policies
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_metrics DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.sign_in_logs DISABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate them
-- Users table policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Service role can manage users" ON public.users;
DROP POLICY IF EXISTS "Admins can manage all users" ON public.users;
DROP POLICY IF EXISTS "SubAdmins can view all users" ON public.users;

-- User profiles table policies
DROP POLICY IF EXISTS "Users can view own user profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own user profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can view all user profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Service role can manage user profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can manage all user profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "SubAdmins can view all user profiles" ON public.user_profiles;

-- Orders table policies
DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can create own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can update own orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can manage all orders" ON public.orders;
DROP POLICY IF EXISTS "SubAdmins can view all orders" ON public.orders;

-- Financial metrics table policies
DROP POLICY IF EXISTS "Admins can view financial metrics" ON public.financial_metrics;
DROP POLICY IF EXISTS "Admins can manage financial metrics" ON public.financial_metrics;
DROP POLICY IF EXISTS "SubAdmins can view financial metrics" ON public.financial_metrics;

-- Sign in logs table policies
DROP POLICY IF EXISTS "Users can view own sign in logs" ON public.sign_in_logs;
DROP POLICY IF EXISTS "Admins can view all sign in logs" ON public.sign_in_logs;
DROP POLICY IF EXISTS "SubAdmins can view all sign in logs" ON public.sign_in_logs;

-- Re-enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sign_in_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON public.users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage all users" ON public.users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "SubAdmins can view all users" ON public.users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role = 'subadmin'
    )
  );

-- Create policies for user_profiles table
CREATE POLICY "Users can view own user profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own user profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all user profiles" ON public.user_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage all user profiles" ON public.user_profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "SubAdmins can view all user profiles" ON public.user_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role = 'subadmin'
    )
  );

-- Create policies for orders table
CREATE POLICY "Users can view own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own orders" ON public.orders
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all orders" ON public.orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage all orders" ON public.orders
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "SubAdmins can view all orders" ON public.orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role = 'subadmin'
    )
  );

-- Create policies for financial_metrics table (admin only)
CREATE POLICY "Admins can view financial metrics" ON public.financial_metrics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage financial metrics" ON public.financial_metrics
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "SubAdmins can view financial metrics" ON public.financial_metrics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role = 'subadmin'
    )
  );

-- Create policies for sign_in_logs table
CREATE POLICY "Users can view own sign in logs" ON public.sign_in_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all sign in logs" ON public.sign_in_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "SubAdmins can view all sign in logs" ON public.sign_in_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role = 'subadmin'
    )
  );

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- Users table permissions
GRANT SELECT, UPDATE ON public.users TO authenticated;
GRANT SELECT ON public.users TO anon;

-- User profiles table permissions
GRANT SELECT, UPDATE ON public.user_profiles TO authenticated;
GRANT SELECT ON public.user_profiles TO anon;

-- Orders table permissions
GRANT SELECT, INSERT, UPDATE ON public.orders TO authenticated;

-- Financial metrics table permissions
GRANT SELECT ON public.financial_metrics TO authenticated;

-- Sign in logs table permissions
GRANT SELECT ON public.sign_in_logs TO authenticated;

-- Service role permissions (for admin functions)
GRANT ALL ON public.users TO service_role;
GRANT ALL ON public.user_profiles TO service_role;
GRANT ALL ON public.orders TO service_role;
GRANT ALL ON public.financial_metrics TO service_role;
GRANT ALL ON public.sign_in_logs TO service_role;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_financial_metrics_date ON public.financial_metrics(date);
CREATE INDEX IF NOT EXISTS idx_sign_in_logs_user_id ON public.sign_in_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_sign_in_logs_created_at ON public.sign_in_logs(created_at);

-- Enable realtime for all tables
DO $$
BEGIN
  -- Add orders table to realtime
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
    WHEN undefined_object THEN NULL;
  END;
  
  -- Add financial_metrics table to realtime
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.financial_metrics;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
    WHEN undefined_object THEN NULL;
  END;
  
  -- Add sign_in_logs table to realtime
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.sign_in_logs;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
    WHEN undefined_object THEN NULL;
  END;
END $$;