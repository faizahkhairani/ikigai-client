import { useQuery } from '@tanstack/react-query';
import { trackService } from '../services/TrackService';

export const useTrackedOrder = (token: string) =>
  useQuery({
    queryKey: ['track', token],
    queryFn: () => trackService.getByToken(token),
    enabled: !!token,
  });