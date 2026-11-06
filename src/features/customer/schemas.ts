import { z } from 'zod';
import { ORDER_LIMITS } from '@/features/order/schemas';

export const ADDRESS_MAX = 300;

export const customerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Nama wajib diisi')
    .max(ORDER_LIMITS.name, `Maksimal ${ORDER_LIMITS.name} karakter`),
  phone: z
    .string()
    .trim()
    .min(1, 'No WA wajib diisi')
    .regex(/^\+?[\d\s-]{9,15}$/, 'Format no WA tidak valid'),
  address: z.string().max(ADDRESS_MAX, `Maksimal ${ADDRESS_MAX} karakter`),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;