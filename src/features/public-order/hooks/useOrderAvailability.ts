import { useQuery } from '@tanstack/react-query';
import { publicOrderService } from '../services/PublicOrderService';

export const useOrderAvailability = () =>
  useQuery({
    queryKey: ['order-availability'],
    queryFn: publicOrderService.getAvailability,
  });