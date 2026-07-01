import { useQuery, useMutation } from '@tanstack/react-query';
import api from '@/lib/api-client';

export const useInitiatePayment = () => {
  return useMutation({
    mutationFn: async (data: { orderId: string; amount: number; paymentMethod: string }) => {
      const response = await api.post('/payments/create', data);
      return response.data;
    },
  });
};

export const useVerifyPayment = () => {
  return useMutation({
    mutationFn: async (data: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    }) => {
      const response = await api.post('/payments/verify', data);
      return response.data;
    },
  });
};
