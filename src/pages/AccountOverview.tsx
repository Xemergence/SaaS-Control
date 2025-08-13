import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  User,
  Mail,
  Building,
  Users,
  CreditCard,
  Shield,
  Settings,
  Save,
  Camera,
  Crown,
  Star,
  Calendar,
} from 'lucide-react';
import { supabase, getUserProfile, getUserOrders, type UserProfile, type Order } from '@/lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

const AccountOverview = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    company_name: '',
    industry: '',
    team_size: '',
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        // Load user profile
        const userProfile = await getUserProfile(user.id);
        setProfile(userProfile);
        
        if (userProfile) {
          setFormData({
            full_name: userProfile.full_name || '',
            company_name: userProfile.company_name || '',
            industry: userProfile.industry || '',
            team_size: userProfile.team_size?.toString() || '',
          });
        }
        
        // Load user orders
        const userOrders = await getUserOrders(user.id);
        setOrders(userOrders);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user || !profile) return;
    
    try {
      setSaving(true);
      
      const { error } = await supabase
        .from('user_profiles')
        .update({
          full_name: formData.full_name,
          company_name: formData.company_name,
          industry: formData.industry,
          team_size: formData.team_size ? parseInt(formData.team_size) : null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);
      
      if (error) {
        console.error('Error updating profile:', error);
        return;
      }
      
      // Reload profile data
      await loadUserData();
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500';
      case 'subadmin': return 'bg-purple-500';
      case 'user': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="h-4 w-4" />;
      case 'subadmin': return <Star className="h-4 w-4" />;
      case 'user': return <User className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getSubscriptionColor = (tier: string) => {
    switch (tier) {
      case 'premium': return 'bg-yellow-500';
      case 'pro': return 'bg-purple-500';
      case 'free': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-800 rounded w-64"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-48 bg-gray-800 rounded-lg"></div>
              <div className="h-48 bg-gray-800 rounded-lg md:col-span-2"></div>
            </div>
            <div className="h-96 bg-gray-800 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Account Overview</h1>
          <p className="text-gray-400">
            Manage your profile, view your activity, and update your preferences
          </p>
        </div>

        {/* Profile Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Avatar and Basic Info */}
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6 text-center">
              <div className="relative inline-block mb-4">
                <Avatar className="h-24 w-24 mx-auto">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback className="bg-purple-600 text-white text-2xl">
                    {profile?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-purple-600 hover:bg-purple-700 p-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {profile?.full_name || user?.email?.split('@')[0] || 'User'}
              </h3>
              <p className="text-sm text-gray-400 mb-3">{user?.email}</p>
              
              <div className="flex items-center justify-center gap-2 mb-3">
                <Badge className={`${getRoleColor(profile?.role || 'user')} text-white border-0`}>
                  <div className="flex items-center gap-1">
                    {getRoleIcon(profile?.role || 'user')}
                    <span className="capitalize">{profile?.role || 'user'}</span>
                  </div>
                </Badge>
              </div>
              
              <Badge 
                variant="outline" 
                className={`${getSubscriptionColor(profile?.subscription_tier || 'free')} text-white border-0`}
              >
                {profile?.subscription_tier || 'free'} plan
              </Badge>
            </CardContent>
          </Card>

          {/* Account Stats */}
          <Card className="bg-gray-900 border-gray-700 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-white">Account Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{orders.length}</div>
                  <div className="text-sm text-gray-400">Total Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {orders.filter(o => o.status === 'delivered').length}
                  </div>
                  <div className="text-sm text-gray-400">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    ${orders.reduce((sum, order) => sum + order.price, 0).toFixed(0)}
                  </div>
                  <div className="text-sm text-gray-400">Total Spent</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">
                    {profile?.created_at ? Math.floor((Date.now() - new Date(profile.created_at).getTime()) / (1000 * 60 * 60 * 24)) : 0}
                  </div>
                  <div className="text-sm text-gray-400">Days Active</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-gray-900 border-gray-700">
            <TabsTrigger value="profile" className="data-[state=active]:bg-purple-600">Profile</TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-purple-600">Security</TabsTrigger>
            <TabsTrigger value="subscription" className="data-[state=active]:bg-purple-600">Subscription</TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-purple-600">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="full_name" className="text-gray-300">Full Name</Label>
                    <Input
                      id="full_name"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                    <Input
                      id="email"
                      value={user?.email || ''}
                      disabled
                      className="bg-gray-800 border-gray-600 text-gray-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company_name" className="text-gray-300">Company Name</Label>
                    <Input
                      id="company_name"
                      value={formData.company_name}
                      onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="Enter your company name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="industry" className="text-gray-300">Industry</Label>
                    <Input
                      id="industry"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="e.g., Technology, Healthcare"
                    />
                  </div>
                  <div>
                    <Label htmlFor="team_size" className="text-gray-300">Team Size</Label>
                    <Input
                      id="team_size"
                      type="number"
                      value={formData.team_size}
                      onChange={(e) => setFormData({ ...formData, team_size: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="Number of team members"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Account Role</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={`${getRoleColor(profile?.role || 'user')} text-white border-0`}>
                        <div className="flex items-center gap-1">
                          {getRoleIcon(profile?.role || 'user')}
                          <span className="capitalize">{profile?.role || 'user'}</span>
                        </div>
                      </Badge>
                      <span className="text-sm text-gray-400">
                        {profile?.role === 'admin' && 'Full system access'}
                        {profile?.role === 'subadmin' && 'Premium features access'}
                        {profile?.role === 'user' && 'Standard user access'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button 
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">Password</h4>
                      <p className="text-sm text-gray-400">Last updated: Never</p>
                    </div>
                    <Button variant="outline" className="border-gray-600 text-gray-300 hover:text-white">
                      Change Password
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-400">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline" className="border-gray-600 text-gray-300 hover:text-white">
                      Enable 2FA
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">Login Sessions</h4>
                      <p className="text-sm text-gray-400">Manage your active sessions</p>
                    </div>
                    <Button variant="outline" className="border-gray-600 text-gray-300 hover:text-white">
                      View Sessions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscription" className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Subscription Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Current Plan</h4>
                    <p className="text-sm text-gray-400">
                      You are currently on the{' '}
                      <span className="capitalize font-medium text-white">
                        {profile?.subscription_tier || 'free'}
                      </span>{' '}
                      plan
                    </p>
                  </div>
                  <Badge 
                    className={`${getSubscriptionColor(profile?.subscription_tier || 'free')} text-white border-0`}
                  >
                    {profile?.subscription_tier || 'free'}
                  </Badge>
                </div>
                
                {profile?.subscription_tier === 'free' && (
                  <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Upgrade Your Plan</h4>
                    <p className="text-sm text-gray-300 mb-4">
                      Unlock premium features and get access to advanced tools and priority support.
                    </p>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Upgrade Now
                    </Button>
                  </div>
                )}
                
                <div className="space-y-3">
                  <h4 className="text-white font-medium">Plan Features</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-300">Order tracking</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-300">Basic support</span>
                    </div>
                    {profile?.role !== 'user' && (
                      <>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-gray-300">Premium features access</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-gray-300">Priority support</span>
                        </div>
                      </>
                    )}
                    {profile?.role === 'admin' && (
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-gray-300">Full admin dashboard access</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <div>
                          <p className="text-sm text-white">Order {order.order_number}</p>
                          <p className="text-xs text-gray-400">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {order.status}
                      </Badge>
                    </div>
                  ))}
                  
                  {orders.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-400">No recent activity</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AccountOverview;