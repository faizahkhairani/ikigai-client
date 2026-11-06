import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  order_status_label,
  order_status_variant,
  order_type_label,
  payment_status_label,
  payment_status_variant,
} from '../constants';
import { useOrderDetail } from '../hooks/useOrderDetail';
import OrderDetailSkeleton from './OrderDetailSkeleton';
import OrderStatusStepper from './OrderStatusStepper';
import ProofUploader from './ProofUploader';
import OrderActivityLog from './OrderActivityLog';
// import StatusCorrection from './StatusCorrection';
import ProofImageGallery from './ProofImageGallery';
import ResiImageSection from './ResiImageSection';

type Props = {
  orderId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between gap-4 text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="text-right font-medium">{value}</span>
  </div>
);

const OrderDetailDialog = ({ orderId, open, onOpenChange, onSuccess }: Props) => {
  const { data: order, isLoading } = useOrderDetail(orderId);
  const proofImages = order?.proofImages ?? [];

  const creationLog = order?.statusLogs.find((log) => !log.fromStatus);
  const createdBy = creationLog
    ? (creationLog.changedBy?.name ?? 'Customer (form publik)')
    : 'Tidak tercatat'; // order lama, dibuat sebelum pencatatan ini ada
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-mono">{order?.resiThailand ?? 'Detail order'}</DialogTitle>
          <DialogDescription className="sr-only">Detail order dan foto bukti</DialogDescription>
        </DialogHeader>

        {isLoading && <OrderDetailSkeleton />}

        {!isLoading && !order && (
          <p className="text-sm text-destructive">Gagal memuat order.</p>
        )}

        {order && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={order_status_variant[order.status]}>
                {order_status_label[order.status]}
              </Badge>
              <Badge variant={payment_status_variant[order.paymentStatus]}>
                {payment_status_label[order.paymentStatus]}
              </Badge>
              {order.isHeld && (
                <Badge variant="destructive" title={order.holdReason ?? undefined}>
                  Hold
                </Badge>
              )}
            </div>

            <OrderStatusStepper status={order.status} statusLogs={order.statusLogs} />
            {/* {order.correctionTarget && (
              <StatusCorrection
                key={order.id}
                orderId={order.id}
                currentStatus={order.status}
                target={order.correctionTarget}
              />
            )} */}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <InfoRow label="Customer" value={order.customer.name} />
                <InfoRow label="No WA" value={order.customer.phone} />
                <InfoRow label="Batch" value={order.batch.name} />
                <InfoRow label="Tipe" value={order_type_label[order.orderType]} />
                <InfoRow label="Dibuat oleh" value={createdBy} />
              </div>

              <div className="flex max-h-28 flex-col gap-1.5 overflow-y-auto text-sm">
                <span className="font-medium">Barang ({order.items.length})</span>
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between gap-2">
                    <span>
                      {item.name}
                      {item.note && <span className="text-muted-foreground"> · {item.note}</span>}
                    </span>
                    <span className="text-muted-foreground">×{item.qty}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* key = order.id, biar pilihan foto dan konfirmasi hapus direset kalau pindah ke order lain */}
            <ResiImageSection
              key={`resi-${order.id}`}
              orderId={order.id}
              imageUrl={order.resiImageUrl}
              onSuccess={onSuccess}
            />

            <div className="flex flex-col gap-2 border-t pt-4">
              <span className="text-sm font-medium">Foto bukti</span>
              <ProofImageGallery
                key={`gallery-${order.id}`}
                orderId={order.id}
                images={proofImages}
                lockLast={proofImages.length === 1 && order.status !== 'WAITING'}
                onSuccess={onSuccess}
              />
              <ProofUploader
                key={order.id}
                orderId={order.id}
                isWaiting={order.status === 'WAITING'}
                onSuccess={onSuccess}
              />
            </div>
            <div className="flex flex-col gap-2 border-t pt-4">
              <span className="text-sm font-medium">Aktivitas</span>
              <OrderActivityLog logs={order.statusLogs} />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;