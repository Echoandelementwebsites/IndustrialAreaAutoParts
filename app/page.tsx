import Image from "next/image";
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
      <h1 className="sr-only">Premium Ex-Japan Auto Spare Parts in Nairobi, Kenya</h1>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoPartsStore",
            name: "Industrial Area Spare Parts",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Nairobi",
              addressRegion: "Nairobi County",
              addressCountry: "KE"
            },
          }),
        }}
      />
      {/* Hero Section - Floating Uncropped Banner */}
      <section className="w-full px-4 md:px-6 lg:px-8 mx-auto max-w-[1920px]">
        <div className="relative w-full rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-gray-50 flex items-center justify-center">

          {/* Uncropped Banner Image */}
          <Image
            src="/images/banner.png"
            alt="Find Your Perfect Part"
            width={1235}
            height={577} // This forces a healthy aspect ratio calculation
            className="w-full h-auto object-contain"
            priority
          />

          {/* Bottom-Centered Button */}
          {/* pointer-events-none on parent ensures image remains clickable/draggable if needed, but we restore pointer events on the button itself */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-[8%] sm:bottom-[12%] left-1/2 transform -translate-x-1/2 pointer-events-auto">
              <Link href="/products">
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg font-bold rounded-full shadow-xl bg-[#FFCD11] text-black hover:bg-[#e6b800] hover:scale-105 transition-all"
                >
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>

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
