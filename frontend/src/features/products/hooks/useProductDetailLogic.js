import { useState } from 'react';
import { useProduct, useAddToCart, useAddToWishlist, useRemoveFromWishlist, useWishlist } from '../../../hooks/useApi';

/**
 * Hook for managing product detail business logic.
 * Fetches product from MongoDB via API.
 */
export function useProductDetailLogic(productId) {
  const [quantity, setQuantity] = useState(1);
  const { data: product, isLoading } = useProduct(productId);
  const { mutate: addToCart } = useAddToCart();
  const { mutate: addToWishlist } = useAddToWishlist();
  const { mutate: removeFromWishlist } = useRemoveFromWishlist();
  const { data: wishlist } = useWishlist();

  const isWishlisted = wishlist?.products?.some(p => p._id === productId);

  const handleAddToCart = () => {
    addToCart({ productId, quantity });
  };

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1));

  return {
    product,
    isLoading,
    quantity,
    incrementQuantity,
    decrementQuantity,
    handleAddToCart,
    handleToggleWishlist,
    isWishlisted
  };
}
