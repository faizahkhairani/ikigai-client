import { Card, CardContent } from '@/components/ui/card';
import { cn } from 'cn';
import type { LucideIcon } from 'lucide-react';

const TONES = {
  blue: {
    card: 'bg-pastel-blue ring-blue-100',
    chip: 'bg-pastel-blue-soft text-pastel-blue-text',
  },
  mint: {
    card: 'bg-pastel-mint ring-emerald-100',
    chip: 'bg-pastel-mint-soft text-pastel-mint-text',
  },
  amber: {
    card: 'bg-pastel-amber ring-amber-100',
    chip: 'bg-pastel-amber-soft text-pastel-amber-text',
  },
  pink: {
    card: 'bg-pastel-pink ring-pink-100',
    chip: 'bg-pastel-pink-soft text-pastel-pink-text',
  },
} as const;

type Props = {
  title: string;
  value: number;
  hint?: string;
  tone?: keyof typeof TONES
  icon: LucideIcon
};

const StatCard = ({title, value, hint, tone = 'blue', icon: Icon }: Props) => {
  const t = TONES[tone];
  return(
    //  <Card className={cn('rounded-2xl border-0 py-0 shadow-none ring-1', t.card)}>
     <Card className="rounded-2xl border-0 py-0 shadow-md bg-white">
      <CardContent className="flex items-start justify-between gap-3 p-5">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-600">{title}</span>
          <span className="text-3xl font-semibold tracking-tight text-slate-900 tabular-nums">
            {value}
          </span>
          {hint && <span className="text-xs text-slate-500">{hint}</span>}
        </div>

        <div className={cn('flex size-10 shrink-0 items-center justify-center rounded-xl', t.chip)}>
          <Icon className="size-5" />
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;