// routes/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    // ambil session dari store
  const { session, isLoading } = useAuthStore();

  if (isLoading) return <div>Loading...</div>;
  if (!session) return <Navigate to="/login" replace />;

  return <>{children}</>;
}