import { api } from '@/lib/api';
import type { DashboardSummary } from '../types';

export const dashboardService = {
  getSummary: async (batchId?: string): Promise<DashboardSummary> => {
    const { data } = await api.get('/admin/dashboard', { params: { batchId } });
    return data;
  },
};