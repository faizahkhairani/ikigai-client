import { Skeleton } from '@/components/ui/skeleton';

const DashboardSkeleton = () => (
  <div className="flex flex-col gap-6">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-28 w-full" />
      ))}
    </div>
    <div className="grid gap-4 lg:grid-cols-3">
      <Skeleton className="h-80 w-full lg:col-span-2" />
      <Skeleton className="h-80 w-full" />
    </div>
  </div>
);

export default DashboardSkeleton;