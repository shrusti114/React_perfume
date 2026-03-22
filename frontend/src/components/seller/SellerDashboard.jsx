import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, User as UserIcon, LogOut, ArrowLeft } from 'lucide-react';
import SellerOverview from './SellerOverview';
import SellerProducts from './SellerProducts';
import SellerOrders from './SellerOrders';
import SellerProfile from './SellerProfile';

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Seller';

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'products', label: 'My Products', icon: <Package size={20} /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingBag size={20} /> },
    { id: 'profile', label: 'Account', icon: <UserIcon size={20} /> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <SellerOverview />;
      case 'products': return <SellerProducts />;
      case 'orders': return <SellerOrders />;
      case 'profile': return <SellerProfile />;
      default: return <div className="p-20 text-center text-neutral-400 font-elegant italic text-2xl">Module under construction...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex font-sans selection:bg-[#FFD1DC]">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-[#000000]/5 flex flex-col sticky top-0 h-screen shadow-sm z-30">
        <div className="p-10 border-b border-[#000000]/5">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-[#FFD1DC]">
              <Package size={20} />
            </div>
            <h1 className="text-2xl font-cursive font-bold text-black tracking-tight">Westion</h1>
          </div>

          <div className="flex items-center gap-4 bg-pink-50/50 p-4 rounded-3xl border border-pink-100/50 mb-1">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-pink-500 shadow-sm border border-pink-100">
              <UserIcon size={20} />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold uppercase tracking-widest text-[#000000]/40">Boutique Owner</p>
              <p className="text-lg font-elegant text-black truncate">{userName}</p>
            </div>
          </div>
        </div>

        <nav className="flex-grow p-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                activeTab === item.id 
                ? 'bg-black text-white shadow-xl translate-x-1' 
                : 'text-neutral-500 hover:bg-neutral-50 hover:text-black'
              }`}
            >
              <span className={`transition-colors ${activeTab === item.id ? 'text-[#FFD1DC]' : 'group-hover:text-pink-400'}`}>
                {item.icon}
              </span>
              <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-[#000000]/5 space-y-3">
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-neutral-500 hover:bg-neutral-50 hover:text-black transition-all">
            <ArrowLeft size={20} />
            <span className="text-sm font-bold uppercase tracking-widest">Back to Store</span>
          </button>
          <button onClick={logout} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-rose-500 hover:bg-rose-50 transition-all">
            <LogOut size={20} />
            <span className="text-sm font-bold uppercase tracking-widest">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-12 max-w-7xl mx-auto overflow-y-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h4 className="text-neutral-400 font-bold text-xs uppercase tracking-[0.3em] mb-2 flex items-center gap-3">
              <div className="w-8 h-px bg-pink-300"></div> Management Portal
            </h4>
            <h1 className="text-5xl font-elegant text-black capitalize">
              {activeTab === 'overview' ? 'Market Overview' : activeTab.replace('-', ' ')}
            </h1>
          </div>
          <div className="hidden md:block">
            <p className="text-right text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">Current Session</p>
            <p className="text-neutral-800 font-medium">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>
        </header>

        <div className="min-h-[70vh]">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default SellerDashboard;

