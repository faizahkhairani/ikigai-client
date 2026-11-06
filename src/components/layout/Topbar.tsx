import { Search, Bell } from "lucide-react";

const Topbar = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative w-full">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            size={14}
          />
          <input type="text" placeholder="Cari Resi, Customer, WA, Barang..." className="w-full pl-9 pr-4 py-3 text-sm bg-input border-0 rounded-full focus:ring-1 focus:ring-pastel-blueDark focus:bg-white transition-all font-medium" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        

        <div className="relative">
          <button className="w-9 h-9 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center relative hover:bg-slate-200 transition-colors">
            <Bell size={16} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Topbar