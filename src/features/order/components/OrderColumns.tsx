import type { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { formatDate } from '@/lib/format';
import {
    order_status_label,
    order_status_variant,
    payment_status_label,
    payment_status_variant,
    order_type_label
} from '../constants';
import type { Order } from '../types';

export const orderColumns: ColumnDef<Order>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        indeterminate={table.getIsSomeRowsSelected()}
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        aria-label="Pilih semua"
      />
    ),
    cell: ({ row }) => (
      <div className="-m-2 p-2" onClick={(e) => e.stopPropagation()}>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Pilih baris"
        />
      </div>
    ),
  },
  {
  accessorKey: 'resiThailand',
  header: 'Resi',
  cell: ({ row }) => <span className="font-mono text-xs">{row.original.resiThailand}</span>,
},
  {
    id: 'customer',
    header: 'Customer',
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.customer.name}</span>
        <span className="text-xs text-muted-foreground">{row.original.customer.phone}</span>
      </div>
    ),
  },
  {
    id: 'batch',
    header: 'Batch',
    cell: ({ row }) => row.original.batch.name,
  },
  {
    accessorKey: 'orderType',
    header: 'Tipe',
    cell: ({ row }) => <Badge variant="outline">{order_type_label[row.original.orderType]}</Badge>,
  },
  {
    id: 'items',
    header: 'Barang',
    cell: ({ row }) => `${row.original.items.length} barang`,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Badge variant={order_status_variant[row.original.status]}>
          {order_status_label[row.original.status]}
        </Badge>
        {row.original.isHeld && (
          <Badge variant="destructive" title={row.original.holdReason ?? undefined}>
            Hold
          </Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: 'paymentStatus',
    header: 'Pembayaran',
    cell: ({ row }) => (
      <Badge variant={payment_status_variant[row.original.paymentStatus]}>
        {payment_status_label[row.original.paymentStatus]}
      </Badge>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Dibuat',
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
];