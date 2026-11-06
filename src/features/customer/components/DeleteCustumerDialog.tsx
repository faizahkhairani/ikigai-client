import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/toast';
import { useCustomerActions } from '../hooks/useCustomerActions';
import type { Customer } from '../types';

type Props = {
  customer: Customer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const DeleteCustomerDialog = ({ customer, open, onOpenChange }: Props) => {
  const { remove } = useCustomerActions();

  const handleDelete = async () => {
    if (!customer) return;
    try {
      await remove.mutateAsync(customer.id);
      toast.add({ type: 'success', description: 'Customer dihapus.' });
      onOpenChange(false);
    } catch (err: any) {
      toast.add({
        type: 'error',
        description: err.response?.data?.error ?? 'Gagal menghapus customer',
        priority: 'high',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus customer?</DialogTitle>
          <DialogDescription>
            {customer?.name} ({customer?.phone}) akan dihapus permanen dan tidak bisa dikembalikan.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2">
          <Button variant="ghost" disabled={remove.isPending} onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button variant="destructive" disabled={remove.isPending} onClick={handleDelete}>
            {remove.isPending ? 'Menghapus...' : 'Hapus'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCustomerDialog;