"use client";

import { SidebarIcon } from "lucide-react";

import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-[3.5rem] w-full items-center gap-2 px-4">
        <Button
          className="size-8 cursor-pointer"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon className="size-4" />
        </Button>
        <div className="w-full sm:ml-auto sm:w-auto">Search Form</div>
      </div>
    </header>
  );
}
