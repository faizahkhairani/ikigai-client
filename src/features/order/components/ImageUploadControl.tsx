import { useEffect, useRef, useState } from 'react';
import { ImagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FieldError } from '@/components/ui/field';
import { ALLOWED_IMAGE_TYPES, IMAGE_ACCEPT, IMAGE_FORMAT_LABEL } from '@/lib/image';

const MAX_SIZE_MB = 2;

type Props = {
  buttonLabel: string;
  confirmLabel?: string;
  highlight?: boolean; // true = tombol utama, false = tombol outline
  hint?: string;
  // Lempar error kalau gagal: file tetap terpilih biar bisa dicoba lagi.
  // Toast sukses/gagal ditampilkan oleh pemanggil.
  onUpload: (file: File) => Promise<void>;
};

const ImageUploadControl = ({
  buttonLabel,
  confirmLabel = 'Unggah',
  highlight = false,
  hint,
  onUpload,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  // Preview foto, URL sementaranya dibersihkan saat file berganti
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const reset = () => {
    setFile(null);
    setFileError(null);
    if (inputRef.current) inputRef.current.value = ''; // biar foto yang sama bisa dipilih lagi
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!ALLOWED_IMAGE_TYPES.includes(selected.type)) {
      reset();
      setFileError(`Foto harus berformat ${IMAGE_FORMAT_LABEL}`);
      return;
    }
    if (selected.size > MAX_SIZE_MB * 1024 * 1024) {
      reset();
      setFileError(`Ukuran foto maksimal ${MAX_SIZE_MB}MB`);
      return;
    }
    setFileError(null);
    setFile(selected);
  };

  const handleSubmit = async () => {
    if (!file) return;
    setIsPending(true);
    try {
      await onUpload(file);
      reset();
    } catch {
      // pesan error sudah ditampilkan pemanggil, file dibiarkan terpilih
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={inputRef}
        type="file"
        accept={IMAGE_ACCEPT}
        className="hidden"
        onChange={handleFileChange}
      />

      {!file ? (
        <>
          <Button
            type="button"
            size="sm"
            variant={highlight ? 'default' : 'outline'}
            className="w-fit"
            onClick={() => inputRef.current?.click()}
          >
            <ImagePlus />
            {buttonLabel}
          </Button>
          {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        </>
      ) : (
        <div className="flex items-center gap-3">
          {preview && <img src={preview} alt="Preview" className="size-16 rounded-md object-cover" />}
          <div className="flex flex-col gap-2">
            <span className="max-w-48 truncate text-xs text-muted-foreground">{file.name}</span>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSubmit} disabled={isPending}>
                {isPending ? 'Mengunggah...' : confirmLabel}
              </Button>
              <Button size="sm" variant="ghost" onClick={reset} disabled={isPending}>
                Batal
              </Button>
            </div>
          </div>
        </div>
      )}

      {fileError && <FieldError>{fileError}</FieldError>}
    </div>
  );
};

export default ImageUploadControl;