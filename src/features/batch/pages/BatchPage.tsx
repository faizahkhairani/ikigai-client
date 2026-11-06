import BatchTable from "../components/BatchTable"
import { useBatches } from "../hooks/useBatch";
import PageHeader from "@/components/PageHeader";
import OpenBatchDialog from '../components/OpenBatchDialog';
import { toast } from "@/components/ui/toast";

const BatchPage = () => {
  const { batches, isLoading, error, openBatch, closeBatch, reopenBatch, activeBatch } = useBatches();

   const handleClose = (id: string) => {
    closeBatch.mutate(id, {
      onSuccess: () =>
        toast.add({
          type: 'success',
          description: 'Batch berhasil ditutup. Form publik tidak menerima order baru.',
        }),
      onError: (err: any) =>
        toast.add({
          type: 'error',
          description: err.response?.data?.error ?? 'Gagal menutup batch',
          priority: 'high',
        }),
    });
  };

  const handleReopen = (id: string) => {
    reopenBatch.mutate(id, {
      onSuccess: () =>
        toast.add({ type: 'success', description: 'Batch dibuka kembali dan siap menerima order.' }),
      onError: (err: any) =>
        toast.add({
          type: 'error',
          description: err.response?.data?.error ?? 'Gagal membuka batch',
          priority: 'high',
        }),
    });
  };

   if (error) return <p className="text-destructive">Gagal memuat batch.</p>;

  return (
    <div>
      <div className="flex justify-between gap-3">
        <PageHeader
        title="Batch Management" 
        description="Kelola batch pengiriman dan periode order."
        />
        <OpenBatchDialog
          disabled={isLoading}
          onSubmit={openBatch.mutateAsync}
        />

      </div>
        <BatchTable
          batches={batches}
          isLoading={isLoading}
          isClosing={closeBatch.isPending}
          onClose={handleClose}
          canReopen={!activeBatch}
          reopeningId={reopenBatch.isPending ? (reopenBatch.variables ?? null) : null}
          onReopen={handleReopen}
        />
    </div>
  )
}

export default BatchPage