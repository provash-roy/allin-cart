import { getVendors } from "@/app/actions/vendor";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { Users, UserCheck, Clock, UserX } from "lucide-react";

export default async function VendorsStat() {
  const vendors = await getVendors();

  const data = vendors.map((vendor) => ({
    ...vendor,
    name: vendor.vendorName,
    addresses: vendor.addresses ?? "",
    status: vendor.status ?? "",
  }));

  const totalVendors = vendors.length;

  const approvedVendors = vendors.filter(
    (vendor) => vendor.status === "APPROVED",
  ).length;

  const pendingVendors = vendors.filter(
    (vendor) => vendor.status === "PENDING",
  ).length;

  const rejectedVendors = vendors.filter(
    (vendor) => vendor.status === "REJECTED",
  ).length;

  const stats = [
    {
      title: "Total Vendors",
      value: totalVendors,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },

    {
      title: "Approved Vendors",
      value: approvedVendors,
      icon: UserCheck,
      color: "text-green-600",
      bg: "bg-green-100",
    },

    {
      title: "Pending Vendors",
      value: pendingVendors,
      icon: Clock,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },

    {
      title: "Rejected Vendors",
      value: rejectedVendors,
      icon: UserX,
      color: "text-red-600",
      bg: "bg-red-100",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between ">
        <div>
          <h1 className="text-3xl font-bold">Vendors Management</h1>

          <p className="text-muted-foreground">
            Manage vendor applications and approvals
          </p>
        </div>
        <div>
          <Input placeholder="Search Shop" />
        </div>
      </div>
      <Separator className="bg-gray-700" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.title}
              className="shadow-sm hover:shadow-md transition"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.title}
                </CardTitle>

                <div className={`p-2 rounded-lg ${item.bg}`}>
                  <Icon size={20} className={item.color} />
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-3xl font-bold">{item.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
