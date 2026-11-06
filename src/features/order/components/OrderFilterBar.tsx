import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Batch } from '@/features/batch/type';
import { order_status_options, order_type_options, order_date_options } from '../constants';
import type { OrderFilters } from '../types';
import OptionSelect from './OptionSelect';
import { RotateCcw, Search } from 'lucide-react';

// Dua set filter dianggap sama kalau semua field-nya sama.
// Dipakai buat nonaktifin tombol "Terapkan" saat belum ada yang berubah.
const isSameFilters = (a: OrderFilters, b: OrderFilters) =>
  (a.search || undefined) === (b.search || undefined) &&
  a.batchId === b.batchId &&
  a.status === b.status &&
  a.date === b.date &&
  a.orderType === b.orderType;

type Props = {
  filters: OrderFilters; // filter yang sedang diterapkan
  batches: Batch[];
  onApply: (filters: OrderFilters) => void;
};

const OrderFilterBar = ({ filters, batches, onApply }: Props) => {
  const [draft, setDraft] = useState<OrderFilters>(filters);

  const updateDraft = (patch: Partial<OrderFilters>) =>
    setDraft((prev) => ({ ...prev, ...patch }));

  const isDirty = !isSameFilters(draft, filters);
  const hasAnyFilter = Object.values(draft).some(Boolean) || Object.values(filters).some(Boolean);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Enter di kotak search juga masuk ke sini
    onApply({ ...draft, search: draft.search?.trim() || undefined });
  };

  const handleReset = () => {
    setDraft({});
    onApply({});
  };

  return (
<form
   onSubmit={handleSubmit}
   className="flex flex-col gap-3 lg:flex-row lg:items-center"
 >
{/* Search */}
<div className="relative w-full lg:max-w-xs lg:flex-1">
<Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

    <Input
      className="h-9 w-full rounded-md border-slate-200 bg-white pl-9 text-sm shadow-none placeholder:text-slate-400 focus-visible:border-blue-400 focus-visible:ring-2 focus-visible:ring-blue-100"
      placeholder="Cari resi, nama, atau no. WA"
      value={draft.search ?? ''}
      onChange={(e) =>
        updateDraft({ search: e.target.value || undefined })
      }
    />
  </div>

  {/* Filters and actions */}
  <div className="flex flex-wrap items-center gap-2 lg:ml-auto">
    <OptionSelect
      emptyLabel="Semua Batch"
      value={draft.batchId}
      options={batches.map((batch) => ({
        value: batch.id,
        label: batch.name,
      }))}
      onChange={(batchId) => updateDraft({ batchId })}
    />

    <OptionSelect
      emptyLabel="Semua tanggal"
      value={draft.date}
      options={order_date_options}
      onChange={(date) => updateDraft({ date })}
    />

    <OptionSelect
      emptyLabel="Semua status"
      value={draft.status}
      options={order_status_options}
      onChange={(status) => updateDraft({ status })}
    />

    <OptionSelect
      emptyLabel="Semua tipe"
      value={draft.orderType}
      options={order_type_options}
      onChange={(orderType) => updateDraft({ orderType })}
    />

    <Button
      type="submit"
      size="sm"
      disabled={!isDirty}
      className="h-9 rounded-md bg-pastel-blue-dark px-4 text-sm font-medium text-white shadow-none hover:bg-blue-600 disabled:bg-slate-100 disabled:text-slate-400"
    >
      Terapkan
    </Button>

    {hasAnyFilter && (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={handleReset}
        className="h-9 gap-1.5 px-2 text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-700"
      >
        <RotateCcw className="size-3.5" />
        Reset
      </Button>
    )}
  </div>
</form>

)
};

export default OrderFilterBar;