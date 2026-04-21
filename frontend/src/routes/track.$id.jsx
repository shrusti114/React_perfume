import React, { useState } from 'react';
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { Search, Package, ArrowRight, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import api from '../api-client/api';
import { OrderTimeline } from '../features/orders/components/OrderTimeline';

const TrackOrderDetail = () => {
  const { id } = Route.useParams();
  const [searchInput, setSearchInput] = useState(id);
  const navigate = useNavigate();

  // Real-time tracking data fetch with 30s polling
  const { data: order, isLoading, error } = useQuery({
    queryKey: ['order-track', id],
    queryFn: async () => {
      const res = await api.get(`/orders/track/${id}`);
      return res.data;
    },
    refetchInterval: 30000,
    refetchIntervalInBackground: true
  });

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate({ to: `/track/${searchInput.trim()}` });
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans overflow-hidden relative">
      {/* Decorative background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f8c8dc]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      
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
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Search/ID Display */}
          <form onSubmit={handleTrackSubmit} className="group relative mb-20">
            <div className="absolute inset-0 bg-[#f8c8dc]/10 rounded-[3rem] blur-3xl opacity-50 transition-opacity" />
            <div className="relative flex items-center bg-white/5 border border-white/10 p-4 rounded-[3rem] backdrop-blur-2xl transition-all shadow-3xl">
              <div className="pl-6 pr-4 text-neutral-600">
                <Search size={24} />
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-transparent border-none text-white text-3xl font-serif placeholder:text-neutral-800 focus:ring-0 py-6 tracking-[0.1em]"
              />
              <button
                type="submit"
                className="bg-white text-black hover:bg-[#f8c8dc] w-16 h-16 flex items-center justify-center rounded-full transition-all group-hover:scale-105 active:scale-95 ml-2 shadow-2xl"
              >
                {isLoading ? <Loader2 size={24} className="animate-spin" /> : <ArrowRight size={28} />}
              </button>
            </div>
          </form>

          {/* Results Area */}
          <AnimatePresence mode="wait">
            {order ? (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
              >
                {/* Connecting Line from Search Bar */}
                <div className="absolute left-[39px] -top-20 w-0.5 h-20 bg-[#f8c8dc]/30 z-0" />
                
                <OrderTimeline 
                  status={order.status} 
                  orderId={order._id}
                />

                <div className="mt-32 pt-12 border-t border-white/5 flex flex-wrap justify-center gap-12 opacity-20">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-[#f8c8dc]" />
                    <span className="text-[8px] uppercase tracking-widest font-black">Encrypted Frequency</span>
                  </div>
                </div>
              </motion.div>
            ) : error ? (
              <div className="text-center py-20 bg-white/5 rounded-[3rem] border border-white/5">
                <p className="text-red-400 font-serif text-3xl mb-4">Frequency Lost</p>
                <p className="text-neutral-500 text-[10px] uppercase tracking-widest font-black mb-8">The coordinate # {id} is no longer localized</p>
                <Link to="/track" className="bg-white text-black px-12 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#f8c8dc] transition-all">
                  Back to Concierge
                </Link>
              </div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/track/$id')({
  component: TrackOrderDetail,
});
