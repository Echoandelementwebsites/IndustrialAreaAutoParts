"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { deleteProduct } from "@/lib/actions";
import { formatCurrency } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  category: string;
  make: string;
  model: string[];
  year: number;
  price: string;
  inStock: boolean;
  imageUrl: string;
}

export function ProductTable({ products }: { products: Product[] }) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white shadow-ease overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-medium w-[80px]">Image</th>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.length === 0 ? (
               <tr>
                 <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                   No products found matching your search.
                 </td>
               </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                          Img
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-3 font-medium text-gray-900">
                    <div className="flex flex-col">
                      <span className="truncate max-w-[200px]" title={product.name}>{product.name}</span>
                      <span className="text-xs text-gray-400 font-normal">{product.make} {product.year}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <Badge variant="secondary" className="font-normal bg-gray-100 text-gray-600 hover:bg-gray-200">
                      {product.category}
                    </Badge>
                  </td>
                  <td className="px-6 py-3">
                    {product.inStock ? (
                       <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200 font-normal shadow-none">In Stock</Badge>
                    ) : (
                       <Badge variant="destructive" className="font-normal">Out of Stock</Badge>
                    )}
                  </td>
                  <td className="px-6 py-3 font-medium text-gray-900">
                    {formatCurrency(Number(product.price))}
                  </td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <Button asChild size="icon" variant="ghost" className="h-8 w-8 text-gray-500 hover:text-blue-600 hover:bg-blue-50">
                        <Link href={`/dashboard/edit/${product.id}`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <form action={deleteProduct}>
                        <input type="hidden" name="id" value={product.id} />
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
