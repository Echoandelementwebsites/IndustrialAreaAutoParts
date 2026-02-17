import { ProductsGridSkeleton } from "@/components/ui/skeletons";

export default function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-[1440px]">
       <div className="mb-8 flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-gray-500">Browse our extensive catalog of industrial spare parts.</p>
       </div>

       {/* Approximate height for pills + filters */}
       <div className="space-y-6 mb-8">
           <div className="h-10 w-full overflow-hidden">
             <div className="flex gap-2">
                {[1,2,3,4,5].map(i => (
                    <div key={i} className="h-9 w-24 bg-gray-100 rounded-full animate-pulse" />
                ))}
             </div>
           </div>
           <div className="h-20 w-full bg-gray-100 rounded-xl animate-pulse" />
       </div>

       <ProductsGridSkeleton />
    </div>
  );
}
