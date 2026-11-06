import { formatDateTime } from '@/lib/format';
import { order_status_label } from '../constants';
import type { OrderStatusLog } from '../types';

type Props = {
  logs: OrderStatusLog[];
};

const describeLog = (log: OrderStatusLog) => {
  if (!log.fromStatus) return 'Order dibuat';
  const move = `${order_status_label[log.fromStatus]} → ${order_status_label[log.toStatus]}`;
  return log.isCorrection ? `Koreksi: ${move}` : move;
};

const OrderActivityLog = ({ logs }: Props) => {
  if (logs.length === 0) {
    return <p className="text-xs text-muted-foreground">Belum ada aktivitas tercatat.</p>;
  }

  return (
    <ul className="flex max-h-40 flex-col gap-2 overflow-y-auto">
      {[...logs].reverse().map((log) => (
        <li key={log.id} className="flex flex-col text-sm">
          <span className="font-medium">{describeLog(log)}</span>
          <span className="text-xs text-muted-foreground">
            {log.changedBy?.name ?? 'Customer (form publik)'} · {formatDateTime(log.changedAt)}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default OrderActivityLog;