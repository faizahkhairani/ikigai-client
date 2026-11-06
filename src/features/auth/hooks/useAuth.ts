import { useState } from 'react';
import { useAuthStore } from '../store';
import { authService } from '../services/AuthService';
import { api } from '@/lib/api';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, session, profile, setProfile } = useAuthStore();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const { error } = await authService.signIn(email, password);
    if (error) {
      setIsLoading(false);
      setError(error.message);
      throw error;
    }

    try {
      const { data } = await api.get('/admin/me');
      setProfile(data.admin);
    } catch {
      setProfile(null);
    }

    setIsLoading(false);
  };

  const logout = async () => {
    await authService.signOut();
    setProfile(null)
  };

  return { user, session, login, logout, isLoading, error, profile };
}