import React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';
import { useWishlistLogic } from '../../features/wishlist/hooks/useWishlistLogic';
import { WishlistItem } from '../../features/wishlist/components/WishlistItem';

const Wishlist = () => {
  const { 
    wishlistItems, 
    isLoading, 
    handleMoveToCart, 
    removeFromWishlist 
  } = useWishlistLogic();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#f8c8dc] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[10px] uppercase tracking-widest font-bold text-neutral-400">Curating your desires...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 dark:bg-black min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-16 px-4">
          <div>
            <h1 className="text-5xl font-serif text-black dark:text-white mb-2">Wishlist</h1>
            <p className="text-neutral-500 uppercase tracking-widest text-[10px] font-bold">Your private selection of excellence</p>
          </div>
          <div className="flex items-center gap-3 bg-white dark:bg-white/5 px-6 py-3 rounded-full border border-black/5 dark:border-white/10">
            <Heart size={18} className="fill-[#f8c8dc] text-[#f8c8dc]" />
            <span className="text-lg font-bold text-black dark:text-white">{wishlistItems.length} Items</span>
          </div>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-32 bg-white dark:bg-[#0a0a0a] rounded-[3rem] border border-black/5 dark:border-white/10 shadow-sm px-12">
            <Heart size={64} strokeWidth={1} className="text-[#f8c8dc] mx-auto mb-8 opacity-50" />
            <h2 className="text-3xl font-serif text-black dark:text-white mb-4">Your list is light</h2>
            <p className="text-neutral-500 font-light mb-12 max-w-sm mx-auto tracking-wide line-height-relaxed">
              Explore our boutique and save the scents that speak to your soul.
            </p>
            <Link to="/shop" className="inline-block bg-black dark:bg-[#f8c8dc] text-white dark:text-black px-12 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] hover:opacity-90 transition-all transform hover:-translate-y-1 shadow-lg">
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {wishlistItems.map((item) => (
              <WishlistItem 
                key={item._id} 
                item={item} 
                onMoveToCart={handleMoveToCart}
                onRemove={removeFromWishlist}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const Route = createFileRoute('/user/wishlist')({
  component: Wishlist,
});
