import { db } from "@/lib/db";
import { products, categoryEnum } from "@/db/schema";
import { and, eq, ilike, gte, lte, sql, desc } from "drizzle-orm";
import { ProductCard } from "@/components/features/product-card";
import { ProductFilters } from "@/components/features/product-filters";
import { PaginationControl } from "@/components/features/pagination-control";
import { Metadata } from "next";
import { CategoryPills } from "@/components/features/category-pills";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Product = typeof products.$inferSelect;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://industrial-parts.com";

  // Construct canonical URL
  const url = new URL(`${baseUrl}/products`);

  // Add essential parameters for canonicalization
  // We include only category and make as per requirements
  if (typeof params.category === "string") url.searchParams.set("category", params.category);
  if (typeof params.make === "string") url.searchParams.set("make", params.make);

  return {
    title: "Products | Industrial Area Spare Parts",
    description: "Browse our extensive catalog of industrial spare parts.",
    alternates: {
      canonical: url.toString(),
    },
  };
}

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

  const searchTerm = typeof params.q === "string" ? params.q : "";

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1440px]">
       <div className="mb-6 flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-gray-500">Browse our extensive catalog of industrial spare parts.</p>
       </div>

       <div className="mb-6">
         <CategoryPills />
       </div>

       <div className="mb-8">
         <ProductFilters />
       </div>

       {data.length > 0 ? (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {data.map((product) => (
             <ProductCard key={product.id} product={product} />
           ))}
         </div>
       ) : (
         <div className="flex flex-col items-center justify-center py-24 text-center bg-gray-50 rounded-3xl px-4 border border-gray-100">
           <h3 className="text-xl font-bold text-gray-900 mb-2">Can&apos;t find what you need?</h3>
           <p className="text-gray-500 mb-8 max-w-md">
             We might have it in stock but not listed online yet. Request a specific part and we&apos;ll check our inventory.
           </p>
           <Link href={`/request-part?q=${encodeURIComponent(searchTerm)}`}>
             <Button size="lg" className="rounded-xl px-8">
               Request this Part
             </Button>
           </Link>
         </div>
       )}

       {data.length > 0 && (
           <PaginationControl
             totalPages={totalPages}
             currentPage={page}
             baseUrl="/products"
             searchParams={params}
           />
       )}
    </div>
  );
}
