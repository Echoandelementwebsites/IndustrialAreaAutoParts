import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  make: string;
  model: string[];
  inStock: boolean;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="group block h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-ease transition-all hover:scale-[1.02] hover:shadow-ease-hover">
        <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-2 flex items-center justify-between">
            <Badge variant="secondary" className="font-normal text-xs uppercase tracking-wider">
              {product.make}
            </Badge>
            {product.inStock ? (
               <span className="text-xs text-green-600 font-medium">In Stock</span>
            ) : (
               <span className="text-xs text-red-600 font-medium">Out of Stock</span>
            )}
          </div>
          <h3 className="mb-1 text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-[#E6B800] transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-1 mb-4">
            {Array.isArray(product.model) ? product.model.join(", ") : product.model}
          </p>
          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900">
              {formatCurrency(Number(product.price))}
            </span>
             <span className="text-sm text-[#E6B800] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                View Details
             </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
