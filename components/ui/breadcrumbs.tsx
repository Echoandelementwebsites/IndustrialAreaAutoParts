import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://industrial-parts.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${baseUrl}/`
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        item: `${baseUrl}${item.href}`,
      }))
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-gray-500 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <Link
          href="/"
          className="flex items-center hover:text-gray-900 transition-colors"
        >
          <Home className="h-4 w-4" />
          <span className="sr-only">Home</span>
        </Link>

        {items.map((item, index) => (
          <div key={item.href} className="flex items-center gap-1.5">
            <ChevronRight className="h-4 w-4 text-gray-300 flex-shrink-0" />
            {index === items.length - 1 ? (
              <span
                className="font-medium text-gray-900 line-clamp-1"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-gray-900 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}
