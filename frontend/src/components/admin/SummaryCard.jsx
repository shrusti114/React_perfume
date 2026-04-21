import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const SummaryCard = ({ label, value, trend, isPositive, icon }) => {
  return (
    <div className="glass-card hover:border-[var(--admin-accent)]/30 transition-all group overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 group-hover:text-[var(--admin-accent)] transition-all duration-500">
        {React.cloneElement(icon, { size: 64 })}
      </div>
      
      <div className="flex items-center gap-4 mb-6 relative">
        <div className="h-12 w-12 rounded-2xl bg-[var(--admin-text-primary)]/[0.05] flex items-center justify-center text-[var(--admin-accent)] group-hover:bg-[var(--admin-accent)] group-hover:text-black transition-colors duration-300">
          {React.cloneElement(icon, { size: 20 })}
        </div>
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--admin-text-secondary)] group-hover:text-[var(--admin-text-primary)] transition-colors">{label}</h3>
      </div>

      <div className="flex items-end justify-between relative">
        <p className="text-4xl font-elegant font-medium text-[var(--admin-text-primary)] group-hover:text-[var(--admin-accent)] transition-colors">{value}</p>
        {trend && (
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold ${
            isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
          }`}>
            {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {trend}
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
