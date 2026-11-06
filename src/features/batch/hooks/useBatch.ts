import { batchService } from "../services/BatchService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const batchKey = ['batches']

export const useBatches = () => {
    const queryClient = useQueryClient();

    // ambil daftar batch
  const { data: batches = [], isLoading, error } = useQuery({
    queryKey: batchKey,
    queryFn: batchService.list,
  });

  // Query otomatis fetch ulang
  const refreshBatches = () => queryClient.invalidateQueries({ queryKey: batchKey });

  // buka batch baru
  const openBatch = useMutation({
    mutationFn: batchService.open,
    onSuccess: refreshBatches,
  });

  // tutup batch
  const closeBatch = useMutation({
    mutationFn: batchService.close,
    onSuccess: refreshBatches,
  });

  const reopenBatch = useMutation({
  mutationFn: batchService.reopen,
  onSuccess: refreshBatches,
});

  const activeBatch = batches.find((b) => b.status === 'active') ?? null;

  return { batches, activeBatch, isLoading, error, openBatch, closeBatch, reopenBatch };
}

// useMutation -> pemanggilan API