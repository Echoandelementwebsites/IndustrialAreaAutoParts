import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import { ShieldCheck, Truck, Wrench, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Industrial Area Spare Parts Nairobi",
  description: "Learn about Nairobi's premier supplier of genuine ex-Japan auto parts. Located in Industrial Area, we provide high-quality engines, suspension, and body panels.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-16 py-12">
      {/* Hero Section */}
      <section className="container mx-auto px-4 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              Nairobi's Trusted Source for <span className="text-[#FFCD11]">Premium Ex-Japan</span> Auto Parts.
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Located in the heart of Nairobi's Industrial Area, we specialize in importing and distributing high-quality, low-mileage auto parts directly from Japan. Whether you are a professional mechanic or a car owner looking for reliable replacements, we have the inventory and expertise to keep you on the road.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/products">
                <Button size="lg" className="px-8 bg-[#FFCD11] text-black hover:bg-[#e6b800] rounded-full font-bold shadow-md">
                  Browse Catalog
                </Button>
              </Link>
              <Link href="/request-part">
                <Button size="lg" variant="outline" className="px-8 rounded-full font-bold border-gray-300">
                  Request a Part
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-ease">
            {/* Note: Developer, ensure you have a generic placeholder or actual image at this path */}
            <Image
              src="/images/Hero.jpg"
              alt="Industrial Area Spare Parts Warehouse"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-gray-600">We take the guesswork out of buying spare parts by ensuring every component meets our strict quality standards.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<ShieldCheck className="w-8 h-8 text-[#FFCD11]" />}
              title="Genuine Ex-Japan"
              description="Direct imports guaranteeing low mileage, rust-free, and high-performance original components."
            />
            <FeatureCard
              icon={<Wrench className="w-8 h-8 text-[#FFCD11]" />}
              title="Expert Knowledge"
              description="Our team understands cars. We ensure you get the exact fit for your specific make and model year."
            />
            <FeatureCard
              icon={<Truck className="w-8 h-8 text-[#FFCD11]" />}
              title="Fast Dispatch"
              description="Quick delivery across Nairobi and reliable shipping arrangements to other counties in Kenya."
            />
            <FeatureCard
              icon={<Clock className="w-8 h-8 text-[#FFCD11]" />}
              title="Sourcing Service"
              description="Can't find it in our catalog? Use our Request-a-Part service and we will source it for you."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-4 hover:shadow-ease transition-all">
      <div className="p-4 bg-gray-50 rounded-2xl">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
