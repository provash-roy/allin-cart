import Sidebar from "@/components/shared/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar role="admin" />
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  );
}
