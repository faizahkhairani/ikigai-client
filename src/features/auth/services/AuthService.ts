import { supabase } from '@/lib/supabase';

export const authService = {

  signIn: (email: string, password: string) =>
    supabase.auth.signInWithPassword({ email, password }),

  signOut: () => supabase.auth.signOut(),

  getSession: () => supabase.auth.getSession(),
};