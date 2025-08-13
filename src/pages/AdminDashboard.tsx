import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  Download,
} from 'lucide-react';
import { supabase, getFinancialMetrics, getAllOrders, getRecentSignIns, type FinancialMetrics, type Order, type SignInLog } from '@/lib/supabase';

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  newUsers: number;
  activeSubscriptions: number;
  revenueGrowth: number;
  ordersGrowth: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    totalOrders: 0,
    newUsers: 0,
    activeSubscriptions: 0,
    revenueGrowth: 0,
    ordersGrowth: 0,
  });
  const [financialData, setFinancialData] = useState<FinancialMetrics[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [signInLogs, setSignInLogs] = useState<SignInLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load financial metrics
      const metrics = await getFinancialMetrics(30);
      setFinancialData(metrics);
      
      // Load orders
      const ordersData = await getAllOrders();
      setOrders(ordersData);
      
      // Load sign-in logs
      const signIns = await getRecentSignIns(20);
      setSignInLogs(signIns);
      
      // Calculate current stats
      if (metrics.length > 0) {
        const latest = metrics[metrics.length - 1];
        const previous = metrics.length > 1 ? metrics[metrics.length - 2] : latest;
        
        setStats({
          totalRevenue: latest.total_revenue,
          totalOrders: latest.total_orders,
          newUsers: latest.new_users,
          activeSubscriptions: latest.active_subscriptions,
          revenueGrowth: previous.total_revenue > 0 
            ? ((latest.total_revenue - previous.total_revenue) / previous.total_revenue) * 100 
            : 0,
          ordersGrowth: previous.total_orders > 0 
            ? ((latest.total_orders - previous.total_orders) / previous.total_orders) * 100 
            : 0,
        });
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-500';
      case 'shipped': return 'bg-blue-500';
      case 'processing': return 'bg-yellow-500';
      case 'pending': return 'bg-gray-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'shipped': return <Package className="h-4 w-4" />;
      case 'processing': return <Clock className="h-4 w-4" />;
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-800 rounded w-64"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-800 rounded-lg"></div>
              ))}
            </div>
            <div className="h-96 bg-gray-800 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400 mt-2">Monitor your business performance and metrics</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:text-white">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button onClick={loadDashboardData} className="bg-purple-600 hover:bg-purple-700">
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-gray-400 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1 text-green-400" />
                +{stats.revenueGrowth.toFixed(1)}% from yesterday
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalOrders.toLocaleString()}</div>
              <p className="text-xs text-gray-400 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1 text-blue-400" />
                +{stats.ordersGrowth.toFixed(1)}% from yesterday
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">New Users</CardTitle>
              <Users className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.newUsers.toLocaleString()}</div>
              <p className="text-xs text-gray-400 mt-1">
                Total users this month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Active Subscriptions</CardTitle>
              <BarChart3 className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.activeSubscriptions.toLocaleString()}</div>
              <p className="text-xs text-gray-400 mt-1">
                Currently active
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-gray-900 border-gray-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">Overview</TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-purple-600">Orders</TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-purple-600">User Activity</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Revenue Chart Placeholder */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Revenue Trend (Last 30 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-800 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Revenue chart visualization</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Showing ${financialData.reduce((sum, item) => sum + item.total_revenue, 0).toLocaleString()} total revenue
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Order Status Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {['delivered', 'shipped', 'processing', 'pending', 'cancelled'].map((status) => {
                    const count = orders.filter(order => order.status === status).length;
                    const percentage = orders.length > 0 ? (count / orders.length) * 100 : 0;
                    return (
                      <div key={status} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`}></div>
                          <span className="text-sm text-gray-300 capitalize">{status}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-white">{count}</span>
                          <span className="text-xs text-gray-500">({percentage.toFixed(1)}%)</span>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {signInLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm text-white">{log.email}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(log.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={log.success ? "default" : "destructive"} className="text-xs">
                        {log.success ? "Success" : "Failed"}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Top Products</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {['keychain', 'coaster', 'art-piece', 'other'].map((product) => {
                    const count = orders.filter(order => order.product_type === product).length;
                    const revenue = orders
                      .filter(order => order.product_type === product)
                      .reduce((sum, order) => sum + order.price, 0);
                    return (
                      <div key={product} className="flex items-center justify-between py-2">
                        <div>
                          <p className="text-sm text-white capitalize">{product.replace('-', ' ')}</p>
                          <p className="text-xs text-gray-400">{count} orders</p>
                        </div>
                        <span className="text-sm text-green-400">${revenue.toFixed(2)}</span>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.slice(0, 10).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          <Badge variant="outline" className={`${getStatusColor(order.status)} text-white border-0`}>
                            {order.status}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-white font-medium">{order.order_number}</p>
                          <p className="text-sm text-gray-400">{order.product_name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">${order.price.toFixed(2)}</p>
                        <p className="text-sm text-gray-400">Qty: {order.quantity}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Sign-ins</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {signInLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{log.email}</p>
                        <p className="text-sm text-gray-400">
                          {new Date(log.created_at).toLocaleString()}
                        </p>
                      </div>
                      <Badge variant={log.success ? "default" : "destructive"}>
                        {log.success ? "Success" : "Failed"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Financial Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {financialData.slice(-7).map((metric) => (
                      <div key={metric.id} className="flex items-center justify-between py-2">
                        <span className="text-sm text-gray-400">
                          {new Date(metric.date).toLocaleDateString()}
                        </span>
                        <div className="text-right">
                          <p className="text-sm text-white">${metric.total_revenue.toFixed(2)}</p>
                          <p className="text-xs text-gray-500">{metric.total_orders} orders</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Growth Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-400">Revenue Growth</span>
                      <span className="text-sm text-green-400">+{stats.revenueGrowth.toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-400">Order Growth</span>
                      <span className="text-sm text-blue-400">+{stats.ordersGrowth.toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-400">New Users</span>
                      <span className="text-sm text-purple-400">{stats.newUsers}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-400">Active Subscriptions</span>
                      <span className="text-sm text-orange-400">{stats.activeSubscriptions}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;