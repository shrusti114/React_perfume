import { useWishlist, useAddToWishlist, useRemoveFromWishlist, useAddToCart } from '../../../hooks/useApi';

/**
 * Hook for managing wishlist business logic.
 */
export function useWishlistLogic() {
  const { data: wishlist, isLoading } = useWishlist();
  const { mutate: addToWishlist } = useAddToWishlist();
  const { mutate: removeFromWishlist } = useRemoveFromWishlist();
  const { mutate: addToCart } = useAddToCart();

  const handleToggleWishlist = (productId, isWishlisted) => {
    if (isWishlisted) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  const handleMoveToCart = (productId) => {
    addToCart({ productId, quantity: 1 });
    removeFromWishlist(productId);
  };

  return {
    wishlistItems: wishlist || [],
    isLoading,
    handleToggleWishlist,
    handleMoveToCart,
    removeFromWishlist
  };
}
