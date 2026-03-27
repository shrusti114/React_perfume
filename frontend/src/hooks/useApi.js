import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';

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
