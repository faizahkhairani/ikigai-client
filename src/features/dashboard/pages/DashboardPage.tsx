import { useState } from 'react';
import { useBatches } from '@/features/batch/hooks/useBatch';
import OptionSelect from '@/features/order/components/OptionSelect';
import DashboardSkeleton from '../components/DashboardSkeleton';
import PaymentSummaryCard from '../components/PaymentSummaryCard';
import StatCard from '../components/StatCard';
import StatusPipelineCard from '../components/StatusPipelineCard';
import { useDashboard } from '../hooks/useDashboard';
import { useAuthStore } from '@/features/auth/store'
import { Package, CalendarCheck, PauseCircle, AlertTriangle, Layers } from 'lucide-react';
import { cn } from "cn"
import TodayOrdersCard from '../components/TodayOrdersCard';

const DashboardPage = () => {
  const { profile } = useAuthStore();
  const [batchId, setBatchId] = useState<string | undefined>(undefined);

  const { batches } = useBatches(); // untuk pilihan batch, diambil dari cache
  const { data, isLoading, isFetching, error } = useDashboard(batchId);

  if (error) return <p className="text-destructive">Gagal memuat dashboard.</p>;

  const showSkeleton = isLoading || isFetching;

  return (
    <div className="flex flex-col gap-5">
      <div>
      <div className="flex items-center">
        <h1 className="text-2xl font-black">Welcome back, {profile?.name}!</h1>
        <img
          src="/domiia.svg"
          alt="Welcome illustration"
          className="h-10 w-10 object-contain"
        />
      </div>
      <p className="text-sm text-slate-500">
        Berikut ringkasan aktivitas order terbaru.
      </p> 
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        {data?.batch && !showSkeleton ? (
          <span className="inline-flex items-center gap-2 rounded-full bg-pastel-blue-soft px-3.5 py-1.5 text-xs font-medium text-pastel-blue-text">
            <span
              className={cn(
                'size-1.5 rounded-full',
                data.batch.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'
              )}
            />
            {data.batch.name} · {data.batch.status === 'active' ? 'Aktif' : 'Ditutup'}
          </span>
        ) : (
          <span />
        )}

        <OptionSelect
          className="w-64"
          emptyLabel="Pilih batch..."
          value={batchId}
          options={batches.map((batch) => ({
            value: batch.id,
            label:
              batch.status === 'closed'
                ? `${batch.name} · Ditutup`
                : `${batch.name} · Aktif`,
          }))}
          onChange={setBatchId}
        />
      </div>

      {showSkeleton && <DashboardSkeleton />}

      {!showSkeleton && data && !data.batch && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-pastel-blue-dark/40 bg-pastel-blue/60 p-10 text-center">
          <div className="flex size-11 items-center justify-center rounded-xl bg-pastel-blue-soft text-pastel-blue-text">
            <Layers className="size-5" />
          </div>
          <p className="max-w-sm text-sm text-slate-600">
            Belum ada batch. Buka batch di halaman Batch untuk mulai menerima order.
          </p>
        </div>
      )}

      {!showSkeleton && data?.batch && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Total order" value={data.totalOrders} tone="blue" icon={Package} />
            <StatCard title="Masuk hari ini" value={data.todayCount} hint="Sejak 00.00 WIB" tone="mint" icon={CalendarCheck} />
            <StatCard title="Hold" value={data.heldCount} hint="Menunggu pelunasan" tone="amber" icon={PauseCircle} />
            <StatCard title="Issue" value={data.byStatus.ISSUE} hint="Perlu ditangani" tone="pink" icon={AlertTriangle} />
          </div>

          <div className="grid gap-4 lg:grid-cols-3 lg:items-start">
            <div className="lg:col-span-2">
              <StatusPipelineCard byStatus={data.byStatus} />
            </div>
            <div className="flex flex-col gap-3">
            <PaymentSummaryCard byPayment={data.byPayment} />
            <TodayOrdersCard orders={data.todayOrders} total={data.todayCount} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;