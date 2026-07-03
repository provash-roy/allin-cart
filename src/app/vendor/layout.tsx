import Sidebar from "@/components/shared/sidebar";

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar role="vendor" />
      <main className="flex-1">{children}</main>
    </div>
  );
}
