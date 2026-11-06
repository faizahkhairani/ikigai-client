// hooks/useCustomerDetail.ts
import { useQuery } from '@tanstack/react-query';
import { customerService } from '../services/CustomerService';

export const useCustomerDetail = (id: string | null) =>
  useQuery({
    queryKey: ['customers', 'detail', id],
    queryFn: () => customerService.getById(id as string),
    enabled: !!id, // dialog belum dibuka = jangan fetch
  });