import { api } from '@/lib/api';
import type { OrderStatus, OrderFilters, BulkResult, PaymentStatus, CreateManualOrderPayload, UploadProofResult, OrderDetail, OrderListResult } from '../types';

export const orderService = {
  list: async (
  filters: OrderFilters,
  page: number,
  pageSize: number
): Promise<OrderListResult> => {
  const { data } = await api.get('/admin/orders', { params: { ...filters, page, pageSize } });
  return data;
},

  bulkUpdateStatus: async (orderIds: string[], status: OrderStatus): Promise<BulkResult> => {
    const { data } = await api.patch('/admin/orders/bulk-status', { orderIds, status });
    return data;
  },

  bulkUpdatePaymentStatus: async (
    orderIds: string[],
    paymentStatus: PaymentStatus
  ): Promise<BulkResult> => {
    const { data } = await api.patch('/admin/orders/bulk-payment-status', {
      orderIds,
      paymentStatus,
    });
    return data;
  },

  createManual: async (payload: CreateManualOrderPayload): Promise<void> => {
    await api.post('/admin/orders', payload);
  },

  getById: async (id: string): Promise<OrderDetail> => {
    const { data } = await api.get(`/admin/orders/${id}`);
    return data.order;
  },

  uploadProof: async (orderId: string, image: File): Promise<UploadProofResult> => {
    const formData = new FormData();
    formData.append('image', image);
    const { data } = await api.post(`/admin/orders/${orderId}/proof-images`, formData);
    return data;
  },

  correctStatus: async (orderId: string): Promise<void> => {
    await api.post(`/admin/orders/${orderId}/correct-status`);
  },

  deleteProofImage: async (orderId: string, imageId: string): Promise<void> => {
    await api.delete(`/admin/orders/${orderId}/proof-images/${imageId}`);
  },

  replaceResiImage: async (orderId: string, image: File): Promise<void> => {
    const formData = new FormData();
    formData.append('image', image);
    await api.put(`/admin/orders/${orderId}/resi-image`, formData);
  },
};