import React, { useState } from 'react';
import { Package, DollarSign, ShoppingCart, TrendingUp, MoreHorizontal, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { useSellerStats } from '../../hooks/useApi';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, BarChart, Bar } from 'recharts';

const SellerOverview = () => {
  const { data: statsData, isLoading: loading } = useSellerStats();

  const stats = statsData || {
    totalProducts: 45,
    totalRevenue: 35755,
    totalSalesCount: 120,
    pendingOrdersCount: 15,
    totalOrders: 75
  };

  const statCards = [
    { title: 'Total Orders', value: stats.totalOrders, icon: <Package size={20} />, up: true, trend: '4% (30 days)' },
    { title: 'Total Delivered', value: stats.totalOrders - stats.pendingOrdersCount, icon: <ShoppingCart size={20} />, up: true, trend: '4% (30 days)' },
    { title: 'Total Revenue', value: stats.totalRevenue, icon: <TrendingUp size={20} />, up: false, trend: '4% (30 days)' },
    { title: 'Total Canceled', value: '75', icon: <DollarSign size={20} />, up: false, trend: '4% (30 days)' }
  ];

  const orderData = [
    { name: 'Sun', orders: 100 }, { name: 'Mon', orders: 200 }, { name: 'Tue', orders: 150 },
    { name: 'Wed', orders: 300 }, { name: 'Thu', orders: 250 }, { name: 'Fri', orders: 400 },
    { name: 'Sat', orders: 350 }, { name: 'Sun', orders: 456 }
  ];

  const revenueData = [
    { name: 'Jan', current: 15000, previous: 20000 }, { name: 'Feb', current: 25000, previous: 15000 },
    { name: 'Mar', current: 20000, previous: 18000 }, { name: 'Apr', current: 18000, previous: 25000 },
    { name: 'May', current: 35000, previous: 20000 }, { name: 'Jun', current: 25000, previous: 35755 },
    { name: 'Jul', current: 30000, previous: 25000 }, { name: 'Aug', current: 20000, previous: 30000 },
    { name: 'Sep', current: 35755, previous: 25000 }, { name: 'Oct', current: 25000, previous: 18000 },
    { name: 'Nov', current: 30000, previous: 20000 }, { name: 'Dec', current: 25000, previous: 15000 },
  ];

  const customerData = [
    { name: 'Sat', value: 40 }, { name: 'Sun', value: 30 }, { name: 'Mon', value: 60 },
    { name: 'Tue', value: 20 }, { name: 'Wed', value: 50 }, { name: 'Thu', value: 40 }, { name: 'Fri', value: 25 },
  ];

  const recentReviews = [
    { name: 'Thanha Islam', time: '2 days ago', text: 'Uniquely target empowered manufactured products for collaborative opportunities. Dramatically pursue.', rating: 4.5, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200' },
    { name: 'Rabiay Islam', time: '3 days ago', text: 'Uniquely target empowered manufactured products for collaborative opportunities. Dramatically pursue.', rating: 4.0, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200' },
    { name: 'Samira Islam', time: '6 days ago', text: 'Uniquely target empowered manufactured products for collaborative opportunities. Dramatically pursue.', rating: 3.5, image: 'https://images.unsplash.com/photo-1531123897727-8f129e1b88ce?q=80&w=200' },
  ];

  // Helper for Circular Progress
  const RadialProgress = ({ percentage, label, colorCls }) => (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" className="stroke-black/5 dark:stroke-white/5" strokeWidth="12" fill="none" />
          <circle 
            cx="50" cy="50" r="40" 
            className={`stroke-[#D9A0A0] dark:stroke-[#00D4FF] transition-all duration-1000 ease-out`} 
            strokeWidth="12" 
            fill="none" 
            strokeDasharray="251.2" 
            strokeDashoffset={251.2 - (251.2 * percentage) / 100} 
            strokeLinecap="round" 
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-neutral-800 dark:text-white">{percentage}%</span>
        </div>
      </div>
      <span className="text-neutral-500 dark:text-gray-400 text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </div>
  );

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#D9A0A0] dark:border-[#00D4FF]"></div></div>;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white dark:bg-[#202231] p-6 rounded-3xl border border-[#D9A0A0]/20 dark:border-white/5 flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:border-[#D9A0A0] dark:hover:border-[#00D4FF]/30 transition-colors">
            <div className={`w-14 h-14 shrink-0 rounded-[1.2rem] bg-gradient-to-br from-[#FAFAFA] to-white dark:from-[#2a2d3e] dark:to-[#1a1c27] border border-[#D9A0A0]/30 dark:border-[#00D4FF]/20 flex items-center justify-center text-[#D9A0A0] dark:text-[#00D4FF] shadow-[0_0_15px_rgba(217,160,160,0.1)] dark:shadow-[0_0_15px_rgba(0,212,255,0.15)]`}>
              {card.icon}
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-gray-400">{card.title}</p>
              <h3 className="text-3xl font-bold text-neutral-800 dark:text-white my-1 tracking-tight">{card.value}</h3>
              <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest">
                <span className={card.up ? 'text-emerald-500' : 'text-rose-500'}>{card.up ? '▲' : '▼'} {card.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales Analysis */}
        <div className="lg:col-span-5 bg-white dark:bg-[#202231] p-8 rounded-3xl border border-[#D9A0A0]/20 dark:border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-xl relative overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-8 relative z-10">
            <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-800 dark:text-white">Sales Analysis</h3>
            <button className="text-neutral-400 hover:text-[#D9A0A0] dark:hover:text-[#00D4FF]"><MoreHorizontal size={20}/></button>
          </div>
          <div className="flex justify-between items-center px-4 relative z-10 flex-grow pt-4">
             <RadialProgress percentage={81} label="Total Orders" />
             <RadialProgress percentage={22} label="Customer Growth" />
             <RadialProgress percentage={62} label="Total Revenue" />
          </div>
          <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-[#D9A0A0]/5 dark:bg-[#00D4FF]/5 rounded-full blur-[80px] pointer-events-none"></div>
        </div>

        {/* Chat Order Flow */}
        <div className="lg:col-span-7 bg-white dark:bg-[#202231] p-8 rounded-3xl border border-[#D9A0A0]/20 dark:border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-800 dark:text-white mb-2">Order Activity</h3>
              <p className="text-[10px] uppercase tracking-widest text-neutral-400 dark:text-gray-500">Volume tracking across past 7 days</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-[#D9A0A0]/30 dark:border-[#00D4FF]/30 text-[#D9A0A0] dark:text-[#00D4FF] rounded-xl text-[10px] uppercase tracking-widest font-bold hover:bg-[#D9A0A0]/10 dark:hover:bg-[#00D4FF]/10 transition-colors shadow-sm">
              <Download size={14} /> Save Report
            </button>
          </div>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="99%" height="100%">
              <AreaChart data={orderData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="orderGradLight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D9A0A0" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D9A0A0" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="orderGradDark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00D4FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'transparent', border: 'none' }} 
                  itemStyle={{ color: '#fff' }} 
                  cursor={{ stroke: 'rgba(150,150,150,0.1)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white dark:bg-[#1a1c27] text-neutral-800 dark:text-white text-[10px] uppercase tracking-widest px-4 py-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-xl border border-[#D9A0A0]/20 dark:border-[#00D4FF]/30">
                          <p className="font-bold text-[#D9A0A0] dark:text-[#00D4FF] mb-1">{payload[0].value} Ords</p>
                          <p className="text-neutral-400 dark:text-gray-400">{payload[0].payload.name}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} dx={-10} />
                <Area type="monotone" dataKey="orders" stroke="url(#orderGradDark)" strokeWidth={3} fill="url(#orderGradDark)" className="dark:!stroke-[#00D4FF] dark:!fill-[url(#orderGradDark)] !stroke-[#D9A0A0] !fill-[url(#orderGradLight)]" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Total Revenue */}
        <div className="lg:col-span-8 bg-white dark:bg-[#202231] p-8 rounded-3xl border border-[#D9A0A0]/20 dark:border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-xl">
           <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-800 dark:text-white">Total Revenue</h3>
            <div className="flex gap-4">
              <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-neutral-400 dark:text-gray-500 px-3 py-1.5 bg-[#FAFAFA] dark:bg-white/5 rounded-xl border border-[#D9A0A0]/10 dark:border-transparent"><div className="w-2 h-2 rounded-full border-2 border-white dark:border-[#202231] bg-gray-300 dark:bg-gray-500"></div> 2020</span>
              <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-white bg-gradient-to-r from-[#D9A0A0] to-[#E5B5B5] dark:from-[#00D4FF]/80 dark:to-[#00D4FF] px-3 py-1.5 rounded-xl shadow-[0_4px_15px_rgba(217,160,160,0.3)] dark:shadow-[0_0_15px_rgba(0,212,255,0.3)]"><div className="w-2 h-2 rounded-full border-2 border-[#D9A0A0] dark:border-[#00D4FF] bg-white"></div> 2021</span>
            </div>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="99%" height="100%">
               <LineChart data={revenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} dx={-10} tickFormatter={(val) => `$${val/1000}k`} />
                 <Tooltip 
                   cursor={false} 
                   contentStyle={{ backgroundColor: '#fff', borderColor: 'rgba(217,160,160,0.2)', borderRadius: '16px', color: '#333', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }} 
                   className="dark:!bg-[#1a1c27] dark:!border-[#00D4FF]/30 dark:!text-white dark:!shadow-xl"
                 />
                 <Line type="monotone" dataKey="previous" stroke="#e5e7eb" strokeWidth={2} dot={false} strokeDasharray="5 5" className="dark:!stroke-gray-600 !stroke-gray-300" />
                 <Line type="monotone" dataKey="current" stroke="url(#orderGradDark)" strokeWidth={4} dot={{ r: 5, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 7, fill: '#fff', strokeWidth: 3 }} className="dark:!stroke-[#00D4FF] dark:!stroke-[#00D4FF] !stroke-[#D9A0A0] !fill-[#D9A0A0]" />
               </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Map */}
        <div className="lg:col-span-4 bg-white dark:bg-[#202231] p-8 rounded-3xl border border-[#D9A0A0]/20 dark:border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-800 dark:text-white">Customer Trend</h3>
            <div className="flex gap-2">
              <select className="bg-transparent border border-[#D9A0A0]/30 dark:border-white/10 text-neutral-500 dark:text-gray-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-xl outline-none">
                <option>Weekly</option>
              </select>
              <button className="text-neutral-400 hover:text-[#D9A0A0] dark:hover:text-[#00D4FF] border border-[#D9A0A0]/30 dark:border-white/10 rounded-xl p-1.5"><MoreHorizontal size={16}/></button>
            </div>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="99%" height="100%">
               <BarChart data={customerData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                 <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} dx={-10} />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} dy={10} />
                 <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#fff', borderColor: 'rgba(217,160,160,0.2)', borderRadius: '16px', color: '#111' }} className="dark:!bg-[#1a1c27] dark:!border-[#00D4FF]/30 dark:!text-white" />
                 <Bar dataKey="value" fill="url(#orderGradDark)" radius={[6, 6, 6, 6]} barSize={12} className="dark:!fill-[#00D4FF] !fill-[#D9A0A0]" />
               </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Customer Review Section */}
      <div className="mt-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-lg font-bold text-neutral-800 dark:text-white">Customer Review</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-gray-500 mt-2">Latest physical storefront feedback</p>
          </div>
          <div className="flex gap-3">
            <button className="w-10 h-10 rounded-full bg-white dark:bg-[#202231] border border-[#D9A0A0]/20 dark:border-white/5 flex items-center justify-center text-[#D9A0A0] dark:text-gray-400 hover:bg-[#FAFAFA] dark:hover:bg-white/5 transition-colors shadow-sm"><ChevronLeft size={18} /></button>
            <button className="w-10 h-10 rounded-full bg-[#D9A0A0] dark:bg-[#202231] border border-[#D9A0A0]/20 dark:border-white/5 flex items-center justify-center text-white dark:text-gray-400 hover:bg-[#E5B5B5] dark:hover:bg-white/5 transition-colors shadow-[0_4px_15px_rgba(217,160,160,0.4)] dark:shadow-sm"><ChevronRight size={18} /></button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {recentReviews.map((review, i) => (
             <div key={i} className="bg-white dark:bg-[#202231] p-8 rounded-[2rem] border border-[#D9A0A0]/10 dark:border-white/5 flex flex-col md:flex-row gap-6 items-center md:items-start group hover:border-[#D9A0A0]/40 dark:hover:border-[#00D4FF]/30 transition-all shadow-[0_4px_20px_rgb(0,0,0,0.02)] dark:shadow-xl hover:-translate-y-1">
               <div className="flex-grow">
                 <h4 className="font-bold text-neutral-800 dark:text-white text-sm">{review.name}</h4>
                 <p className="text-[9px] font-bold uppercase tracking-widest text-[#D9A0A0] dark:text-gray-500 mb-4">{review.time}</p>
                 <p className="text-[11px] text-neutral-500 dark:text-gray-400 leading-relaxed mb-6 italic">
                   "{review.text}"
                 </p>
                 <div className="flex items-center gap-1 text-[#D9A0A0] dark:text-[#00D4FF]">
                   {[1,2,3,4,5].map(star => (
                     <span key={star} className={star <= Math.floor(review.rating) ? 'opacity-100' : 'opacity-20 text-neutral-300 dark:text-white'}>★</span>
                   ))}
                   <span className="text-neutral-800 dark:text-white font-bold text-[10px] ml-3">{review.rating.toFixed(1)}</span>
                 </div>
               </div>
               <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-4 border-white dark:border-[#1a1c27] shadow-[0_0_0_2px_rgba(217,160,160,0.2)] dark:shadow-[0_0_0_2px_rgba(0,212,255,0.2)] group-hover:shadow-[0_0_0_2px_rgba(217,160,160,0.6)] dark:group-hover:shadow-[0_0_0_2px_rgba(0,212,255,0.6)] transition-all">
                 <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
               </div>
             </div>
           ))}
        </div>
      </div>

    </div>
  );
};

export default SellerOverview;
