import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type OnChangeFn,
  type RowSelectionState,
} from '@tanstack/react-table'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Order } from '../types'
import { orderColumns } from './OrderColumns'

type Props = {
  orders: Order[]
  isLoading: boolean
  skeletonRows?: number;
  rowSelection: RowSelectionState;
  onRowSelectionChange: OnChangeFn<RowSelectionState>;
  onRowClick: (id: string) => void
}


const OrderTable = ({
  orders,
  isLoading,
  rowSelection,
  skeletonRows = 6,
  onRowSelectionChange,
  onRowClick
}: Props) => {
  const table = useReactTable({
    data: orders,
    columns: orderColumns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
    state: { rowSelection },
    onRowSelectionChange,
    enableRowSelection: true,
  })

  const rows = table.getRowModel().rows

  return (
    <div className="overflow-x-auto border bg-white">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-slate-50/70 hover:bg-slate-50/70"
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="h-11 px-3 first:pl-5 last:pr-5 whitespace-nowrap text-sm font-medium text-slate-900"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isLoading &&
            Array.from({ length: skeletonRows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {orderColumns.map((column, cellIndex) => (
                  <TableCell
                    key={column.id ?? cellIndex}
                    className="px-3 py-4 first:pl-5 last:pr-5"
                  >
                    <Skeleton className="h-4 w-3/4 rounded-sm" />
                  </TableCell>
                ))}
              </TableRow>
            ))}

          {!isLoading && rows.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={table.getVisibleLeafColumns().length}
                className="h-28 text-center text-sm text-muted-foreground"
              >
                Tidak ada order yang cocok dengan filter.
              </TableCell>
            </TableRow>
          )}

          {!isLoading &&
            rows.map((row) => (
              <TableRow
                key={row.id}
                className="cursor-pointer"
                data-state={row.getIsSelected() ? 'selected' : undefined}
                onClick={() => onRowClick(row.id)} // row.id = id order (dari getRowId)
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="px-3 py-4 first:pl-5 last:pr-5 text-sm text-slate-600"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default OrderTable