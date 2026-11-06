import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import {
  order_status_label,
  order_status_variant,
  payment_status_label,
  payment_status_variant,
} from '@/features/order/constants';
import { formatDate } from '@/lib/format';
import { useCustomerDetail } from '../hooks/useCustomerDetail';
import { MapPin, Phone, ShoppingBag } from "lucide-react";

type Props = {
  customerId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

// const InfoRow = ({ label, value }: { label: string; value: string }) => (
//   <div className="flex justify-between gap-4 text-sm">
//     <span className="text-muted-foreground">{label}</span>
//     <span className="text-right font-medium">{value}</span>
//   </div>
// );

const CustomerDetailDialog = ({ customerId, open, onOpenChange }: Props) => {
  const { data: customer, isLoading } = useCustomerDetail(customerId);

  return (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold tracking-tight">
          {customer?.name ?? "Detail Customer"}
        </DialogTitle>
        <DialogDescription>
          Informasi customer dan riwayat pemesanan.
        </DialogDescription>
      </DialogHeader>

      {isLoading && (
        <div className="flex flex-col gap-3 py-2">
          <Skeleton className="h-24 w-full rounded-lg" />
          <Skeleton className="h-16 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
      )}

      {!isLoading && !customer && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
          Gagal memuat customer. Silakan coba lagi.
        </div>
      )}

      {!isLoading && customer && (
        <div className="flex flex-col gap-5">
          {/* Customer Information */}
          <section className="rounded-lg border border-slate-200 bg-slate-50/50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
                {customer.name?.charAt(0).toUpperCase() ?? "?"}
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-slate-900">
                  {customer.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Customer sejak {formatDate(customer.createdAt)}
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-4 border-t border-slate-200 pt-4 sm:grid-cols-2">
              <div className="flex items-start gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-slate-400" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">
                    No. WhatsApp
                  </p>
                  <p className="break-all text-sm font-medium text-slate-700">
                    {customer.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-slate-400" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">
                    Alamat
                  </p>
                  <p className="text-sm font-medium text-slate-700">
                    {customer.address || "-"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Order History */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Riwayat Order
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Daftar pesanan yang pernah dibuat customer.
                </p>
              </div>

              <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                {customer.orders.length} order
              </span>
            </div>

            {customer.orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 py-8 text-center">
                <ShoppingBag className="size-7 text-slate-300" />
                <p className="mt-2 text-sm font-medium text-slate-700">
                  Belum ada order
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Riwayat pesanan customer akan muncul di sini.
                </p>
              </div>
            ) : (
              <ul className="flex max-h-80 flex-col gap-2 overflow-y-auto pr-1">
                {customer.orders.map((order) => (
                  <li
                    key={order.id}
                    className="flex flex-col gap-3 rounded-lg border border-slate-200 p-3 transition-colors hover:bg-slate-50/70"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 flex-col gap-1">
                        <span className="break-all font-mono text-xs font-semibold text-slate-800">
                          {order.resiThailand}
                        </span>

                        <span className="text-xs text-muted-foreground">
                          {order.batch.name}
                          <span className="mx-1.5">·</span>
                          {order._count.items} barang
                        </span>

                        <span className="text-xs text-muted-foreground">
                          {formatDate(order.createdAt)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 border-t border-slate-100 pt-2.5">
                      <Badge variant={order_status_variant[order.status]}>
                        {order_status_label[order.status]}
                      </Badge>

                      <Badge variant={payment_status_variant[order.paymentStatus]}>
                        {payment_status_label[order.paymentStatus]}
                      </Badge>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </DialogContent>
  </Dialog>
);
};

export default CustomerDetailDialog;