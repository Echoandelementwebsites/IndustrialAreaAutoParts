import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Wrench } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="bg-gray-50 p-6 md:p-12 rounded-3xl border border-gray-100 max-w-2xl w-full shadow-sm">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-yellow-100 text-yellow-600 rounded-full">
            <Wrench className="w-12 h-12" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
          Part Not Found
        </h1>

        <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
          The spare part you are looking for may have been sold out, removed, or the link might be broken. Our inventory moves quickly!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/request-part" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-lg font-bold rounded-full shadow-md bg-[#FFCD11] text-black hover:bg-[#e6b800] transition-all">
              Request This Part
            </Button>
          </Link>

          <Link href="/products" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-6 text-lg font-bold rounded-full border-gray-300 hover:bg-gray-50 transition-all">
              <Search className="w-5 h-5 mr-2" />
              Browse Catalog
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
