import { checkIsAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    redirect("/");
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1440px]">
      <header className="flex items-center justify-between mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <div className="flex gap-4">
           <Button variant="ghost" asChild>
             <Link href="/dashboard">Products List</Link>
           </Button>
           <Button asChild>
             <Link href="/dashboard/add">Add Product</Link>
           </Button>
        </div>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}
