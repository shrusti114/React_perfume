import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, DollarSign, ShoppingCart, Eye, TrendingUp } from 'lucide-react';

const SellerOverview = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalRevenue: 0,
    totalSalesCount: 0,
    pendingOrdersCount: 0,
    totalOrders: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:5000/api/seller/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(data);
      } catch (error) {
        console.error('Error fetching seller stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: 'Products Listed', value: stats.totalProducts, icon: <Package size={24} />, color: 'from-rose-400 to-pink-500' },
    { title: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: <DollarSign size={24} />, color: 'from-emerald-400 to-teal-500' },
    { title: 'Total Sales', value: stats.totalSalesCount, icon: <TrendingUp size={24} />, color: 'from-blue-400 to-indigo-500' },
    { title: 'Pending Orders', value: stats.pendingOrdersCount, icon: <ShoppingCart size={24} />, color: 'from-amber-400 to-orange-500' }
  ];

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div></div>;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((card, idx) => (
          <div key={idx} className="relative group">
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-10 rounded-3xl blur-xl group-hover:opacity-20 transition-opacity`}></div>
            <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white mb-6 shadow-lg transform group-hover:rotate-6 transition-transform`}>
                {card.icon}
              </div>
              <h3 className="text-neutral-500 text-sm font-bold uppercase tracking-widest mb-2">{card.title}</h3>
              <p className="text-3xl font-elegant text-neutral-800">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/40 backdrop-blur-md rounded-3xl p-10 border border-white/60 shadow-inner">
        <h2 className="text-3xl font-elegant text-neutral-800 mb-8">Performance Insight</h2>
        <div className="h-64 flex items-center justify-center text-neutral-400 font-light italic">
          Sales history visualization and detailed metrics will appear here.
        </div>
      </div>
    </div>
  );
};

export default SellerOverview;
