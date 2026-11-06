import { toast } from '@/components/ui/toast';
import { usePhotoActions } from '../hooks/usePhotoActions';
import ImageUploadControl from './ImageUploadControl';

type Props = {
  orderId: string;
  imageUrl: string | null;
  onSuccess: () => void;
};

const ResiImageSection = ({ orderId, imageUrl, onSuccess }: Props) => {
  const { replaceResi } = usePhotoActions();

  const handleUpload = async (file: File) => {
    try {
      await replaceResi.mutateAsync({ orderId, image: file });
      toast.add({
        type: 'success',
        description: imageUrl ? 'Foto resi diganti.' : 'Foto resi ditambahkan.',
      });
      onSuccess();
    } catch (err: any) {
      toast.add({
        type: 'error',
        description: err.response?.data?.error ?? 'Gagal mengunggah foto resi',
        priority: 'high',
      });
      throw err;
    }
  };

  return (
    <div className="flex flex-col gap-2 border-t pt-4">
      <span className="text-sm font-medium">Foto resi dari customer</span>

      {imageUrl ? (
        <a href={imageUrl} target="_blank" rel="noreferrer" className="w-fit">
          <img src={imageUrl} alt="Foto resi dari customer" className="size-20 rounded-md object-cover" />
        </a>
      ) : (
        <p className="text-xs text-muted-foreground">Belum ada foto resi.</p>
      )}

      <ImageUploadControl
        buttonLabel={imageUrl ? 'Ganti foto resi' : 'Tambah foto resi'}
        confirmLabel={imageUrl ? 'Ganti' : 'Unggah'}
        onUpload={handleUpload}
      />
    </div>
  );
};

export default ResiImageSection;