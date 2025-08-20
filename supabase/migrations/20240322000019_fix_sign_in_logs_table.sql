-- Fix missing sign_in_logs table that causes authentication failures
-- This resolves the "Database error granting user" issue

-- 1) Create the log table
CREATE TABLE IF NOT EXISTS public.sign_in_logs (
    id bigserial PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    email text,
    ip_address inet,
    user_agent text,
    success boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS so users can only read their own logs
ALTER TABLE public.sign_in_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for users to read their own sign-in logs
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname='public' 
        AND tablename='sign_in_logs' 
        AND policyname='Users can read own sign-in logs'
    ) THEN
        CREATE POLICY "Users can read own sign-in logs" 
        ON public.sign_in_logs 
        FOR SELECT 
        USING (auth.uid() = user_id);
    END IF;
END $$;

-- 2) Make the function resilient and schema-qualified
CREATE OR REPLACE FUNCTION public.log_sign_in()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.sign_in_logs (user_id, email, success)
    VALUES (NEW.id, NEW.email, true);
    RETURN NEW;
EXCEPTION
    WHEN undefined_table THEN
        -- Don't break login if table is missing
        RETURN NEW;
    WHEN OTHERS THEN
        -- Optional: swallow logging errors to prevent auth failures
        RETURN NEW;
END;
$$;

-- 3) (Re)attach trigger only to last_sign_in_at changes, to avoid noise
DROP TRIGGER IF EXISTS trg_log_sign_in ON auth.users;
CREATE TRIGGER trg_log_sign_in
    AFTER UPDATE OF last_sign_in_at ON auth.users
    FOR EACH ROW
    EXECUTE PROCEDURE public.log_sign_in();

-- Add table to realtime publication for real-time updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.sign_in_logs;