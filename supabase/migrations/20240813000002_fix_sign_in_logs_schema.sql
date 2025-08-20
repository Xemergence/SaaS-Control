-- Fix the sign_in_logs table issue by ensuring it exists with the correct schema
-- and making the log_sign_in function more resilient

-- 1. Drop the existing trigger first
DROP TRIGGER IF EXISTS trg_log_sign_in ON auth.users;
DROP TRIGGER IF EXISTS log_sign_in_trigger ON auth.users;

-- 2. Drop the existing function
DROP FUNCTION IF EXISTS public.log_sign_in();

-- 3. Drop the existing table if it exists
DROP TABLE IF EXISTS public.sign_in_logs;

-- 4. Create the sign_in_logs table with the correct schema
CREATE TABLE IF NOT EXISTS public.sign_in_logs (
    id bigserial PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    email text,
    ip_address inet,
    user_agent text,
    success boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- 5. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_sign_in_logs_user_id ON public.sign_in_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_sign_in_logs_created_at ON public.sign_in_logs(created_at);

-- 6. Enable RLS so users can only read their own logs
ALTER TABLE public.sign_in_logs ENABLE ROW LEVEL SECURITY;

-- 7. Create RLS policy for users to read their own sign-in logs
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

-- 8. Create a more resilient log_sign_in function
CREATE OR REPLACE FUNCTION public.log_sign_in()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Only log when last_sign_in_at changes
    IF NEW.last_sign_in_at IS DISTINCT FROM OLD.last_sign_in_at THEN
        BEGIN
            INSERT INTO public.sign_in_logs (user_id, email, success)
            VALUES (NEW.id, NEW.email, true);
        EXCEPTION
            WHEN undefined_table THEN
                -- Don't break login if table is missing
                RAISE NOTICE 'sign_in_logs table does not exist';
                RETURN NEW;
            WHEN OTHERS THEN
                -- Swallow other errors to prevent auth failures
                RAISE NOTICE 'Error logging sign in: %', SQLERRM;
                RETURN NEW;
        END;
    END IF;
    RETURN NEW;
END;
$$;

-- 9. Create a new trigger that only fires on last_sign_in_at changes
CREATE TRIGGER trg_log_sign_in
    AFTER UPDATE OF last_sign_in_at ON auth.users
    FOR EACH ROW
    EXECUTE PROCEDURE public.log_sign_in();

-- 10. Add table to realtime publication if not already added
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND tablename = 'sign_in_logs'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.sign_in_logs;
    END IF;
END $$;