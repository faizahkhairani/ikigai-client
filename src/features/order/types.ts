import type { Pagination } from '@/types/types';

export type OrderStatus =
  | 'WAITING'
  | 'ARRIVED_THAILAND'
  | 'ARRIVED_INDONESIA'
  | 'SORTING'
  | 'PACKING_QUEUE'
  | 'PACKING'
  | 'READY_TO_SHIP'
  | 'SHIPPED'
  | 'COMPLETED'
  | 'ISSUE'
  | 'CANCELLED';

export type PaymentStatus = 'unpaid' | 'dp' | 'lunas';
export type OrderType = 'sharing_bagasi' | 'wa';

export type OrderItem = {
  id: string;
  name: string;
  qty: number;
  note: string | null;
};

export type Order = {
  id: string;
  trackingToken: string;
  resiThailand: string;
  orderType: OrderType;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  isHeld: boolean;
  holdReason: string | null;
  createdAt: string;
  customer: { id: string; name: string; phone: string };
  batch: { id: string; name: string };
  items: OrderItem[];
  resiImageUrl: string | null;
};

export type OrderDatePreset = 'today' | 'month';


export type OrderFilters = {
  batchId?: string;
  status?: OrderStatus;
  orderType?: OrderType;
  search?: string;
  date?: OrderDatePreset;
};

export type BulkResult = {
  updatedCount: number;
  failed: { orderId: string; error: string }[];
};

export type CreateManualOrderPayload = {
  name: string;
  phone: string;
  resiThailand: string;
  batchId?: string;
  items: { name: string; qty: number; note?: string }[];
};

export type OrderStatusLog = {
  id: string;
  fromStatus: OrderStatus | null; // kosong = entri "order dibuat"
  toStatus: OrderStatus;
  changedAt: string;
  changedBy: { name: string } | null; // kosong = customer (form publik)
  isCorrection: boolean;
};

export type ProofImage = {
  id: string;
  imageUrl: string;
  uploadedAt: string;
  uploadedBy: { name: string };
};

export type OrderDetail = Order & {
  customer: { address: string | null };
  statusLogs: OrderStatusLog[];
  proofImages: ProofImage[];
  correctionTarget: OrderStatus | null;
};

export type UploadProofResult = {
  imageUrl: string;
  statusFailed: boolean;
};

export type OrderListResult = {
  orders: Order[];
  pagination: Pagination;
};