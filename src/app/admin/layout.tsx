import DashboardSidebar from "@/components/shared/sidebar";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
          <DashboardSidebar role="admin" />
          <main className="min-h-screen w-full">
            <SidebarTrigger className="m-4" />
            <div className="w-full">{children}</div>
          </main>
        </SidebarProvider>
  );
}
