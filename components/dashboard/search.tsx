"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export function SearchBar({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query")?.toString() || "");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (searchTerm) {
        params.set("query", searchTerm);
      } else {
        params.delete("query");
      }
      startTransition(() => {
        replace(`${pathname}?${params.toString()}`);
      });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, pathname, replace, searchParams]);

  return (
    <div className="relative flex-1 md:grow-0">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        className="w-full rounded-2xl bg-white pl-10 md:w-[300px] lg:w-[360px] shadow-sm border-gray-200 focus-visible:ring-black/5 focus-visible:border-gray-400 h-11 transition-all"
        placeholder={placeholder}
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
    </div>
  );
}
