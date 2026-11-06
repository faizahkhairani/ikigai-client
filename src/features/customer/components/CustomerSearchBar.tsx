import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Props = {
  value: string; // pencarian yang sedang diterapkan
  onApply: (search: string) => void;
};

const CustomerSearchBar = ({ value, onApply }: Props) => {
  // draft = yang lagi diketik, belum memicu API
  const [draft, setDraft] = useState(value);
  const isDirty = draft.trim() !== value;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Enter juga masuk ke sini
    onApply(draft.trim());
  };

  const handleReset = () => {
    setDraft('');
    onApply('');
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <Input
        className="w-72"
        placeholder="Cari nama atau no WA"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
      />
      <Button type="submit" disabled={!isDirty}>
        <Search />
        Cari
      </Button>
      {(value || draft) && (
        <Button type="button" variant="ghost" onClick={handleReset}>
          Reset
        </Button>
      )}
    </form>
  );
};

export default CustomerSearchBar;