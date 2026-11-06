import { create } from 'zustand';
import type { User, Session } from '@supabase/supabase-js';

type AdminProfile = {
  id: string;
  name: string;
  email: string;
  role: string | null;
};

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: AdminProfile | null;
  isLoading: boolean;
  setSession: (session: Session | null) => void;
  setProfile: (profile: AdminProfile | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  profile: null,
  isLoading: true,
  setSession: (session) => set({ session, user: session?.user ?? null }),
  setProfile: (profile) => set({profile}),
  setLoading: (isLoading) => set({ isLoading }),
}));