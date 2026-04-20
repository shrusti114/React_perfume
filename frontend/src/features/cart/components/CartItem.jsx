import React from 'react';
import { Trash2 } from 'lucide-react';

export function CartItem({ item, updateQuantity, handleRemove }) {
  if (!item.productId) return null;

  return (
    <div className="flex flex-col sm:flex-row gap-8 bg-white dark:bg-[#111] p-6 rounded-3xl border border-black/5 dark:border-white/10 shadow-sm items-center relative group tracking-wider">
      <div className="h-32 w-32 shrink-0 bg-neutral-50 dark:bg-black rounded-2xl overflow-hidden relative border border-black/5 dark:border-white/10">
        <img 
          src={item.productId.image || 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=200'} 
          alt={item.productId.name} 
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 mix-blend-multiply" 
        />
      </div>
      
      <div className="flex-1 w-full relative">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-2xl font-serif text-black dark:text-white">{item.productId.name}</h3>
            <p className="text-xs text-neutral-400 font-medium uppercase tracking-widest mt-1">{item.productId.family}</p>
          </div>
          <p className="text-xl font-bold text-black dark:text-white">₹{(item.productId.price * item.quantity).toFixed(2)}</p>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center border border-black/10 dark:border-white/20 rounded-full px-4 py-2 bg-neutral-50 dark:bg-black">
            <button onClick={() => updateQuantity(item.productId._id, -1)} className="text-neutral-400 hover:text-black dark:text-white transition-colors">-</button>
            <span className="mx-6 text-black dark:text-white font-bold text-sm">{item.quantity}</span>
            <button onClick={() => updateQuantity(item.productId._id, 1)} className="text-neutral-400 hover:text-black dark:text-white transition-colors">+</button>
          </div>
          
          <button onClick={() => handleRemove(item.productId._id)} className="text-neutral-400 hover:text-red-500 transition-colors flex items-center gap-2 text-xs uppercase tracking-widest font-bold">
            <Trash2 size={16} /> Remove
          </button>
        </div>
      </div>
    </div>
  );
}
