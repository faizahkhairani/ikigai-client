import { useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '../services/OrderService';
import type { OrderStatus, PaymentStatus } from '../types';

export const useBulkOrderActions = () => {
  const queryClient = useQueryClient();
  const refreshOrders = () => queryClient.invalidateQueries({ queryKey: ['orders'] });

  const bulkStatus = useMutation({
    mutationFn: ({ orderIds, status }: { orderIds: string[]; status: OrderStatus }) =>
      orderService.bulkUpdateStatus(orderIds, status),
    onSettled: refreshOrders,
  });

  const bulkPayment = useMutation({
    mutationFn: ({
      orderIds,
      paymentStatus,
    }: {
      orderIds: string[];
      paymentStatus: PaymentStatus;
    }) => orderService.bulkUpdatePaymentStatus(orderIds, paymentStatus),
    onSettled: refreshOrders,
  });

  return { bulkStatus, bulkPayment };
};