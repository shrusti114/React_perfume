import React from 'react';
import { ShoppingCart, Trash2 } from 'lucide-react';

export function WishlistItem({ item, onMoveToCart, onRemove }) {
  return (
    <div className="flex flex-col sm:flex-row gap-8 bg-white dark:bg-[#111] p-6 rounded-[2.5rem] border border-black/5 dark:border-white/10 shadow-sm items-center transition-all hover:shadow-xl group">
      <div className="h-40 w-40 shrink-0 bg-neutral-50 dark:bg-black rounded-[2rem] overflow-hidden border border-black/5 dark:border-white/10 relative">
        <img 
          src={item.image || 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=200'} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 mix-blend-multiply" 
        />
      </div>
      
      <div className="flex-1 w-full">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-serif text-black dark:text-white mb-1">{item.name}</h3>
            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-[0.2em]">{item.family}</p>
          </div>
          <p className="text-xl font-bold text-black dark:text-white">₹{item.price?.toFixed(2)}</p>
        </div>

        <p className="text-neutral-500 text-sm font-light leading-relaxed mb-6 line-clamp-2">
          {item.description || 'Experience the essence of luxury with this masterfully crafted fragrance.'}
        </p>

        <div className="flex gap-4">
          <button 
            onClick={() => onMoveToCart(item._id)}
            className="flex-1 flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black py-3.5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-[#f8c8dc] hover:text-black transition-all transform hover:-translate-y-1 shadow-md"
          >
            <ShoppingCart size={14} /> Add to Bag
          </button>
          
          <button 
            onClick={() => onRemove(item._id)}
            className="w-14 h-14 flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 text-neutral-400 hover:text-red-500 hover:border-red-500 transition-all group/delete"
          >
            <Trash2 size={20} className="group-hover/delete:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
