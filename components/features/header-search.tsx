"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function HeaderSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative hidden md:block max-w-sm w-full">
      <input
        type="search"
        placeholder="Search for parts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-full bg-white/10 px-4 py-2 pl-10 text-sm text-white placeholder-gray-400 outline-none ring-1 ring-white/20 focus:ring-white/40 focus:bg-white/20 transition-all"
      />
      <button
        type="submit"
        className="absolute left-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors"
        aria-label="Search"
      >
        <Search className="h-4 w-4" />
      </button>
    </form>
  );
}
