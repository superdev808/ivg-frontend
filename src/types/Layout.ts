export interface NavLink {
  id: string;
  link?: string;
  title: string;
  icon?: string;
  visibility: "public" | "authenticated" | "unauthenticated" | "hidden";
  onClick?: any;
  className?: string;
}
