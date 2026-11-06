import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import DashboardLayout from '@/layouts/DashboardLayout';
import DashboardPage from '@/features/dashboard/pages/DashboardPage';
import BatchPage from '@/features/batch/pages/BatchPage';
import OrderPage from '@/features/order/pages/OrderPage';
import CustomerPage from '@/features/customer/pages/CustomerPage';
import LoginPage from '@/features/auth/pages/LoginPage';
import TrackingOrderPage from '@/features/public-order/pages/TrackSearchPage';
import { GuestRoute } from './GuestRoute';
import PublicLayout from '@/layouts/PublicLayout';
import PublicOrderPage from '@/features/public-order/pages/PublicOrderPage';
import TrackDetailPage from '@/features/public-order/pages/TrackDetailPage';
const router = createBrowserRouter([
   {
    path: '/login',
    element: (
      <GuestRoute>
        <LoginPage />
      </GuestRoute>
    ),
  },
  {
     element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/', element: <DashboardPage /> },
      { path: '/orders', element: <OrderPage /> },
      { path: '/batch', element: <BatchPage /> },
      { path: '/customers', element: <CustomerPage /> },
    ],
  },
  {
    element: (
      <PublicLayout />
    ),
    children: [
      { path: '/order-form', element: <PublicOrderPage />},
      { path: '/track', element: <TrackingOrderPage />},
      { path: '/track/:token', element: <TrackDetailPage  />}
    ]
  }
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}