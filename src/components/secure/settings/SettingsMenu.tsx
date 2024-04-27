"use client";
import styles from "@/components/secure/settings/Settings.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

type MenuItem = { id: string; label: string; icon: string };

export interface SettingsMenuProps {
  active?: string;
  menuItems: MenuItem[];
  onSelect?: (item: MenuItem) => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({
  active,
  menuItems,
  onSelect,
}) => (
  <div className={cx("menu")}>
    <div className={cx("menu-title")}>
      <span>Settings</span>
    </div>
    <div className="flex flex-column">
      {menuItems.map((item, index) => (
        <div
          key={`${item.id}_${index}`}
          className={cx("menu-item", { active: active === item.id })}
          onClick={() => onSelect && onSelect(item)}
        >
          <i className={cx("icon", item.icon, "mr-2 text-dark-green")} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  </div>
);

export default SettingsMenu;
