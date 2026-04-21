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
    { name: 'Feedback', id: 'Feedback', icon: <MessageSquare size={20} /> },
    { name: 'Reports', id: 'Reports', icon: <Download size={20} /> },
    { name: 'Analytics', id: 'Analytics', icon: <BarChart3 size={20} /> },
  ];

  return (
    <aside className="w-80 fixed left-0 top-0 bottom-0 bg-[var(--admin-panel)] border-r border-[var(--admin-panel-border)] flex flex-col z-50 overflow-y-auto scrollbar-hide shadow-2xl transition-colors duration-500">
      <div className="p-8 pb-4">
        <div className="flex items-center gap-3 mb-12 px-2 cursor-pointer" onClick={() => setActiveTab('Dashboard')}>
            <div className="h-10 w-10 bg-gradient-to-br from-[#22D3EE] to-[#0891B2] rounded-xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                <Sparkles size={22} fill="currentColor"/>
            </div>
            <h1 className="text-xl font-elegant font-bold tracking-tight text-[#22D3EE]">Velvora <span className="text-[var(--admin-text-primary)] opacity-80 font-light italic">Elegance</span></h1>
        </div>

        <nav className="space-y-1.5">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 group ${
                activeTab === item.id 
                  ? 'bg-[#22D3EE]/10 text-[#22D3EE] shadow-[inset_0_0_20px_rgba(34,211,238,0.05)]' 
                  : 'text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)] hover:bg-white/5'
              }`}
            >
              <span className={activeTab === item.id ? 'text-[#22D3EE]' : 'text-neutral-500 group-hover:text-[#22D3EE] transition-colors'}>
                {item.icon}
              </span>
              <span className="flex-1 text-left">{item.name}</span>
              {activeTab === item.id && <div className="h-1.5 w-1.5 rounded-full bg-[#22D3EE] shadow-[0_0_10px_#22D3EE]"></div>}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-8 px-8 space-y-6">
          <div className="p-6 bg-white/5 rounded-[2rem] border border-[var(--admin-panel-border)] space-y-4">
              <div className="flex justify-between items-center">
                  <h4 className="text-[9px] font-bold text-[var(--admin-text-secondary)] uppercase tracking-widest">Platform Pulse</h4>
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
              </div>
              <div className="flex gap-2">
                  <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-[#22D3EE] w-[75%] transition-all"></div>
                  </div>
                  <span className="text-[8px] font-bold text-[#22D3EE]">75%</span>
              </div>
          </div>

          <button 
             onClick={() => setIsChatOpen(true)}
             className="w-full p-5 bg-gradient-to-br from-[var(--admin-panel)] to-[var(--admin-bg)] border border-[var(--admin-accent)]/20 rounded-[2rem] flex items-center gap-4 group hover:border-[var(--admin-accent)] transition-all shadow-xl"
          >
             <div className="h-10 w-10 bg-[var(--admin-accent)]/10 rounded-xl flex items-center justify-center text-[var(--admin-accent)] group-hover:bg-[var(--admin-accent)] group-hover:text-black transition-all">
                <MessageSquare size={18} />
             </div>
             <div className="text-left">
                <p className="text-[10px] font-bold text-[var(--admin-text-primary)] uppercase tracking-widest leading-tight mb-1">Velvora Assistant</p>
                <p className="text-[8px] font-medium text-[var(--admin-text-secondary)] group-hover:text-[var(--admin-text-primary)] transition-colors">Neural Link Ready</p>
             </div>
          </button>
      </div>

      <div className="mt-auto p-8 space-y-1">
        <button 
          onClick={() => setActiveTab('Settings')}
          className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 group ${
            activeTab === 'Settings' 
              ? 'bg-[#22D3EE]/10 text-[#22D3EE]' 
              : 'text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)] hover:bg-white/5'
          }`}
        >
          <Settings size={20} className={activeTab === 'Settings' ? 'text-[#22D3EE]' : 'text-neutral-500 group-hover:text-[#22D3EE] transition-colors'} /> Settings
        </button>
        <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--admin-text-secondary)] hover:text-rose-500 transition-all group">
          <LogOut size={20} className="group-hover:text-rose-500 transition-colors" /> Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
