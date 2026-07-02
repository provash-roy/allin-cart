import { initialProfile } from "@/lib/initial-profile";


export default async function Home() {
  const user = await initialProfile();
  return (
    <div className="min-h-screen flex flex-col flex-1 items-center justify-center bg-linear-to-br from-gray-900 via-black to-gray-900 text-white">
      <p>Welcome, {user.firstName}!</p>
     
    </div>
  );
}
