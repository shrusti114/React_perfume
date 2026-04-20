import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminHeader = ({ isLiveMode, setIsLiveMode }) => {
  const { user } = useAuth();
  
  return (
    <header className="h-28 sticky top-0 bg-[#050505]/95 backdrop-blur-xl border-b border-white/5 px-12 flex items-center justify-between z-40">
      {/* Centered Search Bar */}
      <div className="flex-1 flex items-center justify-center gap-8">
        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/10 group cursor-pointer hover:border-[#C5A059]/30 transition-all" onClick={() => setIsLiveMode(!isLiveMode)}>
            <div className={`h-2 w-2 rounded-full ${isLiveMode ? 'bg-[#C5A059] animate-pulse shadow-[0_0_8px_rgba(197,160,89,0.8)]' : 'bg-neutral-800'}`}></div>
            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isLiveMode ? 'text-[#C5A059]' : 'text-neutral-600'}`}>
                {isLiveMode ? 'Live Matrix Active' : 'Offline Mode'}
            </span>
        </div>
        <div className="w-full max-w-xl relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-[#C5A059] transition-colors" size={18} />
          <input 
            placeholder="Search Intelligence Registry…" 
            className="w-full bg-[#111111] border border-white/5 rounded-2xl py-4 pl-16 pr-6 text-sm outline-none focus:border-[#C5A059]/30 transition-all placeholder:text-neutral-600 shadow-inner"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-6 ml-auto">
        <button className="relative p-3.5 bg-white/5 rounded-2xl border border-white/5 text-neutral-400 hover:text-[#C5A059] transition-all">
          <Bell size={20} />
          <span className="absolute top-3.5 right-3.5 h-2 w-2 bg-rose-500 rounded-full border-2 border-[#111111]"></span>
        </button>

        <div className="flex items-center gap-4 pl-6 border-l border-white/10 ml-4">
          <div className="text-right">
            <p className="text-sm font-bold text-white leading-none mb-1.5">{user?.name || 'Eleanor Vance'}</p>
            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest opacity-80">{user?.role || 'Admin'}</p>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#C5A059] to-[#8c440a] p-0.5 shadow-[0_0_20px_rgba(197,160,89,0.2)] hover:scale-105 transition-transform cursor-pointer">
            <div className="h-full w-full rounded-[14px] overflow-hidden bg-black flex items-center justify-center border border-white/5">
                {/* Fallback avatar matching style */}
                <div className="h-full w-full bg-neutral-900 flex items-center justify-center">
                    <span className="text-lg font-elegant font-bold text-[#C5A059]">{user?.name ? user.name.charAt(0) : 'E'}</span>
                </div>
            </div>
          </div>
          <ChevronDown className="text-neutral-700" size={16} />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
