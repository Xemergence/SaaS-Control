-- Add role column to existing user_profiles table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'role') THEN
    ALTER TABLE user_profiles ADD COLUMN role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'subadmin', 'user'));
  END IF;
END $$;

-- Create orders table for tracking user orders
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  order_number TEXT UNIQUE NOT NULL,
  product_type TEXT NOT NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  price DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  design_file_url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sign_in_logs table for tracking authentication events
CREATE TABLE IF NOT EXISTS sign_in_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  email TEXT NOT NULL,
  ip_address INET,
  user_agent TEXT,
  success BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create financial_metrics table for admin dashboard
CREATE TABLE IF NOT EXISTS financial_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  total_revenue DECIMAL(12,2) DEFAULT 0,
  total_orders INTEGER DEFAULT 0,
  new_users INTEGER DEFAULT 0,
  active_subscriptions INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(date)
);

-- Create function to log sign-ins
CREATE OR REPLACE FUNCTION log_sign_in()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.last_sign_in_at IS DISTINCT FROM OLD.last_sign_in_at THEN
    INSERT INTO sign_in_logs (user_id, email, success)
    VALUES (NEW.id, NEW.email, true);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to log sign-ins
DROP TRIGGER IF EXISTS log_sign_in_trigger ON auth.users;
CREATE TRIGGER log_sign_in_trigger
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION log_sign_in();

-- Enable realtime for new tables only
DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE orders;
  EXCEPTION
    WHEN duplicate_object THEN
      NULL;
  END;
  
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE financial_metrics;
  EXCEPTION
    WHEN duplicate_object THEN
      NULL;
  END;
  
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE sign_in_logs;
  EXCEPTION
    WHEN duplicate_object THEN
      NULL;
  END;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_sign_in_logs_user_id ON sign_in_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_sign_in_logs_created_at ON sign_in_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_financial_metrics_date ON financial_metrics(date);

-- Insert sample financial data for demo
INSERT INTO financial_metrics (date, total_revenue, total_orders, new_users, active_subscriptions)
VALUES 
  (CURRENT_DATE - INTERVAL '30 days', 1250.00, 25, 12, 8),
  (CURRENT_DATE - INTERVAL '29 days', 1380.50, 28, 15, 10),
  (CURRENT_DATE - INTERVAL '28 days', 1125.75, 22, 8, 12),
  (CURRENT_DATE - INTERVAL '27 days', 1450.25, 31, 18, 15),
  (CURRENT_DATE - INTERVAL '26 days', 1675.00, 35, 22, 18),
  (CURRENT_DATE - INTERVAL '25 days', 1825.50, 38, 25, 20),
  (CURRENT_DATE - INTERVAL '24 days', 1950.75, 42, 28, 22),
  (CURRENT_DATE - INTERVAL '23 days', 2100.00, 45, 30, 25),
  (CURRENT_DATE - INTERVAL '22 days', 1875.25, 40, 20, 27),
  (CURRENT_DATE - INTERVAL '21 days', 2250.50, 48, 35, 30),
  (CURRENT_DATE - INTERVAL '20 days', 2400.75, 52, 38, 32),
  (CURRENT_DATE - INTERVAL '19 days', 2150.00, 46, 25, 35),
  (CURRENT_DATE - INTERVAL '18 days', 2575.25, 55, 42, 38),
  (CURRENT_DATE - INTERVAL '17 days', 2750.50, 58, 45, 40),
  (CURRENT_DATE - INTERVAL '16 days', 2925.75, 62, 48, 42),
  (CURRENT_DATE - INTERVAL '15 days', 3100.00, 65, 50, 45),
  (CURRENT_DATE - INTERVAL '14 days', 2850.25, 60, 35, 47),
  (CURRENT_DATE - INTERVAL '13 days', 3275.50, 68, 55, 50),
  (CURRENT_DATE - INTERVAL '12 days', 3450.75, 72, 58, 52),
  (CURRENT_DATE - INTERVAL '11 days', 3625.00, 75, 60, 55),
  (CURRENT_DATE - INTERVAL '10 days', 3800.25, 78, 62, 58),
  (CURRENT_DATE - INTERVAL '9 days', 3975.50, 82, 65, 60),
  (CURRENT_DATE - INTERVAL '8 days', 4150.75, 85, 68, 62),
  (CURRENT_DATE - INTERVAL '7 days', 4325.00, 88, 70, 65),
  (CURRENT_DATE - INTERVAL '6 days', 4500.25, 92, 72, 68),
  (CURRENT_DATE - INTERVAL '5 days', 4675.50, 95, 75, 70),
  (CURRENT_DATE - INTERVAL '4 days', 4850.75, 98, 78, 72),
  (CURRENT_DATE - INTERVAL '3 days', 5025.00, 102, 80, 75),
  (CURRENT_DATE - INTERVAL '2 days', 5200.25, 105, 82, 78),
  (CURRENT_DATE - INTERVAL '1 day', 5375.50, 108, 85, 80),
  (CURRENT_DATE, 5550.75, 112, 88, 82)
ON CONFLICT (date) DO NOTHING;

-- Insert sample orders for demo
INSERT INTO orders (user_id, order_number, product_type, product_name, quantity, price, status, notes)
SELECT 
  (SELECT id FROM auth.users LIMIT 1),
  'ORD-' || LPAD((ROW_NUMBER() OVER())::TEXT, 6, '0'),
  CASE (RANDOM() * 3)::INT
    WHEN 0 THEN 'keychain'
    WHEN 1 THEN 'coaster'
    WHEN 2 THEN 'art-piece'
    ELSE 'other'
  END,
  CASE (RANDOM() * 3)::INT
    WHEN 0 THEN 'Custom Keychain'
    WHEN 1 THEN 'Custom Coaster Set'
    WHEN 2 THEN 'Custom Art Piece'
    ELSE 'Custom Item'
  END,
  (RANDOM() * 5 + 1)::INT,
  (RANDOM() * 100 + 15)::DECIMAL(10,2),
  CASE (RANDOM() * 4)::INT
    WHEN 0 THEN 'pending'
    WHEN 1 THEN 'processing'
    WHEN 2 THEN 'shipped'
    ELSE 'delivered'
  END,
  'Sample order for demonstration'
FROM generate_series(1, 15)
WHERE EXISTS (SELECT 1 FROM auth.users LIMIT 1)
ON CONFLICT (order_number) DO NOTHING;