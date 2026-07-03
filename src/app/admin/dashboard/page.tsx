import { getVendors } from "@/app/actions/vendor";
import AdminDashboard from "@/components/admin/admin-dashboard";

export default async function AdminDashboardPage() {
  const vendors = await getVendors();

  return <AdminDashboard vendors={vendors} />;
}
