import SidebarItem from "./SidebarItem";

import type { SidebarSectionProps } from "@/types/sidebar";

const SidebarSection = ({
  title,
  items,
}: SidebarSectionProps) => {
  return (
    <div className="space-y-1">
      <p className="px-3 text-sm font-light text-slate-400 mb-2">
        {title}
      </p>

      {items.map((item) => (
        <SidebarItem
          key={item.path}
          item={item}
        />
      ))}
    </div>
  );
};

export default SidebarSection;