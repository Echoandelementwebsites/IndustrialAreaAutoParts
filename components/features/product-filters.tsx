"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useCallback } from "react";
import { useGarage } from "@/lib/hooks/use-garage";

function useGarageFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { car } = useGarage();

  const isGarageActive = car &&
    searchParams.get("make") === car.make &&
    searchParams.get("year") === String(car.year);

  const toggleGarage = () => {
    if (!car) return;

    const params = new URLSearchParams(searchParams.toString());

    if (isGarageActive) {
      params.delete("make");
      params.delete("year");
    } else {
      params.set("make", car.make);
      params.set("year", String(car.year));
    }

    router.replace(`/products?${params.toString()}`);
  };

  return { isGarageActive, toggleGarage, car };
}

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isGarageActive, toggleGarage, car } = useGarageFilter();

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
    router.replace(`/products?${query}`);
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

      {car && (
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
           <button
             type="button"
             onClick={toggleGarage}
             className={`
               relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFCD11] focus-visible:ring-offset-2
               ${isGarageActive ? 'bg-[#FFCD11]' : 'bg-gray-200'}
             `}
             role="switch"
             aria-checked={!!isGarageActive}
           >
             <span className="sr-only">Use My Garage</span>
             <span
               aria-hidden="true"
               className={`
                 pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                 ${isGarageActive ? 'translate-x-6' : 'translate-x-0'}
               `}
             />
           </button>
           <div className="text-sm">
              <p className="font-medium text-gray-900">My {car.make}</p>
              <p className="text-xs text-gray-500">Show compatible parts</p>
           </div>
        </div>
      )}
    </form>
  );
}
