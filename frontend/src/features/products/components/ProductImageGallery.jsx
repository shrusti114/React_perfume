import React from 'react';
import { Heart } from 'lucide-react';
import { cn } from '../../../utils/cn';

export function ProductImageGallery({ product, isWishlisted, onToggleWishlist }) {
  return (
    <div className="relative rounded-[3rem] overflow-hidden bg-white dark:bg-neutral-900 p-12 shadow-sm border border-black/5 dark:border-white/10 flex items-center justify-center group min-h-[500px]">
      <button 
        onClick={onToggleWishlist}
        className={cn(
          "absolute top-8 right-8 z-20 p-4 rounded-full shadow-lg transition-all transform hover:scale-110 active:scale-95",
          isWishlisted 
            ? "bg-[#f8c8dc] text-white" 
            : "bg-neutral-50 dark:bg-black text-neutral-400 hover:text-black dark:text-white"
        )}
      >
        <Heart size={24} fill={isWishlisted ? "currentColor" : "none"} />
      </button>
      
      <img 
        src={product.image || 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600'} 
        alt={product.name} 
        className="w-full max-w-md h-auto object-contain group-hover:scale-110 transition-transform duration-1000 mix-blend-multiply dark:mix-blend-normal drop-shadow-2xl" 
      />
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className={cn("w-2 h-2 rounded-full", i === 0 ? "bg-[#f8c8dc]" : "bg-neutral-200 dark:bg-white/10")} />
        ))}
      </div>
    </div>
  );
}
