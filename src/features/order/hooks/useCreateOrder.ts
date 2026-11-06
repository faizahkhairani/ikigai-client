import { useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '../services/OrderService';

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: orderService.createManual,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] }), // tabel refetch otomatis
  });
};