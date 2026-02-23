import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Matches the sitemap baseUrl logic
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.4wdspareparts.co.ke";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
