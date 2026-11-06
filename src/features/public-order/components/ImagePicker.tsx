import { useEffect, useRef, useState } from 'react';
import { ImagePlus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from 'cn';
import { IMAGE_ACCEPT } from '@/lib/image';

type Props = {
  id: string;
  file: File | null;
  onChange: (file: File | null) => void;
  isInvalid?: boolean;
};

const ImagePicker = ({ id, file, onChange, isInvalid }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

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

  const openPicker = () => inputRef.current?.click();

  const handleClear = () => {
    onChange(null);
    if (inputRef.current) inputRef.current.value = ''; // biar foto yang sama bisa dipilih lagi
  };

  return (
    <div className="flex items-center gap-3">
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={IMAGE_ACCEPT}
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />

      {preview ? (
        <>
          <img src={preview} alt="Preview foto resi" className="size-20 rounded-md object-cover" />
          <div className="flex flex-col gap-1">
            <span className="max-w-48 truncate text-xs text-muted-foreground">{file?.name}</span>
            <div className="flex gap-2">
              <Button type="button" size="sm" variant="outline" onClick={openPicker}>
                Ganti
              </Button>
              <Button type="button" size="sm" variant="ghost" onClick={handleClear}>
                <X />
                Hapus
              </Button>
            </div>
          </div>
        </>
      ) : (
        <Button
          type="button"
          variant="outline"
          className={cn(isInvalid && 'border-destructive text-destructive')}
          onClick={openPicker}
        >
          <ImagePlus />
          Pilih foto
        </Button>
      )}
    </div>
  );
};

export default ImagePicker;