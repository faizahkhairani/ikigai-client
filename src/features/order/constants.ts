import type { OrderDatePreset, OrderStatus, OrderType, PaymentStatus } from './types';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

export const ORDER_PIPELINE: OrderStatus[] = [
  'WAITING',
  'ARRIVED_THAILAND',
  'ARRIVED_INDONESIA',
  'SORTING',
  'PACKING_QUEUE',
  'PACKING',
  'READY_TO_SHIP',
  'SHIPPED',
  'COMPLETED',
];

export const order_status_label: Record<OrderStatus, string> = {
  WAITING: 'Waiting',
  ARRIVED_THAILAND: 'Arrived Thailand',
  ARRIVED_INDONESIA: 'Arrived Indonesia',
  SORTING: 'Sorting',
  PACKING_QUEUE: 'Packing Queue',
  PACKING: 'Packing',
  READY_TO_SHIP: 'Ready to Ship',
  SHIPPED: 'Shipped',
  COMPLETED: 'Completed',
  ISSUE: 'Issue',
  CANCELLED: 'Cancelled',
};

export const order_status_variant: Record<OrderStatus, BadgeVariant> = {
  WAITING: 'secondary',
  ARRIVED_THAILAND: 'outline',
  ARRIVED_INDONESIA: 'outline',
  SORTING: 'outline',
  PACKING_QUEUE: 'outline',
  PACKING: 'outline',
  READY_TO_SHIP: 'outline',
  SHIPPED: 'outline',
  COMPLETED: 'default',
  ISSUE: 'destructive',
  CANCELLED: 'destructive',
};

export const order_date_options: { value: OrderDatePreset; label: string }[] = [
  { value: 'today', label: 'Hari ini' },
  { value: 'month', label: 'Bulan ini' },
];

export const payment_status_label: Record<PaymentStatus, string> = {
  unpaid: 'Belum bayar',
  dp: 'DP',
  lunas: 'Lunas',
};

export const payment_status_variant: Record<PaymentStatus, BadgeVariant> = {
  unpaid: 'destructive',
  dp: 'secondary',
  lunas: 'default',
};

export const order_type_label: Record<OrderType, string> = {
  sharing_bagasi: 'Sharing bagasi',
  wa: 'WhatsApp',
};

// Ubah { key: label } jadi [{ value, label }] buat dropdown. Urutan key = urutan pipeline.
const toOptions = <T extends string>(labels: Record<T, string>) =>
  (Object.keys(labels) as T[]).map((value) => ({ value, label: labels[value] }));

export const order_status_options = toOptions(order_status_label);
export const order_type_options = toOptions(order_type_label);
export const payment_status_options = toOptions(payment_status_label);