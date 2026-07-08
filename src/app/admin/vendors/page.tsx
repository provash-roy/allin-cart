import { getVendors } from "@/app/actions/vendor";
import { columns } from "@/components/admin/vendor/columns";
import { DataTable } from "@/components/admin/vendor/data-table";
import VendorsStat from "@/components/admin/vendor/vendors-stats";
import { Card } from "@/components/ui/card";

export default async function VendorsPage() {
  const vendors = await getVendors();
  const data = vendors.map((vendor) => ({
    ...vendor,
    name: vendor.vendorName,

    addresses: vendor.addresses ?? "",
    status: vendor.status ?? "",
  }));

  return (
    <div className="p-6">
      <VendorsStat />
      <div className="p-6">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
