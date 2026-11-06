import { useState } from 'react';
import { Undo2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';
import { order_status_label } from '../constants';
import { useCorrectStatus } from '../hooks/useCorrectStatus';
import type { OrderStatus } from '../types';

type Props = {
  orderId: string;
  currentStatus: OrderStatus;
  target: OrderStatus;
};

const StatusCorrection = ({ orderId, currentStatus, target }: Props) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const correct = useCorrectStatus();

  const targetLabel = order_status_label[target];
  const isResume = currentStatus === 'ISSUE'; // dari Issue = melanjutkan order

  const handleConfirm = async () => {
    try {
      await correct.mutateAsync(orderId);
      toast.add({
        type: 'success',
        description: isResume
          ? `Order dilanjutkan ke ${targetLabel}.`
          : `Status dikembalikan ke ${targetLabel}.`,
      });
    } catch (err: any) {
      toast.add({
        type: 'error',
        description: err.response?.data?.error ?? 'Gagal mengoreksi status',
        priority: 'high',
      });
    } finally {
      setIsConfirming(false);
    }
  };

  if (!isConfirming) {
    return (
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-fit"
        onClick={() => setIsConfirming(true)}
      >
        <Undo2 />
        {isResume ? `Lanjutkan order ke ${targetLabel}` : `Koreksi: kembalikan ke ${targetLabel}`}
      </Button>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-md border border-destructive/40 p-2 text-sm">
      <span>
        {isResume ? 'Lanjutkan order ke' : 'Kembalikan status ke'} <b>{targetLabel}</b>?
      </span>
      <Button size="sm" variant="destructive" disabled={correct.isPending} onClick={handleConfirm}>
        {correct.isPending ? 'Memproses...' : 'Ya'}
      </Button>
      <Button
        size="sm"
        variant="ghost"
        disabled={correct.isPending}
        onClick={() => setIsConfirming(false)}
      >
        Batal
      </Button>
    </div>
  );
};

export default StatusCorrection;