import { checkIsAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileNav } from "@/components/dashboard/mobile-nav";

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
    <div className="flex min-h-screen bg-gray-50/50">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 shrink-0 sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Navigation Header */}
        <div className="md:hidden">
          <MobileNav />
        </div>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
