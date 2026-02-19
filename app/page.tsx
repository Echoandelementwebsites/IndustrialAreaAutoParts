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

const CATEGORY_IMAGES: Record<string, string> = {
  "Engines and Transmissions": "/images/Engines&Transmissions.jpeg",
  "Suspension": "/images/Suspension.jpeg",
  "Wheels and Tires": "/images/Wheels&Tires.jpeg",
  "Body Panels": "/images/BodyPanels.jpeg",
  "Accessories": "/images/Accessories.jpeg",
  "Other": "/images/Other.jpeg"
};

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
      <section
        className="relative w-full min-h-[60vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/banner.png')",
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/products">
            <Button size="lg" className="px-8 py-6 text-lg rounded-full shadow-xl bg-[#FFCD11] text-black hover:bg-[#e6b800] transition-all">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Services Carousel / Categories */}
      <section className="container mx-auto px-4 max-w-[1440px]">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link key={cat} href={`/products?category=${encodeURIComponent(cat)}`} className="block h-full">
              <div className="group relative flex h-32 flex-col items-center justify-center rounded-2xl overflow-hidden shadow-ease transition-all hover:scale-[1.05] hover:shadow-ease-hover cursor-pointer border border-transparent hover:border-yellow-200 text-center p-4">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${CATEGORY_IMAGES[cat]}')` }}
                />
                <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/50" />
                <span className="relative z-10 font-bold text-white text-lg drop-shadow-md">{cat}</span>
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
