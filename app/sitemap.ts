import { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { products } from "@/db/schema";

type Product = typeof products.$inferSelect;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Handle DB connection issues gracefully during build time if static
  let allProducts: Product[] = [];
  try {
     allProducts = await db.select().from(products);
  } catch (e) {
     console.error("Sitemap generation failed to fetch products", e);
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.4wdspareparts.co.ke";

  const productEntries: MetadataRoute.Sitemap = allProducts.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(product.createdAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/request-part`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/return-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...productEntries,
  ];
}
