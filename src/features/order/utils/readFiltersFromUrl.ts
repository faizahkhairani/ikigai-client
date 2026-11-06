import { order_date_options, order_status_options } from '../constants';
import type { OrderFilters } from '../types';

// Filter awal dari URL, misal /admin/orders?date=today&batchId=abc
// (dipakai tombol "Lihat semua" di dashboard). Nilai yang tidak dikenal diabaikan.
export const readFiltersFromUrl = (params: URLSearchParams): OrderFilters => ({
  batchId: params.get('batchId') || undefined,
  status: order_status_options.find((option) => option.value === params.get('status'))?.value,
  date: order_date_options.find((option) => option.value === params.get('date'))?.value,
});