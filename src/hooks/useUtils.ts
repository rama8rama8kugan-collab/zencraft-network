import { useQuery, useMutation } from '@tanstack/react-query';
import api from '@/lib/api-client';

export const useInventory = (userId?: string) => {
  return useQuery({
    queryKey: ['inventory', userId],
    queryFn: async () => {
      const response = await api.get('/inventory', {
        params: { userId },
      });
      return response.data;
    },
  });
};

export const useContactForm = () => {
  return useMutation({
    mutationFn: async (data: { name: string; email: string; subject: string; message: string }) => {
      const response = await api.post('/contact', data);
      return response.data;
    },
  });
};
