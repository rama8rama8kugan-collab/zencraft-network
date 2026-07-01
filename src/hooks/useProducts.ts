import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api-client';

export const useProducts = (category?: string) => {
  return useQuery({
    queryKey: ['products', category],
    queryFn: async () => {
      const response = await api.get('/products', {
        params: { category: category || 'all' },
      });
      return response.data;
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await api.get('/categories');
      return response.data;
    },
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { productId: string; quantity: number }) => {
      const response = await api.post('/cart', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
