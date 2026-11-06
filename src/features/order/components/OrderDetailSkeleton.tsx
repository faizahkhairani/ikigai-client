import { Skeleton } from '@/components/ui/skeleton';

const OrderDetailSkeleton = () => (
  <div className="flex flex-col gap-4">
    <Skeleton className="h-6 w-56" />
    <Skeleton className="h-14 w-full" />
    <div className="grid gap-4 sm:grid-cols-2">
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
    <Skeleton className="h-16 w-full" />
  </div>
);

export default OrderDetailSkeleton;