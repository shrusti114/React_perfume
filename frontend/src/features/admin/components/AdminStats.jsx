import React from 'react';
import { Users, ShoppingBag, IndianRupee, TrendingUp, Package, AlertCircle } from 'lucide-react';

export function AdminStats({ stats }) {
  const cards = [
    { 
      label: 'Total Revenue', 
      value: `₹${stats?.totalRevenue?.toLocaleString() || 0}`, 
      icon: IndianRupee, 
      color: 'text-green-500', 
      bg: 'bg-green-500/10' 
    },
    { 
      label: 'Total Orders', 
      value: stats?.totalOrders || 0, 
      icon: ShoppingBag, 
      color: 'text-blue-500', 
      bg: 'bg-blue-500/10' 
    },
    { 
      label: 'Active Users', 
      value: stats?.totalUsers || 0, 
      icon: Users, 
      color: 'text-[#f8c8dc]', 
      bg: 'bg-[#f8c8dc]/10' 
    },
    { 
      label: 'Total Products', 
      value: stats?.totalProducts || 0, 
      icon: Package, 
      color: 'text-purple-500', 
      bg: 'bg-purple-500/10' 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {cards.map((card, i) => (
        <div key={i} className="bg-white dark:bg-white/5 p-8 rounded-[2rem] border border-black/5 dark:border-white/10 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className={`p-3 rounded-2xl ${card.bg} ${card.color} group-hover:scale-110 transition-transform duration-500`}>
              <card.icon size={24} />
            </div>
            {i === 0 && <TrendingUp size={20} className="text-green-500 animate-pulse" />}
          </div>
          
          <div className="relative z-10">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500 mb-1">{card.label}</p>
            <h3 className="text-3xl font-serif text-black dark:text-white tracking-tight">{card.value}</h3>
          </div>

          {/* Decorative Background Element */}
          <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full ${card.bg} opacity-20 blur-2xl group-hover:scale-150 transition-transform duration-700`} />
        </div>
      ))}
    </div>
  );
}
