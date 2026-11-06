import { Link, useParams } from 'react-router-dom';
import OrderDetailSkeleton from '@/features/order/components/OrderDetailSkeleton';
import TrackedOrderCard from '../components/TrackedOrderCard';
import { useTrackedOrder } from '../hooks/useTrackedOrder';
import { ArrowLeft } from 'lucide-react';

const TrackDetailPage = () => {
  const { token = '' } = useParams();
  const { data: order, isLoading } = useTrackedOrder(token);

  if (isLoading) {
    return (
      <div className="rounded-lg border bg-background p-5">
        <OrderDetailSkeleton />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-destructive">Order tidak ditemukan.</p>
        <Link to="/track" className="text-sm underline">
          Cari order lewat no resi atau no WhatsApp
        </Link>
      </div>
    );
  }

  return (
  <div className="flex flex-col gap-5">
    <Link
      to="/track"
      className="group inline-flex items-center gap-2 self-start text-sm font-medium text-stone-500 transition-colors hover:text-stone-900"
    >
      <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
      Cari order lainnya
    </Link>

    <TrackedOrderCard order={order} />
  </div>
);
};

export default TrackDetailPage;