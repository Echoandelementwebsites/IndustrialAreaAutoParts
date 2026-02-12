import { db } from "@/lib/db";
import { products, categoryEnum } from "@/db/schema";
import { and, eq, ilike, gte, lte, sql, desc } from "drizzle-orm";
import { ProductCard } from "@/components/features/product-card";
import { ProductFilters } from "@/components/features/product-filters";
import { PaginationControl } from "@/components/features/pagination-control";

type Product = typeof products.$inferSelect;

function buildFilterConditions(params: Record<string, string | string[] | undefined>) {
    const filters = [];
    if (typeof params.category === "string") filters.push(eq(products.category, params.category as (typeof categoryEnum.enumValues)[number]));
    if (typeof params.make === "string") filters.push(ilike(products.make, `%${params.make}%`));
    if (typeof params.year === "string") filters.push(eq(products.year, Number(params.year)));
    return filters;
}

function buildPriceConditions(params: Record<string, string | string[] | undefined>) {
    const prices = [];
    if (typeof params.minPrice === "string") prices.push(gte(products.price, params.minPrice));
    if (typeof params.maxPrice === "string") prices.push(lte(products.price, params.maxPrice));
    return prices;
}

function buildWhereConditions(params: Record<string, string | string[] | undefined>) {
  const conditions = [];
  if (typeof params.q === "string") conditions.push(ilike(products.name, `%${params.q}%`));
  conditions.push(...buildFilterConditions(params));
  conditions.push(...buildPriceConditions(params));
  return conditions;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 32;
  const offset = (page - 1) * limit;

  const whereConditions = buildWhereConditions(params);

  // Fetch data
  let data: Product[] = [];
  let count = 0;

  try {
    data = await db.select().from(products)
      .where(and(...whereConditions))
      .limit(limit)
      .offset(offset)
      .orderBy(desc(products.createdAt));

    const result = await db.select({ count: sql<number>`count(*)` })
      .from(products)
      .where(and(...whereConditions));

    count = Number(result[0]?.count || 0);
  } catch (e) {
    console.error("Failed to fetch products:", e);
  }

  const totalPages = Math.ceil(count / limit);

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1440px]">
       <div className="mb-8 flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-gray-500">Browse our extensive catalog of industrial spare parts.</p>
       </div>

       <ProductFilters />

       {data.length > 0 ? (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {data.map((product) => (
             <ProductCard key={product.id} product={product} />
           ))}
         </div>
       ) : (
         <div className="text-center py-24 text-gray-500 bg-gray-50 rounded-3xl">
           <p className="text-lg font-medium">No products found matching your criteria.</p>
           <p className="mt-2">Try adjusting your filters or search term.</p>
         </div>
       )}

       <PaginationControl
         totalPages={totalPages}
         currentPage={page}
         baseUrl="/products"
         searchParams={params}
       />
    </div>
  );
}
