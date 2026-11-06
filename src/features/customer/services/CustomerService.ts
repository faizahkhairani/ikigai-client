import { api } from '@/lib/api';
import type { CustomerDetail, CustomerListResult } from '../types';
import type { UpdateCustomerPayload } from '../types';

export const customerService = {
  list: async (search: string, page: number, pageSize: number): Promise<CustomerListResult> => {
    const { data } = await api.get('/admin/customers', {
      params: { search: search || undefined, page, pageSize },
    });
    return data;
  },

  getById: async (id: string): Promise<CustomerDetail> => {
    const { data } = await api.get(`/admin/customers/${id}`);
    return data.customer;
  },

  // tambahkan UpdateCustomerPayload ke import type
  update: async (id: string, payload: UpdateCustomerPayload): Promise<void> => {
    await api.patch(`/admin/customers/${id}`, payload);
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/admin/customers/${id}`);
  },
};