import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ORDER_PIPELINE, order_status_label } from '@/features/order/constants';
import type { OrderStatus } from '@/features/order/types';

type Props = {
  byStatus: Record<OrderStatus, number>;
};

const StatusPipelineCard = ({ byStatus }: Props) => {
  const maxCount = Math.max(1, ...ORDER_PIPELINE.map((s) => byStatus[s]));

  return (
    <Card className="rounded-2xl bg-white shadow-md">
    <CardHeader>
      <CardTitle className="text-base font-semibold text-slate-900">Order per status</CardTitle>
      <p className="text-xs text-slate-500">Dari order masuk sampai terkirim.</p>
    </CardHeader>

    <CardContent className="flex flex-col gap-3.5">
      {ORDER_PIPELINE.map((status) => {
        const count = byStatus[status];
        return (
          <div key={status} className="flex items-center gap-3 text-sm">
            <span className="w-36 shrink-0 text-slate-600">{order_status_label[status]}</span>

            <div className="h-2.5 flex-1 rounded-full bg-pastel-blue-soft/60">
              <div
                className="h-2.5 rounded-full bg-pastel-pink-dark transition-all duration-500"
                style={{ width: count ? `${Math.max((count / maxCount) * 100, 4)}%` : 0 }}
              />
            </div>

            <span className="w-8 text-right font-semibold text-slate-900 tabular-nums">{count}</span>
          </div>
        );
      })}

      <div className="mt-1 flex flex-wrap gap-2 border-t border-slate-100 pt-4 text-xs">
        <span className="rounded-full bg-pastel-pink-soft px-3 py-1 font-medium text-pastel-pink-text">
          {order_status_label.ISSUE} · {byStatus.ISSUE}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600">
          {order_status_label.CANCELLED} · {byStatus.CANCELLED}
        </span>
      </div>
    </CardContent>
  </Card>
);
};

export default StatusPipelineCard;