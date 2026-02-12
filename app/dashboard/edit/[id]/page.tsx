import { ProductForm } from "@/components/features/product-form";
import { updateProduct } from "@/lib/actions";
import { db } from "@/lib/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id || id.length !== 36) notFound();

  const product = await db.query.products.findFirst({
    where: eq(products.id, id),
  });

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Edit Product</h2>
      <ProductForm initialData={product} action={updateProduct} />
    </div>
  );
}
