import { useMutation, useQueryClient } from '@tanstack/react-query';
import { customerService } from '../services/CustomerService';
import type { UpdateCustomerPayload } from '../types';

export const useCustomerActions = () => {
  const queryClient = useQueryClient();

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ['customers'] });
    queryClient.invalidateQueries({ queryKey: ['orders'] }); // nama dan no WA customer juga tampil di tabel order
  };

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateCustomerPayload }) =>
      customerService.update(id, payload),
    onSuccess: refresh,
  });

  const remove = useMutation({
    mutationFn: (id: string) => customerService.remove(id),
    onSuccess: refresh,
  });

  return { update, remove };
};