import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { api } from '@/lib/api';
import { useAuthStore } from '../store';
import { toast } from '@/components/ui/toast';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setSession, setProfile, setLoading, isLoading } = useAuthStore();

  const fetchProfile = async () => {
    try {
      const { data } = await api.get('/admin/me');
      setProfile(data.admin);
    } catch (err: any) {
      setProfile(null);
      if (err.response?.status === 403) {
        toast.add({ type: 'error', description: 'Akun ini bukan admin.', priority: 'high' });
        await supabase.auth.signOut();
      }
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false); 
      if (session) fetchProfile(); 
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchProfile();
      } else {
        setProfile(null); 
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (isLoading) return <div>Loading...</div>; 

  return <>{children}</>;
}