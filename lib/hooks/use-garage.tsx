"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface Car {
  make: string;
  model: string;
  year: number;
}

interface GarageContextType {
  car: Car | null;
  saveCar: (car: Car) => void;
  clearCar: () => void;
  isLoading: boolean;
}

const GarageContext = createContext<GarageContextType | undefined>(undefined);

export function GarageProvider({ children }: { children: ReactNode }) {
  const [car, setCar] = useState<Car | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("my-garage");
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCar(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse garage data", e);
      }
    }
    setIsLoading(false);
  }, []);

  const saveCar = (newCar: Car) => {
    setCar(newCar);
    localStorage.setItem("my-garage", JSON.stringify(newCar));
  };

  const clearCar = () => {
    setCar(null);
    localStorage.removeItem("my-garage");
  };

  return (
    <GarageContext.Provider value={{ car, saveCar, clearCar, isLoading }}>
      {children}
    </GarageContext.Provider>
  );
}

export function useGarage() {
  const context = useContext(GarageContext);
  if (context === undefined) {
    throw new Error("useGarage must be used within a GarageProvider");
  }
  return context;
}
