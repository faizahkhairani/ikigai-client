import { useEffect, useState } from 'react';
import TablePagination from '@/components/common/TablePagination';
import CustomerDetailDialog from '../components/CustomerDetailDialog';
import CustomerSearchBar from '../components/CustomerSearchBar';
import CustomerTable from '../components/CustomerTable';
import { useCustomers } from '../hooks/useCustomers';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import type { Customer } from '../types';
import EditCustomerDialog from '../components/EditCustomerDialog';
import DeleteCustomerDialog from '../components/DeleteCustumerDialog';

const PAGE_SIZE_OPTIONS = [10, 20, 50];
const DEFAULT_PAGE_SIZE = 20;

const CustomerPage = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deleteCustomer, setDeleteCustomer] = useState<Customer | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { customers, pagination, isLoading, isFetching, error } = useCustomers(
    search,
    page,
    pageSize
  );

  // Kalau hasil menyusut dan halaman sekarang melebihi total halaman, mundur ke halaman terakhir
  useEffect(() => {
    if (pagination && page > pagination.totalPages) setPage(pagination.totalPages);
  }, [pagination, page]);

  const handleSearch = (next: string) => {
    setSearch(next);
    setPage(1); // pencarian berubah, mulai dari halaman pertama
  };

  const handlePageSizeChange = (nextSize: number) => {
    setPageSize(nextSize);
    setPage(1);
  };

  const handleOpenDetail = (id: string) => {
    setDetailId(id);
    setIsDetailOpen(true);
  };

  if (error) return <p className="text-destructive">Gagal memuat customer.</p>;

  return (
  <div className="space-y-3">
    <PageHeader
      title="Customer Management"
      description="Informasi customer dan riwayat pemesanan."
    />

    <Card className="gap-0 overflow-hidden rounded-xl border-slate-200 py-0 shadow-sm">
      <CardContent className="flex flex-col gap-0 p-0">
        {/* Search */}
        <div className="border-b border-slate-100 px-4 py-4 sm:px-5">
          <CustomerSearchBar
            value={search}
            onApply={handleSearch}
          />
        </div>

        {/* Table */}
        <CustomerTable
          customers={customers}
          isLoading={isLoading || isFetching}
          skeletonRows={Math.min(pageSize, 10)}
          onRowClick={handleOpenDetail}
          onEdit={(customer) => {
            setEditCustomer(customer);
            setIsEditOpen(true);
          }}
          onDelete={(customer) => {
            setDeleteCustomer(customer);
            setIsDeleteOpen(true);
          }}
        />

        {/* Pagination */}
        <div className="border-t border-slate-100 px-4 py-3 sm:px-5">
          <TablePagination
            pagination={pagination}
            isFetching={isFetching}
            itemLabel="customer"
            pageSizeOptions={PAGE_SIZE_OPTIONS}
            onPageChange={setPage}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      </CardContent>
    </Card>

    <CustomerDetailDialog
      customerId={detailId}
      open={isDetailOpen}
      onOpenChange={setIsDetailOpen}
    />
    <EditCustomerDialog 
    customer={editCustomer} 
    open={isEditOpen} 
    onOpenChange={setIsEditOpen} 
    />
    <DeleteCustomerDialog 
    customer={deleteCustomer} 
    open={isDeleteOpen} 
    onOpenChange={setIsDeleteOpen} 
    />
  </div>
);
};

export default CustomerPage;