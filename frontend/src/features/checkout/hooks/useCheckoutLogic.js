import { useState } from 'react';
import { useCart, useClearCart } from '../../../hooks/useApi';
import api from '../../../api-client/api';
import { toast } from 'sonner';

/**
 * Hook for checkout business logic and order creation.
 * Creates real orders in MongoDB for both logged-in and guest users.
 */
export function useCheckoutLogic() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');
  const { data: cart } = useCart();
  const { mutate: clearCart } = useClearCart();

  const subtotal = cart?.items?.reduce((acc, item) => {
    return acc + ((item.productId?.price || 0) * item.quantity);
  }, 0) || 0;
  
  const shipping = subtotal >= 999 ? 0 : (subtotal > 0 ? 49 : 0);
  const total = subtotal + shipping;

  const handleCheckoutSubmit = async (values, setStatus) => {
    console.log('[DEBUG] Form values on submit:', values);
    try {
      if (!cart?.items || cart.items.length === 0) {
        setStatus('Your bag is empty. Please add items before checking out.');
        return;
      }
      
      // 1. Build order payload for Cash on Delivery (COD)
      const orderProducts = cart.items.map(item => ({
        productId: item.productId?._id || item.productId,
        quantity: item.quantity,
      }));

      const orderPayload = {
        products: orderProducts,
        totalAmount: total,
        paymentStatus: 'Pending',
        paymentMethod: 'COD',
        guestInfo: {
          name: values.fullName,
          email: values.email,
          phone: values.phone,
          address: `${values.address}, ${values.city}, ${values.state} - ${values.zipCode}`,
        },
      };

      console.log('[DEBUG] Sending order payload to API:', orderPayload);

      // 2. Create a real order in MongoDB
      const { data: createdOrder } = await api.post('/orders', orderPayload);
      
      console.log('[DEBUG] Order created successfully:', createdOrder);

      // Success Tone - Show confirmation toast
      toast.success('Order Confirmed!', {
        description: `Order #${(createdOrder._id || '').slice(-8)} has been placed successfully.`,
        duration: 5000,
      });

      // Clear cart after successful order
      clearCart();

      setConfirmedOrderId(createdOrder._id || createdOrder.orderId || 'VLV-' + Date.now().toString(36).toUpperCase());
      setIsSuccess(true);
    } catch (error) {
      console.error('[DEBUG] Checkout failed:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Checkout failed. Please try again.';
      setStatus(errorMsg);
      toast.error('Order Failed', { description: errorMsg });
    }
  };

  return {
    cart,
    subtotal,
    shipping,
    total,
    isSuccess,
    confirmedOrderId,
    handleCheckoutSubmit
  };
}
