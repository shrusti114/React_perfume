import api from '../../api-client/api';
import { queryClient } from '../../lib/queryClient';

export const productMutations = {
  create: () => ({
    mutationFn: async (values) => {
      const { data } = await api.post('/products', values);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  }),
  update: () => ({
    mutationFn: async ({ id, values }) => {
      const { data } = await api.put(`/products/${id}`, values);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  }),
  delete: () => ({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/products/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  }),
};
