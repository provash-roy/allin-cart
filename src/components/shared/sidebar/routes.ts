import {
  LayoutDashboard,
  Store,
  ShoppingBag,
  Users,
  Package,
  BarChart3,
  Settings,
} from "lucide-react";


export const adminSidebarRoutes = [
  {
    label: "Dashboard",
    href: "dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Vendors",
    href: "vendors",
    icon: Store,
  },
  {
    label: "Products",
    href: "products",
    icon: Package,
  },
  {
    label: "Orders",
    href: "orders",
    icon: ShoppingBag,
  },
  {
    label: "Customers",
    href: "customers",
    icon: Users,
  },
  {
    label: "Reports",
    href: "reports",
    icon: BarChart3,
  },
  {
    label: "Settings",
    href: "settings",
    icon: Settings,
  },
];




export const vendorSidebarRoutes = [
  {
    label: "Dashboard",
    href: "vendor/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Vendors",
    href: "vendor/dashboard/vendors",
    icon: Store,
  },
  {
    label: "Products",
    href: "vendor/dashboard/products",
    icon: Package,
  },
  {
    label: "Orders",
    href: "vendor/dashboard/orders",
    icon: ShoppingBag,
  },
  {
    label: "Customers",
    href: "vendor/dashboard/customers",
    icon: Users,
  },
  {
    label: "Reports",
    href: "vendor/dashboard/reports",
    icon: BarChart3,
  },
  {
    label: "Settings",
    href: "vendor/dashboard/settings",
    icon: Settings,
  },
];
