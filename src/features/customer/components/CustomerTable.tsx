import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/lib/format';
import type { Customer } from '../types';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

type Props = {
  customers: Customer[];
  isLoading: boolean; // true = tampilkan skeleton
  skeletonRows?: number;
  onRowClick: (id: string) => void;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
};

const CustomerTable = ({
  customers,
  isLoading,
  skeletonRows = 6,
  onRowClick,
  onEdit,
  onDelete
}: Props) => (
  <div className="w-full overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow className="bg-slate-50/70 hover:bg-slate-50/70">
          <TableHead className="h-11 pl-5 text-sm font-medium text-slate-900">Nama</TableHead>
          <TableHead className="text-sm font-medium text-slate-900">No WA</TableHead>
          <TableHead className="text-sm font-medium text-slate-900">Jumlah Order</TableHead>
          <TableHead className="text-sm font-medium text-slate-900">Order Terakhir</TableHead>
          <TableHead className="w-28 text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading &&
          Array.from({ length: skeletonRows }).map((_, index) => (
            <TableRow key={index}>
              <TableCell className="py-4 pl-5">
                <Skeleton className="h-4 w-36" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-10" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="ml-auto h-8 w-16" />
              </TableCell>
            </TableRow>
          ))}

        {!isLoading && customers.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={5}
              className="h-24 text-center text-muted-foreground"
            >
              Tidak ada customer yang cocok.
            </TableCell>
          </TableRow>
        )}

        {!isLoading &&
          customers.map((customer) => (
            <TableRow
              key={customer.id}
              onClick={() => onRowClick(customer.id)}
              className="cursor-pointer transition-colors hover:bg-slate-50/70"
            >
              <TableCell className="py-4 pl-5 font-medium text-slate-700">
                {customer.name}
              </TableCell>

              <TableCell>{customer.phone}</TableCell>

              <TableCell>
                {customer._count.orders}
              </TableCell>

              <TableCell>
                {formatDate(customer.orders[0]?.createdAt ?? null)}
              </TableCell>

              {/* setPropagation supaya detail order ga keklik ketika tombol aksi di klik */}
              <TableCell className="text-right" onClick={(e) => e.stopPropagation()}> 
                <div className="flex justify-end gap-1">
                  <Button variant="ghost" size="icon" aria-label="Edit customer" onClick={() => onEdit(customer)}>
                    <Pencil />
                  </Button>
                  <span
                    title={
                      customer._count.orders > 0
                        ? `Punya ${customer._count.orders} order, tidak bisa dihapus`
                        : 'Hapus customer'
                    }
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Hapus customer"
                      disabled={customer._count.orders > 0}
                      onClick={() => onDelete(customer)}
                    >
                      <Trash2 />
                    </Button>
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </div>
);

export default CustomerTable;