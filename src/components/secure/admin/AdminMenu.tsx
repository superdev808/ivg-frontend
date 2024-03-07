"use client";

import cx from "classnames";

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
}

export interface AdminMenuProps {
  active?: string;
  menuItems: MenuItem[];
  onSelect?: (item: MenuItem) => void;
}

const AdminMenu: React.FC<AdminMenuProps> = ({
  active,
  menuItems,
  onSelect,
}) => (
  <div>
    <div className="text-2xl font-semibold mb-5">Administrator Settings</div>
    <div className="flex flex-column gap-4">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={cx(
            "menu-item",
            "flex align-items-center gap-2 cursor-pointer text-gray-600 text-lg w-fit hover:text-primary",
            {
              "text-primary": active === item.id,
            }
          )}
          onClick={() => onSelect && onSelect(item)}
        >
          <i className={item.icon} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  </div>
);

export default AdminMenu;
