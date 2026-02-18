import { db } from "@/lib/db";
import { products } from "@/db/schema";
import { desc, ilike, or } from "drizzle-orm";
import { ProductTable } from "@/components/dashboard/product-table";
import { SearchBar } from "@/components/dashboard/search";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default async function InventoryPage(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  let allProducts;
  if (query) {
    allProducts = await db
      .select()
      .from(products)
      .where(
        or(
          ilike(products.name, `%${query}%`),
          ilike(products.make, `%${query}%`)
        )
      )
      .orderBy(desc(products.createdAt));
  } else {
    allProducts = await db.select().from(products).orderBy(desc(products.createdAt));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
           <p className="text-gray-500 mt-2">Manage your products and stock levels.</p>
        </div>
        <Button asChild className="gap-2 shadow-ease hover:shadow-ease-hover transition-all">
          <Link href="/dashboard/add">
            <PlusCircle className="h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
         <div className="w-full sm:w-auto">
            <SearchBar placeholder="Search by name or make..." />
         </div>
         {/* Could add filter dropdowns here later */}
      </div>

      <ProductTable products={allProducts} />
    </div>
  );
}
