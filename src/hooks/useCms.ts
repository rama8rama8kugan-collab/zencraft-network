import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api-client';

export const useTeamMembers = () => {
  return useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      const response = await api.get('/team');
      return response.data;
    },
  });
};

export const usePartners = () => {
  return useQuery({
    queryKey: ['partners'],
    queryFn: async () => {
      const response = await api.get('/partners');
      return response.data;
    },
  });
};

export const useNews = () => {
  return useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const response = await api.get('/news');
      return response.data;
    },
  });
};

export const useAnnouncements = () => {
  return useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const response = await api.get('/announcements/active');
      return response.data;
    },
  });
};
