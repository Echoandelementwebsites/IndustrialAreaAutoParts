"use client";

import { useGarage } from "@/lib/hooks/use-garage";
import { Button } from "@/components/ui/button";
import { Car, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { createPortal } from "react-dom";

export function GarageWidget() {
  const { car, saveCar, clearCar } = useGarage();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ make: "", model: "", year: "" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.make && formData.model && formData.year) {
      saveCar({
        make: formData.make,
        model: formData.model,
        year: parseInt(formData.year),
      });
      setIsOpen(false);
      setFormData({ make: "", model: "", year: "" });
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative">
            <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
                <X className="h-5 w-5" />
            </button>
          <h2 className="mb-4 text-xl font-bold text-gray-900 flex items-center gap-2">
            <Car className="h-6 w-6 text-blue-600" />
            Add Your Vehicle
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              placeholder="Make (e.g. Toyota)"
              value={formData.make}
              onChange={(e) => setFormData({ ...formData, make: e.target.value })}
              required
            />
            <Input
              placeholder="Model (e.g. Corolla)"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              required
            />
            <Input
              type="number"
              placeholder="Year (e.g. 2020)"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              required
            />
            <Button type="submit" className="w-full rounded-xl">Save to Garage</Button>
          </form>
        </div>
      </div>
  );

  if (car) {
    return (
      <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
        <Car className="h-4 w-4 text-blue-600" />
        <span className="text-sm font-medium text-blue-900">
          My {car.make} {car.model}
        </span>
        <button
          onClick={clearCar}
          className="ml-1 text-blue-400 hover:text-blue-600"
          title="Remove car"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    );
  }

  return (
    <>
      <Button variant="ghost" onClick={() => setIsOpen(true)} className="flex items-center gap-2">
        <Car className="h-5 w-5" />
        <span className="hidden md:inline">My Garage</span>
      </Button>
      {mounted && isOpen && createPortal(modalContent, document.body)}
    </>
  );
}
