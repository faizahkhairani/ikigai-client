import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { order_status_options, payment_status_options } from '../constants';
import type { OrderStatus, PaymentStatus } from '../types';
import OptionSelect from './OptionSelect';

type Props = {
  selectedCount: number;
  isPending: boolean;
  onChangeStatus: (status: OrderStatus) => void;
  onChangePayment: (paymentStatus: PaymentStatus) => void;
  onClear: () => void;
};

const OrderBulkActionBar = ({
  selectedCount,
  isPending,
  onChangeStatus,
  onChangePayment,
  onClear,
}: Props) => {
  const [status, setStatus] = useState<OrderStatus>();
  const [payment, setPayment] = useState<PaymentStatus>();

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-md border bg-muted/50 p-3">
      <span className="mr-2 text-sm font-medium">{selectedCount} order dipilih</span>

      <OptionSelect
        emptyLabel="Ubah status ke..."
        value={status}
        options={order_status_options}
        onChange={setStatus}
      />
      <Button size="sm" disabled={!status || isPending} onClick={() => status && onChangeStatus(status)}>
        Ubah status
      </Button>

      <OptionSelect
        emptyLabel="Ubah pembayaran ke..."
        value={payment}
        options={payment_status_options}
        onChange={setPayment}
      />
      <Button size="sm" disabled={!payment || isPending} onClick={() => payment && onChangePayment(payment)}>
        Ubah pembayaran
      </Button>

      <Button variant="ghost" size="sm" className="ml-auto" onClick={onClear}>
        Batal pilih
      </Button>
    </div>
  );
};

export default OrderBulkActionBar;