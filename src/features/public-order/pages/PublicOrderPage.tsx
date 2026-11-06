import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import OrderSuccess from '../components/OrderSuccess';
import PublicOrderForm from '../components/PublicOrderForm';
import { useOrderAvailability } from '../hooks/useOrderAvailability';
import { useSubmitPublicOrder } from '../hooks/useSubmitPublicOrder';

const PublicOrderPage = () => {
  const [trackingToken, setTrackingToken] = useState<string | null>(null);
  const { data: availability, isLoading, error } = useOrderAvailability();
  const submit = useSubmitPublicOrder();

  if (trackingToken) {
    return <OrderSuccess trackingToken={trackingToken} onNewOrder={() => setTrackingToken(null)} />;
  }

  return (
    <div className="flex flex-col gap-6">

      {isLoading && (
        <div className="flex flex-col gap-4">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      )}

      {error && (
        <p className="text-sm text-destructive">Gagal memuat form. Coba muat ulang halaman.</p>
      )}

      {availability && !availability.isOpen && (
        <div className="rounded-md border p-4 text-sm">
          Batch titipan sedang ditutup. Pantau info batch berikutnya lewat WhatsApp kami.
        </div>
      )}

      {availability?.isOpen && (
        <>
          {/* <p className="text-sm text-muted-foreground">Batch aktif: {availability.batchName}</p> */}
          <PublicOrderForm onSubmit={submit.mutateAsync} onSuccess={setTrackingToken} />
        </>
      )}
    </div>
  );
};

export default PublicOrderPage;