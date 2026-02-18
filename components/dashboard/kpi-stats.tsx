import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, AlertTriangle, MousePointerClick } from "lucide-react";

interface KpiStatsProps {
  totalProducts: number;
  outOfStockCount: number;
  totalClicks: number;
}

export function KpiStats({ totalProducts, outOfStockCount, totalClicks }: KpiStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="rounded-3xl shadow-ease border-gray-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Total Products
          </CardTitle>
          <Package className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProducts}</div>
          <p className="text-xs text-gray-500 mt-1">
            Active items in inventory
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-3xl shadow-ease border-gray-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Out of Stock
          </CardTitle>
          <AlertTriangle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{outOfStockCount}</div>
          <p className="text-xs text-gray-500 mt-1">
            Products unavailable
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-3xl shadow-ease border-gray-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            WhatsApp Clicks
          </CardTitle>
          <MousePointerClick className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{totalClicks}</div>
          <p className="text-xs text-gray-500 mt-1">
            Total interest shown
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
