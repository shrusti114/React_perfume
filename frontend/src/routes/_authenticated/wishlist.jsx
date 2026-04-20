import React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useWishlistLogic } from '../../features/wishlist/hooks/useWishlistLogic';
import ProductCard from '../../features/products/components/ProductCard';
import { Heart, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Route = createFileRoute('/_authenticated/wishlist')({
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlistItems, isLoading, handleMoveToCart } = useWishlistLogic();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#d4af37] mb-4" size={40} />
        <p className="text-neutral-500 uppercase tracking-widest text-[10px] font-bold">Curating your favorites...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-serif text-black dark:text-white mb-4 tracking-tighter">
              Your Wishlist
            </h1>
            <div className="flex items-center gap-4">
              <p className="text-neutral-500 uppercase tracking-[0.4em] text-[10px] font-bold">
                Personal Collection of Fine Fragrances
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-white/5 border border-black/5 hover:bg-black hover:text-white dark:hover:bg-[#f8c8dc] dark:hover:text-black transition-all text-neutral-600 dark:text-white text-xs font-bold uppercase tracking-widest shadow-sm"
            >
              <span>🔙</span> Back to Home
            </Link>
            <div className="flex items-center gap-4 text-neutral-400 text-xs font-medium">
              <span>{wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'}</span>
              <div className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-800" />
              <Link to="/shop" className="text-[#d4af37] hover:underline flex items-center gap-1 group">
                Continue Shopping <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          {wishlistItems.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {wishlistItems.map((product) => (
                <div key={product._id} className="relative">
                  <ProductCard product={product} />
                  <button 
                    onClick={() => handleMoveToCart(product._id)}
                    className="absolute bottom-6 right-6 z-30 bg-[#f8c8dc] text-black p-3 rounded-full shadow-xl hover:scale-110 transition-transform flex items-center gap-2 group"
                    title="Move to Cart"
                  >
                    <ShoppingBag size={18} />
                  </button>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-black/5 dark:border-white/5 rounded-3xl bg-neutral-50/50 dark:bg-white/5"
            >
              <div className="bg-white dark:bg-black p-8 rounded-full shadow-xl mb-8">
                <Heart size={48} className="text-neutral-200 dark:text-neutral-800" strokeWidth={1} />
              </div>
              <h2 className="text-3xl font-serif text-black dark:text-white mb-4">Your collection is empty</h2>
              <p className="text-neutral-500 max-w-md text-center mb-10 font-light">
                Explore our olfactory masterpieces and save the scents that resonate with your soul.
              </p>
              <Link 
                to="/shop" 
                className="bg-black text-white dark:bg-[#f8c8dc] dark:text-black px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
              >
                Discover Fragrances
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
