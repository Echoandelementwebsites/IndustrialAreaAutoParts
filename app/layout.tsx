import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GarageProvider } from "@/lib/hooks/use-garage";
import "./globals.css";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.4wdspareparts.co.ke";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "4WD AutoSpares | Genuine Auto Parts Nairobi",
    template: "%s | 4WD AutoSpares",
  },
  description: "Find high-quality ex-Japan auto spare parts in Nairobi, Kenya. Our inventory includes engines, suspension components, body panels, and genuine accessories.",
  openGraph: {
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "./",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Use a fallback publishable key if none is provided.
  // This is critical for builds (CI) where secrets might not be present.
  // The key 'pk_test_dHJ1ZS1tb29zZS05NS5jbGVyay5hY2NvdW50cy5kZXYk' is a valid-looking dummy key
  // (base64 for "true-moose-95.clerk.accounts.dev$") that passes the SDK's format validation.
  const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_dHJ1ZS1tb29zZS05NS5jbGVyay5hY2NvdW50cy5kZXYk";

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <html lang="en">
        <body className="antialiased min-h-screen flex flex-col">
          <GarageProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </GarageProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
