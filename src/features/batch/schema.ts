import { z } from 'zod';

export const openBatchSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'Nama batch wajib diisi')
      .max(50, 'Nama batch maksimal 50 karakter'),
    startDate: z.string().min(1, 'Tanggal mulai wajib diisi'),
    endDate: z.string(), 
    quota: z.string().optional(), 
  })
  .refine((values) => !values.endDate || values.endDate >= values.startDate, {
    message: 'Target selesai tidak boleh sebelum tanggal mulai',
    path: ['endDate'], // biar error-nya nempel di field endDate
  })
  .refine(
    (values) => !values.quota || Number(values.quota) > 1,
    {
      message: 'Kuota harus lebih dari 1 kg',
      path: ['quota'],
    }
  );

export type OpenBatchFormValues = z.infer<typeof openBatchSchema>;