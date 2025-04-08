import { BookOpenText, type LucideIcon, PanelsTopLeft } from "lucide-react";

export type TNavItems = {
  name: string;
  url: string;
  icon: LucideIcon;
}[];

export const navItems: TNavItems = [
  {
    name: "Projects",
    url: "/projects",
    icon: PanelsTopLeft,
  },
  {
    name: "Publications",
    url: "/publications",
    icon: BookOpenText,
  },
];
