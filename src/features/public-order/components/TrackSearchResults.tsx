import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { order_status_label, order_status_variant } from '@/features/order/constants';
import { formatDate } from '@/lib/format';
import type { TrackedOrderSummary } from '../types';

type Props = {
  orders: TrackedOrderSummary[];
  isLoading: boolean;
};

const TrackSearchResults = ({ orders, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Tidak ada order ditemukan. Cek lagi no resi atau no WhatsApp-nya.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {orders.map((order) => (
        <li key={order.trackingToken}>
          <Link
            to={`/track/${order.trackingToken}`}
            className="flex items-center justify-between gap-3 rounded-md border bg-white p-3 hover:bg-muted/50"
          >
            <div className="flex flex-col gap-1">
              <span className="font-mono text-sm">{order.resiThailand}</span>
              <span className="text-xs text-muted-foreground">
                {order._count.items} barang · {formatDate(order.createdAt)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={order_status_variant[order.status]}>
                {order_status_label[order.status]}
              </Badge>
              <ChevronRight className="size-4 text-muted-foreground" />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default TrackSearchResults;