"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CldUploadWidget } from "next-cloudinary";
import { Upload, Loader2, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useGarage } from "@/lib/hooks/use-garage";

interface RequestFormData {
  make: string;
  model: string;
  year: string;
  partName: string;
  imageUrl: string;
}

function useRequestForm(initialData: { make: string; model: string; year: string }) {
  const [formData, setFormData] = useState<RequestFormData>({
    make: "",
    model: "",
    year: "",
    partName: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData((prev) => {
          if ((!prev.make && initialData.make) || (!prev.model && initialData.model) || (!prev.year && initialData.year)) {
             return {
                ...prev,
                make: prev.make || initialData.make,
                model: prev.model || initialData.model,
                year: prev.year || initialData.year,
             };
          }
          return prev;
      });
  }, [initialData.make, initialData.model, initialData.year]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.make) newErrors.make = "Make is required";
    if (!formData.model) newErrors.model = "Model is required";
    if (!formData.year) newErrors.year = "Year is required";
    if (!formData.partName) newErrors.partName = "Part Name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateField = (field: keyof RequestFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  return { formData, errors, validate, updateField, setFormData };
}

function PhotoUploadField({ imageUrl, onUpload }: { imageUrl: string; onUpload: (url: string) => void }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpload = (result: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (result.event === "success" || (result.info && (result.info as any).secure_url)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onUpload((result.info as any).secure_url);
    }
  };

  return (
          <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">Photo (Optional)</label>
          <div className="border-2 border-dashed border-gray-200 rounded-2xl p-4 hover:bg-gray-50 transition-colors">
            <CldUploadWidget
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default"}
              onSuccess={handleUpload}
            >
              {({ open }) => {
                return (
                  <div
                    onClick={() => open()}
                    className="flex flex-col items-center justify-center cursor-pointer min-h-[120px]"
                  >
                    {imageUrl ? (
                      <div className="relative w-full h-40 rounded-xl overflow-hidden">
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
        </div>
  );
}

function RequestForm({
  initialData,
  isLoading,
  onSubmit
}: {
  initialData: { make: string; model: string; year: string };
  isLoading: boolean;
  onSubmit: (data: RequestFormData) => void
}) {
  const { formData, errors, validate, updateField, setFormData } = useRequestForm(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  return (
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-ease border border-gray-100 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Make</label>
            <Input
              value={formData.make}
              onChange={(e) => updateField("make", e.target.value)}
              className={errors.make ? "border-red-500 focus-visible:ring-red-500" : ""}
              placeholder="e.g. Toyota"
            />
            {errors.make && <p className="text-sm text-red-500">{errors.make}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Model</label>
            <Input
              value={formData.model}
              onChange={(e) => updateField("model", e.target.value)}
              className={errors.model ? "border-red-500 focus-visible:ring-red-500" : ""}
              placeholder="e.g. Corolla"
            />
             {errors.model && <p className="text-sm text-red-500">{errors.model}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">Year</label>
          <Input
            type="number"
            value={formData.year}
            onChange={(e) => updateField("year", e.target.value)}
            className={errors.year ? "border-red-500 focus-visible:ring-red-500" : ""}
            placeholder="e.g. 2020"
          />
           {errors.year && <p className="text-sm text-red-500">{errors.year}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">Part Name</label>
          <Input
            value={formData.partName}
            onChange={(e) => updateField("partName", e.target.value)}
            className={errors.partName ? "border-red-500 focus-visible:ring-red-500" : ""}
            placeholder="e.g. Left Headlight"
          />
           {errors.partName && <p className="text-sm text-red-500">{errors.partName}</p>}
        </div>

        <PhotoUploadField
            imageUrl={formData.imageUrl}
            onUpload={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
        />

        <Button type="submit" size="lg" className="w-full h-12 text-lg gap-2" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Redirecting...
            </>
          ) : (
            <>
              <MessageCircle className="h-5 w-5" />
              Request via WhatsApp
            </>
          )}
        </Button>
      </form>
  );
}

export default function RequestPartPage() {
  const { car } = useGarage();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: RequestFormData) => {
    setIsLoading(true);

    // Simulate a small delay for better UX or tracking
    await new Promise((resolve) => setTimeout(resolve, 800));

    const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "1234567890";
    let message = `Hi, I need a ${data.partName} for a ${data.year} ${data.make} ${data.model}.`;
    if (data.imageUrl) {
      message += ` See photo: ${data.imageUrl}`;
    }

    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.location.href = url;
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Request a Part</h1>
        <p className="text-gray-500 mt-2">Can&apos;t find what you&apos;re looking for? Let us know and we&apos;ll find it for you.</p>
      </div>

      <RequestForm
        initialData={{
            make: car?.make || "",
            model: car?.model || "",
            year: car?.year ? String(car.year) : "",
        }}
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
