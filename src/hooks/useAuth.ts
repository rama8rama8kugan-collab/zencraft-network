import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api-client';

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await api.get('/users/me');
      return response.data;
    },
  });
};

export const useAuthenticateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (username: string) => {
      const response = await api.post('/auth/minecraft', { username });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return () => {
    localStorage.removeItem('auth_token');
    queryClient.removeQueries({ queryKey: ['user'] });
  };
};
