"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const categories = [
  "Engines and Transmissions",
  "Suspension",
  "Wheels and Tires",
  "Body Panels",
  "Accessories",
  "Other",
];

export function CategoryPills() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (currentCategory === category) {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    // Reset pagination when filter changes
    params.delete("page");

    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
      <div className="flex gap-2 px-1">
        {categories.map((category) => {
          const isActive = currentCategory === category;
          return (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={cn(
                "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200 ring-2 ring-blue-100 ring-offset-1"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md"
              )}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
