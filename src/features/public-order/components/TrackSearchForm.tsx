import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { TrackSearchQuery } from '../types';
import { cn } from "cn";
import { inputCls } from "@/lib/styles";

type Mode = 'resi' | 'phone';

const MODE_CONFIG: Record<Mode, { label: string; placeholder: string; inputMode: 'text' | 'tel' }> = {
  resi: { label: 'No resi', placeholder: 'Nomor resi paketmu', inputMode: 'text' },
  phone: { label: 'No WhatsApp', placeholder: '08123456789', inputMode: 'tel' },
};

type Props = {
  initialMode: Mode;
  initialValue: string;
  onSearch: (query: TrackSearchQuery) => void;
};

const TrackSearchForm = ({ initialMode, initialValue, onSearch }: Props) => {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  const config = MODE_CONFIG[mode];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      setError(`${config.label} wajib diisi`);
      return;
    }
    setError(null);
    onSearch({ [mode]: trimmed } as TrackSearchQuery);
  };


return (
  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
    <div className="grid grid-cols-2 gap-1 rounded-full bg-stone-100 p-1">
      {(Object.keys(MODE_CONFIG) as Mode[]).map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => {
            setMode(key);
            setError(null);
          }}
          className={cn(
            "rounded-full px-2 py-1.5 text-sm font-medium transition-all",
            mode === key
              ? "bg-white text-stone-900 shadow-sm ring-1 ring-stone-200/70"
              : "text-stone-500 hover:text-stone-800"
          )}
        >
          {MODE_CONFIG[key].label}
        </button>
      ))}
    </div>

    <Field data-invalid={!!error} className="gap-2">
      <FieldLabel htmlFor="track-query" className="text-sm font-medium text-stone-700">
        {config.label}
      </FieldLabel>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          id="track-query"
          inputMode={config.inputMode}
          placeholder={config.placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-invalid={!!error}
          className={cn(inputCls, "min-w-0 sm:flex-1")}
        />

        <Button
          type="submit"
          className="h-10 w-full shrink-0 rounded-full bg-stone-900 px-6 font-medium text-white shadow-lg shadow-stone-900/10 transition-colors hover:bg-stone-800 sm:w-auto"
        >
          <Search className="mr-2 size-4" />
          Cari order
        </Button>
      </div>

      {error && <FieldError>{error}</FieldError>}
    </Field>
  </form>
);
};

export default TrackSearchForm;