import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';
import { usePhotoActions } from '../hooks/usePhotoActions';
import type { ProofImage } from '../types';

type Props = {
  orderId: string;
  images: ProofImage[];
  lockLast: boolean; // true = foto terakhir yang tersisa tidak boleh dihapus
  onSuccess: () => void;
};

const ProofImageGallery = ({ orderId, images, lockLast, onSuccess }: Props) => {
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const { deleteProof } = usePhotoActions();

  const handleDelete = async (imageId: string) => {
    try {
      await deleteProof.mutateAsync({ orderId, imageId });
      toast.add({ type: 'success', description: 'Foto dihapus.' });
      onSuccess();
    } catch (err: any) {
      toast.add({
        type: 'error',
        description: err.response?.data?.error ?? 'Gagal menghapus foto',
        priority: 'high',
      });
    } finally {
      setConfirmingId(null);
    }
  };

  if (images.length === 0) {
    return <p className="text-xs text-muted-foreground">Belum ada foto bukti.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {images.map((image) => (
        <div key={image.id} className="relative">
          <a href={image.imageUrl} target="_blank" rel="noreferrer">
            <img src={image.imageUrl} alt="Foto bukti" className="size-20 rounded-md object-cover" />
          </a>

          {confirmingId === image.id ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-md bg-background/90 text-[10px]">
              <span>Hapus?</span>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="destructive"
                  className="h-5 px-1.5 text-[10px]"
                  disabled={deleteProof.isPending}
                  onClick={() => handleDelete(image.id)}
                >
                  Ya
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-5 px-1.5 text-[10px]"
                  disabled={deleteProof.isPending}
                  onClick={() => setConfirmingId(null)}
                >
                  Batal
                </Button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              aria-label="Hapus foto"
              title={lockLast ? 'Unggah foto terlebih dahulu' : 'Hapus foto'}
              disabled={lockLast}
              className="absolute right-1 top-1 rounded-full bg-background/80 p-1 hover:bg-background disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() => setConfirmingId(image.id)}
            >
              <Trash2 className="size-3" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProofImageGallery;