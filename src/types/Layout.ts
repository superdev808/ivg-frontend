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
}
