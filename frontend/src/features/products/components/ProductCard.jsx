import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Heart, Eye, Star, ShoppingBag, Pencil } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';
import { useWishlistLogic } from '../../wishlist/hooks/useWishlistLogic';
import { ProductModal } from '../../seller/components/ProductModal';
import { toast } from 'sonner';

const ProductCard = ({ product, onAdd, compact = false }) => {
  const { user, role, isAuthenticated } = useAuth();
  const { wishlistItems, handleToggleWishlist } = useWishlistLogic();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const isWishlisted = wishlistItems.some(item => (item._id || item) === product._id);
  const canEdit = role === 'admin' || (role === 'seller' && product.sellerId?._id === user?._id);

  const onWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.info('Please login to use wishlist', {
        action: {
          label: 'Login',
          onClick: () => window.location.href = '/login'
        }
      });
      return;
    }
    handleToggleWishlist(product._id, isWishlisted);
    toast(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <>
      <motion.div 
        layout
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.95 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -5 }}
        className={`group relative bg-white dark:bg-[#0a0a0a] rounded-xl overflow-hidden shadow-sm hover:shadow-2xl dark:shadow-none transition-all duration-500 border border-[#e5e5e5] dark:border-[#1a1a1a] flex flex-col ${compact ? 'max-w-[280px]' : ''}`}
      >
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-4 left-4 z-20 bg-black text-white dark:bg-[#f8c8dc] dark:text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
            {product.badge}
          </span>
        )}

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
          <button 
            onClick={onWishlistClick}
            className={`backdrop-blur-md p-2.5 rounded-full transition-all shadow-lg ${
              isWishlisted 
              ? 'bg-[#f8c8dc] text-black' 
              : 'bg-white/90 dark:bg-black/80 text-neutral-600 dark:text-white hover:bg-black hover:text-white dark:hover:bg-[#f8c8dc] dark:hover:text-black'
            }`}
          >
            <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
          
          {canEdit && (
            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsEditModalOpen(true); }}
              className="bg-white/90 dark:bg-black/80 backdrop-blur-md p-2.5 rounded-full hover:bg-black hover:text-white dark:hover:bg-[#f8c8dc] dark:hover:text-black transition-all text-neutral-600 dark:text-white shadow-lg"
            >
              <Pencil size={16} />
            </button>
          )}

          <button className="bg-white/90 dark:bg-black/80 backdrop-blur-md p-2.5 rounded-full hover:bg-black hover:text-white dark:hover:bg-[#f8c8dc] dark:hover:text-black transition-all text-neutral-600 dark:text-white shadow-lg">
            <Eye size={16} />
          </button>
        </div>

        {/* Image Overlay */}
        <Link to={`/product/${product._id}`} className={`w-full overflow-hidden relative bg-neutral-100 dark:bg-[#111111] flex justify-center items-center ${compact ? 'h-56' : 'h-72'}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 mix-blend-multiply dark:mix-blend-normal opacity-90 group-hover:opacity-100"
          />
        </Link>
        
        <div className="p-5 relative z-20 flex-grow flex flex-col w-full bg-white dark:bg-[#0a0a0a]">
          <div className="flex justify-between items-start mb-1">
            <span className="text-neutral-400 dark:text-neutral-500 text-[9px] uppercase tracking-[0.15em] font-bold">{product.brand}</span>
            {product.rating && (
              <div className="flex items-center gap-1 text-[#d4af37] dark:text-[#f8c8dc]">
                <Star size={10} className="fill-current" />
                <span className="text-[10px] font-bold text-black dark:text-white">{product.rating}</span>
              </div>
            )}
          </div>
          <span className="text-neutral-500 dark:text-[#f8c8dc] text-[8px] uppercase tracking-[0.2em] font-bold mb-2">{product.family} {product.gender && `· ${product.gender}`}</span>
          
          <Link to={`/product/${product._id}`}>
            <h3 className="text-lg font-serif text-black dark:text-white mb-1 group-hover:text-[#d4af37] dark:group-hover:text-[#f8c8dc] transition-colors leading-tight">{product.name}</h3>
          </Link>
          
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4 font-light line-clamp-2">{product.description}</p>
          
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-black/5 dark:border-white/5">
            <span className="text-lg font-bold text-black dark:text-white">₹{product.price?.toLocaleString()}</span>
            <div className="flex items-center gap-2">
              <Link 
                to={`/product/${product._id}`}
                className="px-3 py-1.5 bg-neutral-100 text-neutral-600 dark:bg-white/5 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-white/10 rounded-full transition-all text-[10px] font-bold uppercase tracking-widest"
              >
                Details
              </Link>
              {isAuthenticated && (
                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAdd && onAdd(product._id); }} 
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white dark:bg-[#f8c8dc] dark:text-black hover:bg-neutral-800 dark:hover:bg-white rounded-full transition-all text-[10px] font-bold uppercase tracking-widest shadow-md"
                >
                  <ShoppingBag size={12} /> Add
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <ProductModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        product={product} 
      />
    </>
  );
};

export default ProductCard;
