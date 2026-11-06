import { useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '../services/OrderService';

export const usePhotoActions = () => {
  const queryClient = useQueryClient();
  const refreshOrders = () => queryClient.invalidateQueries({ queryKey: ['orders'] });

  const deleteProof = useMutation({
    mutationFn: ({ orderId, imageId }: { orderId: string; imageId: string }) =>
      orderService.deleteProofImage(orderId, imageId),
    onSettled: refreshOrders,
  });

  const replaceResi = useMutation({
    mutationFn: ({ orderId, image }: { orderId: string; image: File }) =>
      orderService.replaceResiImage(orderId, image),
    onSettled: refreshOrders,
  });

  return { deleteProof, replaceResi };
};