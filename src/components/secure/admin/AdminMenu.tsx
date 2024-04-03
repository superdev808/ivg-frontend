"use client";

import classNames from "classnames/bind";

import styles from "./Admin.module.scss";

const cx = classNames.bind(styles);

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
    <div className="text-2xl font-semibold mb-5 text-dark-green">
      Administrator Settings
    </div>
    <div className="flex flex-column gap-4">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={cx(
            "menuLink",
            "flex align-items-center gap-2 cursor-pointer text-lg w-fit",
            {
              "menuLink--active": active === item.id,
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
