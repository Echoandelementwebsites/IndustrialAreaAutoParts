"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { trackEvent } from "@/lib/actions";

interface WhatsAppButtonProps {
  productName: string;
  productMake: string;
  price: number; // or string formatted
  waNumber: string;
  productId: string;
  whatsappMessage: string;
}

export function WhatsAppButton({
  productName,
  productMake,
  price,
  waNumber,
  productId,
  whatsappMessage
}: WhatsAppButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Track event
    await trackEvent("whatsapp_click", productId, {
      productName,
      productMake,
      price,
    });

    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    setIsLoading(false);
  };

  return (
    <Button
      size="lg"
      className="w-full gap-2 text-lg h-14 bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg shadow-green-100 hover:shadow-green-200 border-none rounded-full"
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-6 w-6 animate-spin" />
      ) : (
        <MessageCircle className="h-6 w-6" />
      )}
      Order via WhatsApp
    </Button>
  );
}
