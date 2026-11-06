import type { NavItem } from "@/types/sidebar";
import { NavLink } from "react-router-dom";

const SidebarItem = ({ item }: { item: NavItem}) => {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
          isActive
            ? "bg-blue-50 text-pastel-blue-dark"
            : "text-slate-600 hover:bg-blue-50 hover:text-pastel-blue-dark"
        }`
      }
    >
      <Icon size={15} strokeWidth={2.5} />
      <span>{item.label}</span>
    </NavLink>
  );
};

export default SidebarItem;