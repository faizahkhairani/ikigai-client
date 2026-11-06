import axios from 'axios';
import { useAuthStore } from '@/features/auth/store';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// ambil session dari store tempel di header
api.interceptors.request.use((config) => {
  const session = useAuthStore.getState().session;
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const { supabase } = await import('@/lib/supabase');
      await supabase.auth.signOut(); 
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);