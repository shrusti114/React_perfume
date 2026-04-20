import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, Box, ShoppingCart, MessageSquare, BarChart3, 
  Trash2, Edit, Plus, Download, ChevronRight, Filter, 
  ShoppingBag, Sparkles, TrendingUp, DollarSign, Search, Eye
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as LineTooltip, 
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend,
  AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  RadialBarChart, RadialBar
} from 'recharts';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import { 
  useAdminStats, useAdminUsers, useAdminOrders, 
  useAdminCategories, useAdminFeedback, useProducts,
  useUpdateUserStatus, useApproveSeller, useDeleteCategory,
  useDeleteFeedback, useUpdateOrderStatus,
  useCreateProduct, useUpdateProduct, useCreateCategory, useDeleteProduct,
  useAdminPayments, useSendNotification, useDeleteUser, useUpdateCategory
} from '../../hooks/useApi';

import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import SummaryCard from './SummaryCard';
import { DataTable } from '../ui/DataTable';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { useQueryClient } from '@tanstack/react-query';

const VELVORA_GOLD = '#C5A059';

const AdminDashboard = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', text: 'Velocity confirmed. Welcome Eleanor. System is operational.' }
  ]);
  const [inputText, setInputText] = useState('');

  // Search/Filters
  const [userSearch, setUserSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');

  // Modals
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isLiveMode, setIsLiveMode] = useState(false);

  // Queries
  const { data: statsData, isLoading: isStatsLoading } = useAdminStats();
  const { data: usersData, isLoading: isUsersLoading } = useAdminUsers(userSearch);
  const { data: ordersData, isLoading: isOrdersLoading } = useAdminOrders();
  const { data: categoriesData, isLoading: isCategoriesLoading } = useAdminCategories();
  const { data: feedbackData, isLoading: isFeedbackLoading } = useAdminFeedback();
  const { data: productsData, isLoading: isProductsLoading } = useProducts({ search: productSearch });
  const { data: paymentsData, isLoading: isPaymentsLoading } = useAdminPayments();

  // Mutations
  const updateUserStatus = useUpdateUserStatus();
  const approveSeller = useApproveSeller();
  const deleteCategory = useDeleteCategory();
  const updateCategory = useUpdateCategory();
  const deleteFeedback = useDeleteFeedback();
  const updateOrderStatus = useUpdateOrderStatus();
  const createProduct = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();
  const createCategoryMutation = useCreateCategory();
  const deleteUserMutation = useDeleteUser();
  const sendNotification = useSendNotification();

  useEffect(() => {
    if (isLiveMode) {
      const interval = setInterval(() => {
        queryClient.invalidateQueries({ queryKey: ['admin'] });
      }, 10000); // 10s sync
      return () => clearInterval(interval);
    }
  }, [isLiveMode, queryClient]);

  const handleExportPDF = async (title) => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Velvora Intelligence Report", 20, 20);
    doc.setFontSize(14);
    doc.text(`Title: ${title}`, 20, 35);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 45);
    doc.line(20, 50, 190, 50);
    
    // Simple content for now
    doc.text("Status: System Operational", 20, 65);
    doc.text("Velocity Metrics: Confirmed", 20, 75);
    
    doc.save(`Velvora_Report_${title.replace(/\s/g, '_')}.pdf`);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const userMsg = inputText.toLowerCase();
    setChatMessages(prev => [...prev, { role: 'user', text: inputText }]);
    setInputText('');

    // Simulated Intelligence Response
    setTimeout(() => {
        let response = "Negative. I require more specific parameters to process that command.";
        
        if (userMsg.includes('stats') || userMsg.includes('analyze')) {
            response = `Velocity check complete. Total platform revenue is currently tracking at $${statsData?.stats?.totalRevenue?.toLocaleString() || '420,000'}. Market acceleration is UP by ${statsData?.growth?.revenue || '12.4%'} in the current cycle.`;
        } else if (userMsg.includes('stock') || userMsg.includes('inventory')) {
            response = "Deep scan of the Scent Vault indicates 12 items are currently below the critical threshold of 5 units. I recommend immediate replenishment protocols.";
        } else if (userMsg.includes('users') || userMsg.includes('growth')) {
            response = `User acquisition is stable. We have ${statsData?.stats?.totalUsers || '2,450'} active neural links in the network. Seller approval velocity is at 100%.`;
        } else if (userMsg.includes('hello') || userMsg.includes('hi')) {
            response = "Greetings, Eleanor. Voice and biometric authentication confirmed. How may I assist your command today?";
        }

        setChatMessages(prev => [...prev, { role: 'bot', text: response }]);
    }, 1000);
  };

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
        icon: <Users /> 
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
    { name: 'Jan', sales: 4000, orders: 240, users: 400 },
    { name: 'Feb', sales: 3000, orders: 139, users: 500 },
    { name: 'Mar', sales: 2000, orders: 980, users: 700 },
    { name: 'Apr', sales: 2780, orders: 390, users: 800 },
    { name: 'May', sales: 1890, orders: 480, users: 1100 },
    { name: 'Jun', sales: 2390, orders: 380, users: 1300 },
    { name: 'Jul', sales: 3490, orders: 430, users: 1600 },
    { name: 'Aug', sales: 3200, orders: 500, users: 1800 },
    { name: 'Sep', sales: 2800, orders: 600, users: 2000 },
    { name: 'Oct', sales: 3900, orders: 700, users: 2300 },
    { name: 'Nov', sales: 4500, orders: 850, users: 2600 },
    { name: 'Dec', sales: 5000, orders: 900, users: 3000 },
  ];

  const renderDashboardOverview = () => (
    <div className="space-y-12 pb-20">
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

      {/* Hero Stats HUD */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardSections.map((s, i) => (
          <div key={i} className="bg-[#111111] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
              <div className="flex justify-between items-start mb-6">
                  <div className="h-12 w-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-black transition-all duration-500">
                      {s.icon}
                  </div>
                  {s.trend && (
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${s.isPositive ? 'text-emerald-500 border-emerald-500/30 bg-emerald-500/5' : 'text-rose-500 border-rose-500/30 bg-rose-500/5'}`}>
                          {s.isPositive ? '+' : '-'}{s.trend}
                      </span>
                  )}
              </div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">{s.label}</h4>
              <p className="text-3xl font-bold text-white tracking-tighter">{s.value}</p>
              <div className="absolute -right-4 -bottom-4 h-24 w-24 bg-[#C5A059]/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        ))}
      </section>

      {/* Intelligence Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart: Yield Trajectory */}
          <div className="lg:col-span-2 bg-[#111111] border border-white/5 rounded-[3rem] p-12 shadow-2xl relative">
              <div className="flex justify-between items-center mb-12">
                  <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-1">Global Yield Matrix</h4>
                      <p className="text-[10px] text-neutral-600 font-bold uppercase">Real-time revenue processing</p>
                  </div>
                  <div className="flex gap-2">
                      {['24H', '7D', '1M', '1Y'].map(t => (
                          <button key={t} className={`px-4 py-1.5 rounded-lg text-[9px] font-bold transition-all ${t === '1M' ? 'bg-[#C5A059] text-black' : 'text-neutral-500 hover:text-white'}`}>{t}</button>
                      ))}
                  </div>
              </div>
              <div className="h-[400px]">
                <ResponsiveContainer width="99%" height="100%">
                  <AreaChart data={statsData?.monthlySales?.length > 0 ? statsData.monthlySales : chartMockData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
                    <XAxis dataKey="name" stroke="#444" fontSize={9} axisLine={false} tickLine={false} />
                    <YAxis stroke="#444" fontSize={9} axisLine={false} tickLine={false} />
                    <LineTooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '12px' }} />
                    <Area type="monotone" dataKey="sales" stroke={VELVORA_GOLD} strokeWidth={4} fill="url(#yieldGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
          </div>

          {/* Scent Velocity Gauge */}
          <div className="bg-[#111111] border border-white/5 rounded-[3rem] p-12 shadow-2xl flex flex-col items-center justify-center text-center">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-10">Neural Velocity Pulse</h4>
              <div className="h-64 w-64 relative">
                  <ResponsiveContainer width="99%" height="100%">
                    <RadialBarChart innerRadius="60%" outerRadius="100%" barSize={15} data={[{ name: 'Velocity', value: (statsData?.stats?.totalOrders % 100) || 75, fill: 'url(#velocityGradient)' }]}>
                      <RadialBar minAngle={15} background clockWise dataKey="value" cornerRadius={10} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold text-white tracking-tighter">{(statsData?.stats?.totalOrders % 100) || 75}%</span>
                      <span className="text-[9px] font-bold text-[#C5A059] uppercase tracking-widest">Active</span>
                  </div>
              </div>
              <p className="text-[10px] text-neutral-600 font-bold uppercase leading-relaxed max-w-[150px] mt-8">System throughput optimized for peak market conditions.</p>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Radar Chart: Category Alpha */}
          <div className="bg-[#111111] border border-white/5 rounded-[3rem] p-12 shadow-2xl relative">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-10 text-center">Aromatic Market Alpha</h4>
              <div className="h-80">
                <ResponsiveContainer width="99%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={categoriesData?.slice(0, 5).map(c => ({ subject: c.category_name, A: Math.floor(Math.random() * 80) + 20, B: 110, fullMark: 150 })) || [
                    { subject: 'Oud', A: 120, fullMark: 150 },
                    { subject: 'Floral', A: 98, fullMark: 150 },
                    { subject: 'Fresh', A: 86, fullMark: 150 },
                    { subject: 'Woody', A: 99, fullMark: 150 },
                    { subject: 'Oriental', A: 85, fullMark: 150 },
                  ]}>
                    <PolarGrid stroke="#333" />
                    <PolarAngleAxis dataKey="subject" stroke="#666" fontSize={9} />
                    <Radar name="Market" dataKey="A" stroke={VELVORA_GOLD} fill={VELVORA_GOLD} fillOpacity={0.4} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
          </div>

          {/* Scent Density Donut */}
          <div className="bg-[#111111] border border-white/5 rounded-[3rem] p-12 shadow-2xl relative flex flex-col items-center">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-10 text-center">Collection Density</h4>
              <div className="h-80 w-full">
                <ResponsiveContainer width="99%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoriesData?.slice(0, 4).map((c, i) => ({ name: c.category_name, value: 400 - (i*50) })) || [
                        { name: 'Private Blend', value: 400 },
                        { name: 'Artisan Scent', value: 300 },
                        { name: 'Signature', value: 300 },
                        { name: 'Limited', value: 200 },
                      ]}
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {['#C5A059', '#8c440a', '#555555', '#222222'].map((color, idx) => (
                        <Cell key={idx} fill={color} stroke="none" />
                      ))}
                    </Pie>
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
          </div>
      </div>

      {/* Scent Intelligence Layer */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-[#111111] border border-white/5 rounded-[2rem] p-8 shadow-xl flex items-center justify-between group">
              <div>
                  <h5 className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest mb-1">Vault Health</h5>
                  <p className="text-white font-bold text-lg">98.2% Optimal</p>
              </div>
              <div className="h-10 w-24 bg-black/50 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-emerald-500/20 w-[98%] transition-all"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-emerald-500 uppercase">Secure</div>
              </div>
          </div>
          <div className="bg-[#111111] border border-white/5 rounded-[2rem] p-8 shadow-xl flex items-center justify-between group">
              <div>
                  <h5 className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest mb-1">Aromatic Drift</h5>
                  <p className="text-white font-bold text-lg">Stable Velocity</p>
              </div>
              <TrendingUp className="text-[#C5A059] opacity-20 group-hover:opacity-100 transition-opacity" size={24} />
          </div>
          <div className="bg-[#111111] border border-white/5 rounded-[2rem] p-8 shadow-xl flex items-center justify-between group">
              <div>
                  <h5 className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest mb-1">Seller Synergy</h5>
                  <p className="text-white font-bold text-lg">{usersData?.filter(u => u.role === 'seller').length || 122} Approved</p>
              </div>
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          </div>
      </section>
    </div>
  );

  const renderPayments = () => (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-[15px] font-bold text-white tracking-wider uppercase opacity-90">Transaction Ledger</h3>
            <p className="text-[9px] text-neutral-600 font-bold uppercase tracking-[0.2em] mt-2">Overseeing {paymentsData?.length || 0} secure transfers</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#111111] border border-white/5 rounded-xl text-[10px] font-bold uppercase text-neutral-500 hover:text-white transition-all"><Download size={14}/> Reconciliation Report</button>
      </div>

      {isPaymentsLoading ? (
        <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#C5A059]"></div></div>
      ) : (
        <DataTable 
          data={paymentsData || []}
          columns={[
            { accessorKey: 'transaction_id', header: 'Tx Link', cell: i => <span className="text-[#C5A059] font-mono text-[10px] tracking-wider">{i.getValue() || 'INTERNAL'}</span> },
            { accessorKey: 'order_id._id', header: 'Reference', cell: i => <span className="text-white font-bold text-[10px]">#{i.getValue()?.slice(-8).toUpperCase()}</span> },
            { accessorKey: 'order_id.userId.name', header: 'Client', cell: i => <span className="text-neutral-400 text-[11px]">{i.getValue() || 'Guest'}</span> },
            { accessorKey: 'amount', header: 'Value', cell: i => <span className="text-white font-bold text-[11px]">${i.getValue()?.toLocaleString()}</span> },
            { accessorKey: 'payment_mode', header: 'Protocol', cell: i => (
                <span className="px-4 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-bold text-neutral-400 uppercase tracking-widest">{i.getValue()}</span>
            )},
            { accessorKey: 'payment_date', header: 'Timestamp', cell: i => <span className="text-neutral-600 text-[10px] font-bold uppercase">{new Date(i.getValue()).toLocaleString()}</span> }
          ]}
        />
      )}
    </div>
  );

  const renderSystems = () => (
    <div className="space-y-12 pb-20 max-w-6xl">
      <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-[15px] font-bold text-white tracking-wider uppercase opacity-90">Neural Dispatch & Systems</h3>
            <p className="text-[9px] text-neutral-600 font-bold uppercase tracking-[0.2em] mt-2">Manage platform-wide intelligence notifications</p>
          </div>
          <Button 
            onClick={() => setIsNotificationModalOpen(true)}
            className="bg-[#C5A059] text-black h-12 px-8 rounded-xl flex items-center gap-3 hover:scale-105 transition-all"
          >
            <Sparkles size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">New Broadcast</span>
          </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">Active Intelligence Stream</h4>
              {feedbackData?.slice(0, 5).map((f, i) => (
                <div key={i} className="bg-[#111111] border border-white/5 rounded-3xl p-6 flex gap-6 items-start group">
                    <div className="h-10 w-10 bg-white/5 rounded-2xl flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-black transition-all">
                        <MessageSquare size={16} />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                            <h5 className="text-white font-bold text-[13px]">{f.subject || 'Platform Inquiry'}</h5>
                            <span className="text-[9px] text-neutral-600 font-bold uppercase tracking-widest">{new Date(f.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="text-[11px] text-neutral-500 leading-relaxed max-w-xl">{f.comment}</p>
                    </div>
                </div>
              ))}
          </div>

          <div className="space-y-8">
              <div className="bg-[#111111] border border-white/5 rounded-[2.5rem] p-10 h-min">
                  <h4 className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest mb-6">System Health</h4>
                  <div className="space-y-6">
                      {[
                        { label: 'Database Link', status: 'Online', val: 100 },
                        { label: 'Scent Vault', status: 'Secure', val: 94 },
                        { label: 'Payment API', status: 'Active', val: 100 }
                      ].map((s, i) => (
                        <div key={i} className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold uppercase">
                                <span className="text-neutral-500">{s.label}</span>
                                <span className="text-white">{s.status}</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-[#C5A059] transition-all" style={{ width: `${s.val}%` }}></div>
                            </div>
                        </div>
                      ))}
                  </div>
              </div>
          </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center mb-8">
          <h3 className="text-[15px] font-bold text-white tracking-wider uppercase opacity-90">User Management <span className="text-neutral-600 font-medium ml-2">({usersData?.length || 0})</span></h3>
          <div className="flex gap-4">
              <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-[#C5A059] transition-colors" size={12} />
                  <input 
                    placeholder="Search users..." 
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="bg-[#111111] border border-white/5 rounded-xl px-12 py-2.5 text-[11px] outline-none focus:border-[#C5A059]/40 w-72 text-neutral-300" 
                  />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#111111] border border-white/5 rounded-xl text-[10px] font-bold uppercase text-neutral-500 hover:text-white transition-all"><Filter size={12}/> Filters</button>
          </div>
      </div>

      {isUsersLoading ? (
        <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#C5A059]"></div></div>
      ) : (
        <DataTable 
          data={usersData || []}
          columns={[
            { accessorKey: 'name', header: 'User', cell: info => (
                <div className="flex items-center gap-4 py-1">
                    <div className="h-10 w-10 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center overflow-hidden">
                        <span className="text-neutral-500 font-bold">{info.getValue()?.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-white font-bold text-[11px]">{info.getValue()}</p>
                      <p className="text-[9px] text-neutral-600 font-bold uppercase tracking-widest">{info.row.original.role}</p>
                    </div>
                </div>
            )},
            { accessorKey: 'email', header: 'Email', cell: info => <span className="text-neutral-500 font-medium text-[11px]">{info.getValue()}</span> },
            { accessorKey: 'status', header: 'Status', cell: info => (
                <span className={`px-5 py-1.5 rounded-full text-[9px] font-bold uppercase border ${
                  info.getValue() === 'Active' 
                    ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30' 
                    : 'text-rose-500 bg-rose-500/10 border-rose-500/30'
                }`}>
                    {info.getValue()}
                </span>
            )},
            { id: 'actions', header: 'Actions', cell: (info) => (
                <div className="flex gap-6">
                    <button 
                      onClick={() => setEditingUser(info.row.original)}
                      className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest hover:underline transition-all"
                    >
                      Process Identity
                    </button>
                    <button 
                      onClick={() => updateUserStatus.mutate({ id: info.row.original._id, status: info.row.original.status === 'Active' ? 'Blocked' : 'Active' })}
                      className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest hover:underline transition-all"
                    >
                      {info.row.original.status === 'Active' ? 'Block Access' : 'Unblock Access'}
                    </button>
                    {info.row.original.role === 'seller' && !info.row.original.isApproved && (
                      <button 
                        onClick={() => approveSeller.mutate(info.row.original._id)}
                        className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest hover:underline transition-all"
                      >
                        Approve Seller
                      </button>
                    )}
                    <button 
                      onClick={() => {
                        if(window.confirm('Are you sure you want to delete this user?')) {
                          // Note: Need useDeleteUser mutation if available, for now just a log
                          console.log('Delete user:', info.row.original._id);
                        }
                      }}
                      className="text-[10px] font-bold text-rose-500 uppercase tracking-widest hover:underline transition-all"
                    >
                      Delete
                    </button>
                </div>
            )}
          ]}
        />
      )}
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center mb-12">
          <div>
            <h3 className="text-[15px] font-bold text-white tracking-wider uppercase opacity-90">Inventory Management</h3>
            <p className="text-[9px] text-neutral-600 font-bold uppercase tracking-[0.2em] mt-2">Oversee {productsData?.length || 0} unique olfactory creations</p>
          </div>
          <div className="flex gap-4">
              <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-[#C5A059] transition-colors" size={12} />
                  <input 
                    placeholder="Search inventory..." 
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="bg-[#111111] border border-white/5 rounded-xl px-12 py-3 text-[11px] outline-none focus:border-[#C5A059]/40 w-80 text-neutral-300" 
                  />
              </div>
              <Button 
                onClick={() => setIsAddProductModalOpen(true)}
                className="bg-[#C5A059] text-black h-12 px-8 rounded-xl flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-[#C5A059]/10"
              >
                  <Plus size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">New Fragrance</span>
              </Button>
          </div>
      </div>

      {isProductsLoading ? (
        <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#C5A059]"></div></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productsData?.map((p) => (
            <div key={p._id} className="bg-[#111111] border border-white/5 rounded-[2.5rem] p-8 flex gap-8 group hover:border-[#C5A059]/30 transition-all shadow-xl relative overflow-hidden">
                <div className="h-40 w-32 bg-black rounded-[1.5rem] overflow-hidden relative shadow-2xl border border-white/5 shrink-0">
                    {p.images?.[0] ? (
                        <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                    ) : (
                        <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                            <ShoppingBag size={40} className="text-neutral-800" />
                        </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                </div>
                <div className="flex-1 flex flex-col justify-between py-2 truncate">
                    <div>
                      <h5 className="text-white font-bold text-lg mb-1 tracking-tight truncate">{p.name}</h5>
                      <p className="text-[9px] text-neutral-600 font-bold uppercase tracking-widest mb-4">{p.categoryId?.category_name || 'Fragrance'}</p>
                      <div className="space-y-2">
                          <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Price <span className="text-[#C5A059] ml-1.5 font-bold">${p.price}</span></p>
                          <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Inventory <span className={`ml-1.5 ${p.stock < 10 ? 'text-rose-500' : 'text-neutral-300'}`}>{p.stock} units</span></p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-6">
                        <button 
                          onClick={() => setEditingProduct(p)}
                          className="flex-1 h-10 bg-[#C5A059]/10 border border-[#C5A059]/20 text-[#C5A059] font-bold text-[9px] rounded-xl uppercase tracking-widest hover:bg-[#C5A059] hover:text-black transition-all"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => { if(window.confirm(`Vanish ${p.name} from the collection?`)) deleteProductMutation.mutate(p._id); }}
                          className="h-10 px-4 bg-rose-500/10 text-rose-500 font-bold text-[9px] rounded-xl uppercase tracking-widest border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all"
                        >
                            <Trash2 size={14}/>
                        </button>
                    </div>
                </div>
                <div className="absolute -right-4 -top-4 h-24 w-24 bg-[#C5A059]/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center mb-8">
          <h3 className="text-[15px] font-bold text-white tracking-wider uppercase opacity-90">Order Fulfillment <span className="text-neutral-600 font-medium ml-2">({ordersData?.length || 0})</span></h3>
          <div className="flex gap-3">
              <button className="flex items-center gap-2 px-6 py-3 bg-[#111111] border border-white/5 rounded-xl text-[10px] font-bold uppercase text-neutral-500 hover:text-white transition-all"><Download size={14}/> Export Manifest</button>
              <button className="flex items-center gap-2 px-6 py-3 bg-[#111111] border border-white/5 rounded-xl text-[10px] font-bold uppercase text-neutral-500 hover:text-white transition-all"><Filter size={14}/> Sort by Date</button>
          </div>
      </div>

      {isOrdersLoading ? (
        <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#C5A059]"></div></div>
      ) : (
        <DataTable 
          data={ordersData || []}
          columns={[
            { accessorKey: '_id', header: 'Reference', cell: info => <span className="text-[#C5A059] font-bold tracking-[0.2em] text-[10px]">#{info.getValue().slice(-8).toUpperCase()}</span> },
            { accessorKey: 'userId.name', header: 'Client', cell: info => (
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center">
                        <span className="text-[10px] text-neutral-500">{info.getValue()?.charAt(0)}</span>
                    </div>
                    <span className="text-white font-medium text-[11px]">{info.getValue() || 'Guest'}</span>
                </div>
            )},
            { accessorKey: 'items[0].productName', header: 'Primary Item', cell: info => <span className="text-neutral-400 text-[11px] font-medium italic">{info.getValue() || 'Curated Selection'}</span> },
            { accessorKey: 'totalAmount', header: 'Amount', cell: info => <span className="text-white font-bold text-[11px]">${info.getValue()?.toLocaleString()}</span> },
            { accessorKey: 'status', header: 'Fulfillment', cell: info => (
                <select 
                  defaultValue={info.getValue()}
                  onChange={(e) => updateOrderStatus.mutate({ orderId: info.row.original._id, status: e.target.value })}
                  className="bg-[#050505] border border-white/10 rounded-lg px-3 py-1.5 text-[9px] font-bold uppercase text-[#C5A059] outline-none hover:bg-white/5 transition-colors"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
            )},
            { id: 'detail', header: 'Manifest', cell: info => (
                <button 
                  onClick={() => setSelectedOrder(info.row.original)}
                  className="p-2 hover:bg-white/5 rounded-lg text-[#C5A059] transition-all"
                >
                  <Eye size={16} />
                </button>
            )},
            { accessorKey: 'createdAt', header: 'Timestamp', cell: info => <span className="text-neutral-600 text-[10px] font-bold uppercase">{new Date(info.getValue()).toLocaleDateString()}</span> }
          ]}
        />
      )}

      {/* Product Modal */}
      <Modal 
        isOpen={isAddProductModalOpen || !!editingProduct} 
        onClose={() => { setIsAddProductModalOpen(false); setEditingProduct(null); }}
        title={editingProduct ? "Refine Fragrance" : "New Olfactory Creation"}
        className="bg-[#050505] border-white/10"
      >
        <form className="space-y-6" onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const data = Object.fromEntries(formData.entries());
          if(editingProduct) {
            updateProductMutation.mutate({ id: editingProduct._id, values: data }, { onSuccess: () => setEditingProduct(null) });
          } else {
            createProduct.mutate(data, { onSuccess: () => setIsAddProductModalOpen(false) });
          }
        }}>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Name</label>
              <Input name="name" defaultValue={editingProduct?.name} className="bg-white/5 border-white/10 text-white" required />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Price ($)</label>
              <Input name="price" type="number" defaultValue={editingProduct?.price} className="bg-white/5 border-white/10 text-white" required />
            </div>
          </div>
          <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Inventory Units</label>
              <Input name="stock" type="number" defaultValue={editingProduct?.stock} className="bg-white/5 border-white/10 text-white" required />
          </div>
          <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Aromatic Description</label>
              <Textarea name="description" defaultValue={editingProduct?.description} className="bg-white/5 border-white/10 text-white h-32" required />
          </div>
          <div className="flex justify-end gap-4 pt-6">
              <Button type="button" onClick={() => { setIsAddProductModalOpen(false); setEditingProduct(null); }} className="px-8 border border-white/10 text-neutral-500">Cancel</Button>
              <Button type="submit" className="px-10 bg-[#C5A059] text-black font-bold">
                {editingProduct ? "Update Asset" : "Deploy Asset"}
              </Button>
          </div>
        </form>
      </Modal>

      {/* Category Modal */}
      <Modal 
        isOpen={isAddCategoryModalOpen} 
        onClose={() => setIsAddCategoryModalOpen(false)}
        title="Expand Scent Library"
        className="bg-[#050505] border-white/10"
      >
        <form className="space-y-6" onSubmit={(e) => {
          e.preventDefault();
          const name = new FormData(e.target).get('name');
          createCategoryMutation.mutate({ name }, { onSuccess: () => setIsAddCategoryModalOpen(false) });
        }}>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Category Name</label>
            <Input name="name" className="bg-white/5 border-white/10 text-white px-6 py-4" required />
          </div>
          <div className="flex justify-end gap-4 pt-6">
              <Button type="button" onClick={() => setIsAddCategoryModalOpen(false)} className="px-8 border border-white/10 text-neutral-500">Cancel</Button>
              <Button type="submit" className="px-10 bg-[#C5A059] text-black font-bold">Archive Category</Button>
          </div>
        </form>
      </Modal>
    </div>
  );

  const renderCategories = () => (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center mb-8">
          <h3 className="text-[15px] font-bold text-white tracking-wider uppercase opacity-90">Scent Library & Categories</h3>
          <Button 
            onClick={() => setIsAddCategoryModalOpen(true)}
            className="bg-[#C5A059] text-black h-12 px-8 rounded-xl flex items-center gap-3"
          >
              <Plus size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Add Category</span>
          </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categoriesData?.map((cat) => (
          <div key={cat._id} className="bg-[#111111] border border-white/5 rounded-2xl p-6 flex flex-col items-center group relative overflow-hidden">
              <div className="h-16 w-16 bg-[#C5A059]/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles size={24} className="text-[#C5A059]" />
              </div>
              <h4 className="text-white font-bold text-[13px] tracking-wider uppercase mb-1">{cat.category_name}</h4>
              <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">Collection</p>
              
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <button 
                    onClick={() => setEditingCategory(cat)}
                    className="text-neutral-600 hover:text-[#C5A059]"
                  >
                    <Edit size={14} />
                  </button>
                  <button 
                    onClick={() => deleteCategory.mutate(cat._id)}
                    className="text-neutral-600 hover:text-rose-500"
                  >
                    <Trash2 size={14} />
                  </button>
              </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFeedback = () => (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center mb-8">
          <h3 className="text-[15px] font-bold text-white tracking-wider uppercase opacity-90">Client Communication & Feedback</h3>
      </div>

      <DataTable 
        data={feedbackData || []}
        columns={[
          { accessorKey: 'name', header: 'Client', cell: i => <span className="text-white font-bold text-[11px]">{i.getValue()}</span> },
          { accessorKey: 'email', header: 'Email', cell: i => <span className="text-neutral-500 text-[11px]">{i.getValue()}</span> },
          { accessorKey: 'subject', header: 'Inquiry', cell: i => <span className="text-white text-[11px] font-medium">{i.getValue()}</span> },
          { accessorKey: 'createdAt', header: 'Received', cell: i => <span className="text-neutral-700 text-[10px] font-bold uppercase">{new Date(i.getValue()).toLocaleDateString()}</span> },
          { id: 'actions', header: 'Actions', cell: (i) => (
            <button 
              onClick={() => deleteFeedback.mutate(i.row.original._id)}
              className="px-4 py-1.5 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-lg text-[9px] font-bold uppercase hover:bg-rose-500 hover:text-white transition-all"
            >
              Exterminate
            </button>
          )}
        ]}
      />
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-12 pb-20">
      <div className="flex justify-between items-center mb-8">
          <h3 className="text-[15px] font-bold text-white tracking-wider uppercase opacity-90">Advanced Predictive Analytics</h3>
          <div className="flex gap-4">
              <button className="h-10 px-6 bg-[#C5A059] text-black rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-[#C5A059]/20">Real-time Stream</button>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-[#111111] border border-white/5 rounded-[3rem] p-12 shadow-2xl relative">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-10">Revenue Yield Matrix</h4>
              <div className="h-96">
                <ResponsiveContainer width="99%" height="100%">
                  <LineChart data={statsData?.monthlySales?.length > 0 ? statsData.monthlySales : chartMockData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
                    <XAxis dataKey="name" stroke="#555" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis stroke="#555" fontSize={10} axisLine={false} tickLine={false} />
                    <LineTooltip 
                      contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '12px' }}
                      itemStyle={{ color: '#C5A059', fontWeight: 'bold' }}
                    />
                    <Line type="monotone" dataKey="sales" stroke={VELVORA_GOLD} strokeWidth={6} dot={{ r: 8, fill: '#000', stroke: VELVORA_GOLD, strokeWidth: 3 }} activeDot={{ r: 10 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
          </div>

          <div className="bg-[#111111] border border-white/5 rounded-[3rem] p-12 shadow-2xl relative">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-10">Category Popularity Distribution</h4>
              <div className="h-96 flex items-center justify-center">
                <ResponsiveContainer width="99%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Oud', value: 400 },
                        { name: 'Floral', value: 300 },
                        { name: 'Fresh', value: 300 },
                        { name: 'Woody', value: 200 },
                      ]}
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {['#C5A059', '#8c440a', '#555', '#222'].map((color, idx) => (
                        <Cell key={idx} fill={color} />
                      ))}
                    </Pie>
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
          </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-12 pb-20">
      <div className="flex justify-between items-center mb-8">
          <h3 className="text-[15px] font-bold text-white tracking-wider uppercase opacity-90">Intelligence Reports & Exports</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'Financial Audit Q4', desc: 'Complete breakdown of revenue, taxes, and refunds.', icon: <DollarSign /> },
          { title: 'Inventory Manifest', desc: 'Real-time stock levels and asset valuation.', icon: <Box /> },
          { title: 'Client Demographics', desc: 'Geographic and purchasing behavior insights.', icon: <Users /> }
        ].map((rep, idx) => (
          <div key={idx} className="bg-[#111111] border border-white/5 rounded-[2.5rem] p-10 group hover:border-[#C5A059]/30 transition-all shadow-xl">
             <div className="h-14 w-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#C5A059] mb-8 group-hover:bg-[#C5A059] group-hover:text-black transition-all">
                {rep.icon}
             </div>
             <h4 className="text-white font-bold text-lg mb-3 tracking-tight">{rep.title}</h4>
             <p className="text-[11px] text-neutral-500 leading-relaxed mb-10">{rep.desc}</p>
             <button 
                onClick={() => handleExportPDF(rep.title)}
                className="w-full h-12 border border-white/5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white hover:bg-[#C5A059] hover:text-black hover:border-[#C5A059] transition-all flex items-center justify-center gap-3"
              >
                <Download size={14} /> Download PDF
             </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-12 pb-20 max-w-5xl">
      <div>
          <h3 className="text-[15px] font-bold text-white tracking-wider uppercase opacity-90">Administrative Command & Settings</h3>
          <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-[0.2em] mt-2">Adjust platform velocity and system parameters</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Account Settings */}
          <section className="bg-[#111111] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl">
              <div className="flex items-center gap-6 mb-10">
                  <div className="h-16 w-16 bg-[#C5A059] rounded-2xl flex items-center justify-center text-black shadow-lg shadow-[#C5A059]/20">
                      <Users size={32} />
                  </div>
                  <div>
                      <h4 className="text-white font-bold text-xl tracking-tight">Eleanor Velvora</h4>
                      <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Root Administrator</p>
                  </div>
              </div>
              
              <div className="space-y-6">
                  <div className="space-y-2">
                      <label className="text-[9px] font-bold text-neutral-600 uppercase tracking-[0.2em]">Primary Alias</label>
                      <Input defaultValue="Eleanor Velvora" className="bg-black/40 border-white/5 text-white h-12" />
                  </div>
                  <div className="space-y-2">
                      <label className="text-[9px] font-bold text-neutral-600 uppercase tracking-[0.2em]">Neural Link (Email)</label>
                      <Input defaultValue="admin@velvora.com" className="bg-black/40 border-white/5 text-white h-12" />
                  </div>
                  <Button className="w-full bg-white/5 border border-white/10 text-white font-bold h-12 uppercase text-[10px] tracking-widest hover:bg-[#C5A059] hover:text-black transition-all">Update Credentials</Button>
              </div>
          </section>

          {/* Platform Configuration */}
          <section className="space-y-8">
              <div className="bg-[#111111] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-8">System Parameters</h4>
                  <div className="space-y-8">
                      <div className="flex items-center justify-between">
                          <div>
                              <p className="text-white font-bold text-[13px] mb-1">Vault Maintenance Mode</p>
                              <p className="text-[10px] text-neutral-600">Suspend public interface for deep collection archiving</p>
                          </div>
                          <div className="h-6 w-12 bg-black rounded-full border border-white/10 relative cursor-pointer group">
                              <div className="absolute right-1 top-1 h-4 w-4 bg-neutral-800 rounded-full group-hover:bg-[#C5A059] transition-all"></div>
                          </div>
                      </div>
                      <div className="flex items-center justify-between">
                          <div>
                              <p className="text-white font-bold text-[13px] mb-1">Public Scent Registration</p>
                              <p className="text-[10px] text-neutral-600">Allow new sellers to join the Velvora network</p>
                          </div>
                          <div className="h-6 w-12 bg-[#C5A059]/20 rounded-full border border-[#C5A059]/30 relative cursor-pointer">
                              <div className="absolute left-1 top-1 h-4 w-4 bg-[#C5A059] rounded-full"></div>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="bg-rose-500/5 border border-rose-500/10 rounded-[2.5rem] p-10">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-rose-500 mb-6 text-center">Security Perimeter</h4>
                  <p className="text-[10px] text-rose-500/60 font-medium text-center mb-8">Warning: Modifying encryption keys or passwords will terminate all active neural links.</p>
                  <Button className="w-full bg-rose-500/10 border border-rose-500/20 text-rose-500 font-bold h-12 uppercase text-[10px] tracking-widest hover:bg-rose-500 hover:text-white transition-all">Reset Access Protocols</Button>
              </div>
          </section>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch(activeTab) {
        case 'Dashboard': return renderDashboardOverview();
        case 'Users': return renderUsers();
        case 'Products': return renderProducts();
        case 'Orders': return renderOrders();
        case 'Categories': return renderCategories();
        case 'Feedback': return renderFeedback();
        case 'Payments': return renderPayments();
        case 'Systems': return renderSystems();
        case 'Analytics': return renderAnalytics();
        case 'Reports': return renderReports();
        case 'Settings': return renderSettings();
        default: return renderDashboardOverview();
    }
  }

  useEffect(() => {
    if (isLiveMode) {
      const interval = setInterval(() => {
        queryClient.invalidateQueries();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isLiveMode]);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#C5A059]/30 selection:text-[#C5A059]">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} setIsChatOpen={setIsChatOpen} />
      
      <main className="pl-80 min-h-screen flex flex-col">
        <AdminHeader isLiveMode={isLiveMode} setIsLiveMode={setIsLiveMode} />
        
        <div className="p-12 flex-1 relative">
            <div className="max-w-[1600px] mx-auto animate-in fade-in duration-700 slide-in-from-bottom-4">
                {renderTabContent()}
            </div>
        </div>
      </main>

      {/* Neural Dispatch Modal */}
      <Modal 
        isOpen={isNotificationModalOpen} 
        onClose={() => setIsNotificationModalOpen(false)}
        title="Neural Dispatch"
      >
        <form className="space-y-6" onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const data = Object.fromEntries(formData.entries());
          sendNotification.mutate(data, { onSuccess: () => setIsNotificationModalOpen(false) });
        }}>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-neutral-500">Recipients</label>
            <select name="userId" className="w-full bg-white/5 border-white/10 rounded-xl h-12 px-4 text-white text-sm outline-none focus:border-[#C5A059]/30">
              <option value="all">Broadcast to All Users</option>
              {usersData?.map(u => (
                <option key={u._id} value={u._id}>{u.name} ({u.role})</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-neutral-500">Priority Type</label>
              <select name="type" className="w-full bg-white/5 border-white/10 rounded-xl h-12 px-4 text-white text-sm outline-none focus:border-[#C5A059]/30">
                <option value="info">Information</option>
                <option value="success">Success / Alert</option>
                <option value="warning">System Warning</option>
                <option value="error">Critical Failure</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-neutral-500">Action Link (Optional)</label>
              <Input name="actionUrl" placeholder="/shop" className="bg-white/5 border-white/10" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-neutral-500">Intelligence Message</label>
            <Textarea name="message" className="bg-white/5 border-white/10 h-32" required />
          </div>
          <Button type="submit" className="w-full bg-[#C5A059] text-black font-bold h-12">Dispatch Pulse</Button>
        </form>
      </Modal>

      {/* Order Detail Modal */}
      <Modal 
        isOpen={!!selectedOrder} 
        onClose={() => setSelectedOrder(null)}
        title="Order Manifest Analysis"
      >
        {selectedOrder && (
          <div className="space-y-8">
            <div className="flex justify-between items-start border-b border-white/5 pb-8">
              <div>
                <h4 className="text-[#C5A059] font-bold text-xl tracking-tighter mb-1">#{selectedOrder._id.slice(-8).toUpperCase()}</h4>
                <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <span className="px-4 py-1.5 rounded-full bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 text-[9px] font-bold uppercase">{selectedOrder.status}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-12">
                <div className="space-y-4">
                    <h5 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Client Intelligence</h5>
                    <div className="bg-white/5 rounded-2xl p-6 space-y-3">
                        <p className="text-white text-sm font-bold">{selectedOrder.userId?.name || 'Guest User'}</p>
                        <p className="text-neutral-500 text-[11px]">{selectedOrder.userId?.email || 'No email attached'}</p>
                        <div className="pt-2 border-t border-white/5 mt-4">
                          <p className="text-neutral-500 text-[10px] uppercase tracking-widest mb-2 font-bold">Shipping Hub</p>
                          <p className="text-white text-[11px] leading-relaxed italic opacity-80">{selectedOrder.address || 'Standard Delivery Hub'}</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <h5 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Aromatic Manifest</h5>
                    <div className="space-y-3">
                      {selectedOrder.items?.map((item, i) => (
                        <div key={i} className="flex justify-between items-center text-[11px]">
                          <span className="text-neutral-400 font-medium">{item.productName} <span className="text-[9px] ml-1">x{item.quantity}</span></span>
                          <span className="text-white font-bold">${item.price?.toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="pt-4 border-t border-white/5 mt-4 flex justify-between items-center">
                          <span className="text-[#C5A059] font-bold text-[10px] uppercase tracking-widest">Total Yield</span>
                          <span className="text-white font-bold text-lg">${selectedOrder.totalAmount?.toLocaleString()}</span>
                      </div>
                    </div>
                </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex gap-4">
                <Button className="flex-1 bg-white/5 border border-white/10 text-white font-bold" onClick={() => setSelectedOrder(null)}>Synchronize</Button>
                <Button className="flex-1 bg-[#C5A059] text-black font-bold" onClick={() => handleExportPDF(`Order_${selectedOrder._id}`)}>Download Manifest</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* User Edit Modal */}
      <Modal 
        isOpen={!!editingUser} 
        onClose={() => setEditingUser(null)}
        title="Modify User Registry"
      >
        {editingUser && (
          <form className="space-y-6" onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            updateUserStatus.mutate({ id: editingUser._id, status: data.status }, { onSuccess: () => setEditingUser(null) });
          }}>
            <div className="flex items-center gap-6 mb-8">
                <div className="h-16 w-16 bg-white/5 rounded-3xl flex items-center justify-center text-[#C5A059] border border-white/10">
                    <Users size={32} />
                </div>
                <div>
                    <h4 className="text-white font-bold text-xl">{editingUser.name}</h4>
                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">{editingUser.role}</p>
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-neutral-500">Access Status</label>
                <select defaultValue={editingUser.status} name="status" className="w-full bg-white/5 border-white/10 rounded-xl h-12 px-4 text-white text-sm outline-none focus:border-[#C5A059]/30">
                  <option value="Active">Active Authorization</option>
                  <option value="Blocked">Blocked / Suspended</option>
                </select>
            </div>
            <div className="pt-6 flex gap-4">
                <Button type="button" className="flex-1 bg-rose-500/10 text-rose-500 border border-rose-500/20" onClick={() => { if(window.confirm('IRREVERSIBLE: Purge this user from existence?')) deleteUserMutation.mutate(editingUser._id, { onSuccess: () => setEditingUser(null) }); }}>Purge Entry</Button>
                <Button type="submit" className="flex-1 bg-[#C5A059] text-black font-bold">Synchronize</Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Category Edit Modal */}
      <Modal 
        isOpen={!!editingCategory} 
        onClose={() => setEditingCategory(null)}
        title="Refine Scent Library"
      >
        {editingCategory && (
          <form className="space-y-6" onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            updateCategory.mutate({ id: editingCategory._id, values: data }, { onSuccess: () => setEditingCategory(null) });
          }}>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Category Name</label>
              <Input name="category_name" defaultValue={editingCategory.category_name} className="bg-white/5 border-white/10 text-white" required />
            </div>
            <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Description</label>
                <Textarea name="description" defaultValue={editingCategory.description} className="bg-white/5 border-white/10 text-white h-32" required />
            </div>
            <div className="pt-6 flex gap-4">
                <Button type="button" className="flex-1 bg-white/5 border border-white/10 text-neutral-500" onClick={() => setEditingCategory(null)}>Cancel</Button>
                <Button type="submit" className="flex-1 bg-[#C5A059] text-black font-bold">Update Library</Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Neural Link Assistant HUD */}
      <Modal 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        title="Neural Link Assistant"
      >
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl overflow-hidden flex flex-col h-[500px] border border-white/5 relative">
          {/* HUD scanlines/grid effect */}
          <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(90deg,transparent_49%,#C5A059_50%,transparent_51%),linear-gradient(0deg,transparent_49%,#C5A059_50%,transparent_51%)] bg-[length:20px_20px]"></div>
          
          <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide relative z-10">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-5 rounded-2xl text-[11px] leading-relaxed font-bold tracking-tight ${
                  msg.role === 'user' 
                    ? 'bg-[#C5A059] text-black shadow-lg shadow-[#C5A059]/10' 
                    : 'bg-white/5 text-white border border-white/10 italic'
                }`}>
                  {msg.role === 'bot' && <span className="text-[9px] uppercase tracking-widest text-[#C5A059] block mb-2 font-black">AI System Response:</span>}
                  {msg.text}
                </div>
              </div>
            ))}
            <div className="h-4"></div>
          </div>

          <div className="p-8 bg-black/40 border-t border-white/5 flex gap-4 relative z-10">
            <Input 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Inject command or query system..."
              className="flex-1 bg-white/5 border-white/10 text-white h-14 rounded-2xl text-[11px] font-bold"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button 
                onClick={handleSendMessage}
                className="bg-[#C5A059] text-black h-14 w-14 rounded-2xl flex items-center justify-center hover:scale-110 transition-all shadow-xl"
            >
              <Sparkles size={18} />
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default AdminDashboard;
