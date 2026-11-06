import { useMutation } from '@tanstack/react-query';
import { publicOrderService } from '../services/PublicOrderService';

export const useSubmitPublicOrder = () =>
  useMutation({ mutationFn: publicOrderService.submit });