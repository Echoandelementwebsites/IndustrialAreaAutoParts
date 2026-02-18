import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFCD11] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-[#FFCD11] text-black hover:bg-[#E6B800] active:scale-[0.98] shadow-sm":
              variant === "primary",
            "border-2 border-gray-200 bg-transparent text-gray-900 hover:bg-gray-50 active:scale-[0.98]":
              variant === "secondary",
            "border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900":
              variant === "outline",
            "hover:bg-gray-100 hover:text-gray-900": variant === "ghost",
            "text-[#FFCD11] underline-offset-4 hover:underline": variant === "link",
            "h-11 px-8 py-2": size === "default",
            "h-9 rounded-full px-4": size === "sm",
            "h-14 rounded-full px-10 text-base": size === "lg",
            "h-11 w-11": size === "icon",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
