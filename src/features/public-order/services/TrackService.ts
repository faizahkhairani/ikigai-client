import { api } from '@/lib/api';
import type { TrackedOrder, TrackedOrderSummary, TrackSearchQuery } from '../types';

export const trackService = {
  getByToken: async (token: string): Promise<TrackedOrder> => {
    const { data } = await api.get(`/track/${token}`);
    return data.order;
  },

  search: async (query: TrackSearchQuery): Promise<TrackedOrderSummary[]> => {
    const { data } = await api.get('/track', { params: query });
    return data.orders;
  },
};