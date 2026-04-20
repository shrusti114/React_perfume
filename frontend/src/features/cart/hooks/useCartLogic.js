import { useCart, useAddToCart, useRemoveFromCart } from '../../../hooks/useApi';
import { calculateSubtotal, calculateShipping, calculateTotal } from '../../../utils/calculations';

/**
 * Custom hook for managing cart business logic.
 */
export function useCartLogic() {
  const { data: cart, isLoading } = useCart();
  const { mutate: updateCart } = useAddToCart();
  const { mutate: removeItem } = useRemoveFromCart();

  const cartItems = cart?.items || [];

  const updateQuantity = (productId, delta) => {
    updateCart({ productId, quantity: delta });
  };

  const handleRemove = (productId) => {
    removeItem(productId);
  };
  
  const subtotal = calculateSubtotal(cartItems);
  const shipping = calculateShipping(subtotal);
  const total = calculateTotal(subtotal, shipping);

  return {
    cartItems,
    isLoading,
    updateQuantity,
    handleRemove,
    subtotal,
    shipping,
    total
  };
}
