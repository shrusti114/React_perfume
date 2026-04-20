import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const SummaryCard = ({ label, value, trend, isPositive, icon }) => {
  return (
    <div className="bg-[#111111] border border-white/5 rounded-3xl p-8 hover:border-[#C5A059]/30 transition-all group overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 group-hover:scale-110 group-hover:text-[#C5A059] transition-all duration-500">
        {React.cloneElement(icon, { size: 64 })}
      </div>
      
      <div className="flex items-center gap-4 mb-6 relative">
        <div className="h-12 w-12 rounded-2xl bg-black flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-black transition-colors duration-300">
          {React.cloneElement(icon, { size: 20 })}
        </div>
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 group-hover:text-neutral-300 transition-colors">{label}</h3>
      </div>

      <div className="flex items-end justify-between relative">
        <p className="text-4xl font-elegant font-medium text-white group-hover:text-[#C5A059] transition-colors">{value}</p>
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
