import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GarageWidget } from "@/components/features/garage-widget";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
           <span className="text-xl font-bold tracking-tight text-[#FFCD11]">4WD AutoSpares</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/about" className="text-sm font-medium text-white hover:text-gray-300 transition-colors">
            About
          </Link>
          <Link href="/products" className="text-sm font-medium text-white hover:text-gray-300 transition-colors">
            Our Products
          </Link>
        </nav>
        <div className="flex items-center gap-4">
           <GarageWidget />
           <Link href="/dashboard">
             <Button variant="ghost" size="sm" className="text-white hover:text-gray-300 hover:bg-white/10">Admin</Button>
           </Link>
        </div>
      </div>
    </header>
  );
}
