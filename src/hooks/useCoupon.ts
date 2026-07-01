import { useQuery, useMutation } from '@tanstack/react-query';
import api from '@/lib/api-client';

export const useValidateCoupon = () => {
  return useMutation({
    mutationFn: async (data: { code: string; total: number }) => {
      const response = await api.get('/coupons/validate', {
        params: { code: data.code, total: data.total },
      });
      return response.data;
    },
  });
};

export const useApplyCoupon = () => {
  return useMutation({
    mutationFn: async (data: { code: string; total: number }) => {
      const response = await api.post('/coupons/validate', data);
      return response.data;
    },
  });
};
