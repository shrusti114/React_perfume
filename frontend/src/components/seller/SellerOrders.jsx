import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBag, Truck, CheckCircle, Clock, ChevronRight, User } from 'lucide-react';

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:5000/api/orders/seller', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(data);
    } catch (error) {
      console.error('Error fetching seller orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchOrders();
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-50 text-emerald-600';
      case 'Shipped': return 'bg-blue-50 text-blue-600';
      case 'Processing': return 'bg-amber-50 text-amber-600';
      case 'Cancelled': return 'bg-rose-50 text-rose-600';
      default: return 'bg-neutral-100 text-neutral-500';
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div></div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h2 className="text-4xl font-elegant text-neutral-800 mb-10">Customer Orders</h2>

      <div className="space-y-8">
        {orders.length === 0 ? (
          <div className="bg-white/50 backdrop-blur rounded-[40px] p-20 border border-white flex flex-col items-center text-center">
            <ShoppingBag size={48} className="text-neutral-200 mb-6" />
            <p className="text-xl font-elegant text-neutral-400">Waiting for your first order...</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="bg-white/70 backdrop-blur-xl rounded-[40px] border border-white/50 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="px-8 py-6 bg-neutral-50/50 border-b border-neutral-100 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-100 flex items-center justify-center shadow-sm">
                    <ShoppingBag size={20} className="text-pink-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block">Order ID</span>
                    <span className="text-sm font-bold text-neutral-800">#{order._id.substring(0, 8).toUpperCase()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className={`text-[10px] font-bold uppercase px-4 py-1.5 rounded-full ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </span>
                  <select 
                    value={order.status} 
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="text-xs font-bold uppercase bg-white border border-neutral-200 px-4 py-2 rounded-xl focus:ring-1 focus:ring-pink-300 outline-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-6">
                  {order.products.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-5">
                      <div className="w-20 h-20 rounded-2xl bg-neutral-50 border border-neutral-100 flex-shrink-0">
                        <img src={item.productId?.image || 'https://via.placeholder.com/150'} alt="Perfume" className="w-full h-full object-cover rounded-2xl" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-lg font-elegant text-neutral-800">{item.productId?.name || 'Unknown Bottle'}</h4>
                        <p className="text-neutral-400 text-xs font-medium uppercase tracking-widest">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-elegant text-neutral-800">${(item.productId?.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="lg:col-span-4 bg-neutral-50/50 rounded-3xl p-8 border border-neutral-100/50 space-y-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2"><User size={12} /> Customer Information</span>
                    <p className="text-neutral-800 font-bold">{order.userId?.name}</p>
                    <p className="text-neutral-500 text-sm">{order.userId?.email}</p>
                  </div>
                  <div className="pt-4 border-t border-neutral-100">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2"><Clock size={12} /> Placed On</span>
                    <p className="text-neutral-800 font-medium">{new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                  </div>
                  <div className="pt-4 border-t border-neutral-100 flex justify-between items-end">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Total Selection</span>
                    <span className="text-2xl font-elegant text-pink-500 font-bold">${order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SellerOrders;
