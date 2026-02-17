export function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-ease">
      {/* Image Skeleton */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100 animate-pulse" />

      {/* Content Skeleton */}
      <div className="flex flex-1 flex-col p-6 gap-4">
        {/* Badge & Stock Status */}
        <div className="flex items-center justify-between">
           <div className="h-4 w-20 bg-gray-100 rounded-full animate-pulse" />
           <div className="h-4 w-16 bg-gray-100 rounded-full animate-pulse" />
        </div>

        {/* Title */}
        <div className="space-y-2">
            <div className="h-6 w-3/4 bg-gray-100 rounded animate-pulse" />
            <div className="h-6 w-1/2 bg-gray-100 rounded animate-pulse" />
        </div>

        {/* Description */}
        <div className="h-4 w-full bg-gray-100 rounded animate-pulse mt-2" />

        {/* Price & Action */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="h-8 w-24 bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function ProductsGridSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    );
}
