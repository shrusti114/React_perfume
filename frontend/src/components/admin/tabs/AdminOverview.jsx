import React, { useMemo } from 'react';
import { 
  DollarSign, ShoppingCart, Users, Sparkles, Box, MessageSquare, TrendingUp, ShieldCheck
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, RadialBarChart, RadialBar, RadarChart, PolarGrid, 
  PolarAngleAxis, Radar, PieChart, Pie, Cell, Legend
} from 'recharts';

const VELVORA_GOLD = '#C5A059';

const AdminOverview = ({ statsData, categoriesData, usersData }) => {
  const dashboardSections = useMemo(() => {
    return [
      { 
        label: 'Total Revenue', 
        value: statsData?.stats?.totalRevenue ? `$${statsData.stats.totalRevenue.toLocaleString()}` : '---', 
        trend: statsData?.growth?.revenue || '15%', 
        isPositive: true, 
        icon: <DollarSign /> 
      },
      { 
        label: 'Neural Links', 
        value: statsData?.stats?.totalUsers?.toLocaleString() || '---', 
        trend: statsData?.growth?.users || '12%', 
        isPositive: true, 
        icon: <Users /> 
      },
      { 
        label: 'Active Orders', 
        value: statsData?.stats?.activeOrders?.toLocaleString() || '---', 
        trend: statsData?.growth?.orders || '8%', 
        isPositive: true, 
        icon: <ShoppingCart /> 
      },
      { 
        label: 'Verified Sellers', 
        value: statsData?.stats?.totalSellers?.toLocaleString() || '---', 
        trend: null, 
        isPositive: true, 
        icon: <ShieldCheck /> 
      },
      { 
        label: 'Pending Approvals', 
        value: statsData?.stats?.pendingSellers?.toLocaleString() || '0', 
        trend: null, 
        isPositive: statsData?.stats?.pendingSellers === 0, 
        icon: <Sparkles /> 
      },
      { 
        label: 'Total Products', 
        value: statsData?.stats?.totalProducts?.toLocaleString() || '---', 
        trend: null, 
        isPositive: true, 
        icon: <Box /> 
      },
      { 
        label: 'Client Feedback', 
        value: statsData?.stats?.totalFeedback?.toLocaleString() || '0', 
        trend: null, 
        isPositive: true, 
        icon: <MessageSquare /> 
      },
    ];
  }, [statsData]);

  const chartMockData = [
    { name: 'Jan', sales: 4000 }, { name: 'Feb', sales: 3000 }, { name: 'Mar', sales: 2000 },
    { name: 'Apr', sales: 2780 }, { name: 'May', sales: 1890 }, { name: 'Jun', sales: 2390 },
    { name: 'Jul', sales: 3490 }, { name: 'Aug', sales: 3200 }, { name: 'Sep', sales: 2800 },
    { name: 'Oct', sales: 3900 }, { name: 'Nov', sales: 4500 }, { name: 'Dec', sales: 5000 },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Visual Definitions for Gradients */}
      <svg className="h-0 w-0 absolute">
        <defs>
          <linearGradient id="yieldGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={VELVORA_GOLD} stopOpacity={0.4}/>
            <stop offset="95%" stopColor={VELVORA_GOLD} stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="velocityGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8c440a" />
            <stop offset="100%" stopColor={VELVORA_GOLD} />
          </linearGradient>
        </defs>
      </svg>

      {/* Hero Stats HUM */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardSections.map((s, i) => (
          <div key={i} className="glass-card group hover:scale-[1.02] transition-all duration-500">
              <div className="flex justify-between items-start mb-6">
                  <div className="h-12 w-12 bg-white/5 rounded-2xl flex items-center justify-center text-[var(--admin-accent)] group-hover:bg-[var(--admin-accent)] group-hover:text-black transition-all duration-500">
                      {s.icon}
                  </div>
                  {s.trend && (
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${s.isPositive ? 'text-emerald-500 border-emerald-500/30 bg-emerald-500/5' : 'text-rose-500 border-rose-500/30 bg-rose-500/5'}`}>
                          {s.isPositive ? '+' : '-'}{s.trend}
                      </span>
                  )}
              </div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--admin-text-secondary)] mb-2">{s.label}</h4>
              <p className="text-3xl font-bold text-[var(--admin-text-primary)] tracking-tighter">{s.value}</p>
          </div>
        ))}
      </section>

      {/* Intelligence Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-card">
              <div className="flex justify-between items-center mb-12">
                  <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--admin-accent)] mb-1">Global Yield Matrix</h4>
                      <p className="text-[10px] text-[var(--admin-text-secondary)] font-bold uppercase">Real-time revenue processing</p>
                  </div>
              </div>
              <div className="h-[400px] min-h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={statsData?.monthlySales?.length > 0 ? statsData.monthlySales : chartMockData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-10" />
                    <XAxis dataKey="name" stroke="currentColor" fontSize={9} axisLine={false} tickLine={false} className="opacity-50" />
                    <YAxis stroke="currentColor" fontSize={9} axisLine={false} tickLine={false} className="opacity-50" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--admin-panel)', border: '1px solid var(--admin-panel-border)', borderRadius: '12px' }}
                      itemStyle={{ color: 'var(--admin-text-primary)' }}
                    />
                    <Area type="monotone" dataKey="sales" stroke={VELVORA_GOLD} strokeWidth={4} fill="url(#yieldGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
          </div>

          <div className="glass-card flex flex-col items-center justify-center text-center">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--admin-text-secondary)] mb-10">Neural Velocity Pulse</h4>
              <div className="h-64 w-64 relative">
                  <ResponsiveContainer width="99%" height="100%">
                    <RadialBarChart innerRadius="60%" outerRadius="100%" barSize={15} data={[{ name: 'Velocity', value: (statsData?.stats?.totalOrders % 100) || 75, fill: 'url(#velocityGradient)' }]}>
                      <RadialBar minAngle={15} background clockWise dataKey="value" cornerRadius={10} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold text-[var(--admin-text-primary)] tracking-tighter">{(statsData?.stats?.totalOrders % 100) || 75}%</span>
                      <span className="text-[9px] font-bold text-[var(--admin-accent)] uppercase tracking-widest">Active</span>
                  </div>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-20">
          <div className="glass-card">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--admin-text-secondary)] mb-10 text-center">Aromatic Market Alpha</h4>
              <div className="h-80">
                <ResponsiveContainer width="99%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={categoriesData?.slice(0, 5).map(c => ({ subject: c.category_name, A: Math.floor(Math.random() * 80) + 20 })) || [
                    { subject: 'Floral', A: 120 }, { subject: 'Woody', A: 98 },
                    { subject: 'Fresh', A: 86 }, { subject: 'Oriental', A: 99 },
                  ]}>
                    <PolarGrid stroke="currentColor" className="opacity-10" />
                    <PolarAngleAxis dataKey="subject" stroke="currentColor" fontSize={9} className="opacity-50" />
                    <Radar name="Market" dataKey="A" stroke={VELVORA_GOLD} fill={VELVORA_GOLD} fillOpacity={0.4} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
          </div>

          <div className="glass-card">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--admin-text-secondary)] mb-6">Recent Neural Linkages</h4>
              <div className="space-y-4">
                  {usersData?.slice(0, 4).map((u, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[var(--admin-accent)]/20 transition-all group">
                          <div className="h-10 w-10 rounded-xl bg-[var(--admin-accent)]/10 flex items-center justify-center text-[var(--admin-accent)] font-bold">
                              {u.name?.charAt(0)}
                          </div>
                          <div className="flex-1">
                              <p className="text-[11px] font-bold text-[var(--admin-text-primary)]">{u.name}</p>
                              <p className="text-[9px] text-[var(--admin-text-secondary)] font-medium">{u.email}</p>
                          </div>
                          <div className="text-right">
                              <span className={`px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest ${u.status === 'Active' ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'}`}>
                                  {u.status}
                              </span>
                              <p className="text-[8px] text-[var(--admin-text-secondary)] mt-1 font-bold opacity-40">
                                  {new Date(u.created_at?.$date || u.created_at).toLocaleDateString()}
                              </p>
                          </div>
                      </div>
                  ))}
                  {(!usersData || usersData.length === 0) && (
                      <div className="py-10 text-center opacity-40">
                          <p className="text-[10px] font-bold uppercase tracking-widest">No active neural links detected</p>
                      </div>
                  )}
              </div>
          </div>
      </div>
    </div>
  );
};

export default AdminOverview;
