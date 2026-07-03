import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { adminSidebarRoutes, vendorSidebarRoutes } from "./routes";
import { UserButton } from "@clerk/nextjs";

export default function DashboardSidebar({
  role,
}: {
  role: "admin" | "vendor";
}) {
  const sidebarRoutes =
    role === "admin" ? adminSidebarRoutes : vendorSidebarRoutes;

  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-lg font-semibold p-4">AllinCart</h1>
      </SidebarHeader>
      <SidebarContent className="flex flex-col gap-2 p-4">
        {sidebarRoutes.map((route) => {
          const Icon = route.icon;

          return (
            <Link
              key={route.href}
              href={route.href}
              className="flex items-center gap-2 p-2"
            >
              <Icon size={18} />
              <span>{route.label}</span>
            </Link>
          );
        })}
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-center gap-2 border-t p-4">
          <UserButton />
          <p className="text-sm p-4">Logged in as {role}</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
