import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export function CartSummary({ subtotal, shipping, total }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-[#111] p-8 rounded-3xl border border-black/5 dark:border-white/10 shadow-sm sticky top-28">
      <h3 className="text-xl font-bold uppercase tracking-widest text-black dark:text-white mb-8 pb-4 border-b border-black/10 dark:border-white/20">
        Order Summary
      </h3>
      
      <div className="space-y-4 mb-8">
        <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
          <span>Subtotal</span>
          <span className="font-medium text-black dark:text-white">₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
          <span>Shipping</span>
          <span className="font-medium text-black dark:text-white">₹{shipping.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between items-end border-t border-black/10 dark:border-white/20 pt-6 mb-8">
        <span className="text-neutral-500 uppercase tracking-widest text-xs font-bold">Total</span>
        <span className="text-4xl font-serif text-black dark:text-white">₹{total.toFixed(2)}</span>
      </div>

      <button 
        onClick={() => navigate({ to: '/user/checkout' })}
        className="w-full flex items-center justify-center gap-2 bg-black dark:bg-white/10 text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#f8c8dc] hover:text-black transition-all transform hover:-translate-y-1 shadow-md mb-4"
      >
        Proceed to Checkout <ArrowRight size={18} />
      </button>
      <div className="flex items-center justify-center gap-2 text-xs text-neutral-400">
        <ShieldCheck size={14} /> Secure & Encrypted Checkout
      </div>
    </div>
  );
}
