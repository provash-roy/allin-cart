import { redirect } from "next/navigation";
import { initialProfile } from "@/lib/initial-profile";

export default async function Home() {
  const user = await initialProfile();

  if (user.role === "ADMIN") {
    redirect("/admin/dashboard");
  }

  if (user.role === "VENDOR") {
    redirect("/vendor/dashboard");
  }

  if (user.role === "USER") {
    return (
      <div className="min-h-screen flex flex-col flex-1 items-center justify-center bg-linear-to-br from-gray-900 via-black to-gray-900 text-white">
        <p>Welcome, {user.firstName}!</p>
      </div>
    );
  }
}
