import { getVendors } from "@/app/actions/vendor";
import { columns } from "@/components/admin/vendor/columns";
import { DataTable } from "@/components/admin/vendor/data-table";

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
      <DataTable columns={columns} data={data} />
    </div>
  );
}
