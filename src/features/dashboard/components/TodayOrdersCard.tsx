import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { order_status_label, order_status_variant } from '@/features/order/constants';
import { formatTime } from '@/lib/format';
import type { DashboardTodayOrder } from '../types';
import { ArrowRight, Package, ShoppingBag } from "lucide-react";

type Props = {
  orders: DashboardTodayOrder[]; // maksimal 10 terbaru
  total: number; // jumlah semua order hari ini
};

const TodayOrdersCard = ({ orders, total }: Props) => (
  <Card className="gap-0 overflow-hidden rounded-xl border-slate-200 py-0 shadow-sm">
    <CardHeader className="flex flex-row items-center justify-between gap-3 px-4 py-4 sm:px-5">
      <div className="flex flex-col gap-1">
        <CardTitle className="text-base font-semibold tracking-tight text-slate-900">
          Order Masuk Hari Ini
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Daftar pesanan yang diterima hari ini.
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-lg bg-blue-50 text-sm font-semibold text-blue-600">
          {total}
        </span>
      </div>
    </CardHeader>

    <CardContent className="px-4 pb-4 sm:px-5">
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/50 px-4 py-8 text-center">
          <div className="flex size-10 items-center justify-center rounded-full bg-slate-100">
            <ShoppingBag className="size-5 text-slate-400" />
          </div>
          <p className="mt-3 text-sm font-medium text-slate-700">
            Belum ada order masuk
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Pesanan yang masuk hari ini akan ditampilkan di sini.
          </p>
        </div>
      ) : (
        <>
          <ul className="flex flex-col divide-y divide-slate-100">
            {orders.map((order) => (
              <li
                key={order.id}
                className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                    <Package className="size-4 text-slate-500" />
                  </div>

                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="truncate font-mono text-xs font-semibold text-slate-800">
                      {order.resi}
                    </span>

                    <span className="truncate text-xs text-slate-500">
                      {order.customerName}
                    </span>

                    <span className="text-xs text-slate-400">
                      {order.itemCount} barang
                      <span className="mx-1.5">·</span>
                      {formatTime(order.createdAt)}
                    </span>
                  </div>
                </div>

                <Badge
                  variant={order_status_variant[order.status]}
                  className="shrink-0"
                >
                  {order_status_label[order.status]}
                </Badge>
              </li>
            ))}
          </ul>

          {total > 0 && (
            <div className="mt-3 border-t border-slate-100 pt-3">
              <Link
                to="/orders"
                className="flex items-center justify-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-primary"
              >
                Lihat semua order ({total})
                <ArrowRight className="size-4" />
              </Link>
            </div>
          )}
        </>
      )}
    </CardContent>
  </Card>
);

export default TodayOrdersCard;