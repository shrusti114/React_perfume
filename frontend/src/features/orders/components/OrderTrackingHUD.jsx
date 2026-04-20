import React from 'react';
import { Package, Truck, CheckCircle2, Clock, MapPin, Search, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { OrderTimeline } from './OrderTimeline';
import { formatPrice } from '../../../utils/formatters';

export function OrderTrackingHUD({ order }) {
  if (!order) return null;

  const getStatusLabel = (status) => {
    if (status === 'Delivered') return 'Arrived';
    if (status === 'Shipped') return 'In Transit';
    if (status === 'Confirmed') return 'Order Confirmed';
    if (status === 'Pending') return 'Processing';
    return 'Processing'; // Default for initial state
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto px-4 md:px-0">
      {/* HUD Header */}
      <div className="bg-white/5 border border-white/10 rounded-[4rem] p-12 backdrop-blur-3xl relative overflow-hidden group shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f8c8dc]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#f8c8dc] animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.4em] font-black text-neutral-500">Live Parcel Telemetry</span>
              </div>
              <h1 className="text-4xl font-serif text-white tracking-tight">Order #{order._id.slice(-8)}</h1>
              <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                Registry Entry: {new Date(order.order_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>

            <div className="pt-8 border-t border-white/5 space-y-4">
              <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5">
                <span className="text-[9px] uppercase tracking-widest font-black text-neutral-500 block mb-2">Operational Status</span>
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${order.status === 'Delivered' ? 'bg-green-400 shadow-[0_0_15px_rgba(74,222,128,0.5)]' : 'bg-[#f8c8dc] shadow-[0_0_15px_rgba(248,200,220,0.5)] animate-pulse'}`} />
                  <span className="text-lg font-serif text-white uppercase tracking-[0.1em]">{order.status}</span>
                </div>
                <p className="text-[10px] text-neutral-500 mt-2 italic">{getStatusLabel(order.status)}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <OrderTimeline status={order.status} history={order.statusHistory} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Parcel Inventory */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
          {[
            { id: 'Pending', title: 'Processing', desc: 'Crafting & packaging your chosen essence within the Velvora secure vault.' },
            { id: 'Shipped', title: 'In Transit', desc: 'Your singular fragrance is being whisked across the country for final dispatch.' },
            { id: 'Delivered', title: 'Arrived', desc: 'A signature of sheer excellence has reached its final destination coordinates.' }
          ].map((item, i) => {
            const isActive = order.status === item.id || 
              (item.id === 'Pending' && ['Pending', 'Confirmed'].includes(order.status)) ||
              (item.id === 'Shipped' && order.status === 'Shipped') ||
              (item.id === 'Delivered' && order.status === 'Delivered');

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className={`p-10 border rounded-[2.5rem] transition-all relative overflow-hidden ${
                  isActive 
                    ? 'bg-[#f8c8dc]/10 border-[#f8c8dc] shadow-[0_0_30px_rgba(248,200,220,0.2)]' 
                    : 'bg-white/[0.02] border-white/5 opacity-50'
                }`}
              >
                {isActive && <div className="absolute top-0 right-0 w-24 h-24 bg-[#f8c8dc]/5 blur-[40px] rounded-full translate-x-12 -translate-y-12" />}
                <h4 className={`${isActive ? 'text-[#f8c8dc]' : 'text-neutral-500'} text-[10px] uppercase tracking-[0.3em] font-black mb-4 relative z-10`}>{item.title}</h4>
                <p className={`${isActive ? 'text-neutral-300' : 'text-neutral-600'} text-xs leading-relaxed font-light relative z-10`}>{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
          <div className="flex items-center justify-between px-4">
            <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Parcel Inventory</h3>
            <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">{order.products?.length} Unique Items</span>
          </div>
          
          <div className="space-y-4">
            {order.products?.map((item, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={idx} 
                className="flex items-center gap-6 p-6 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-[#f8c8dc]/20 transition-all group"
              >
                <div className="w-20 h-20 rounded-2xl bg-neutral-900 border border-white/5 p-2 overflow-hidden flex-shrink-0">
                  <img 
                    src={item.productId?.image || 'https://via.placeholder.com/150'} 
                    alt={item.productId?.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
                <div className="flex-grow">
                  <p className="text-[10px] uppercase font-bold text-neutral-600 tracking-widest mb-1">{item.productId?.brand || 'Velvora'}</p>
                  <h4 className="text-white font-medium text-lg mb-1 leading-tight">{item.productId?.name}</h4>
                  <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-xl">{formatPrice(item.productId?.price * item.quantity)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Shipping & Meta Data */}
        <div className="space-y-8">
          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 space-y-10 backdrop-blur-3xl shadow-xl">
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-[#f8c8dc]">
                <MapPin size={16} />
                <h4 className="text-[10px] uppercase font-bold tracking-[0.3em]">Destination Coordinates</h4>
              </div>
              <div className="space-y-1">
                <p className="text-white font-medium text-lg">{order.guestInfo?.name || order.userId?.name}</p>
                <p className="text-neutral-400 text-sm leading-relaxed font-light">
                  {order.guestInfo?.address || order.userId?.address || 'Premium Vault Shipping'}
                </p>
              </div>
            </section>

            <section className="space-y-4 pt-10 border-t border-white/5">
              <div className="flex items-center gap-3 text-[#f8c8dc]">
                <Clock size={16} />
                <h4 className="text-[10px] uppercase font-bold tracking-[0.3em]">Vault Logistics</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[11px] uppercase tracking-widest font-bold">
                  <span className="text-neutral-600">Shipping</span>
                  <span className="text-white">Boutique Express</span>
                </div>
                <div className="flex justify-between text-[11px] uppercase tracking-widest font-bold">
                  <span className="text-neutral-600">Payment</span>
                  <span className="text-white">{order.paymentMethod === 'COD' ? 'Cash on Delivery' : (order.paymentMethod || 'Secure Payment')}</span>
                </div>
                <div className="flex justify-between text-[11px] uppercase tracking-widest font-bold">
                  <span className="text-neutral-600">Status</span>
                  <span className="text-white">{order.paymentStatus}</span>
                </div>
              </div>
            </section>

            <div className="pt-10 border-t border-white/5">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black uppercase text-neutral-600 tracking-widest">Total Valuation</span>
                <span className="text-3xl font-serif text-white tracking-tighter">{formatPrice(order.totalAmount)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 px-4">
            <button className="w-full bg-white text-black py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[9px] hover:bg-[#f8c8dc] transition-all transform hover:-translate-y-1 shadow-2xl">
              Initiate Concierge Uplink
            </button>
            <button className="w-full bg-transparent border border-white/10 text-neutral-500 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[9px] hover:text-white hover:border-white transition-all">
              Request Manifest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
