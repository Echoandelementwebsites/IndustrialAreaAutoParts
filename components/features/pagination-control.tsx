import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PaginationControlProps {
  totalPages: number;
  currentPage: number;
  baseUrl: string;
  searchParams: Record<string, string | string[] | undefined>;
}

export function PaginationControl({ totalPages, currentPage, baseUrl, searchParams }: PaginationControlProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex justify-center gap-2 flex-wrap">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
        if (totalPages > 10 && Math.abs(p - currentPage) > 2 && p !== 1 && p !== totalPages) {
           if (Math.abs(p - currentPage) === 3) return <span key={p} className="px-2">...</span>;
           return null;
        }

        // filtered params
        const query: Record<string, string | string[]> = {};
        Object.entries(searchParams).forEach(([k, v]) => {
            if (v !== undefined) query[k] = v;
        });
        query.page = p.toString();

        return (
          <Button
            key={p}
            variant={p === currentPage ? "primary" : "outline"}
            size="sm"
            asChild
            className="w-10 h-10 p-0"
          >
            <Link href={{ pathname: baseUrl, query }}>
              {p}
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
