import { db } from "@/lib/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { WhatsAppButton } from "@/components/features/whatsapp-button";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  if (!id || id.length !== 36) return { title: "Product Not Found" };

  try {
    const product = await db.query.products.findFirst({
      where: eq(products.id, id),
    });

    if (!product) {
      return { title: "Product Not Found" };
    }

    return {
      title: `${product.name} | Industrial Area Spare Parts`,
      description: `Buy ${product.name} for ${product.make}. Best price: ${formatCurrency(Number(product.price))}.`,
    };
  } catch (error) {
    console.error("Metadata generation error:", error);
    return { title: "Error" };
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  if (!id || id.length !== 36) notFound();

  let product;
  try {
     product = await db.query.products.findFirst({
       where: eq(products.id, id),
     });
  } catch (e) {
     console.error("DB Error:", e);
     notFound();
  }

  if (!product) {
    notFound();
  }

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "1234567890";
  const whatsappMessage = `Hi, I am interested in ${product.name} for ${product.make} listed at ${formatCurrency(Number(product.price))}.`;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://industrial-parts.com";

  return (
    <div className="container mx-auto px-4 py-12 max-w-[1440px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-gray-100 shadow-ease">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
               <Badge>{product.category}</Badge>
               {product.quantity > 0 ? (
                 <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md">In Stock</span>
               ) : (
                 <span className="text-sm font-medium text-red-600 bg-red-50 px-2 py-1 rounded-md">Out of Stock</span>
               )}
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 leading-tight">{product.name}</h1>
            <div className="mt-4 flex items-center gap-4 text-gray-500 text-lg">
               <span className="font-semibold text-gray-900">{product.make}</span>
               <span>•</span>
               <span>{product.year}</span>
            </div>
          </div>

          <div className="text-4xl font-bold text-gray-900">
            {formatCurrency(Number(product.price))}
          </div>

          <div className="prose prose-lg prose-gray max-w-none">
            <h3 className="font-semibold text-gray-900 mb-2">Compatible Models</h3>
            <p className="text-gray-600">{Array.isArray(product.model) ? product.model.join(", ") : product.model}</p>
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <WhatsAppButton
              productName={product.name}
              productMake={product.make}
              price={Number(product.price)}
              waNumber={waNumber}
              productId={product.id}
              whatsappMessage={whatsappMessage}
            />
            <p className="mt-4 text-sm text-center text-gray-500">
              Direct negotiation with our sales team. Fast response guaranteed.
            </p>
          </div>
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            image: [product.imageUrl],
            description: `Buy ${product.name} for ${product.make}. Best price: ${formatCurrency(Number(product.price))}.`,
            brand: {
              "@type": "Brand",
              name: product.make,
            },
            offers: {
              "@type": "Offer",
              url: `${baseUrl}/products/${product.id}`,
              priceCurrency: "USD",
              price: product.price,
              availability: product.quantity > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              itemCondition: "https://schema.org/NewCondition",
            },
          }),
        }}
      />
    </div>
  );
}
