import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminHeader = ({ isLiveMode, setIsLiveMode, isDarkMode, setIsDarkMode }) => {
  const { user } = useAuth();
  
  return (
    <header className="h-28 sticky top-0 bg-[var(--admin-bg)]/80 backdrop-blur-xl border-b border-[var(--admin-panel-border)] px-12 flex items-center justify-between z-40 transition-colors duration-500">
      <div className="flex-1 flex items-center justify-center gap-8">
        {/* Theme Toggle */}
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="flex items-center gap-3 bg-white/5 dark:bg-white/5 px-4 py-2 rounded-2xl border border-[var(--admin-panel-border)] group cursor-pointer hover:border-[#22D3EE]/30 transition-all"
        >
          <div className="h-5 w-10 bg-black/10 dark:bg-white/10 rounded-full relative p-1 transition-all">
            <div className={`h-3 w-3 rounded-full bg-[#22D3EE] shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all transform ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
          </div>
          <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--admin-text-secondary)]">
            {isDarkMode ? 'Midnight' : 'Crystal'} Mode
          </span>
        </button>

        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-[var(--admin-panel-border)] group cursor-pointer hover:border-[#22D3EE]/30 transition-all" onClick={() => setIsLiveMode(!isLiveMode)}>
            <div className={`h-2 w-2 rounded-full ${isLiveMode ? 'bg-[#22D3EE] animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'bg-neutral-500'}`}></div>
            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isLiveMode ? 'text-[#22D3EE]' : 'text-[var(--admin-text-secondary)]'}`}>
                {isLiveMode ? 'Live Matrix Active' : 'Offline Mode'}
            </span>
        </div>
        
        <div className="w-full max-w-xl relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[var(--admin-text-secondary)] group-focus-within:text-[#22D3EE] transition-colors" size={18} />
          <input 
            placeholder="Search Intelligence Registry…" 
            className="w-full bg-white/5 border border-[var(--admin-panel-border)] rounded-2xl py-4 pl-16 pr-6 text-sm outline-none focus:border-[#22D3EE]/30 transition-all placeholder:text-[var(--admin-text-secondary)] text-[var(--admin-text-primary)]"
          />
        </div>
      </div>

      <div className="flex items-center gap-6 ml-auto">
        <button className="relative p-3.5 bg-white/5 rounded-2xl border border-[var(--admin-panel-border)] text-[var(--admin-text-secondary)] hover:text-[#22D3EE] transition-all">
          <Bell size={20} />
          <span className="absolute top-3.5 right-3.5 h-2 w-2 bg-rose-500 rounded-full border-2 border-[var(--admin-bg)]"></span>
        </button>

        <div className="flex items-center gap-4 pl-6 border-l border-[var(--admin-panel-border)] ml-4">
          <div className="text-right">
            <p className="text-sm font-bold text-[var(--admin-text-primary)] leading-none mb-1.5">{user?.name || 'Eleanor Vance'}</p>
            <p className="text-[10px] font-bold text-[var(--admin-text-secondary)] uppercase tracking-widest opacity-80">{user?.role || 'Admin'}</p>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#22D3EE] to-[#0891B2] p-0.5 shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:scale-105 transition-transform cursor-pointer">
            <div className="h-full w-full rounded-[14px] overflow-hidden bg-black flex items-center justify-center border border-white/5">
                <div className="h-full w-full bg-neutral-900 flex items-center justify-center">
                    <span className="text-lg font-elegant font-bold text-[#22D3EE]">{user?.name ? user.name.charAt(0) : 'E'}</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
