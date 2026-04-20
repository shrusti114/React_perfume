import React, { useState } from 'react';
import { Package, Clock, CheckCircle2, ChevronRight, Truck, History, RotateCcw, Plus } from 'lucide-react';
import { formatPrice } from '../../../utils/formatters';
import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { useAddToCart } from '../../../hooks/useApi';

export function OrderHistory({ orders = [] }) {
  const [activeTab, setActiveTab] = useState('active');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const { mutate: addToCart } = useAddToCart();

  const handleReorderItem = (productId) => {
    addToCart({ productId, quantity: 1 });
  };

  const activeOrders = orders.filter(o => 
    ['Pending', 'Processing', 'Shipped'].includes(o.status)
  ).sort((a, b) => new Date(b.order_date) - new Date(a.order_date));
  
  const archivedOrders = orders.filter(o => 
    ['Delivered', 'Cancelled'].includes(o.status)
  ).sort((a, b) => new Date(b.order_date) - new Date(a.order_date));

  const currentOrders = activeTab === 'active' ? activeOrders : archivedOrders;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'processing': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'shipped': return 'text-[#f8c8dc] bg-[#f8c8dc]/10 border-[#f8c8dc]/20';
      default: return 'text-neutral-400 bg-neutral-400/10 border-neutral-400/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return <CheckCircle2 size={12} />;
      case 'shipped': return <Truck size={12} />;
      case 'processing': return <Clock size={12} />;
      default: return <Package size={12} />;
    }
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-24 bg-white/5 rounded-[3rem] border border-white/5">
        <Package size={48} className="mx-auto mb-6 text-neutral-800" strokeWidth={1} />
        <h3 className="text-xl font-serif text-white mb-2">No Parcel History</h3>
        <p className="text-neutral-500 text-[10px] uppercase tracking-[0.3em] font-bold mb-8 italic">Your journey with us has just begun.</p>
        <Link to="/shop" className="text-[#f8c8dc] text-[10px] uppercase underline tracking-[0.3em] font-bold hover:text-white transition-colors">Initiate Collection</Link>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-8">
        <div>
          <h2 className="text-3xl font-serif text-white mb-2">Order Manifest</h2>
          <p className="text-neutral-500 text-[10px] uppercase tracking-[0.3em] font-bold italic">Synchronized Delivery Telemetry</p>
        </div>

        <div className="flex p-1 bg-white/5 rounded-full border border-white/10">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all ${activeTab === 'active' ? 'bg-white text-black shadow-lg scale-105' : 'text-neutral-400 hover:text-white'}`}
          >
            <Truck size={12} />
            Active Deployments
            {activeOrders.length > 0 && <span className="ml-1 w-4 h-4 rounded-full bg-[#f8c8dc] text-black flex items-center justify-center text-[7px]">{activeOrders.length}</span>}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all ${activeTab === 'history' ? 'bg-white text-black shadow-lg scale-105' : 'text-neutral-400 hover:text-white'}`}
          >
            <History size={12} />
            Archived Missions
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        <AnimatePresence mode='wait'>
          {currentOrders.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]"
            >
              <p className="text-neutral-500 text-[10px] uppercase tracking-widest font-bold">No items found in this frequency</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {currentOrders.map((order) => {
                const isExpanded = expandedOrder === order._id;
                return (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={order._id} 
                    className="group overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all"
                  >
                    <div 
                      className="p-6 flex flex-col md:flex-row md:items-center justify-between cursor-pointer"
                      onClick={() => setExpandedOrder(isExpanded ? null : order._id)}
                    >
                      <div className="flex items-center gap-8 mb-6 md:mb-0">
                        <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-white/5 flex items-center justify-center overflow-hidden p-2">
                          <img 
                            src={order.products?.[0]?.productId?.image || 'https://via.placeholder.com/150'} 
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                            alt="Parcel Content" 
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <p className="text-[9px] uppercase tracking-[0.3em] text-[#f8c8dc] font-black">Ref #{order._id.slice(-8)}</p>
                            <span className={`px-3 py-1 rounded-full text-[7px] uppercase tracking-widest font-black border ${getStatusColor(order.status)} flex items-center gap-2`}>
                              {getStatusIcon(order.status)}
                              {order.status}
                            </span>
                          </div>
                          <h4 className="text-sm font-medium text-white mb-2">
                            {order.products?.length} {order.products?.length === 1 ? 'Fragrance Essence' : 'Curated Essences'}
                          </h4>
                          <div className="flex items-center gap-2">
                            <Clock size={12} className="text-neutral-600" />
                            <span className="text-[9px] text-neutral-500 uppercase tracking-widest font-bold italic">
                              Manifested {new Date(order.order_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-12 border-t md:border-t-0 border-white/5 pt-6 md:pt-0">
                        <div className="text-right">
                          <p className="text-[8px] text-neutral-500 uppercase tracking-[0.3em] mb-1 font-bold">Valuation</p>
                          <p className="text-xl font-bold text-white tracking-tight">{formatPrice(order.totalAmount)}</p>
                        </div>
                        
                        <div 
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all transform ${isExpanded ? 'bg-[#f8c8dc] text-black rotate-90' : 'bg-white text-black group-hover:translate-x-2'}`}
                        >
                          <ChevronRight size={20} />
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-white/5 bg-black/20"
                        >
                          <div className="p-6 space-y-4">
                            <p className="text-[8px] uppercase tracking-widest text-neutral-500 font-bold mb-4">Itemized Manifest</p>
                            {order.products?.map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center p-1">
                                    <img src={item.productId?.image} className="w-full h-full object-contain" alt={item.productId?.name} />
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold text-white">{item.productId?.name}</p>
                                    <p className="text-[9px] text-neutral-500 uppercase tracking-widest">{item.productId?.brand} · Qty: {item.quantity}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-6">
                                  <span className="text-sm font-bold text-white tracking-tight">{formatPrice(item.productId?.price * item.quantity)}</span>
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); handleReorderItem(item.productId?._id); }}
                                    className="flex items-center gap-2 px-4 py-2 bg-[#f8c8dc] text-black rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-white transition-all shadow-lg active:scale-95"
                                  >
                                    <Plus size={10} /> Add Again
                                  </button>
                                </div>
                              </div>
                            ))}
                            {activeTab === 'history' && (
                              <div className="pt-4 flex justify-end">
                                <Link 
                                  to={`/track/${order._id}`}
                                  className="text-[9px] uppercase tracking-widest text-[#f8c8dc] font-bold hover:text-white underline transition-colors"
                                >
                                  View Full Telemetry
                                </Link>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
