import { toast } from '@/components/ui/toast';
import { useUploadProof } from '../hooks/useUploadProof';
import ImageUploadControl from './ImageUploadControl';

type Props = {
  orderId: string;
  isWaiting: boolean; // WAITING = upload ini sekaligus ngubah status ke Arrived Thailand
  onSuccess: () => void;
};

const ProofUploader = ({ orderId, isWaiting, onSuccess }: Props) => {
  const upload = useUploadProof();

  const handleUpload = async (file: File) => {
    try {
      const result = await upload.mutateAsync({ orderId, image: file });

      if (result.statusFailed) {
        toast.add({
          type: 'warning',
          description: 'Foto tersimpan, tapi status order gagal diubah.',
          priority: 'high',
        });
      } else {
        toast.add({
          type: 'success',
          description: isWaiting
            ? 'Foto tersimpan, status berubah ke Arrived Thailand.'
            : 'Foto bukti ditambahkan.',
        });
      }
      onSuccess();
    } catch (err: any) {
      toast.add({
        type: 'error',
        description: err.response?.data?.error ?? 'Gagal mengunggah foto',
        priority: 'high',
      });
      throw err; // biar file tetap terpilih dan bisa dicoba lagi
    }
  };

  return (
    <ImageUploadControl
      buttonLabel="Tambah foto bukti"
      highlight={isWaiting}
      hint={isWaiting ? 'Mengunggah foto akan mengubah status ke Arrived Thailand.' : undefined}
      onUpload={handleUpload}
    />
  );
};

export default ProofUploader;