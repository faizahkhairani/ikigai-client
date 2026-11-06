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
import OpenBatchForm from './OpenBatchForm';
import type { OpenBatchPayload } from '../type';

type Props = {
  disabled?: boolean;
  onSubmit: (payload: OpenBatchPayload) => Promise<unknown>;
};

const OpenBatchDialog = ({ disabled, onSubmit }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button disabled={disabled} className="text-sm py-5 px-6">
          <Plus />
          Buka Batch
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buka batch baru</DialogTitle>
          <DialogDescription>
            Batch baru langsung aktif dan mulai menerima order dari form publik.
          </DialogDescription>
        </DialogHeader>

        <OpenBatchForm onSubmit={onSubmit} onSuccess={() => setOpen(false)} onFailure={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default OpenBatchDialog;