import { useState } from 'react';

/**
 * A simple UI-only store for the cart feature.
 * In a larger app, this might use Zustand or Redux.
 */
export const useCartUIStore = () => {
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);

  const toggleMiniCart = () => setIsMiniCartOpen(prev => !prev);
  const closeMiniCart = () => setIsMiniCartOpen(false);
  const openMiniCart = () => setIsMiniCartOpen(true);

  return {
    isMiniCartOpen,
    toggleMiniCart,
    closeMiniCart,
    openMiniCart,
  };
};
