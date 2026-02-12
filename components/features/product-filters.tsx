"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useCallback } from "react";

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      for (const [key, value] of Object.entries(params)) {
        if (value === null || value === "") {
          current.delete(key);
        } else {
          current.set(key, value);
        }
      }

      return current.toString();
    },
    [searchParams]
  );

  const applyFilters = (formData: FormData) => {
    const q = formData.get("q") as string;
    const make = formData.get("make") as string;
    const year = formData.get("year") as string;
    const minPrice = formData.get("minPrice") as string;
    const maxPrice = formData.get("maxPrice") as string;

    const query = createQueryString({
      q,
      minPrice,
      maxPrice,
      make,
      year,
      page: "1",
    });
    router.push(`/products?${query}`);
  };

  return (
    <form action={applyFilters} className="flex flex-col gap-4 md:flex-row md:items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 w-full mb-8">
      {/* Search */}
      <div className="relative flex-1">
        <Input
          name="q"
          type="search"
          placeholder="Search products..."
          defaultValue={searchParams.get("q") || ""}
          key={searchParams.get("q")}
          className="pl-10"
        />
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
      </div>

      <div className="grid grid-cols-2 md:flex gap-2 w-full md:w-auto">
        <Input
          name="make"
          type="text"
          placeholder="Make"
          defaultValue={searchParams.get("make") || ""}
          key={`make-${searchParams.get("make")}`}
          className="w-full md:w-32"
        />
         <Input
          name="year"
          type="number"
          placeholder="Year"
          defaultValue={searchParams.get("year") || ""}
          key={`year-${searchParams.get("year")}`}
          className="w-full md:w-24"
        />
        <Input
          name="minPrice"
          type="number"
          placeholder="Min $"
          defaultValue={searchParams.get("minPrice") || ""}
          key={`min-${searchParams.get("minPrice")}`}
          className="w-full md:w-24"
        />
        <Input
          name="maxPrice"
          type="number"
          placeholder="Max $"
          defaultValue={searchParams.get("maxPrice") || ""}
          key={`max-${searchParams.get("maxPrice")}`}
          className="w-full md:w-24"
        />
      </div>

      <Button type="submit">Filter</Button>
    </form>
  );
}
