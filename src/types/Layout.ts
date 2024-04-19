import { MenuItem } from "primereact/menuitem";

export interface NavLink {
  id: string;
  link?: string;
  title: string;
  icon?: string;
  visibility:
    | "public"
    | "authenticated"
    | "unauthenticated"
    | "authenticatedSidebar"
    | "hidden";
  onClick?: any;
  className?: string;
  items?: MenuItem[];
}
