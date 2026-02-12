"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import { products } from "@/db/schema";

type Product = typeof products.$inferSelect;

// Hardcoded Make list
const MAKES = [
  "Toyota",
  "Nissan",
  "Mitsubishi",
  "Honda",
  "Isuzu",
  "Ford",
  "Mazda",
  "Other"
];

const CATEGORIES = [
  "Engines and Transmissions",
  "Suspension",
  "Wheels and Tires",
  "Body Panels",
  "Accessories",
  "Other"
];

interface ProductFormProps {
  initialData?: Product;
  action: (formData: FormData) => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ProductImageUpload({ imageUrl, onUpload }: { imageUrl: string; onUpload: (result: any) => void }) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Product Image</label>
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-4 hover:bg-gray-50 transition-colors">
                <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default"}
                    onSuccess={onUpload}
                >
                    {({ open }) => {
                        return (
                            <div
                                onClick={() => open()}
                                className="flex flex-col items-center justify-center cursor-pointer min-h-[150px]"
                            >
                                {imageUrl ? (
                                    <div className="relative w-full h-48 rounded-xl overflow-hidden">
                                        <Image src={imageUrl} alt="Uploaded" fill className="object-contain" />
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center text-gray-400 gap-2">
                                        <Upload className="h-8 w-8" />
                                        <span className="text-sm">Click to upload image</span>
                                    </div>
                                )}
                            </div>
                        );
                    }}
                </CldUploadWidget>
            </div>
            <input type="hidden" name="imageUrl" value={imageUrl} required />
        </div>
    );
}

function CategorySelect({ defaultValue }: { defaultValue: string }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-900">Category</label>
      <select
        name="category"
        defaultValue={defaultValue}
        className="flex h-11 w-full rounded-xl bg-gray-50 px-4 py-2 text-sm ring-offset-background border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-gray-900"
        required
      >
        <option value="" disabled>Select Category</option>
        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
    </div>
  );
}

function MakeSelect({ defaultValue }: { defaultValue: string }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-900">Make</label>
      <select
        name="make"
        defaultValue={defaultValue}
        className="flex h-11 w-full rounded-xl bg-gray-50 px-4 py-2 text-sm ring-offset-background border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-gray-900"
        required
      >
        <option value="" disabled>Select Make</option>
        {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
      </select>
    </div>
  );
}

function ProductDetailsFields({ initialData }: { initialData?: Product }) {
    return (
            <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Year</label>
                    <Input name="year" type="number" defaultValue={initialData?.year} required placeholder="2024" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Price ($)</label>
                    <Input name="price" type="number" step="0.01" defaultValue={initialData?.price} required placeholder="100.00" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Quantity</label>
                    <Input name="quantity" type="number" defaultValue={initialData?.quantity} required placeholder="1" />
                </div>
            </div>
    );
}

function ProductFields({ initialData }: { initialData?: Product }) {
    const modelDefault = Array.isArray(initialData?.model) ? initialData.model.join(", ") : (initialData?.model || "");

    return (
        <>
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Product Name</label>
                <Input name="name" defaultValue={initialData?.name} required placeholder="e.g. Engine Block" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <CategorySelect defaultValue={initialData?.category || ""} />
                <MakeSelect defaultValue={initialData?.make || ""} />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Model(s) (comma separated)</label>
                <Input
                    name="model"
                    defaultValue={modelDefault}
                    required
                    placeholder="e.g. Corolla, Camry"
                />
            </div>

            <ProductDetailsFields initialData={initialData} />
        </>
    );
}

export function ProductForm({ initialData, action }: ProductFormProps) {
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpload = (result: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (result.event === "success" || (result.info && (result.info as any).secure_url)) {
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
       setImageUrl((result.info as any).secure_url);
    }
  };

  return (
    <form action={action} className="space-y-6 max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-ease border border-gray-100">
      {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}

      <ProductFields initialData={initialData} />
      <ProductImageUpload imageUrl={imageUrl} onUpload={handleUpload} />

      <div className="pt-4">
        <Button type="submit" size="lg" className="w-full h-12 text-lg">
          {initialData ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
