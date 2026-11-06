import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { Batch } from '@/features/batch/type';
import type { CreateManualOrderPayload } from '../types';
import CreateOrderForm from './CreateOrderForm';

type Props = {
  batches: Batch[];
  onSubmit: (payload: CreateManualOrderPayload) => Promise<unknown>;
};


const OpenBatchDialog = ({ batches, onSubmit }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="text-sm py-5 px-6">
          <Plus />
          Input Order
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Input Order Baru</DialogTitle>
          <DialogDescription>
            Masukkan detail order baru yang akan ditambahkan.
          </DialogDescription>
        </DialogHeader>

         <CreateOrderForm
          batches={batches}
          onSubmit={onSubmit}
          onSuccess={() => setOpen(false)}
          onFailure={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default OpenBatchDialog;