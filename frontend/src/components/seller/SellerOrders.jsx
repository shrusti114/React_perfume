import React from 'react';
import { ShoppingBag, CheckCircle, Clock, User } from 'lucide-react';
import { useSellerOrders, useUpdateOrderStatus } from '../../hooks/useApi';

const SellerOrders = () => {
  const { data: ordersData, isLoading: loading } = useSellerOrders();
  const updateOrderStatus = useUpdateOrderStatus();
  const orders = ordersData || [];

  const updateStatus = (orderId, status) => {
    updateOrderStatus.mutate({ orderId, status });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400';
      case 'Shipped': return 'bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400';
      case 'Processing': return 'bg-[#D9A0A0]/10 dark:bg-[#00D4FF]/10 border-[#D9A0A0]/30 dark:border-[#00D4FF]/20 text-[#D9A0A0] dark:text-[#00D4FF]';
      case 'Cancelled': return 'bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20 text-rose-600 dark:text-rose-400';
      default: return 'bg-neutral-50 dark:bg-white/5 border-neutral-200 dark:border-white/10 text-neutral-500 dark:text-gray-400';
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#D9A0A0] dark:border-[#00D4FF]"></div></div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-[15px] font-bold text-neutral-800 dark:text-white tracking-wider uppercase opacity-90">Customer Orders <span className="text-[#D9A0A0] dark:text-[#00D4FF] font-medium ml-2">({orders.length})</span></h2>
      </div>

      <div className="space-y-8">
        {orders.length === 0 ? (
          <div className="bg-white dark:bg-[#202231] rounded-[2.5rem] p-20 border border-[#D9A0A0]/10 dark:border-white/5 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
            <ShoppingBag size={48} className="text-neutral-200 dark:text-gray-600 mb-6" />
            <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 dark:text-gray-500">Waiting for your first order...</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="bg-white dark:bg-[#202231] rounded-[2.5rem] border border-[#D9A0A0]/10 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] overflow-hidden hover:border-[#D9A0A0]/30 dark:hover:border-[#00D4FF]/30 transition-all duration-300">
              <div className="px-8 py-6 bg-[#FAFAFA] dark:bg-[#1a1c27] border-b border-[#D9A0A0]/10 dark:border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#202231] border border-[#D9A0A0]/20 dark:border-[#00D4FF]/20 flex items-center justify-center shadow-sm">
                    <ShoppingBag size={20} className="text-[#D9A0A0] dark:text-[#00D4FF]" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-gray-500 block mb-1">Order Reference</span>
                    <span className="text-neutral-700 dark:text-white font-bold text-[11px] tracking-widest uppercase">#{order._id.substring(order._id.length - 8)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className={`text-[9px] font-bold uppercase px-4 py-1.5 rounded-full border ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </span>
                  <select 
                    value={order.status} 
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="text-[9px] font-bold uppercase tracking-widest bg-white dark:bg-[#202231] border border-[#D9A0A0]/20 dark:border-white/10 text-neutral-700 dark:text-white px-4 py-2 rounded-xl focus:border-[#D9A0A0] dark:focus:border-[#00D4FF] focus:ring-2 focus:ring-[#D9A0A0]/20 dark:focus:ring-[#00D4FF]/20 outline-none hover:bg-neutral-50 dark:hover:bg-white/5 transition-all cursor-pointer shadow-sm"
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
                    <div key={idx} className="flex items-center gap-6">
                      <div className="w-24 h-24 rounded-[1.5rem] bg-[#FAFAFA] dark:bg-[#1a1c27] border border-[#D9A0A0]/10 dark:border-white/5 flex-shrink-0 overflow-hidden shadow-inner flex items-center justify-center">
                        <img src={item.productId?.image || 'https://via.placeholder.com/150'} alt="Perfume" className="w-full h-full object-cover opacity-90 mix-blend-multiply dark:mix-blend-normal" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-[13px] font-bold text-neutral-800 dark:text-white tracking-wide mb-2">{item.productId?.name || 'Unknown Item'}</h4>
                        <p className="text-neutral-400 dark:text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">Qty <span className="text-neutral-600 dark:text-gray-300 ml-2">{item.quantity}</span></p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-[#D9A0A0] dark:text-[#00D4FF]">${(item.productId?.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="lg:col-span-4 bg-gradient-to-b from-[#FAFAFA] to-white dark:from-[#1a1c27] dark:to-[#202231] rounded-[2rem] p-8 border border-[#D9A0A0]/10 dark:border-white/5 space-y-8 flex flex-col justify-between shadow-sm">
                  <div className="space-y-6">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#D9A0A0] dark:text-[#00D4FF] flex items-center gap-3 mb-3"><User size={14} /> Client Identity</span>
                      <p className="text-neutral-800 dark:text-white font-bold text-[11px] mb-1 tracking-wide">{order.userId?.name}</p>
                      <p className="text-neutral-400 dark:text-gray-400 text-[10px]">{order.userId?.email}</p>
                    </div>
                    <div className="pt-6 border-t border-[#D9A0A0]/10 dark:border-white/5">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#D9A0A0] dark:text-[#00D4FF] flex items-center gap-3 mb-3"><Clock size={14} /> Timestamp</span>
                      <p className="text-neutral-700 dark:text-gray-300 font-medium text-[11px] tracking-wide">{new Date(order.createdAt).toLocaleDateString(undefined, { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-[#D9A0A0]/10 dark:border-white/5 flex justify-between items-end">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-gray-500">Volume</span>
                    <span className="text-2xl font-bold text-[#D9A0A0] dark:text-[#00D4FF] tracking-tighter">${order.totalAmount.toFixed(2)}</span>
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
