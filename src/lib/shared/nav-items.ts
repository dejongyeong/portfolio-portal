import { BookOpenText, type LucideIcon, PanelsTopLeft } from "lucide-react";

export const navItems = [
  {
    name: "Projects",
    url: "#",
    icon: PanelsTopLeft,
  },
  {
    name: "Publications",
    url: "#",
    icon: BookOpenText,
  },
];

export type TNavItems = {
  name: string;
  url: string;
  icon: LucideIcon;
}[];
