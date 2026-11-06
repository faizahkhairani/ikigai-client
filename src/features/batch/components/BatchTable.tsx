import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Batch } from '../type'
import { formatDate } from '@/lib/format'

type Props = {
  batches: Batch[]
  isLoading: boolean
  isClosing: boolean
  onClose: (id: string) => void
  canReopen: boolean; // false kalau masih ada batch aktif
  reopeningId: string | null;
  onReopen: (id: string) => void;
}

const skeleton_rows = 5


const BatchTable = ({
  batches,
  isLoading,
  isClosing,
  onClose,
  canReopen,
  reopeningId,
  onReopen
}: Props) => (
  <div className="overflow-x-auto rounded-lg border bg-white">
    <Table>
      <TableHeader>
        <TableRow className="bg-slate-50/70 hover:bg-slate-50/70">
          <TableHead className="h-11 pl-5 text-sm font-medium text-slate-900">
            Nama
          </TableHead>
          <TableHead className="text-sm font-medium text-slate-900">
            Mulai
          </TableHead>
          <TableHead className="text-sm font-medium text-slate-900">
            Target selesai
          </TableHead>
          <TableHead className="text-sm font-medium text-slate-900">
            Kuota batch
          </TableHead>
          <TableHead className="text-sm font-medium text-slate-900">
            Status
          </TableHead>
          <TableHead className="w-36 text-right text-sm font-medium text-slate-900">
            Aksi
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading &&
          Array.from({ length: skeleton_rows }).map((_, index) => (
            <TableRow key={index}>
              <TableCell className="py-4 pl-5">
                <Skeleton className="h-4 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-14" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-14 rounded-full" />
              </TableCell>
              <TableCell className="pr-5">
                <Skeleton className="ml-auto h-8 w-20" />
              </TableCell>
            </TableRow>
          ))}

        {!isLoading && batches.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={6}
              className="h-28 text-center text-sm text-muted-foreground"
            >
              Belum ada batch.
            </TableCell>
          </TableRow>
        )}

        {!isLoading &&
          batches.map((batch) => {
            const isActive = batch.status === 'active'

            return (
              <TableRow
                key={batch.id}
                className="transition-colors hover:bg-slate-50/70"
              >
                <TableCell className="py-4 pl-5 font-medium text-slate-700">
                  {batch.name}
                </TableCell>

                <TableCell className="whitespace-nowrap text-sm text-slate-600">
                  {formatDate(batch.startDate)}
                </TableCell>

                <TableCell className="whitespace-nowrap text-sm text-slate-600">
                  {formatDate(batch.endDate)}
                </TableCell>

                <TableCell className="text-sm text-slate-600">
                  {batch.quota} kg
                </TableCell>

                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      isActive
                        ? 'border-emerald-200 bg-emerald-50 font-medium text-emerald-700 hover:bg-emerald-50'
                        : 'border-slate-200 bg-slate-50 font-medium text-slate-500 hover:bg-slate-50'
                    }
                  >
                    {isActive ? 'Aktif' : 'Ditutup'}
                  </Badge>
                </TableCell>

               <TableCell className="text-right">
                {batch.status === 'active' ? (
                  <Button variant="outline" size="sm" disabled={isClosing} onClick={() => onClose(batch.id)}>
                    {isClosing ? 'Menutup...' : 'Tutup'}
                  </Button>
                ) : (
                  <span title={canReopen ? undefined : 'Tutup batch yang sedang aktif dulu'}>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={!canReopen || reopeningId === batch.id}
                      onClick={() => onReopen(batch.id)}
                    >
                      {reopeningId === batch.id ? 'Membuka...' : 'Buka kembali'}
                    </Button>
                  </span>
                )}
              </TableCell>
              </TableRow>
            )
          })}
      </TableBody>
    </Table>
  </div>
)

export default BatchTable