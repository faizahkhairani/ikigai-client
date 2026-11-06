import { useQuery } from '@tanstack/react-query';
import { orderService } from '../services/OrderService';

export const useOrderDetail = (id: string | null) =>
  useQuery({
    queryKey: ['orders', 'detail', id], // diawali 'orders', jadi ikut ke-refresh pas invalidate ['orders']
    queryFn: () => orderService.getById(id as string),
    enabled: !!id, // jalan kalo id nya ada
  });