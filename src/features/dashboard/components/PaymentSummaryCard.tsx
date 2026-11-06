import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { payment_status_label, payment_status_variant } from '@/features/order/constants';
import type { PaymentStatus } from '@/features/order/types';

type Props = {
  byPayment: Record<PaymentStatus, number>;
};

const PAYMENT_ORDER: PaymentStatus[] = ['unpaid', 'dp', 'lunas'];

const PaymentSummaryCard = ({ byPayment }: Props) => (
  <Card className="rounded-2xl bg-white shadow-md">
    <CardHeader>
      <CardTitle className="text-base font-semibold text-slate-900">Pembayaran</CardTitle>
    </CardHeader>

    <CardContent className="flex flex-col gap-2.5">
      {PAYMENT_ORDER.map((status) => (
        <div
          key={status}
          className="flex items-center justify-between rounded-xl bg-white/80 px-3.5 py-2.5 ring-1 ring-slate-100"
        >
          <Badge variant={payment_status_variant[status]}>{payment_status_label[status]}</Badge>
          <span className="text-lg font-semibold text-slate-900 tabular-nums">{byPayment[status]}</span>
        </div>
      ))}

      <p className="pt-2 text-xs text-slate-500">Order yang dibatalkan tidak dihitung.</p>
    </CardContent>
  </Card>
);

export default PaymentSummaryCard;