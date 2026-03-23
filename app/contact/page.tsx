import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us | Industrial Area Spare Parts",
  description: "Visit our shop in Industrial Area, Nairobi. Call us for engine parts, transmissions, and more.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-[1440px]">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Contact Information */}
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Visit Our Shop</h2>
            <p className="text-gray-600 mb-2">
              We are located in the heart of Nairobi&apos;s Industrial Area.
            </p>
            <address className="not-italic text-gray-800 font-medium">
              Industrial Area, Nairobi<br />
              Kenya
            </address>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Business Hours</h2>
            <ul className="text-gray-600 space-y-2">
              <li className="flex justify-between max-w-xs">
                <span>Monday - Saturday</span>
                <span className="font-medium text-gray-900">8:00 AM - 5:00 PM</span>
              </li>
              <li className="flex justify-between max-w-xs">
                <span>Sunday</span>
                <span className="font-medium text-gray-900">Closed</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <div className="space-y-2 text-gray-600">
              <p>
                <span className="font-medium text-gray-900">Phone:</span>{" "}
                <a href={`tel:${siteConfig.contact.phoneHref}`} className="hover:text-[#FFCD11] transition-colors">{siteConfig.contact.phoneDisplay}</a>
              </p>
              <p>
                <span className="font-medium text-gray-900">Email:</span>{" "}
                <a href="mailto:info@4wdspareparts.co.ke" className="hover:text-[#FFCD11] transition-colors">info@4wdspareparts.co.ke</a>
              </p>
            </div>
          </div>

          <div className="pt-4">
             <p className="text-gray-600 mb-4">
               Looking for a specific part? Request it directly and we&apos;ll check our stock.
             </p>
             <Link href="/request-part">
               <Button size="lg" className="rounded-full bg-[#FFCD11] text-black hover:bg-[#E6B800] shadow-md">
                 Request a Part
               </Button>
             </Link>
          </div>
        </div>

        {/* Right Column: Google Maps */}
        <div className="h-[400px] lg:h-auto min-h-[400px] rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-gray-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.166432857474!2d36.86208643955078!3d-1.300486399999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sIndustrial%20Area%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1709900000000!5m2!1sen!2ske"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location of Industrial Area, Nairobi"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
