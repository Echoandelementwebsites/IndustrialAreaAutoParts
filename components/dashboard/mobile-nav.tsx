"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden border-b border-gray-100 bg-white p-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <span className="w-8 h-8 rounded-lg bg-[#FFCD11] flex items-center justify-center text-black font-black text-xs">
          IASP
        </span>
        <span className="font-bold text-lg">Admin</span>
      </div>

      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
        <Menu className="h-6 w-6" />
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <div
            className="fixed inset-y-0 left-0 w-[280px] bg-white shadow-xl animate-in slide-in-from-left duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute right-4 top-4">
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <Sidebar className="h-full border-none pt-12" />
          </div>
        </div>
      )}
    </div>
  );
}
