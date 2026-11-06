import { useSearchParams } from 'react-router-dom';
import TrackSearchForm from '../components/TrackSearchForm';
import TrackSearchResults from '../components/TrackSearchResults';
import { useTrackSearch } from '../hooks/useTrackSearch';
import type { TrackSearchQuery } from '../types';

const TrackSearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const resi = searchParams.get('resi');
  const phone = searchParams.get('phone');

  const query: TrackSearchQuery | null = resi ? { resi } : phone ? { phone } : null;
  const { data: orders = [], isLoading, error } = useTrackSearch(query);

  return (
  <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
    <div className="flex flex-col gap-1.5">
      <p className="text-[11px] font-medium tracking-[0.2em] text-rose-400">
        TRACKING
      </p>
      <h1 className="font-serif text-3xl tracking-tight text-stone-900 sm:text-4xl">
        Cek status order
      </h1>
      <p className="text-sm leading-6 text-stone-500">
        Pantau pesananmu dengan nomor resi atau nomor WhatsApp.
      </p>
    </div>

    <div className="rounded-3xl bg-white p-4 shadow-[0_1px_2px_rgba(28,25,23,0.04),0_12px_32px_-12px_rgba(28,25,23,0.08)] ring-1 ring-stone-200/70 sm:p-6">
      <TrackSearchForm
        initialMode={phone && !resi ? "phone" : "resi"}
        initialValue={resi ?? phone ?? ""}
        onSearch={(next) => setSearchParams(next)}
      />
    </div>

    {error && (
      <div className="border-l-2 border-rose-400 bg-rose-50/60 py-3 pl-4 pr-3 text-sm text-rose-700">
        {(error as any).response?.data?.error ??
          "Gagal mencari order. Coba lagi."}
      </div>
    )}

    {query && !error && (
      <TrackSearchResults orders={orders} isLoading={isLoading} />
    )}
  </div>
);
};

export default TrackSearchPage;