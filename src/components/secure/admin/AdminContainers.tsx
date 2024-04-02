"use client";

import { useState } from "react";

import AdminAnnouncements from "./AdminAnnouncements";
import AdminMenu, { MenuItem } from "./AdminMenu";
import AdminUploadData from "./AdminUploadData";
import AdminUserManagement from "./AdminUserManagement";

const menuItems: MenuItem[] = [
  {
    id: "userManagement",
    label: "User Management",
    icon: "pi pi-fw pi-users",
  },
  { id: "auditLog", label: "Audit Log", icon: "pi pi-fw pi-book" },
  {
    id: "announcements",
    label: "Announcements",
    icon: "pi pi-fw pi-megaphone",
  },
  {
    id: "uploadData",
    label: "Upload Data",
    icon: "pi pi-fw pi-upload",
  },
];

const AdminContainers: React.FC = () => {
  const [currentSetting, setCurrentSetting] = useState(menuItems[0].id);

  const onSelect = (item: MenuItem) => {
    setCurrentSetting(item.id);
  };

  return (
    <div className="flex flex-column justify-content-center flex-grow-1">
      <div className="grid m-0 flex-grow-1 p-3">
        <div className="col-2 border-right-1">
          <AdminMenu
            active={currentSetting}
            menuItems={menuItems}
            onSelect={onSelect}
          />
        </div>

        <div className="col md:ml-6 border-round-xl">
          {currentSetting === menuItems[0].id && <AdminUserManagement />}
          {currentSetting === menuItems[1].id && (
            <div className="grid flex-grow-1">audit log</div>
          )}
          {currentSetting === menuItems[2].id && <AdminAnnouncements />}
          {currentSetting === menuItems[3].id && <AdminUploadData />}
        </div>
      </div>
    </div>
  );
};

export default AdminContainers;
