import React, { useState } from 'react';
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { Search, Package, ArrowRight, ShieldCheck, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserOrders } from '../hooks/useApi';

const TrackSearch = () => {
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();
  const { data: userOrders, isLoading } = useUserOrders();

  const handleTrack = (e) => {
    e.preventDefault();
    if (orderId.trim()) {
      navigate({ to: `/track/${orderId.trim()}` });
    }
  };

  const recentOrders = userOrders?.slice(-3).reverse() || [];

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans overflow-hidden relative">
      {/* Decorative background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f8c8dc]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#f8c8dc]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
            <Package size={14} className="text-[#f8c8dc]" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-[#f8c8dc]">Velvora Concierge</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-serif mb-6 tracking-tight">Trace Your <br /><span className="text-[#f8c8dc]">Elegance</span></h1>
          <p className="text-neutral-500 text-[10px] tracking-[0.4em] uppercase font-black max-w-lg mx-auto leading-relaxed">
            Synchronize your location with your unique parcel telemetry.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto space-y-16"
        >
          {/* Search Form */}
          <form onSubmit={handleTrack} className="group relative">
            <div className="absolute inset-0 bg-[#f8c8dc]/20 rounded-[2.5rem] blur-3xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
            <div className="relative flex items-center bg-white/5 border border-white/10 p-3 rounded-[2.5rem] backdrop-blur-2xl focus-within:border-[#f8c8dc]/40 transition-all shadow-2xl">
              <div className="pl-6 pr-4 text-neutral-500">
                <Search size={24} />
              </div>
              <input
                type="text"
                placeholder="VLV-XXXXXXXXXX"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full bg-transparent border-none text-white text-2xl font-serif placeholder:text-neutral-800 focus:ring-0 py-4 tracking-widest"
              />
              <button
                type="submit"
                className="bg-white text-black hover:bg-[#f8c8dc] p-5 rounded-full transition-all group-hover:scale-105 active:scale-95 ml-2 shadow-xl"
              >
                <ArrowRight size={24} />
              </button>
            </div>
          </form>

          {/* Order History Feature */}
          <AnimatePresence>
            {userOrders && userOrders.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-6 pt-12 border-t border-white/5"
              >
                <div className="flex items-center justify-between mb-6 px-2">
                  <div className="flex items-center gap-3 text-neutral-500">
                    <History size={14} />
                    <span className="text-[9px] uppercase tracking-[0.3em] font-black italic">My Order History</span>
                  </div>
                  <span className="text-[9px] text-[#f8c8dc] font-black uppercase tracking-widest">{userOrders.length} Parcels</span>
                </div>
                
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {userOrders.slice().reverse().map((order, idx) => (
                    <motion.div
                      key={order._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group flex items-center justify-between p-5 rounded-[1.5rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-[#f8c8dc]/20 transition-all"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-white/5 p-2 flex-shrink-0 overflow-hidden">
                          <img 
                            src={order.products?.[0]?.productId?.image || 'https://via.placeholder.com/150'} 
                            alt="Order Item" 
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div>
                          <p className="text-[9px] text-[#f8c8dc] font-black uppercase tracking-[0.2em] mb-1">#{order._id.slice(-8)}</p>
                          <h4 className="text-sm font-serif text-white mb-1">{order.products?.[0]?.productId?.name || 'Multiple Items'} ({order.products?.length} items)</h4>
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${['Delivered', 'Arrived'].includes(order.status) ? 'bg-green-500' : 'bg-[#f8c8dc] animate-pulse'}`} />
                            <span className="text-[10px] text-neutral-500 uppercase tracking-widest">{order.status} • ₹{order.totalAmount?.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => navigate({ to: `/track/${order._id}` })}
                        className="bg-white/5 hover:bg-[#f8c8dc] text-white hover:text-black px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 hover:border-transparent transition-all"
                      >
                        Track Status
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-wrap justify-center gap-12 opacity-30 pt-4">
            <div className="flex items-center gap-3">
              <ShieldCheck size={16} className="text-[#f8c8dc]" />
              <span className="text-[9px] uppercase tracking-[0.2em] font-black">Encrypted Gateway</span>
            </div>
            <div className="flex items-center gap-3">
              <Package size={16} className="text-[#f8c8dc]" />
              <span className="text-[9px] uppercase tracking-[0.2em] font-black">Satellite Telemetry</span>
            </div>
          </div>
        </motion.div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
          {[
            { title: 'Processing', desc: 'Crafting & packaging your chosen essence within the Velvora secure vault.' },
            { title: 'In Transit', desc: 'Your singular fragrance is being whisked across the country for final dispatch.' },
            { title: 'Arrived', desc: 'A signature of sheer excellence has reached its final destination coordinates.' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              className="p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.05] transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#f8c8dc]/5 blur-[40px] rounded-full translate-x-12 -translate-y-12" />
              <h4 className="text-[#f8c8dc] text-[10px] uppercase tracking-[0.3em] font-black mb-4 relative z-10">{item.title}</h4>
              <p className="text-neutral-500 text-xs leading-relaxed font-light relative z-10">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/track')({
  component: TrackSearch,
});
