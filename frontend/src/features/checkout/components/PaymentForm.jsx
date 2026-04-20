import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { CreditCard, ShieldCheck, Loader2, Truck } from 'lucide-react';

export function PaymentForm({ errors, touched, total, isSubmitting }) {
  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#111] p-10 rounded-[3rem] border border-black/5 dark:border-white/10 shadow-sm relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#f8c8dc]/5 blur-3xl rounded-full pointer-events-none" />

        <h3 className="text-2xl font-serif text-black dark:text-white mb-8 flex items-center gap-3 relative z-10">
          <Truck size={24} className="text-[#f8c8dc]" /> Payment Selection
        </h3>

        <div className="space-y-6 relative z-10">
          <div className="p-8 rounded-[2rem] bg-[#f8c8dc]/5 border-2 border-[#f8c8dc]/30 relative transition-all group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-6 h-6 rounded-full border-2 border-[#f8c8dc] flex items-center justify-center p-1">
                <div className="w-full h-full rounded-full bg-[#f8c8dc] shadow-[0_0_10px_rgba(248,200,220,0.5)]" />
              </div>
              <span className="text-xl font-serif text-black dark:text-white">Cash on Delivery</span>
            </div>
            <p className="text-neutral-500 text-xs leading-relaxed font-light uppercase tracking-widest pl-10">
              Pay in cash upon delivery of your luxury parcel.
            </p>
          </div>

          <div className="flex items-center gap-4 px-6 py-4 bg-neutral-50 dark:bg-black/40 rounded-2xl border border-black/5 dark:border-white/5 opacity-50 grayscale">
            <CreditCard size={20} className="text-neutral-400" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400">Card Payment (Temporary Unavailable)</span>
          </div>
        </div>

        {/* Security Meta */}
        <div className="flex items-center gap-3 mt-10 pt-8 border-t border-black/5 dark:border-white/5 relative z-10">
          <ShieldCheck size={16} className="text-[#f8c8dc]" />
          <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold">Secure Delivery Protection Active</span>
        </div>
      </div>

      <div className="bg-neutral-50 dark:bg-black/50 p-10 rounded-[3rem] border border-black/10 dark:border-white/20 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <span className="text-black dark:text-white font-bold uppercase tracking-widest text-[10px]">Total Valuation</span>
          <span className="text-5xl font-serif text-black dark:text-white">₹{total.toLocaleString()}</span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-3 bg-black dark:bg-[#f8c8dc] text-white dark:text-black py-6 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#f8c8dc] hover:text-black dark:hover:bg-white transition-all transform hover:-translate-y-1 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={20} className="animate-spin" /> Finalizing Collection...
            </>
          ) : (
            <>
              Confirm Order — ₹{total.toLocaleString()}
            </>
          )}
        </button>
        <p className="text-center text-[9px] text-neutral-500 mt-6 font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2">
          By confirming, you agree to our <span className="text-black dark:text-white underline cursor-pointer">Boutique Terms</span>
        </p>
      </div>
    </div>
  );
}
