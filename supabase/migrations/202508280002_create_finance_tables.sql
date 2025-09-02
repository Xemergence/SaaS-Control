CREATE TABLE IF NOT EXISTS public.expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id),
  date date NOT NULL,
  description text,
  amount numeric(12,2) NOT NULL,
  category text,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.income_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id),
  date date NOT NULL,
  description text,
  amount numeric(12,2) NOT NULL,
  source text,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.tax_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id),
  date date NOT NULL,
  description text,
  amount numeric(12,2) NOT NULL,
  tax_type text,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.mileage_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id),
  date date NOT NULL,
  description text,
  miles numeric(12,2) NOT NULL,
  rate numeric(6,3) DEFAULT 0.655,
  created_at timestamp with time zone DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_expenses_user_date ON public.expenses(user_id, date);
CREATE INDEX IF NOT EXISTS idx_income_entries_user_date ON public.income_entries(user_id, date);
CREATE INDEX IF NOT EXISTS idx_tax_items_user_date ON public.tax_items(user_id, date);
CREATE INDEX IF NOT EXISTS idx_mileage_logs_user_date ON public.mileage_logs(user_id, date);

alter publication supabase_realtime add table public.expenses;
alter publication supabase_realtime add table public.income_entries;
alter publication supabase_realtime add table public.tax_items;
alter publication supabase_realtime add table public.mileage_logs;