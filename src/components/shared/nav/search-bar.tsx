import { Search } from "lucide-react";
import React from "react";

import { Label } from "@/components/ui/label";
import { SidebarInput } from "@/components/ui/sidebar";

// TODO: add search login
export function SearchBar({ ...props }: React.ComponentProps<"form">) {
  return (
    <form {...props}>
      <div className="relative">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <SidebarInput
          id="search"
          placeholder="Search project or publication titles..."
          className="h-8 pl-7 md:min-w-2xs"
        />
        <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
      </div>
    </form>
  );
}
