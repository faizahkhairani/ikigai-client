import { Badge } from '@/components/ui/badge';
import {
  order_status_label,
  order_status_variant,
  payment_status_label,
  payment_status_variant,
} from '@/features/order/constants';
import OrderStatusStepper from '@/features/order/components/OrderStatusStepper';
import { formatDate } from '@/lib/format';
import type { TrackedOrder } from '../types';
import { AlertCircle } from 'lucide-react';

type Props = {
  order: TrackedOrder;
};

const TrackedOrderCard = ({ order }: Props) => (
  <div className="overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-sm shadow-pink-100/40">
    {/* Order information */}
    <div className="flex flex-col gap-4 p-4 sm:p-5">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-slate-400">
          Nomor Resi
        </span>

        <h2 className="break-all font-mono text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
          {order.resiThailand}
        </h2>

        <p className="text-xs text-slate-500">
          Atas nama{" "}
          <span className="font-medium text-slate-700">
            {order.customer.name}
          </span>
          {" · "}
          {formatDate(order.createdAt)}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant={order_status_variant[order.status]}>
          {order_status_label[order.status]}
        </Badge>

        <Badge variant={payment_status_variant[order.paymentStatus]}>
          {payment_status_label[order.paymentStatus]}
        </Badge>
      </div>
    </div>

    {/* Hold notification */}
    {order.isHeld && (
      <div className="mx-4 mb-4 flex gap-2 rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-600 sm:mx-5">
        <AlertCircle className="mt-0.5 size-4 shrink-0" />
        <p>
          <span className="font-semibold">Order ditahan sementara.</span>{" "}
          {order.holdReason ?? "Hubungi admin"}.
          Hubungi admin untuk informasi lebih lanjut.
        </p>
      </div>
    )}

    <div className="border-t border-slate-100" />

    {/* Tracking progress */}
    <div className="flex flex-col gap-4 p-4 sm:p-5">
      <div>
        <h3 className="text-sm font-semibold text-slate-900">
          Status Pengiriman
        </h3>
        <p className="mt-0.5 text-xs text-slate-500">
          Pantau perkembangan pesananmu di sini.
        </p>
      </div>

      <OrderStatusStepper
        status={order.status}
        statusLogs={order.statusLogs}
      />
    </div>

    <div className="border-t border-slate-100" />

    {/* Items */}
    <div className="flex flex-col gap-3 p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">
          Barang Pesanan
        </h3>

        <span className="rounded-full bg-pink-50 px-2.5 py-1 text-xs font-medium text-pink-600">
          {order.items.length} barang
        </span>
      </div>

      <div className="flex flex-col divide-y divide-slate-100">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0"
          >
            <div className="min-w-0">
              <p className="wrap-break-word text-sm font-medium text-slate-700">
                {item.name}
              </p>

              {item.note && (
                <p className="mt-0.5 text-xs leading-5 text-slate-400">
                  {item.note}
                </p>
              )}
            </div>

            <span className="shrink-0 text-sm font-medium text-slate-500">
              ×{item.qty}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* Proof images */}
    {order.proofImages.length > 0 && (
      <>
        <div className="border-t border-slate-100" />

        <div className="flex flex-col gap-3 p-4 sm:p-5">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Foto Bukti Paket
            </h3>
            <p className="mt-0.5 text-xs text-slate-500">
              Dokumentasi paket dari gudang Thailand.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {order.proofImages.map((image) => (
              <a
                key={image.id}
                href={image.imageUrl}
                target="_blank"
                rel="noreferrer"
                className="group relative aspect-square overflow-hidden rounded-xl bg-slate-100"
              >
                <img
                  src={image.imageUrl}
                  alt="Foto bukti paket"
                  className="size-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </a>
            ))}
          </div>
        </div>
      </>
    )}
  </div>
);

export default TrackedOrderCard;