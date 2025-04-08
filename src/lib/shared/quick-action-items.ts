import { BookOpenText, FolderCode, type LucideIcon } from "lucide-react";

export type TQuickActionItems = {
  name: string;
  url: string;
  icon: LucideIcon;
}[];

export const quickActionItems: TQuickActionItems = [
  {
    name: "Create Project",
    url: "/projects/create",
    icon: FolderCode,
  },
  {
    name: "Create Publication",
    url: "/publications/create",
    icon: BookOpenText,
  },
];
