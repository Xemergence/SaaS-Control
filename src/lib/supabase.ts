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