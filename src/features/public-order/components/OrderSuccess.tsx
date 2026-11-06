import { useState } from 'react';
import { CheckCircle2, Copy, Info, ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/toast';

type Props = {
  trackingToken: string;
  onNewOrder: () => void;
};

const OrderSuccess = ({ trackingToken, onNewOrder }: Props) => {
  const [copied, setCopied] = useState(false);
  const trackingPath = `/track/${trackingToken}`;
  const trackingUrl = `${window.location.origin}${trackingPath}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(trackingUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.add({ type: 'error', description: 'Gagal menyalin, salin manual ya.' });
    }
  };

  return (
  <div className="mx-auto flex w-full max-w-md flex-col items-center gap-5 rounded-2xl border border-pink-100 bg-white p-5 text-center shadow-sm shadow-pink-100/40 sm:p-7">
    <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-50">
      <CheckCircle2 className="size-8 text-emerald-600" />
    </div>

    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
        Order berhasil dikirim!
      </h1>
      <p className="text-sm leading-6 text-slate-500">
        Simpan link tracking ini untuk memantau status ordermu kapan saja.
        Jika link hilang, kamu tetap bisa melacak pesanan menggunakan nomor
        resi atau nomor WhatsApp di halaman tracking.
      </p>
    </div>

    <div className="w-full space-y-2 rounded-xl border border-pink-100 bg-[#fdf8fb] p-3 text-left">
      <p className="text-xs font-semibold text-slate-700">
        Link tracking pesanan
      </p>

      <div className="flex min-w-0 gap-2">
        <Input
          readOnly
          value={trackingUrl}
          onFocus={(e) => e.target.select()}
          className="h-10 min-w-0 bg-white text-sm"
        />

        <Button
          type="button"
          variant="outline"
          onClick={handleCopy}
          className="h-10 shrink-0 border-pink-200 bg-white text-pink-600 hover:bg-pink-50 hover:text-pink-700"
        >
          <Copy className="size-4" />
          {copied ? "Tersalin" : "Salin"}
        </Button>
      </div>

      <p className="text-xs leading-5 text-slate-500">
        <Info className="mr-1 inline size-3.5 align-text-bottom" />
        Simpan link ini agar mudah diakses kembali.
      </p>
    </div>

    <div className="flex w-full flex-col gap-2">
      <Link
        to={trackingPath}
        className={buttonVariants({
          className:
            "h-11 w-full rounded-xl bg-black! text-white! hover:bg-black!",
        })}
      >
        Lihat status order
        <ArrowRight className="ml-2 size-4" />
      </Link>

      <Button
        type="button"
        variant="ghost"
        onClick={onNewOrder}
        className="h-10 w-full rounded-xl text-slate-500 hover:bg-pink-50 hover:text-pink-700"
      >
        Buat order lagi
      </Button>
    </div>
  </div>
);
};

export default OrderSuccess;