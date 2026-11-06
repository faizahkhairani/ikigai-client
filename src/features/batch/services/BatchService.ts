import { api } from "@/lib/api";
import type { Batch, OpenBatchPayload } from "../type";

export const batchService = {
  list: async (): Promise<Batch[]> => {
    const { data } = await api.get('/admin/batches');
    return data.batches;
  },

  open: async (payload: OpenBatchPayload): Promise<Batch> => {
    const { data } = await api.post('/admin/batches', payload);
    return data.batch;
  },

  close: async (id: string): Promise<Batch> => {
    const { data } = await api.patch(`/admin/batches/${id}/close`);
    return data.batch;
  },

  reopen: async (id: string): Promise<Batch> => {
  const { data } = await api.patch(`/admin/batches/${id}/open`);
  return data.batch;
},
};