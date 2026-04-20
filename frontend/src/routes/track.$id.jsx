import React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { OrderTrackingHUD } from '../features/orders/components/OrderTrackingHUD';
import { useQuery } from '@tanstack/react-query';
import api from '../api-client/api';

const TrackOrder = () => {
  const { id } = Route.useParams();
  
  // Real-time tracking data fetch with 30s polling
  const { data: order, isLoading, error } = useQuery({
    queryKey: ['order-track', id],
    queryFn: async () => {
      const res = await api.get(`/orders/track/${id}`);
      return res.data;
    },
    refetchInterval: 30000, // Sync every 30 seconds for "real-time" updates
    refetchIntervalInBackground: true
  });

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] gap-12 px-6">
        <div className="text-center space-y-4">
          <div className="text-[#f8c8dc] font-serif text-5xl">Parcel Not Found</div>
          <p className="text-neutral-500 text-[10px] uppercase tracking-[0.3em] font-bold">The frequency #ORD... could not be localized</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/track" className="bg-white text-black px-12 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-[#f8c8dc] transition-all transform hover:-translate-y-1">
            Try Different ID
          </Link>
          <Link to="/" className="bg-transparent border border-white/10 text-neutral-400 px-12 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] hover:text-white transition-all">
            Return to Store
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] gap-8">
        <div className="w-16 h-16 border-2 border-[#f8c8dc]/20 border-t-[#f8c8dc] rounded-full animate-spin" />
        <div className="animate-pulse text-[#f8c8dc] text-[9px] font-black tracking-[0.5em] uppercase">Locating Parcel Telemetry...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      <OrderTrackingHUD order={order} />
    </div>
  );
};

export const Route = createFileRoute('/track/$id')({
  component: TrackOrder,
});
