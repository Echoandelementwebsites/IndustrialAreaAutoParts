"use client";

import { formatCurrency } from "@/lib/utils";
import { WhatsAppButton } from "@/components/features/whatsapp-button";

interface StickyActionBarProps {
  price: number;
  productName: string;
  productMake: string;
  productId: string;
  waNumber: string;
  whatsappMessage: string;
}

export function StickyActionBar({
  price,
  productName,
  productMake,
  productId,
  waNumber,
  whatsappMessage,
}: StickyActionBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-4 border-t border-gray-100 bg-white px-4 py-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:hidden">
      <div className="flex flex-col min-w-max">
        <span className="text-xs font-medium text-gray-500">Price</span>
        <span className="text-xl font-bold text-gray-900 leading-none">
          {formatCurrency(price)}
        </span>
      </div>
      <div className="flex-1">
        <WhatsAppButton
          productName={productName}
          productMake={productMake}
          price={price}
          productId={productId}
          waNumber={waNumber}
          whatsappMessage={whatsappMessage}
        />
      </div>
    </div>
  );
}
