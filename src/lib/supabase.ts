import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserRole = 'admin' | 'subadmin' | 'user';

export type User = {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
};

export type UserProfile = {
  id: string;
  email: string;
  full_name?: string;
  role: UserRole;
  avatar_url?: string;
  company_name?: string;
  industry?: string;
  team_size?: number;
  subscription_tier: string;
  created_at: string;
  updated_at: string;
};

export type Order = {
  id: string;
  user_id: string;
  order_number: string;
  product_type: string;
  product_name: string;
  quantity: number;
  price: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  design_file_url?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
};

export type FinancialMetrics = {
  id: string;
  date: string;
  total_revenue: number;
  total_orders: number;
  new_users: number;
  active_subscriptions: number;
  created_at: string;
  updated_at: string;
};

export type SignInLog = {
  id: string;
  user_id: string;
  email: string;
  ip_address?: string;
  user_agent?: string;
  success: boolean;
  created_at: string;
};

export type Expense = {
  id: string;
  user_id: string;
  date: string;
  description?: string;
  amount: number;
  category?: string;
  created_at: string;
};

export type IncomeEntry = {
  id: string;
  user_id: string;
  date: string;
  description?: string;
  amount: number;
  source?: string;
  created_at: string;
};

export type TaxItem = {
  id: string;
  user_id: string;
  date: string;
  description?: string;
  amount: number;
  tax_type?: string;
  created_at: string;
};

export type MileageLog = {
  id: string;
  user_id: string;
  date: string;
  description?: string;
  miles: number;
  rate?: number;
  created_at: string;
};

export type Period = 'day' | 'week' | 'month' | 'quarter' | 'year';

export const periodDateRange = (period: Period, year?: number): { from: string; to: string } => {
  const now = new Date();
  if (year) now.setFullYear(year);
  const start = new Date(now);
  const end = new Date(now);
  switch (period) {
    case 'day':
      // start is today 00:00, end is today 23:59:59
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      break;
    case 'week': {
      const day = start.getDay();
      const diff = (day === 0 ? -6 : 1) - day; // Monday start
      start.setDate(start.getDate() + diff);
      start.setHours(0, 0, 0, 0);
      end.setTime(start.getTime());
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);
      break;
    }
    case 'month':
      start.setDate(1); start.setHours(0,0,0,0);
      end.setMonth(start.getMonth() + 1, 0); end.setHours(23,59,59,999);
      break;
    case 'quarter': {
      const q = Math.floor(start.getMonth() / 3);
      start.setMonth(q * 3, 1); start.setHours(0,0,0,0);
      end.setMonth(start.getMonth() + 3, 0); end.setHours(23,59,59,999);
      break;
    }
    case 'year':
    default:
      start.setMonth(0, 1); start.setHours(0,0,0,0);
      end.setMonth(11, 31); end.setHours(23,59,59,999);
  }
  const toISO = (d: Date) => d.toISOString().split('T')[0];
  return { from: toISO(start), to: toISO(end) };
};

const sumField = (rows: any[], fieldNames: string[]) =>
  rows.reduce((sum, r) => sum + (fieldNames.map((f) => Number(r[f] ?? 0)).find((v) => v > 0) || 0), 0);

export const addExpense = async (payload: Omit<Expense, 'id' | 'created_at'>) => {
  const { data, error } = await supabase.from('expenses').insert(payload).select('*').single();
  if (error) throw error; return data as Expense;
};
export const listExpenses = async (from: string, to: string, userId?: string) => {
  let q = supabase.from('expenses').select('*').gte('date', from).lte('date', to).order('date', { ascending: false });
  if (userId) q = q.eq('user_id', userId) as any;
  const { data, error } = await q; if (error) throw error; return (data || []) as Expense[];
};

export const addIncomeEntry = async (payload: Omit<IncomeEntry, 'id' | 'created_at'>) => {
  const { data, error } = await supabase.from('income_entries').insert(payload).select('*').single();
  if (error) throw error; return data as IncomeEntry;
};
export const listIncomeEntries = async (from: string, to: string, userId?: string) => {
  let q = supabase.from('income_entries').select('*').gte('date', from).lte('date', to).order('date', { ascending: false });
  if (userId) q = q.eq('user_id', userId) as any;
  const { data, error } = await q; if (error) throw error; return (data || []) as IncomeEntry[];
};

export const addTaxItem = async (payload: Omit<TaxItem, 'id' | 'created_at'>) => {
  const { data, error } = await supabase.from('tax_items').insert(payload).select('*').single();
  if (error) throw error; return data as TaxItem;
};
export const listTaxItems = async (from: string, to: string, userId?: string) => {
  let q = supabase.from('tax_items').select('*').gte('date', from).lte('date', to).order('date', { ascending: false });
  if (userId) q = q.eq('user_id', userId) as any;
  const { data, error } = await q; if (error) throw error; return (data || []) as TaxItem[];
};

export const addMileageLog = async (payload: Omit<MileageLog, 'id' | 'created_at'>) => {
  const { data, error } = await supabase.from('mileage_logs').insert(payload).select('*').single();
  if (error) throw error; return data as MileageLog;
};
export const listMileageLogs = async (from: string, to: string, userId?: string) => {
  let q = supabase.from('mileage_logs').select('*').gte('date', from).lte('date', to).order('date', { ascending: false });
  if (userId) q = q.eq('user_id', userId) as any;
  const { data, error } = await q; if (error) throw error; return (data || []) as MileageLog[];
};

export const getOrdersRevenueSumInRange = async (from: string, to: string) => {
  const { data, error } = await supabase
    .from('orders')
    .select('price, amount, total_amount, created_at')
    .gte('created_at', from)
    .lte('created_at', to);
  if (error) { console.warn('orders sum error', error.message); return 0; }
  return sumField(data || [], ['total_amount','amount','price']);
};

export const summarizeFinance = async (from: string, to: string, opts?: { userId?: string; mileageRate?: number; }) => {
  const [expenses, income, taxes, mileage] = await Promise.all([
    listExpenses(from, to, opts?.userId),
    listIncomeEntries(from, to, opts?.userId),
    listTaxItems(from, to, opts?.userId),
    listMileageLogs(from, to, opts?.userId),
  ]);
  const expenseTotal = sumField(expenses, ['amount']);
  const incomeTotal = sumField(income, ['amount']);
  const taxesTotal = sumField(taxes, ['amount']);
  const mileageCost = mileage.reduce((s, m) => s + Number(m.miles) * Number(m.rate ?? opts?.mileageRate ?? 0.655), 0);
  const stripeRevenue = await getOrdersRevenueSumInRange(from, to);
  const totalIncome = incomeTotal + stripeRevenue;
  const net = totalIncome - expenseTotal - taxesTotal - mileageCost;
  return { expenseTotal, incomeTotal, taxesTotal, mileageCost, stripeRevenue, totalIncome, net };
};

export type UserRole = 'admin' | 'subadmin' | 'user';

export type User = {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
};

export type UserProfile = {
  id: string;
  email: string;
  full_name?: string;
  role: UserRole;
  avatar_url?: string;
  company_name?: string;
  industry?: string;
  team_size?: number;
  subscription_tier: string;
  created_at: string;
  updated_at: string;
};

export type Order = {
  id: string;
  user_id: string;
  order_number: string;
  product_type: string;
  product_name: string;
  quantity: number;
  price: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  design_file_url?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
};

export type FinancialMetrics = {
  id: string;
  date: string;
  total_revenue: number;
  total_orders: number;
  new_users: number;
  active_subscriptions: number;
  created_at: string;
  updated_at: string;
};

export type SignInLog = {
  id: string;
  user_id: string;
  email: string;
  ip_address?: string;
  user_agent?: string;
  success: boolean;
  created_at: string;
};

// Helper functions for role management
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  return data;
};

export const updateUserRole = async (userId: string, role: UserRole): Promise<boolean> => {
  const { error } = await supabase
    .from('user_profiles')
    .update({ role, updated_at: new Date().toISOString() })
    .eq('id', userId);

  if (error) {
    console.error('Error updating user role:', error);
    return false;
  }

  return true;
};

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user orders:', error);
    return [];
  }

  return data || [];
};

export const getAllOrders = async (): Promise<Order[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all orders:', error);
    return [];
  }

  return data || [];
};

export const getFinancialMetrics = async (days: number = 30): Promise<FinancialMetrics[]> => {
  const { data, error } = await supabase
    .from('financial_metrics')
    .select('*')
    .gte('date', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching financial metrics:', error);
    return [];
  }

  return data || [];
};

export const getRecentSignIns = async (limit: number = 50): Promise<SignInLog[]> => {
  const { data, error } = await supabase
    .from('sign_in_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching sign-in logs:', error);
    return [];
  }

  return data || [];
};

export const hasRole = (userProfile: UserProfile | null, requiredRoles: UserRole[]): boolean => {
  if (!userProfile) return false;
  return requiredRoles.includes(userProfile.role);
};

export const isAdmin = (userProfile: UserProfile | null): boolean => {
  return hasRole(userProfile, ['admin']);
};

export const isSubAdmin = (userProfile: UserProfile | null): boolean => {
  return hasRole(userProfile, ['admin', 'subadmin']);
};

export const canAccessDashboard = (userProfile: UserProfile | null): boolean => {
  return hasRole(userProfile, ['admin', 'subadmin']);
};