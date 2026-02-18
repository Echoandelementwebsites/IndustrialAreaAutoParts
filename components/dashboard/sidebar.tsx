"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Package, PlusCircle, ExternalLink } from "lucide-react";

const navItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Inventory",
    href: "/dashboard/inventory",
    icon: Package,
  },
  {
    title: "Add Product",
    href: "/dashboard/add",
    icon: PlusCircle,
  },
];

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside className={cn("flex h-full flex-col bg-white/80 backdrop-blur-xl border-r border-gray-100", className)}>
      <div className="p-6 border-b border-gray-50">
        <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-[#FFCD11] flex items-center justify-center text-black font-black text-xs">
            IASP
          </span>
          Admin
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-black text-white shadow-md shadow-gray-200"
                  : "text-gray-500 hover:bg-gray-50 hover:text-black"
              )}
            >
              <Icon size={18} className={isActive ? "text-white" : "text-gray-400"} />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-50">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-black transition-all"
        >
          <ExternalLink size={18} className="text-gray-400" />
          View Live Site
        </Link>
      </div>
    </aside>
  );
}
