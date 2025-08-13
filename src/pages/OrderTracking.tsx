import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Search,
  Calendar,
  DollarSign,
  FileText,
  Truck,
} from 'lucide-react';
import { supabase, getUserOrders, type Order } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

const OrderTracking = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadUserAndOrders();
  }, []);

  useEffect(() => {
    // Filter orders based on search term
    if (searchTerm.trim() === '') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order =>
        order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOrders(filtered);
    }
  }, [searchTerm, orders]);

  const loadUserAndOrders = async () => {
    try {
      setLoading(true);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        // Load user's orders
        const userOrders = await getUserOrders(user.id);
        setOrders(userOrders);
        setFilteredOrders(userOrders);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
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
      case 'delivered': return <CheckCircle className="h-5 w-5" />;
      case 'shipped': return <Truck className="h-5 w-5" />;
      case 'processing': return <Clock className="h-5 w-5" />;
      case 'pending': return <AlertCircle className="h-5 w-5" />;
      case 'cancelled': return <XCircle className="h-5 w-5" />;
      default: return <AlertCircle className="h-5 w-5" />;
    }
  };

  const getStatusDescription = (status: string) => {
    switch (status) {
      case 'delivered': return 'Your order has been delivered successfully';
      case 'shipped': return 'Your order is on its way to you';
      case 'processing': return 'We are preparing your order';
      case 'pending': return 'Your order is waiting to be processed';
      case 'cancelled': return 'This order has been cancelled';
      default: return 'Order status unknown';
    }
  };

  const getProgressPercentage = (status: string) => {
    switch (status) {
      case 'pending': return 25;
      case 'processing': return 50;
      case 'shipped': return 75;
      case 'delivered': return 100;
      case 'cancelled': return 0;
      default: return 0;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-800 rounded w-64"></div>
            <div className="h-12 bg-gray-800 rounded"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-800 rounded-lg"></div>
            ))}
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
          <h1 className="text-3xl font-bold text-white mb-2">Track Your Orders</h1>
          <p className="text-gray-400">
            Monitor the status of your custom 3D print orders
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by order number, product name, or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500"
          />
        </div>

        {/* Orders Summary */}
        {orders.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-white">{orders.length}</div>
                <div className="text-sm text-gray-400">Total Orders</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">
                  {orders.filter(o => o.status === 'delivered').length}
                </div>
                <div className="text-sm text-gray-400">Delivered</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {orders.filter(o => ['shipped', 'processing'].includes(o.status)).length}
                </div>
                <div className="text-sm text-gray-400">In Progress</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">
                  ${orders.reduce((sum, order) => sum + order.price, 0).toFixed(2)}
                </div>
                <div className="text-sm text-gray-400">Total Spent</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-12 text-center">
                <Package className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  {orders.length === 0 ? 'No Orders Yet' : 'No Orders Found'}
                </h3>
                <p className="text-gray-400 mb-6">
                  {orders.length === 0 
                    ? "You haven't placed any orders yet. Start by browsing our 3D products!"
                    : "No orders match your search criteria. Try adjusting your search terms."
                  }
                </p>
                {orders.length === 0 && (
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Browse Products
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.id} className="bg-gray-900 border-gray-700 hover:border-gray-600 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                      </div>
                      <div>
                        <CardTitle className="text-white text-lg">{order.order_number}</CardTitle>
                        <p className="text-gray-400 text-sm">{order.product_name}</p>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`${getStatusColor(order.status)} text-white border-0 capitalize`}
                    >
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white">{getProgressPercentage(order.status)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          order.status === 'cancelled' ? 'bg-red-500' : 'bg-purple-500'
                        }`}
                        style={{ width: `${getProgressPercentage(order.status)}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-400">{getStatusDescription(order.status)}</p>
                  </div>

                  {/* Order Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">Order Date</p>
                        <p className="text-sm text-white">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">Total Amount</p>
                        <p className="text-sm text-white">
                          ${order.price.toFixed(2)} (Qty: {order.quantity})
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">Product Type</p>
                        <p className="text-sm text-white capitalize">
                          {order.product_type.replace('-', ' ')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {order.notes && (
                    <div className="pt-4 border-t border-gray-700">
                      <div className="flex items-start gap-2">
                        <FileText className="h-4 w-4 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-400">Notes</p>
                          <p className="text-sm text-white">{order.notes}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:text-white">
                      View Details
                    </Button>
                    {order.status === 'delivered' && (
                      <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:text-white">
                        Reorder
                      </Button>
                    )}
                    {order.status === 'pending' && (
                      <Button variant="outline" size="sm" className="border-red-600 text-red-400 hover:text-red-300">
                        Cancel Order
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Help Section */}
        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Need Help?</h3>
            <p className="text-gray-400 mb-4">
              If you have questions about your order or need assistance, we're here to help.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:text-white">
                Contact Support
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:text-white">
                FAQ
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderTracking;