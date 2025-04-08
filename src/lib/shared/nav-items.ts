import { BookOpenText, type LucideIcon, PanelsTopLeft } from "lucide-react";

export const navItems = [
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

export type TNavItems = {
  name: string;
  url: string;
  icon: LucideIcon;
}[];
