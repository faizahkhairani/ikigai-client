import { toast } from '@/components/ui/toast';
import type { BulkResult, Order } from '../types';

const MAX_LISTED = 3;

export const notifyBulkResult = (result: BulkResult, orders: Order[], action: string) => {
  const { updatedCount, failed } = result;

  if (updatedCount > 0) {
    toast.add({ type: 'success', description: `${updatedCount} order berhasil ${action}.` });
  }

  if (failed.length > 0) {
    const resiById = new Map(orders.map((order) => [order.id, order.resiThailand]));

    const lines = failed.slice(0, MAX_LISTED).map((item) => {
      const reason = item.error.replace(`Order ${item.orderId} `, '');
      return `${resiById.get(item.orderId) ?? item.orderId}: ${reason}`;
    });
    const more = failed.length > MAX_LISTED ? ` (+${failed.length - MAX_LISTED} lainnya)` : '';

    toast.add({
      type: updatedCount === 0 ? 'error' : 'warning',
      description: `${failed.length} order gagal. ${lines.join('; ')}${more}`,
      priority: 'high',
    });
  }
};