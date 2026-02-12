import Link from "next/link";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";
import { ProductCard } from "@/components/features/product-card";

export const dynamic = "force-dynamic";

type Product = typeof products.$inferSelect;

// Categories list
const CATEGORIES = [
  "Engines and Transmissions",
  "Suspension",
  "Wheels and Tires",
  "Body Panels",
  "Accessories",
  "Other"
];

export default async function Home() {
  // Gracefully handle if DB is empty or connection fails during build (if static)
  // But this is dynamic.
  let newArrivals: Product[] = [];
  try {
     newArrivals = await db.select().from(products).orderBy(desc(products.createdAt)).limit(9);
  } catch (e) {
     console.error("Failed to fetch products:", e);
  }

  return (
    <div className="flex flex-col gap-16 py-12">
      {/* Hero Section */}
      <section className="container mx-auto px-4 max-w-[1440px]">
        <div className="relative overflow-hidden rounded-3xl bg-gray-900 text-white shadow-ease">
           <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10" />
           <div
             className="absolute inset-0 bg-cover bg-center opacity-50"
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486262715619-01b80250e0dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" }}
           />
           <div className="relative z-20 flex flex-col items-start gap-6 p-12 md:p-24">
             <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Premium Auto Parts for Your Business</h1>
             <p className="max-w-xl text-lg text-gray-200">
               Find the highest quality industrial spare parts. Engines, suspensions, body panels and more.
             </p>
             <Link href="/products">
               <Button size="lg" className="text-lg bg-white text-gray-900 hover:bg-gray-100 border-none">Shop Now</Button>
             </Link>
           </div>
        </div>
      </section>

      {/* Services Carousel / Categories */}
      <section className="container mx-auto px-4 max-w-[1440px]">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link key={cat} href={`/products?category=${encodeURIComponent(cat)}`} className="block h-full">
              <div className="group flex h-32 flex-col items-center justify-center rounded-2xl bg-white shadow-ease transition-all hover:scale-[1.05] hover:shadow-ease-hover cursor-pointer border border-transparent hover:border-blue-100 text-center p-4">
                <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{cat}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4 max-w-[1440px]">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">New Arrivals</h2>
          <Link href="/products">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        {newArrivals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No products found. Check back soon!
          </div>
        )}
      </section>
    </div>
  );
}
