import type { OrderStatus, PaymentStatus } from '@/features/order/types'; 

export type TrackedOrder = {
  trackingToken: string;
  resiThailand: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  isHeld: boolean;
  holdReason: string | null;
  createdAt: string;
  customer: { name: string };
  items: { id: string; name: string; qty: number; note: string | null }[];
  statusLogs: { toStatus: OrderStatus; changedAt: string }[];
  proofImages: { id: string; imageUrl: string }[];
};

export type TrackedOrderSummary = {
  trackingToken: string;
  resiThailand: string;
  status: OrderStatus;
  createdAt: string;
  _count: { items: number };
};

export type TrackSearchQuery = { resi: string } | { phone: string };

export type OrderAvailability = {
  isOpen: boolean;
  batchName: string | null;
};

export type SubmitPublicOrderPayload = {
  name: string;
  phone: string;
  resiThailand: string;
  image: File;
  items: { name: string; qty: number; note?: string }[];
};

export type SubmitPublicOrderResult = {
  trackingToken: string;
};