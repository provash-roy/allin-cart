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
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
