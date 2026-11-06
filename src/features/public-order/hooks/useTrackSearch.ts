import { useQuery } from '@tanstack/react-query';
import { trackService } from '../services/TrackService';
import type { TrackSearchQuery } from '../types';

export const useTrackSearch = (query: TrackSearchQuery | null) =>
  useQuery({
    queryKey: ['track-search', query],
    queryFn: () => trackService.search(query as TrackSearchQuery),
    enabled: !!query, // belum ada yang dicari = jangan fetch
  });