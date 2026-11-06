import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { order_status_label } from '@/features/order/constants';
import { formatDateTime } from '@/lib/format';
import type { DashboardActivity } from '../types';

type Props = {
  activities: DashboardActivity[];
};

const describeActivity = (activity: DashboardActivity) => {
  if (!activity.fromStatus) return 'Order dibuat';
  return `${order_status_label[activity.fromStatus]} → ${order_status_label[activity.toStatus]}`;
};

const RecentActivityCard = ({ activities }: Props) => (
  <Card>
    <CardHeader>
      <CardTitle>Aktivitas terbaru</CardTitle>
    </CardHeader>
    <CardContent>
      {activities.length === 0 ? (
        <p className="text-sm text-muted-foreground">Belum ada aktivitas di batch ini.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {activities.map((activity) => (
            <li key={activity.id} className="flex flex-col text-sm">
              <span>
                <span className="font-mono text-xs">{activity.resi}</span> · {describeActivity(activity)}
              </span>
              <span className="text-xs text-muted-foreground">
                {activity.changedBy ?? 'Customer (form publik)'} · {formatDateTime(activity.changedAt)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </CardContent>
  </Card>
);

export default RecentActivityCard;