import { Check } from 'lucide-react';
import { cn } from "cn"
import { ORDER_PIPELINE, order_status_label } from '../constants';
import type { OrderStatus, OrderStatusLog } from '../types';

type StatusLog = Pick<OrderStatusLog, 'toStatus'>;
type Props = {
  status: OrderStatus;
  statusLogs: StatusLog[];
};

// Posisi terakhir di alur normal. Untuk ISSUE/CANCELLED, cari dari riwayat:
// status terakhir yang masih ada di alur normal.
const getReachedIndex = (status: OrderStatus, statusLogs: StatusLog[]) => {
  const direct = ORDER_PIPELINE.indexOf(status);
  if (direct !== -1) return direct;

  const lastInPipeline = [...statusLogs]
    .reverse()
    .find((log) => ORDER_PIPELINE.includes(log.toStatus));
  return lastInPipeline ? ORDER_PIPELINE.indexOf(lastInPipeline.toStatus) : 0;
};

const OrderStatusStepper = ({ status, statusLogs }: Props) => {
  const isOffPipeline = !ORDER_PIPELINE.includes(status); // ISSUE / CANCELLED
  const reachedIndex = getReachedIndex(status, statusLogs);

  return (
    <div className="overflow-x-auto">
      <ol className="flex min-w-160">
        {ORDER_PIPELINE.map((step, index) => {
          const isDone = index < reachedIndex || status === 'COMPLETED';
          const isCurrent = index === reachedIndex && status !== 'COMPLETED';

          return (
            <li key={step} className="relative flex flex-1 flex-col items-center gap-1 text-center">
              {/* garis penghubung ke tahap sebelumnya */}
              {index > 0 && (
                <span
                  className={cn(
                    'absolute right-1/2 top-2.75 h-0.5 w-full',
                    index <= reachedIndex ? 'bg-primary' : 'bg-border'
                  )}
                />
              )}

              <span
                className={cn(
                  'relative z-10 flex size-6 items-center justify-center rounded-full border-2 bg-background text-[10px] font-semibold',
                  isDone && 'border-primary bg-primary text-primary-foreground',
                  isCurrent &&
                    (isOffPipeline
                      ? 'border-destructive text-destructive'
                      : 'border-primary text-primary'),
                  !isDone && !isCurrent && 'border-border text-muted-foreground'
                )}
              >
                {isDone ? <Check className="size-3" /> : index + 1}
              </span>

              <span
                className={cn(
                  'px-0.5 text-[10px] leading-tight',
                  isCurrent ? 'font-semibold' : 'text-muted-foreground'
                )}
              >
                {order_status_label[step]}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default OrderStatusStepper;