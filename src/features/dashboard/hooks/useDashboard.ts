import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/DashboardService';

export const useDashboard = (batchId?: string) =>
  useQuery({
    // Diawali 'orders' supaya otomatis ikut ter-refresh tiap ada perubahan order
    // (semua aksi order sudah meng-invalidate ['orders'])
    queryKey: ['orders', 'dashboard', batchId ?? 'default'],
    queryFn: () => dashboardService.getSummary(batchId),
    placeholderData: keepPreviousData,
  });