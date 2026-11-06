import type { OrderStatus, PaymentStatus } from '@/features/order/types';

export type DashboardActivity = {
  id: string;
  orderId: string;
  resi: string;
  fromStatus: OrderStatus | null; // kosong = order dibuat
  toStatus: OrderStatus;
  // isCorrection: boolean;
  changedAt: string;
  changedBy: string | null; // kosong = customer (form publik)
};

export type DashboardTodayOrder = {
  id: string;
  resi: string;
  customerName: string;
  itemCount: number;
  status: OrderStatus;
  createdAt: string;
};


export type DashboardSummary = {
  batch: { id: string; name: string; status: 'active' | 'closed'; startDate: string } | null;
  totalOrders: number;
  todayCount: number;
  heldCount: number;
  byStatus: Record<OrderStatus, number>;
  byPayment: Record<PaymentStatus, number>;
  recentActivity: DashboardActivity[];
  todayOrders: DashboardTodayOrder[];
};

