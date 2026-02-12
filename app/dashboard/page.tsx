import { db } from "@/lib/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { deleteProduct } from "@/lib/actions";

export default async function DashboardPage() {
  const allProducts = await db.select().from(products).orderBy(desc(products.createdAt));

  return (
    <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-ease">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium">Qty</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {allProducts.length === 0 ? (
               <tr>
                 <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No products found. Add one!</td>
               </tr>
            ) : (
              allProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 max-w-[200px] truncate" title={product.name}>{product.name}</td>
                  <td className="px-6 py-4"><Badge variant="secondary">{product.category}</Badge></td>
                  <td className="px-6 py-4">${product.price}</td>
                  <td className="px-6 py-4">{product.quantity}</td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <Link href={`/dashboard/edit/${product.id}`}>
                      <Button size="sm" variant="outline">Edit</Button>
                    </Link>
                    <form action={deleteProduct}>
                      <input type="hidden" name="id" value={product.id} />
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100">Delete</Button>
                    </form>
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
