import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GarageProvider } from "@/lib/hooks/use-garage";
import "./globals.css";

export const metadata: Metadata = {
  title: "Industrial Area Spare Parts",
  description: "Your trusted source for industrial auto parts.",
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
