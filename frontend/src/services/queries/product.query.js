import api from '../../api-client/api';

export const productQueries = {
  all: () => ({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await api.get('/products');
      return data;
    },
  }),
  list: (filters = {}) => ({
    queryKey: ['products', 'list', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.family && filters.family !== 'All') params.append('family', filters.family);
      if (filters.category && filters.category !== 'All') params.append('category', filters.category);
      if (filters.search) params.append('search', filters.search);
      const { data } = await api.get(`/products?${params.toString()}`);
      return data;
    },
  }),
  detail: (id) => ({
    queryKey: ['products', 'detail', id],
    queryFn: async () => {
      const { data } = await api.get(`/products/${id}`);
      return data;
    },
    enabled: !!id,
  }),
  seller: () => ({
    queryKey: ['products', 'seller'],
    queryFn: async () => {
      const { data } = await api.get('/products/seller');
      return data;
    },
  }),
};
