import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Star, ShoppingBag, Truck, ShieldCheck, Zap } from 'lucide-react';
import { formatPrice } from '../../../utils/formatters';
import { useAuth } from '../../../context/AuthContext';

export function ProductInfo({
  product,
  quantity,
  onIncrement,
  onDecrement,
  onAddToCart
}) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  return (
    <div className="flex flex-col justify-center">
      <div className="flex gap-2 mb-6">
        <span className="bg-[#f8c8dc]/20 text-black dark:text-[#f8c8dc] px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold border border-[#f8c8dc]/20">
          {product.family}
        </span>
        <span className="bg-white dark:bg-black/20 border border-black/10 dark:border-white/20 text-neutral-500 dark:text-neutral-400 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold">
          {product.gender}
        </span>
      </div>

      <h1 className="text-6xl font-serif text-black dark:text-white mb-4 leading-tight">{product.name}</h1>
      <p className="text-sm uppercase tracking-[0.4em] text-[#f8c8dc] mb-6 font-bold">{product.brand}</p>

      <div className="flex items-center gap-6 mb-8">
        <div className="flex text-[#f8c8dc] gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} strokeWidth={1.5} />
          ))}
        </div>
        <span className="text-neutral-400 text-xs uppercase tracking-widest font-bold border-b border-neutral-300 dark:border-white/20 pb-0.5 cursor-pointer hover:text-black dark:hover:text-white transition-colors">
          124 Reviews
        </span>
      </div>

      <p className="text-4xl font-light text-black dark:text-white mb-10 tracking-tight">
        {formatPrice(product.price)}
      </p>

      <p className="text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mb-12 text-lg lg:max-w-md">
        {product.description}
      </p>

      <div className="mb-12 space-y-8 max-w-md">
        <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-6">
          <span className="text-neutral-400 uppercase tracking-widest text-[10px] font-bold">Volume</span>
          <span className="text-black dark:text-white font-medium tracking-wide">{product.volume}</span>
        </div>
        <div className="flex flex-col border-b border-black/5 dark:border-white/10 pb-6">
          <span className="text-neutral-400 uppercase tracking-widest text-[10px] font-bold mb-4">Olfactory Notes</span>
          <div className="text-black dark:text-white flex flex-wrap gap-x-4 gap-y-2 leading-relaxed capitalize text-sm">
            <span className="opacity-50 italic">Top:</span> {product.notes?.top?.join(', ')}
            <span className="opacity-20">|</span>
            <span className="opacity-50 italic">Heart:</span> {product.notes?.heart?.join(', ')}
            <span className="opacity-20">|</span>
            <span className="opacity-50 italic">Base:</span> {product.notes?.base?.join(', ')}
          </div>
        </div>
      </div>

      {isAuthenticated && (
        <div className="flex flex-col gap-4 mb-16">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex items-center border border-black/10 dark:border-white/20 rounded-full px-8 py-5 bg-white dark:bg-black shadow-inner">
              <button onClick={onDecrement} className="text-neutral-400 hover:text-black dark:text-white transition-colors text-xl font-light">-</button>
              <span className="mx-10 text-black dark:text-white font-bold w-4 text-center">{quantity}</span>
              <button onClick={onIncrement} className="text-neutral-400 hover:text-black dark:text-white transition-colors text-xl font-light">+</button>
            </div>

            <button
              onClick={onAddToCart}
              className="flex-1 w-full flex items-center justify-center gap-4 bg-black dark:bg-white/10 text-white py-5 px-12 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-neutral-800 dark:hover:bg-white/20 transition-all transform hover:-translate-y-1 shadow-2xl active:scale-95"
            >
              <ShoppingBag size={20} /> Add to Bag
            </button>
          </div>

          <button
            onClick={() => { onAddToCart(); navigate({ to: '/user/checkout' }); }}
            className="w-full flex items-center justify-center gap-4 bg-[#f8c8dc] text-black py-5 px-12 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-black hover:text-white dark:hover:bg-white transition-all transform hover:-translate-y-1 shadow-2xl active:scale-95"
          >
            <Zap size={20} /> Buy Now
          </button>
        </div>
      )}

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-12 pt-12 border-t border-black/5 dark:border-white/10">
        <div className="flex items-center gap-5">
          <div className="bg-[#f8c8dc]/10 p-4 rounded-2xl border border-[#f8c8dc]/20 text-[#f8c8dc]">
            <Truck size={24} strokeWidth={1.5} />
          </div>
          <div>
            <h5 className="font-bold text-[10px] uppercase tracking-widest text-black dark:text-white">Complementary Delivery</h5>
            <span className="text-[10px] text-neutral-400 uppercase tracking-tighter">Free on orders over ₹999</span>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="bg-[#f8c8dc]/10 p-4 rounded-2xl border border-[#f8c8dc]/20 text-[#f8c8dc]">
            <ShieldCheck size={24} strokeWidth={1.5} />
          </div>
          <div>
            <h5 className="font-bold text-[10px] uppercase tracking-widest text-black dark:text-white">Authenticity Guaranteed</h5>
            <span className="text-[10px] text-neutral-400 uppercase tracking-tighter">Certified Luxury Boutique</span>
          </div>
        </div>
      </div>
    </div>
  );
}
