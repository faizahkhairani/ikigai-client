import { useState } from 'react';
import type { RowSelectionState } from '@tanstack/react-table';
import { useBatches } from '@/features/batch/hooks/useBatch';
import OrderBulkActionBar from '../components/OrderBulkActionBar';
import OrderFilterBar from '../components/OrderFilterBar';
import OrderTable from '../components/OrderTable';
import { useBulkOrderActions } from '../hooks/useBulkOrderActions';
import { useOrders } from '../hooks/useOrders';
import type { OrderFilters, OrderStatus, PaymentStatus } from '../types';
import { Card, CardContent } from '@/components/ui/card';
import PageHeader from '@/components/PageHeader';
import { notifyBulkResult } from '../utils/notifyBulkResult';
import { toast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import OpenOrderDialog from '../components/OpenOrderDialog';
import { useCreateOrder } from '../hooks/useCreateOrder';
import OrderDetailDialog from '../components/OrderDetailDialog';
import TablePagination from '@/components/common/TablePagination';
import { useSearchParams } from 'react-router-dom';
import { readFiltersFromUrl } from '../utils/readFiltersFromUrl';
import { useEffect } from 'react';

const PAGE_SIZE_OPTIONS = [10, 20, 50];
const DEFAULT_PAGE_SIZE = 20;

const OrderPage = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<OrderFilters>(() => readFiltersFromUrl(searchParams));   
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [detailOrderId, setDetailOrderId] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const { batches } = useBatches();
  const { orders, pagination, isLoading, isFetching, error } = useOrders(filters, page, pageSize);
  const { bulkStatus, bulkPayment } = useBulkOrderActions();
  const createOrder = useCreateOrder();

  // Cuma order yang lagi tampil yang dihitung, id "sisa" dari filter lama diabaikan
  const selectedIds = orders.filter((order) => rowSelection[order.id]).map((order) => order.id);

  // Hasil filter bisa menyusut (misal setelah bulk update). Kalau halaman sekarang
  // jadi melebihi total halaman, mundur ke halaman terakhir.
  useEffect(() => {
    if (pagination && page > pagination.totalPages) {
      setPage(pagination.totalPages);
      setRowSelection({});
    }
  }, [pagination, page]);

  const handleApplyFilters = (next: OrderFilters) => {
    setFilters(next);
    setRowSelection({}); // filter berubah, pilihan lama jangan kebawa
  };

  const handleOpenDetail = (id: string) => {
    setDetailOrderId(id);
    setIsDetailOpen(true);
  };

   const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    setRowSelection({}); // aksi massal cuma berlaku untuk baris di halaman yang tampil
  };

  const handlePageSizeChange = (nextSize: number) => {
    setPageSize(nextSize);
    setPage(1);
    setRowSelection({});
  };

  const handleBulkStatus = (status: OrderStatus) =>
    bulkStatus.mutate(
      { orderIds: selectedIds, status },
      {
        onSuccess: (result) => {
          notifyBulkResult(result, orders, 'diubah statusnya');
          setRowSelection({});
        },
        onError: (err: any) =>
          toast.add({
            type: 'error',
            description: err.response?.data?.error ?? 'Gagal mengubah status',
            priority: 'high',
          }),
      }
    );

  const handleBulkPayment = (paymentStatus: PaymentStatus) =>
    bulkPayment.mutate(
      { orderIds: selectedIds, paymentStatus },
      {
        onSuccess: (result) => {
          notifyBulkResult(result, orders, 'diubah status pembayarannya');
          setRowSelection({});
        },
        onError: (err: any) =>
          toast.add({
            type: 'error',
            description: err.response?.data?.error ?? 'Gagal mengubah pembayaran',
            priority: 'high',
          }),
      }
    );

  if (error) return <p className="text-destructive">Gagal memuat order.</p>;

 return (
  <div className="space-y-3">
    {/* Page Header */}
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <PageHeader
        title="Order Management"
        description="Informasi dan pengelolaan pesanan barang."
      />

      <div className="flex shrink-0 items-center gap-2">
        <Button
          variant="white"
          className="text-sm py-5 px-6"
        >
          <Download className="size-4" />
          Download CSV
        </Button>

        <OpenOrderDialog batches={batches} onSubmit={createOrder.mutateAsync} />
      </div>
    </div>

    {/* Order Table Card */}
    <Card className="gap-0 overflow-hidden rounded-lg border-slate-200 py-0 shadow-sm">
      <CardContent className="flex flex-col gap-0 p-0">
        <div className="border-b border-slate-100 px-4 py-4 sm:px-5">
          <OrderFilterBar
            filters={filters}
            batches={batches}
            onApply={handleApplyFilters}
          />
        </div>

        {selectedIds.length > 0 && (
          <div className="border-b border-slate-100 px-4 py-3 sm:px-5">
            <OrderBulkActionBar
              selectedCount={selectedIds.length}
              isPending={bulkStatus.isPending || bulkPayment.isPending}
              onChangeStatus={handleBulkStatus}
              onChangePayment={handleBulkPayment}
              onClear={() => setRowSelection({})}
            />
          </div>
        )}

        <OrderTable
          orders={orders}
          isLoading={isLoading || isFetching}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
          onRowClick={handleOpenDetail}
        />

        <div className="border-t border-slate-100 px-4 py-3 sm:px-5">
          <TablePagination
            pagination={pagination}
            isFetching={isFetching}
            itemLabel="order"
            pageSizeOptions={PAGE_SIZE_OPTIONS}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      </CardContent>
    </Card>
    <OrderDetailDialog
      orderId={detailOrderId}
      open={isDetailOpen}
      onOpenChange={setIsDetailOpen}
      onSuccess={() => setIsDetailOpen(false)}
    />
  </div>
)
};

export default OrderPage;