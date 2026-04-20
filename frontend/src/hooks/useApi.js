import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import api from '../api-client/api';

/* ================================================================
   QUERY KEY FACTORY
   Central place for all query keys — makes invalidation predictable
   ================================================================ */
export const queryKeys = {
  // Products
  products: {
    all: ['products'],
    list: (filters) => ['products', 'list', filters],
    detail: (id) => ['products', 'detail', id],
    seller: () => ['products', 'seller'],
  },
  // Orders
  orders: {
    all: ['orders'],
    seller: () => ['orders', 'seller'],
    detail: (id) => ['orders', 'detail', id],
  },
  // Users
  users: {
    profile: () => ['users', 'profile'],
  },
  // Seller
  seller: {
    stats: () => ['seller', 'stats'],
  },
  // Cart
  cart: {
    all: ['cart'],
  },
  // Wishlist
  wishlist: {
    all: ['wishlist'],
  },
  // Admin
  admin: {
    stats: () => ['admin', 'stats'],
    orders: () => ['admin', 'orders'],
    users: (search = '') => ['admin', 'users', search],
    sellers: (search = '') => ['admin', 'sellers', search],
    categories: () => ['admin', 'categories'],
    feedback: () => ['admin', 'feedback'],
    payments: () => ['admin', 'payments'],
  },
};

/* ================================================================
   PRODUCT HOOKS
   ================================================================ */

/** Fetch all products with optional filters */
export const useProducts = (filters = {}) => {
  return useQuery({
    queryKey: queryKeys.products.list(filters),
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.family && filters.family !== 'All') params.append('family', filters.family);
      if (filters.category && filters.category !== 'All') params.append('category', filters.category);
      if (filters.search) params.append('search', filters.search);
      const { data } = await api.get(`/products?${params.toString()}`);
      return data;
    },
  });
};

/** Fetch a single product by ID */
export const useProduct = (id) => {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: async () => {
      const { data } = await api.get(`/products/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

/** Fetch seller's own products */
export const useSellerProducts = () => {
  return useQuery({
    queryKey: queryKeys.products.seller(),
    queryFn: async () => {
      const { data } = await api.get('/products/seller');
      return data;
    },
  });
};

/** Create a new product (mutation) */
export const useCreateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values) => {
      const { data } = await api.post('/products', values);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });
};

/** Update an existing product */
export const useUpdateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, values }) => {
      const { data } = await api.put(`/products/${id}`, values);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });
};

/** Delete a product */
export const useDeleteProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/products/${id}`);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });
};

/* ================================================================
   ORDER HOOKS
   ================================================================ */

/** Fetch seller orders */
export const useSellerOrders = () => {
  return useQuery({
    queryKey: queryKeys.orders.seller(),
    queryFn: async () => {
      const { data } = await api.get('/orders/seller');
      return data;
    },
  });
};

/** Update order status */
export const useUpdateOrderStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ orderId, status }) => {
      const { data } = await api.put(`/orders/${orderId}/status`, { status });
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.orders.all });
    },
  });
};

/** Fetch user's own orders */
export const useUserOrders = () => {
  return useQuery({
    queryKey: queryKeys.orders.all,
    queryFn: async () => {
      const { data } = await api.get('/orders/myorders');
      return data;
    },
    enabled: !!localStorage.getItem('token'),
  });
};

/* ================================================================
   USER / AUTH HOOKS
   ================================================================ */

/** Fetch user profile */
export const useUserProfile = () => {
  return useQuery({
    queryKey: queryKeys.users.profile(),
    queryFn: async () => {
      const { data } = await api.get('/users/profile');
      return data;
    },
    enabled: !!localStorage.getItem('token'),
  });
};

/** Update user profile */
export const useUpdateProfile = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values) => {
      const { data } = await api.put('/users/profile', values);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.users.profile() });
    },
  });
};

/** Change password */
export const useChangePassword = () => {
  return useMutation({
    mutationFn: async ({ currentPassword, newPassword }) => {
      const { data } = await api.post('/users/change-password', { currentPassword, newPassword });
      return data;
    },
  });
};

/** Login */
export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials) => {
      const { data } = await api.post('/auth/login', credentials);
      return data;
    },
  });
};

/** Register */
export const useRegister = () => {
  return useMutation({
    mutationFn: async (userData) => {
      const { data } = await api.post('/auth/register', userData);
      return data;
    },
  });
};

/** Verify email */
export const useVerifyEmail = (token) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await api.post(`/auth/verify-email/${token}`);
      return data;
    },
  });
};

/** Send OTP */
export const useSendOtp = () => {
  return useMutation({
    mutationFn: async (email) => {
      const { data } = await api.post('/auth/send-otp', { email });
      return data;
    },
  });
};

/** Verify OTP */
export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: async ({ email, otp }) => {
      const { data } = await api.post('/auth/verify-otp', { email, otp });
      return data;
    },
  });
};

/* ================================================================
   SELLER STATS HOOK
   ================================================================ */

/** Fetch seller dashboard stats */
export const useSellerStats = () => {
  return useQuery({
    queryKey: queryKeys.seller.stats(),
    queryFn: async () => {
      const { data } = await api.get('/seller/stats');
      return data;
    },
    enabled: !!localStorage.getItem('token'),
  });
};

/* ================================================================
   CART HOOKS
   ================================================================ */

export const useCart = () => {
  return useQuery({
    queryKey: queryKeys.cart.all,
    queryFn: async () => {
      const token = !!localStorage.getItem('token');
      if (!token) {
        // Resolve guest cart items from API
        const guestCart = JSON.parse(localStorage.getItem('guest_cart')) || [];
        const items = await Promise.all(guestCart.map(async (item) => {
          try {
            const { data } = await api.get(`/products/${item.productId}`);
            return { productId: data, quantity: item.quantity };
          } catch (e) { return null; }
        }));
        return { _id: 'guest', items: items.filter(Boolean) };
      }
      const { data } = await api.get('/cart');
      return data;
    },
  });
};

export const useAddToCart = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ productId, quantity = 1 }) => {
      const token = !!localStorage.getItem('token');
      if (!token) {
        let cart = JSON.parse(localStorage.getItem('guest_cart')) || [];
        const itemIndex = cart.findIndex(i => i.productId === productId);
        if (itemIndex > -1) {
          cart[itemIndex].quantity += quantity;
          if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
          }
        } else {
          if (quantity > 0) {
            cart.push({ productId, quantity });
          }
        }
        localStorage.setItem('guest_cart', JSON.stringify(cart));
        return { items: cart };
      }
      const { data } = await api.post('/cart', { productId, quantity });
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.cart.all });
      toast.success('Added to your bag!');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Could not add to bag. Please try again.');
    },
  });
};

export const useRemoveFromCart = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (productId) => {
      const token = !!localStorage.getItem('token');
      if (!token) {
        let cart = JSON.parse(localStorage.getItem('guest_cart')) || [];
        cart = cart.filter(i => i.productId !== productId);
        localStorage.setItem('guest_cart', JSON.stringify(cart));
        return { items: cart };
      }
      const { data } = await api.delete(`/cart/${productId}`);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.cart.all });
    },
  });
};

export const useClearCart = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const token = !!localStorage.getItem('token');
      if (!token) {
        localStorage.removeItem('guest_cart');
        return;
      }
      const { data } = await api.delete('/cart');
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.cart.all });
    },
  });
};

/** Create an order */
export const useCreateOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (orderData) => {
      const { data } = await api.post('/orders', orderData);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.orders.all });
      qc.invalidateQueries({ queryKey: queryKeys.cart.all });
    },
  });
};

/* ================================================================
   WISHLIST HOOKS
   ================================================================ */

export const useWishlist = () => {
  return useQuery({
    queryKey: queryKeys.wishlist.all,
    queryFn: async () => {
      const { data } = await api.get('/wishlist');
      return data;
    },
    enabled: !!localStorage.getItem('token'),
  });
};

export const useAddToWishlist = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (productId) => {
      const { data } = await api.post('/wishlist', { productId });
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.wishlist.all });
    },
  });
};

export const useRemoveFromWishlist = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (productId) => {
      const { data } = await api.delete(`/wishlist/${productId}`);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.wishlist.all });
    },
  });
};

/* ================================================================
   ADMIN HOOKS
   ================================================================ */

/** Fetch global admin stats */
export const useAdminStats = () => {
  return useQuery({
    queryKey: queryKeys.admin.stats(),
    queryFn: async () => {
      const { data } = await api.get('/admin/stats');
      return data;
    },
    enabled: !!localStorage.getItem('token'),
  });
};

/** Fetch all orders for admin */
export const useAdminOrders = () => {
  return useQuery({
    queryKey: queryKeys.admin.orders(),
    queryFn: async () => {
      const { data } = await api.get('/orders');
      return data;
    },
    enabled: !!localStorage.getItem('token'),
  });
};

/** Fetch all users for admin management */
export const useAdminUsers = (search = '') => {
  return useQuery({
    queryKey: queryKeys.admin.users(search),
    queryFn: async () => {
      const { data } = await api.get(`/admin/users?search=${search}`);
      return data.users || data;
    },
    enabled: !!localStorage.getItem('token'),
  });
};

/** Toggle user status */
export const useUpdateUserStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }) => {
      const { data } = await api.put(`/admin/users/${id}/status`, { status });
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'users'] });
      toast.success('User status synchronized.');
    },
  });
};

/** Delete User */
export const useDeleteUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/admin/users/${id}`);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'users'] });
      toast.success('User registry purged successfully.');
    },
  });
};

export const useToggleUserBlock = useUpdateUserStatus; // Alias for backward compatibility

/** Approve Seller */
export const useApproveSeller = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.put(`/admin/sellers/${id}/approve`);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'users'] });
      qc.invalidateQueries({ queryKey: ['admin', 'sellers'] });
    },
  });
};

/** Product Detail Hooks */
export const useAdminCategories = () => {
  return useQuery({
    queryKey: queryKeys.admin.categories(),
    queryFn: async () => {
      const { data } = await api.get('/category');
      return data;
    },
  });
};

export const useCreateCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (values) => {
      const { data } = await api.post('/category', values);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.admin.categories() });
    },
  });
};

export const useDeleteCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/category/${id}`);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.admin.categories() });
      toast.success('Category purged from library.');
    },
  });
};

export const useUpdateCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, values }) => {
      const { data } = await api.put(`/category/${id}`, values);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.admin.categories() });
      toast.success('Category intelligence updated.');
    },
  });
};

/** Feedback Hooks */
export const useAdminFeedback = () => {
  return useQuery({
    queryKey: queryKeys.admin.feedback(),
    queryFn: async () => {
      const { data } = await api.get('/admin/feedback');
      return data;
    },
  });
};

export const useDeleteFeedback = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/admin/feedback/${id}`);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.admin.feedback() });
      toast.success('Feedback successfully exterminated.');
    },
  });
};

/** Payment Hooks */
export const useAdminPayments = () => {
  return useQuery({
    queryKey: queryKeys.admin.payments(),
    queryFn: async () => {
      const { data } = await api.get('/admin/payments');
      return data;
    },
  });
};

/** Notification Hooks */
export const useSendNotification = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post('/admin/notifications', payload);
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Notification dispatched.');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Dispatch failed.');
    }
  });
};
