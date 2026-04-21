import React, { useState } from 'react';
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { Search, Package, ArrowRight, ShieldCheck, History, ArrowLeft, Loader2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserOrders } from '../hooks/useApi';
import { useQuery } from '@tanstack/react-query';
import api from '../api-client/api';
import { OrderTimeline } from '../features/orders/components/OrderTimeline';

const TrackSearch = () => {
  const [searchInput, setSearchInput] = useState('');
  const [activeId, setActiveId] = useState(null);
  const navigate = useNavigate();
  const { data: userOrders } = useUserOrders();

  // Real-time tracking data fetch for the active ID
  const { data: order, isLoading: isTracking, error: trackError } = useQuery({
    queryKey: ['order-track', activeId],
    queryFn: async () => {
      const res = await api.get(`/orders/track/${activeId}`);
      return res.data;
    },
    enabled: !!activeId,
    refetchInterval: 30000,
  });

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setActiveId(searchInput.trim());
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans overflow-hidden relative selection:bg-[#f8c8dc]/30">
      {/* Decorative background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f8c8dc]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#f8c8dc]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-40 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
            <Package size={14} className="text-[#f8c8dc]" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-[#f8c8dc]">Velvora Concierge</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif mb-8 tracking-tighter leading-tight">
            Trace Your <br />
            <span className="text-[#f8c8dc] italic">Elegance</span>
          </h1>
          <p className="text-neutral-500 text-[10px] tracking-[0.5em] uppercase font-black max-w-lg mx-auto leading-relaxed opacity-70">
            Synchronize your location with <br /> your unique parcel telemetry.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-12">
          {/* Search Form */}
          <form onSubmit={handleTrackSubmit} className="group relative">
            <div className="absolute inset-0 bg-[#f8c8dc]/10 rounded-[3rem] blur-3xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000" />
            <div className="relative flex items-center bg-white/5 border border-white/10 p-4 rounded-[3rem] backdrop-blur-2xl focus-within:border-[#f8c8dc]/30 transition-all shadow-3xl">
              <div className="pl-6 pr-4 text-neutral-600">
                <Search size={24} />
              </div>
              <input
                type="text"
                placeholder="ORD002"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-transparent border-none text-white text-3xl font-serif placeholder:text-neutral-900 focus:ring-0 py-6 tracking-[0.1em]"
              />
              <button
                type="submit"
                className="bg-white text-black hover:bg-[#f8c8dc] w-16 h-16 flex items-center justify-center rounded-full transition-all group-hover:scale-105 active:scale-95 ml-2 shadow-2xl"
              >
                {isTracking ? <Loader2 size={24} className="animate-spin" /> : <ArrowRight size={28} />}
              </button>
            </div>
          </form>

          {/* Real-time Result Timeline */}
          <AnimatePresence mode="wait">
            {order ? (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative pt-8"
              >
                {/* Connecting Line from Search Bar */}
                <div className="absolute left-[39px] -top-12 w-0.5 h-12 bg-[#f8c8dc]/30 z-0" />
                
                <OrderTimeline 
                  status={order.status} 
                  history={order.statusHistory} 
                  orderId={order._id}
                />

                <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-20">
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
            ) : trackError ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="text-center py-10"
              >
                <p className="text-red-400 text-xs uppercase tracking-[0.2em] font-bold">Unrecognized Telemetry Frequency</p>
                <p className="text-neutral-600 text-[10px] mt-2 italic">The Order ID # {activeId} could not be localized.</p>
              </motion.div>
            ) : !activeId && userOrders && userOrders.length > 0 && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="space-y-6 pt-12 border-t border-white/5"
              >
                 <div className="flex items-center justify-between mb-8 px-2">
                  <div className="flex items-center gap-3 text-neutral-500">
                    <History size={14} />
                    <span className="text-[10px] uppercase tracking-[0.4em] font-black">Archive Registry</span>
                  </div>
                  <span className="text-[9px] text-[#f8c8dc] font-black uppercase tracking-widest">{userOrders.length} Recent Sorties</span>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {userOrders.slice().reverse().map((o, idx) => (
                    <button
                      key={o._id}
                      onClick={() => {
                        setSearchInput(o._id);
                        setActiveId(o._id);
                      }}
                      className="group flex items-center justify-between p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-[#f8c8dc]/20 transition-all text-left"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-xl bg-black border border-white/5 p-2 overflow-hidden flex-shrink-0">
                          <img src={o.products?.[0]?.productId?.image} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
                        </div>
                        <div>
                          <p className="text-[10px] text-[#f8c8dc] font-bold tracking-widest mb-1">#{o._id}</p>
                          <h4 className="text-white font-serif text-lg">{o.products?.[0]?.productId?.name || 'Multiple Fragrances'}</h4>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-neutral-700 group-hover:text-white transition-colors" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/track')({
  component: TrackSearch,
});
