"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { adminSidebarRoutes, vendorSidebarRoutes } from "./routes";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { cn } from "@/lib/utils";

export default function DashboardSidebar({
  role,
}: {
  role: "admin" | "vendor";
}) {
  const sidebarRoutes =
    role === "admin" ? adminSidebarRoutes : vendorSidebarRoutes;

  const path = usePathname();

  return (
    <Sidebar className="bg-gray-800/40 border-gray-700">
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
              className={cn(
                "flex items-center gap-2 p-2 rounded-md transition",
                path === route.href
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-200 hover:bg-gray-700",
              )}
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
