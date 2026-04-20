import React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ShoppingBag } from 'lucide-react';
import { useCartLogic } from '../../features/cart/hooks/useCartLogic';
import { CartItem } from '../../features/cart/components/CartItem';
import { CartSummary } from '../../features/cart/components/CartSummary';
import { OrderHistory } from '../../features/profile/components/OrderHistory';
import { useUserOrders } from '../../hooks/useApi';

const Cart = () => {
  const {
    cartItems,
    isLoading,
    updateQuantity,
    handleRemove,
    subtotal,
    shipping,
    total
  } = useCartLogic();

  const { data: orders, isLoading: isLoadingOrders } = useUserOrders();

  if (isLoading || isLoadingOrders) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-black text-black dark:text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#f8c8dc] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs uppercase tracking-widest font-bold text-neutral-400">Loading your bag...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 dark:bg-black min-h-screen text-neutral-800 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-24 lg:px-12">
        <div className="flex items-center gap-4 mb-16">
          <h1 className="text-5xl font-serif text-black dark:text-white">Shopping Bag</h1>
          <div className="bg-[#f8c8dc] text-white h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg">
            {cartItems.length}
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-black rounded-[2rem] border border-black/5 dark:border-white/10 shadow-sm mb-20">
            <ShoppingBag size={64} className="text-[#f8c8dc] mx-auto mb-6" />
            <h2 className="text-3xl font-serif text-black dark:text-white mb-4">Your bag is empty</h2>
            <p className="text-neutral-500 font-light mb-8 discovery-text">
              Discover our exquisite collections to find your signature scent.
            </p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-black dark:bg-white/10 text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#f8c8dc] hover:text-black transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-32">
            <div className="lg:col-span-2 space-y-8">
              {cartItems.map((item, idx) => (
                <CartItem 
                  key={item.productId?._id || item._id || idx} 
                  item={item} 
                  updateQuantity={updateQuantity} 
                  handleRemove={handleRemove} 
                />
              ))}
            </div>

            <div className="lg:col-span-1">
              <CartSummary 
                subtotal={subtotal} 
                shipping={shipping} 
                total={total} 
              />
            </div>
          </div>
        )}

        {/* Order History Section */}
        {orders && orders.length > 0 && (
          <div className="pt-20 border-t border-black/5 dark:border-white/10">
            <div className="mb-12">
              <h2 className="text-3xl font-serif text-black dark:text-white mb-2">From Your Previous Choices</h2>
              <p className="text-neutral-400 text-[10px] uppercase tracking-[0.2em] font-bold">Quickly add items from your manifest back to your current bag</p>
            </div>
            <OrderHistory orders={orders} />
          </div>
        )}
      </div>
    </div>
  );
};

export const Route = createFileRoute('/user/cart')({
  component: Cart,
});
