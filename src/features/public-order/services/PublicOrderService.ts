import { api } from '@/lib/api';
import type {
  OrderAvailability,
  SubmitPublicOrderPayload,
  SubmitPublicOrderResult,
} from '../types';

export const publicOrderService = {
  getAvailability: async (): Promise<OrderAvailability> => {
    const { data } = await api.get('/orders/availability');
    return data;
  },

  submit: async (payload: SubmitPublicOrderPayload): Promise<SubmitPublicOrderResult> => {
    const formData = new FormData();
    formData.append('name', payload.name);
    formData.append('phone', payload.phone);
    formData.append('resiThailand', payload.resiThailand);
    formData.append('items', JSON.stringify(payload.items)); // array dikirim sebagai JSON string
    formData.append('image', payload.image);

    const { data } = await api.post('/orders', formData);
    return data;
  },
};