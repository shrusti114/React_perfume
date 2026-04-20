import { useAdminStats, useAdminOrders, useAdminUsers, useUpdateOrderStatus, useToggleUserBlock, useDeleteProduct } from '../../../hooks/useApi';

export function useAdminLogic() {
  const { data: stats, isLoading: isLoadingStats } = useAdminStats();
  const { data: orders, isLoading: isLoadingOrders } = useAdminOrders();
  const { data: users, isLoading: isLoadingUsers } = useAdminUsers();
  
  const updateStatusMutation = useUpdateOrderStatus();
  const toggleBlockMutation = useToggleUserBlock();
  const deleteProductMutation = useDeleteProduct();

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await updateStatusMutation.mutateAsync({ orderId, status });
    } catch (error) {
      console.error('Failed to update order status');
    }
  };

  const handleToggleUserBlock = async (userId) => {
    try {
      await toggleBlockMutation.mutateAsync(userId);
    } catch (error) {
      console.error('Failed to toggle user block status');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this fragrance?")) {
      try {
        await deleteProductMutation.mutateAsync(productId);
      } catch (error) {
        console.error('Failed to delete product');
      }
    }
  };

  return {
    stats,
    orders,
    users,
    isLoading: isLoadingStats || isLoadingOrders || isLoadingUsers,
    handleUpdateOrderStatus,
    handleToggleUserBlock,
    handleDeleteProduct
  };
}
