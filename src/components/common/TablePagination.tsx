import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import type { Pagination } from '@/types/types';

type Props = {
  pagination: Pagination | null; // null = data pertama belum datang
  isFetching: boolean;
  itemLabel: string; // "order", "customer", dst
  pageSizeOptions: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};

const TablePagination = ({
  pagination,
  isFetching,
  itemLabel,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
}: Props) => {
  if (!pagination) return <Skeleton className="h-8 w-full" />;

  const { page, pageSize, total, totalPages } = pagination;
  if (total === 0) return null; // tabelnya sendiri sudah nampilin "tidak ada data"

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const pageSizeItems = pageSizeOptions.map((size) => ({
    value: String(size),
    label: String(size),
  }));

  
return (
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    {/* Showing information */}
    <div className="flex flex-wrap items-center gap-1.5 text-sm">
      <span className="text-slate-500">
        Menampilkan
      </span>
      <span className="font-medium tabular-nums text-slate-700">
        {from}–{to}
      </span>
      <span className="text-slate-500">dari</span>
      <span className="font-medium tabular-nums text-slate-700">
        {total}
      </span>
      <span className="text-slate-500">{itemLabel}</span>
    </div>

    {/* Pagination controls */}
    <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end">
      {/* Page size */}
      <div className="flex items-center gap-2">
        <span className="whitespace-nowrap text-xs text-slate-500">
          Baris per halaman
        </span>

        <Select
          items={pageSizeItems}
          value={String(pageSize)}
          onValueChange={(next) =>
            next && onPageSizeChange(Number(next))
          }
        >
          <SelectTrigger className="h-8 w-17 rounded-lg border-slate-200 bg-white text-xs shadow-none">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {pageSizeItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="hidden h-5 w-px bg-slate-200 sm:block" />

      {/* Page navigation */}
      <div className="flex items-center gap-2">
        <span className="whitespace-nowrap text-xs text-slate-500">
          Halaman{" "}
          <span className="font-medium text-slate-700">{page}</span>
          {" "}dari{" "}
          <span className="font-medium text-slate-700">{totalPages}</span>
        </span>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="size-8 rounded-lg border-slate-200 shadow-none"
            disabled={page <= 1 || isFetching}
            onClick={() => onPageChange(page - 1)}
            aria-label="Halaman sebelumnya"
          >
            <ChevronLeft className="size-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="size-8 rounded-lg border-slate-200 shadow-none"
            disabled={page >= totalPages || isFetching}
            onClick={() => onPageChange(page + 1)}
            aria-label="Halaman berikutnya"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
);

};

export default TablePagination;