/**
 * Utility functions for cart-related calculations.
 */

export const calculateSubtotal = (items) => {
  return items.reduce((acc, item) => {
    const price = item.productId?.price || 0;
    return acc + (price * item.quantity);
  }, 0);
};

export const calculateShipping = (subtotal) => {
  if (subtotal <= 0) return 0;
  if (subtotal >= 999) return 0;  // Free shipping over ₹999
  return 49; // Flat ₹49 shipping
};

export const calculateTotal = (subtotal, shipping) => {
  return subtotal + shipping;
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};
