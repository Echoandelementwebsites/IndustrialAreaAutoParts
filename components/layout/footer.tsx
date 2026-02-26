import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black py-12 text-sm text-white">
      <div className="container mx-auto px-4 max-w-[1440px] flex flex-col items-center gap-8">

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 font-medium text-gray-300">
          <Link href="/" className="hover:text-[#FFCD11] transition-colors">
            Home
          </Link>
          <Link href="/products" className="hover:text-[#FFCD11] transition-colors">
            Products
          </Link>
          <Link href="/about" className="hover:text-[#FFCD11] transition-colors">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-[#FFCD11] transition-colors">
            Contact Us
          </Link>
          <Link href="/request-part" className="hover:text-[#FFCD11] transition-colors">
            Request a Part
          </Link>
        </nav>

        {/* Secondary Navigation */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-500">
          <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/return-policy" className="hover:text-gray-300 transition-colors">
            Return & Warranty Policy
          </Link>
        </nav>

        {/* Copyright */}
        <p className="text-gray-500 text-center">
          &copy; {new Date().getFullYear()} 4WD AutoSpares. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
