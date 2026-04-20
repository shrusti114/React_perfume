import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { LayoutDashboard, Package, ShoppingBag, User as UserIcon, LogOut, ArrowLeft, Search, Settings, Bell, MessageSquare, Calendar, Menu, X } from 'lucide-react';
import SellerOverview from './SellerOverview';
import SellerProducts from './SellerProducts';
import SellerOrders from './SellerOrders';
import SellerProfile from './SellerProfile';
import SellerReviews from './SellerReviews';

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Seller';

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingBag size={18} /> },
    { id: 'products', label: 'Products', icon: <Package size={18} /> },
    { id: 'reviews', label: 'Reviews', icon: <MessageSquare size={18} /> },
    { id: 'profile', label: 'Profile', icon: <UserIcon size={18} /> }
  ];

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    navigate({ to: '/login' });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <SellerOverview />;
      case 'orders': return <SellerOrders />;
      case 'products': return <SellerProducts />;
      case 'reviews': return <SellerReviews />;
      case 'profile': return <SellerProfile />;
      default: return <SellerOverview />;
    }
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#1a1c27] flex font-sans selection:bg-[#D9A0A0]/30 dark:selection:bg-[#00D4FF]/30 text-neutral-800 dark:text-gray-100 transition-colors duration-500">
        
        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
        )}

        {/* Sidebar */}
        <aside className={`fixed md:sticky top-0 left-0 h-screen transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-64 bg-white dark:bg-[#202231] border-r border-[#D9A0A0]/10 dark:border-white/5 flex flex-col shadow-[5px_0_30px_rgba(217,160,160,0.05)] dark:shadow-2xl z-50 transition-all duration-300`}>
          <div className="p-8 border-b border-[#D9A0A0]/10 dark:border-white/5 relative">
            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 md:hidden text-neutral-400 hover:text-rose-500 transition-colors">
              <X size={20} />
            </button>
            <h1 className="text-3xl font-elegant text-[#D9A0A0] dark:text-[#00D4FF] mb-6 text-center">Velvora</h1>
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F5E6E6] to-[#ffffff] dark:from-[#2a2c3d] dark:to-[#1a1c27] flex items-center justify-center shadow-sm border border-[#D9A0A0]/20 dark:border-[#00D4FF]/20">
                <UserIcon size={24} className="text-[#D9A0A0] dark:text-[#00D4FF]" />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-neutral-700 dark:text-white">{userName}</p>
                <p className="text-[10px] uppercase font-medium tracking-widest text-neutral-400 dark:text-gray-400">Seller Node</p>
              </div>
            </div>
          </div>

          <nav className="flex-grow p-4 space-y-2 overflow-y-auto mt-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group ${
                  activeTab === item.id 
                  ? 'bg-gradient-to-r from-[#D9A0A0] to-[#E5B5B5] dark:from-[#00D4FF]/20 dark:to-transparent text-white dark:text-[#00D4FF] shadow-[0_4px_20px_rgba(217,160,160,0.4)] dark:shadow-none translate-x-1 border-l-4 border-transparent dark:border-[#00D4FF]' 
                  : 'text-neutral-400 dark:text-gray-500 hover:bg-[#F5E6E6]/50 dark:hover:bg-white/5 hover:text-neutral-700 dark:hover:text-gray-300'
                }`}
              >
                <span className={`transition-colors duration-300 ${activeTab === item.id ? 'text-white dark:text-[#00D4FF]' : 'group-hover:text-[#D9A0A0] dark:group-hover:text-[#00D4FF]'}`}>
                  {item.icon}
                </span>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 m-4 rounded-2xl bg-[#FAFAFA] dark:bg-[#1a1c27] border border-[#D9A0A0]/10 dark:border-white/5 text-center transition-colors duration-500">
             <p className="text-[10px] text-neutral-400 dark:text-gray-500 mb-3 leading-relaxed">Customize your command center layout.</p>
             <button className="w-full py-2 bg-[#D9A0A0] dark:bg-[#00D4FF] text-white dark:text-black rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-[#E5B5B5] dark:hover:bg-cyan-300 transition-colors shadow-lg dark:shadow-[0_0_15px_rgba(0,212,255,0.4)]">+ Add Menus</button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-4 md:p-10 max-w-7xl mx-auto overflow-y-auto relative h-screen w-full">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D9A0A0]/5 dark:bg-[#00D4FF]/5 blur-[120px] rounded-full pointer-events-none transition-colors duration-1000"></div>

          <header className="mb-6 md:mb-10 flex flex-col md:flex-row md:justify-between items-start md:items-center relative z-10 gap-4 md:gap-6">
            <div className="flex md:hidden justify-between items-center w-full mb-2">
              <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 bg-white dark:bg-[#202231] rounded-xl shadow-sm text-neutral-500 dark:text-gray-400 border border-[#D9A0A0]/20 dark:border-white/5 hover:text-[#D9A0A0] dark:hover:text-[#00D4FF]">
                <Menu size={20} />
              </button>
              <h1 className="text-xl font-elegant text-[#D9A0A0] dark:text-[#00D4FF]">Velvora</h1>
            </div>

            <div className="w-full md:w-1/2 relative group">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-gray-500 group-focus-within:text-[#D9A0A0] dark:group-focus-within:text-[#00D4FF] transition-colors" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-white dark:bg-[#202231] border border-[#D9A0A0]/20 dark:border-white/5 pl-12 pr-4 py-3 rounded-2xl text-sm focus:border-[#D9A0A0] dark:focus:border-[#00D4FF] outline-none text-neutral-800 dark:text-white shadow-sm dark:shadow-[0_5px_20px_rgba(0,0,0,0.3)] transition-all"
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="w-10 h-10 rounded-full bg-white dark:bg-[#202231] border border-[#D9A0A0]/20 dark:border-white/5 flex items-center justify-center text-neutral-500 dark:text-gray-400 hover:text-[#D9A0A0] dark:hover:text-[#00D4FF] shadow-sm transition-all" title="Toggle Theme">
                {isDarkMode ? <Settings size={18} /> : <div className="w-3 h-3 rounded-full bg-neutral-300"></div>}
              </button>
              <button className="w-10 h-10 rounded-full bg-white dark:bg-[#202231] border border-[#D9A0A0]/20 dark:border-white/5 flex items-center justify-center text-neutral-500 dark:text-gray-400 relative shadow-sm hover:text-[#D9A0A0] dark:hover:text-[#00D4FF] transition-all">
                <Bell size={18} />
                <span className="absolute top-0 right-0 w-3 h-3 bg-rose-500 border-2 border-white dark:border-[#202231] rounded-full"></span>
              </button>
              <button className="w-10 h-10 rounded-full bg-white dark:bg-[#202231] border border-[#D9A0A0]/20 dark:border-white/5 flex items-center justify-center text-neutral-500 dark:text-gray-400 relative shadow-sm hover:text-[#D9A0A0] dark:hover:text-[#00D4FF] transition-all">
                <MessageSquare size={18} />
                <span className="absolute top-0 right-0 w-3 h-3 bg-[#D9A0A0] dark:bg-[#00D4FF] border-2 border-white dark:border-[#202231] rounded-full"></span>
              </button>
              <button onClick={logout} className="ml-2 bg-rose-50 dark:bg-rose-500/10 text-rose-500 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-all border border-rose-100 dark:border-transparent flex items-center gap-2">
                <LogOut size={14} /> Exit
              </button>
            </div>
          </header>

          <div className="mb-8 flex justify-between items-end relative z-10">
             <div>
               <h1 className="text-3xl font-bold tracking-tight text-neutral-800 dark:text-white capitalize">
                 {activeTab === 'overview' ? 'Dashboard' : activeTab.replace('-', ' ')}
               </h1>
               <p className="text-neutral-500 dark:text-gray-400 text-sm mt-1">Hi, {userName.split(' ')[0] || userName}. Welcome back to Command Center!</p>
             </div>
             
             <div className="hidden md:flex items-center gap-3 bg-white dark:bg-[#202231] border border-[#D9A0A0]/20 dark:border-white/5 px-4 py-2 rounded-xl shadow-sm cursor-pointer hover:border-[#D9A0A0] dark:hover:border-[#00D4FF]/30 transition-all">
               <Calendar size={16} className="text-[#D9A0A0] dark:text-[#00D4FF]" />
               <div>
                 <p className="text-[9px] font-bold uppercase text-neutral-400 dark:text-gray-500">Filter Period</p>
                 <p className="text-xs font-medium text-neutral-700 dark:text-gray-300">Mon, Oct 24th - Sun, Oct 30th</p>
               </div>
             </div>
          </div>

          <div className="min-h-[70vh] relative z-10">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellerDashboard;
