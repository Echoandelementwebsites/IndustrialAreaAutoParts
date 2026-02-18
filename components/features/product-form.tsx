"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import Image from "next/image";
import { Upload, Check, X } from "lucide-react";
import { products } from "@/db/schema";
import { cn } from "@/lib/utils";

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
        <div className="bg-white p-6 rounded-3xl shadow-ease space-y-4">
            <h3 className="text-gray-500 uppercase text-xs font-bold tracking-wider">Media</h3>
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-4 hover:bg-gray-50 transition-colors">
                <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default"}
                    onSuccess={onUpload}
                >
                    {({ open }) => {
                        return (
                            <div
                                onClick={() => open()}
                                className="flex flex-col items-center justify-center cursor-pointer min-h-[200px]"
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

function SelectField({ label, name, options, defaultValue, placeholder }: { label: string, name: string, options: string[], defaultValue?: string, placeholder: string }) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">{label}</label>
            <select
                name={name}
                defaultValue={defaultValue || ""}
                className="flex h-11 w-full rounded-xl bg-gray-50 px-4 py-2 text-sm ring-offset-background border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-gray-900"
                required
            >
                <option value="" disabled>{placeholder}</option>
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
        </div>
    );
}

function BasicInfoSection({ initialData }: { initialData?: Product }) {
    const modelDefault = Array.isArray(initialData?.model) ? initialData.model.join(", ") : (initialData?.model || "");

    return (
        <div className="bg-white p-6 rounded-3xl shadow-ease space-y-6">
            <h3 className="text-gray-500 uppercase text-xs font-bold tracking-wider">Basic Info</h3>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Product Name</label>
                <Input name="name" defaultValue={initialData?.name} required placeholder="e.g. Engine Block" className="rounded-xl h-11" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <SelectField
                    label="Category"
                    name="category"
                    options={CATEGORIES}
                    defaultValue={initialData?.category}
                    placeholder="Select Category"
                />
                <SelectField
                    label="Make"
                    name="make"
                    options={MAKES}
                    defaultValue={initialData?.make}
                    placeholder="Select Make"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Model(s)</label>
                    <Input
                        name="model"
                        defaultValue={modelDefault}
                        required
                        placeholder="e.g. Corolla, Camry"
                        className="rounded-xl h-11"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Year</label>
                    <Input name="year" type="number" defaultValue={initialData?.year} required placeholder="2024" className="rounded-xl h-11" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Description</label>
                <Textarea
                    name="description"
                    defaultValue={initialData?.description}
                    required
                    placeholder="Enter detailed product description..."
                    className="min-h-[120px] rounded-xl border-gray-200 focus:ring-[#FFCD11]"
                />
            </div>
        </div>
    );
}

function InventoryPricingSection({ initialData }: { initialData?: Product }) {
    const [inStock, setInStock] = useState(initialData?.inStock ?? true);

    return (
        <div className="bg-white p-6 rounded-3xl shadow-ease space-y-6">
             <h3 className="text-gray-500 uppercase text-xs font-bold tracking-wider">Inventory & Pricing</h3>

             <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Price (KES)</label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">Ksh</span>
                    <Input
                        name="price"
                        type="number"
                        step="0.01"
                        defaultValue={initialData?.price}
                        required
                        placeholder="1000.00"
                        className="rounded-xl h-11 pl-12"
                    />
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900">Stock Status</label>
                <input type="hidden" name="inStock" value={inStock ? "true" : "false"} />
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => setInStock(true)}
                        className={cn(
                            "flex-1 py-3 px-4 rounded-xl border-2 flex items-center justify-center gap-2 transition-all font-medium",
                            inStock
                                ? "border-green-500 bg-green-50 text-green-700 shadow-sm"
                                : "border-gray-100 bg-white text-gray-500 hover:border-gray-200"
                        )}
                    >
                        <Check className="w-4 h-4" />
                        In Stock
                    </button>
                    <button
                        type="button"
                        onClick={() => setInStock(false)}
                        className={cn(
                            "flex-1 py-3 px-4 rounded-xl border-2 flex items-center justify-center gap-2 transition-all font-medium",
                            !inStock
                                ? "border-red-500 bg-red-50 text-red-700 shadow-sm"
                                : "border-gray-100 bg-white text-gray-500 hover:border-gray-200"
                        )}
                    >
                        <X className="w-4 h-4" />
                        Out of Stock
                    </button>
                </div>
            </div>
        </div>
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
    <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    {initialData ? `Editing: ${initialData.name}` : "Add New Product"}
                </h1>
                {initialData && (
                    <p className="text-gray-500 text-sm mt-1">
                        Last updated on {new Date().toLocaleDateString()}
                    </p>
                )}
            </div>
        </div>

        <form action={action} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}
                <BasicInfoSection initialData={initialData} />
            </div>

            <div className="lg:col-span-1 space-y-8">
                <InventoryPricingSection initialData={initialData} />
                <ProductImageUpload imageUrl={imageUrl} onUpload={handleUpload} />

                <Button
                    type="submit"
                    className="w-full bg-[#FFCD11] text-black font-bold hover:bg-[#E6B800] h-12 rounded-xl transition-all shadow-md active:scale-95 text-lg"
                >
                    {initialData ? "Save Changes" : "Publish Product"}
                </Button>
            </div>
        </form>
    </div>
  );
}
