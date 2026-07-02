import AdminDashboard from "@/components/admin/admin-dashboard";
import { initialProfile } from "@/lib/initial-profile";
import { getVendors } from "./actions/vendor";

export default async function Home() {
  const vendors = await getVendors();
  const user = await initialProfile();
  if (user.role === "ADMIN") {
    return <AdminDashboard vendors={vendors} />;
  }

  if (user.role === "VENDOR") {
    return (
      <div className="min-h-screen flex flex-col flex-1 items-center justify-center bg-linear-to-br from-gray-900 via-black to-gray-900 text-white">
        <p>Welcome, to your Vendor</p>
      </div>
    );
  }
  if (user.role === "USER") {
    return (
      <div className="min-h-screen flex flex-col flex-1 items-center justify-center bg-linear-to-br from-gray-900 via-black to-gray-900 text-white">
        <p>Welcome, {user.firstName}!</p>
      </div>
    );
  }
}
