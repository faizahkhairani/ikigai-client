import {
  ChartPie,
  Boxes,
  Layers,
  Contact,
  FileSignature,
  SearchCheck,
} from "lucide-react";
import type { NavItem } from "@/types/sidebar";
import SidebarSection from "./sidebar/SidebarSection";
import { UserMenu } from "./sidebar/UserMenu";



const adminNavItems: NavItem[] = [
  {
    label: "Dashboard",
    path: "/",
    icon: ChartPie,
  },
  {
    label: "Kelola Order",
    path: "/orders",
    icon: Boxes,
  },
  {
    label: "Batch Jastip",
    path: "/batch",
    icon: Layers,
  },
  {
    label: "Directory Customer",
    path: "/customers",
    icon: Contact,
  },
];

const publicNavItems: NavItem[] = [
  {
    label: "Form Order Bagasi",
    path: "/order-form",
    icon: FileSignature,
  },
  {
    label: "Portal Cek Resi",
    path: "/track",
    icon: SearchCheck,
  },
];


const Sidebar = () => {
  return (
    <>
    <aside className="w-full md:w-64 bg-white border-r border-slate-100 flex flex-col justify-between shrink-0 sticky top-0 md:h-screen z-30 shadow-sm">
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-3 mb-7 select-none">
          {/* <PlaneTakeoff className="text-blue-900" size={37}/> */}
            <span  
            style={{
            fontFamily: "'Playfair Display Variable', sans-serif",
            }} 
            className="text-3xl text-pastel-blue-text font-extrabold tracking-wide"
            >
              Ikigai
              <span className="text-pastel-pink-text"> Carry</span>
            </span>
        </div>
        <SidebarSection
          title="Main Menu"
          items={adminNavItems}
        />

        <SidebarSection
          title="Others"
          items={publicNavItems}
        />

      </div>
      <div className="p-3 border-t border-slate-200">
        <UserMenu />
      </div>
    </aside>
    </>
  )
}

export default Sidebar