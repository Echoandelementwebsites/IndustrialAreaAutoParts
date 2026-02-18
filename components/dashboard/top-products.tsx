import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, MousePointerClick } from "lucide-react";

interface TopProductsProps {
  products: {
    productId: string | null;
    productName: string | null;
    productCategory: string | null;
    clickCount: number;
  }[];
}

export function TopProducts({ products }: TopProductsProps) {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-3 rounded-3xl shadow-ease border-gray-100">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-xl font-bold">Top Interest Products</CardTitle>
        <Link
          href="/dashboard/inventory"
          className="text-sm font-medium text-gray-500 hover:text-black flex items-center gap-1 transition-colors"
        >
          View Inventory <ArrowRight className="h-4 w-4" />
        </Link>
      </CardHeader>
      <CardContent>
        {products.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No click data available yet.
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product, index) => (
              <div
                key={product.productId || index}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-bold text-gray-600">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.productName || "Unknown Product"}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="secondary" className="text-xs font-normal">
                        {product.productCategory || "Uncategorized"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <MousePointerClick className="h-4 w-4" />
                  <span className="font-bold">{product.clickCount}</span>
                  <span className="text-sm text-gray-400 hidden sm:inline">clicks</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
