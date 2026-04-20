import React from 'react';
import { 
  Users, Store, Box, ShoppingCart, CreditCard, FolderTree, 
  MessageSquare, BarChart3, Settings, LogOut, LayoutDashboard, ChevronDown,
  Download, Sparkles
} from 'lucide-react';

const AdminSidebar = ({ activeTab, setActiveTab, setIsChatOpen }) => {
  const menuItems = [
    { name: 'Dashboard', id: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Users', id: 'Users', icon: <Users size={20} /> },
    { name: 'Products', id: 'Products', icon: <Box size={20} /> },
    { name: 'Sellers', id: 'Sellers', icon: <Store size={20} /> },
    { name: 'Categories', id: 'Categories', icon: <FolderTree size={20} /> },
    { name: 'Orders', id: 'Orders', icon: <ShoppingCart size={20} /> },
    { name: 'Payments', id: 'Payments', icon: <CreditCard size={20} /> },
    { name: 'Systems', id: 'Systems', icon: <Sparkles size={20} /> },
    { name: 'Feedback', id: 'Feedback', icon: <MessageSquare size={20} /> },
    { name: 'Reports', id: 'Reports', icon: <Download size={20} /> },
    { name: 'Analytics', id: 'Analytics', icon: <BarChart3 size={20} /> },
  ];

  return (
    <aside className="w-80 fixed left-0 top-0 bottom-0 bg-black border-r border-white/5 flex flex-col z-50 overflow-y-auto scrollbar-hide">
      <div className="p-8 pb-4">
        <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer" onClick={() => setActiveTab('Dashboard')}>
            <div className="h-10 w-10 bg-gradient-to-br from-[#C5A059] to-[#8c440a] rounded-xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(197,160,89,0.3)]">
                <Sparkles size={22} fill="currentColor"/>
            </div>
            <h1 className="text-xl font-elegant font-bold tracking-tight text-[#C5A059]">Velvora <span className="text-white opacity-80 font-light">Elegance</span></h1>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 group ${
                activeTab === item.id 
                  ? 'bg-white/5 text-[#C5A059] shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]' 
                  : 'text-neutral-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className={activeTab === item.id ? 'text-[#C5A059]' : 'text-neutral-600 group-hover:text-[#C5A059] transition-colors'}>
                {item.icon}
              </span>
              <span className="flex-1 text-left">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-8 px-8 space-y-6">
          <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5 space-y-4">
              <div className="flex justify-between items-center">
                  <h4 className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Platform Pulse</h4>
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
              </div>
              <div className="flex gap-2">
                  <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-[#C5A059] w-[75%] transition-all"></div>
                  </div>
                  <span className="text-[8px] font-bold text-[#C5A059]">75%</span>
              </div>
          </div>

          <button 
             onClick={() => setIsChatOpen(true)}
             className="w-full p-5 bg-gradient-to-br from-[#111111] to-black border border-[#C5A059]/30 rounded-3xl flex items-center gap-4 group hover:border-[#C5A059] transition-all"
          >
             <div className="h-10 w-10 bg-[#C5A059]/10 rounded-xl flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-black transition-all">
                <MessageSquare size={18} />
             </div>
             <div className="text-left">
                <p className="text-[10px] font-bold text-white uppercase tracking-widest">Neural Link</p>
                <p className="text-[8px] font-medium text-neutral-600 group-hover:text-neutral-400">Assistant Ready</p>
             </div>
          </button>
      </div>

      <div className="mt-auto p-8 space-y-1">
        <button 
          onClick={() => setActiveTab('Settings')}
          className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 group ${
            activeTab === 'Settings' 
              ? 'bg-white/5 text-[#C5A059] shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]' 
              : 'text-neutral-500 hover:text-white hover:bg-white/5'
          }`}
        >
          <Settings size={20} className={activeTab === 'Settings' ? 'text-[#C5A059]' : 'text-neutral-600 group-hover:text-[#C5A059] transition-colors'} /> Settings
        </button>
        <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-all group">
          <LogOut size={20} className="text-neutral-600 group-hover:text-rose-500 transition-colors" /> Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
