import { getDashboardStats, getTopProducts } from "@/lib/actions";
import { KpiStats } from "@/components/dashboard/kpi-stats";
import { TopProducts } from "@/components/dashboard/top-products";

export default async function DashboardPage() {
  const stats = await getDashboardStats();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const topProducts = await getTopProducts() as any[];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-gray-500 mt-2">
            Welcome back. Here is what is happening with your store.
          </p>
        </div>
      </div>

      <KpiStats
        totalProducts={stats.totalProducts}
        outOfStockCount={stats.outOfStockCount}
        totalClicks={stats.totalClicks}
      />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-1 md:col-span-2 lg:col-span-4">
           {/* Top Products take 4 columns */}
           <TopProducts products={topProducts} />
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-3">
           {/* Placeholder for future widgets like "Recent Activity" or "Notifications" */}
           <div className="rounded-3xl border border-dashed border-gray-200 h-full min-h-[300px] flex items-center justify-center text-gray-400 p-8 text-center bg-gray-50/50">
             <div className="space-y-2">
               <p className="font-medium">More analytics coming soon</p>
               <p className="text-sm">Traffic sources, user locations, and conversion rates.</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
