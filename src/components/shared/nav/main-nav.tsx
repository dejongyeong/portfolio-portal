"use client";

import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { navItems } from "@/lib/shared/nav-items";

export function MainNav() {
  const segments = useSelectedLayoutSegments();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Portfolio</SidebarGroupLabel>
      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              tooltip={item.name}
              isActive={segments.includes(item.name.toLowerCase())}
            >
              <Link href={item.url}>
                <item.icon className="size-4" />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
