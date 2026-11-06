import { useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '../services/OrderService';

export const useUploadProof = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, image }: { orderId: string; image: File }) =>
    orderService.uploadProof(orderId, image),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['orders'] }), // list dan detail refetch
  });
};