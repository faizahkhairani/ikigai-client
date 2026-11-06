// routes/GuestRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store';

export function GuestRoute({ children }: { children: React.ReactNode }) {
  const { session, isLoading } = useAuthStore();

  if (isLoading) return <div>Loading...</div>; 
  if (session) return <Navigate to="/" replace />; 

  return <>{children}</>;
}