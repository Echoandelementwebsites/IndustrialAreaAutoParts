import { ProductForm } from "@/components/features/product-form";
import { createProduct } from "@/lib/actions";

export default function AddProductPage() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Add New Product</h2>
      <ProductForm action={createProduct} />
    </div>
  );
}
