import DashboardSidebar from "@/components/shared/sidebar";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar role="vendor" />
      <main className="min-h-screen w-full">
        <SidebarTrigger className="m-4" />
        <div className="w-full">{children}</div>
      </main>
    </SidebarProvider>
  );
}
