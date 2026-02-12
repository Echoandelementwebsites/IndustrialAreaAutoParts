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

  const baseUrl = "https://industrial-parts.com";

  const productEntries: MetadataRoute.Sitemap = allProducts.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
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
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...productEntries,
  ];
}
