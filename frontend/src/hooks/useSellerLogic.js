import { useSellerStats, useSellerOrders, useSellerProducts, useUpdateOrderStatus, useDeleteProduct } from './useApi';

export function useSellerLogic() {
  const { data: stats, isLoading: isLoadingStats } = useSellerStats();
  const { data: orders, isLoading: isLoadingOrders } = useSellerOrders();
  const { data: products, isLoading: isLoadingProducts } = useSellerProducts();

  const updateStatusMutation = useUpdateOrderStatus();
  const deleteProductMutation = useDeleteProduct();

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await updateStatusMutation.mutateAsync({ orderId, status });
    } catch (error) {
      console.error('Failed to update seller order status');
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      if (window.confirm('Are you sure you want to delete this fragrance?')) {
        await deleteProductMutation.mutateAsync(productId);
      }
    } catch (error) {
      console.error('Failed to delete product');
    }
  };

  return {
    stats,
    orders,
    products,
    isLoading: isLoadingStats || isLoadingOrders || isLoadingProducts,
    handleUpdateOrderStatus,
    handleDeleteProduct
  };
}
