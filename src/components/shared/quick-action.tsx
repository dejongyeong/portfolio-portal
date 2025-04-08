"use client";

import { PlusCircle } from "lucide-react";
import Link from "next/link";

import { quickActionItems } from "@/lib/shared/quick-action-items";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function QuickAction() {
  return (
    <div className="mb-2 grid grid-flow-col justify-items-end-safe">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <PlusCircle />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {quickActionItems.map((item) => (
            <DropdownMenuItem
              key={item.name}
              asChild
              className="cursor-pointer"
            >
              <Link href={item.url}>
                <item.icon className="siz-4" />
                <span>{item.name}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
