import type { OrderStatus, PaymentStatus } from '@/features/order/types';
import type { Pagination } from '@/types/types';

export type Customer = {
  id: string;
  name: string;
  phone: string;
  address: string | null;
  createdAt: string;
  _count: { orders: number };
  orders: { createdAt: string }[]; // cuma order terbaru (maks 1)
};

export type CustomerListResult = {
  customers: Customer[];
  pagination: Pagination;
};

export type CustomerOrder = {
  id: string;
  resiThailand: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  batch: { name: string };
  _count: { items: number };
};

export type CustomerDetail = {
  id: string;
  name: string;
  phone: string;
  address: string | null;
  createdAt: string;
  orders: CustomerOrder[];
};

export type UpdateCustomerPayload = {
  name: string;
  phone: string;
  address: string;
};