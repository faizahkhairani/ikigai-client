import { useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '../services/OrderService';

export const useCorrectStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) => orderService.correctStatus(orderId),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['orders'] }), // dialog dan tabel refetch
  });
};