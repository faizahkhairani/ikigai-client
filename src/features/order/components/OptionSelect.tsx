import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from 'cn';

const EMPTY = '__none__'; // Select gak boleh punya item dengan value kosong

type Props<T extends string> = {
  emptyLabel: string;
  value?: T;
  options: { value: T; label: string }[];
  onChange: (value?: T) => void;
  className?: string;
};

const OptionSelect = <T extends string>({
  emptyLabel,
  value,
  options,
  onChange,
  className = 'w-44',
}: Props<T>) => {
  const items = [{ value: EMPTY, label: emptyLabel }, ...options];

  return (
  <Select
    items={items}
    value={value ?? EMPTY}
    onValueChange={(next) =>
      onChange(!next || next === EMPTY ? undefined : (next as T))
    }
  >
    <SelectTrigger
      className={cn(
        'h-9 w-full rounded-md border-slate-200 bg-white text-sm text-slate-600 shadow-none',
        'hover:bg-slate-50 focus-visible:border-blue-400 focus-visible:ring-2 focus-visible:ring-blue-100',
        'sm:w-36',
        className
      )}
    >
      <SelectValue placeholder={emptyLabel} />
    </SelectTrigger>

    <SelectContent>
      {items.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
)
};

export default OptionSelect;