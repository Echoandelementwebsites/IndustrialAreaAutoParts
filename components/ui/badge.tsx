import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "destructive";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFCD11] focus:ring-offset-2",
        {
          "border-transparent bg-[#FFCD11] text-black hover:bg-[#E6B800]":
            variant === "default",
          "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200":
            variant === "secondary",
          "border-transparent bg-red-600 text-white hover:bg-red-700":
            variant === "destructive",
          "border-gray-200 text-gray-900": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
