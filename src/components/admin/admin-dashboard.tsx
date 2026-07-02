"use client";

import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { updateVendorStatus } from "@/app/actions/vendor";
import toast from "react-hot-toast";

type Vendor = {
  id: string;
  vendorName: string;
  status: string;
};

export default function AdminDashboard({ vendors }: { vendors: Vendor[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleClick = async (id: string, status: "APPROVED" | "REJECTED") => {
    try {
      setLoadingId(id);

      //   await axios.patch(`/api/vendor/${id}`, {
      //     status,
      //   });

      await updateVendorStatus(id, status);
      toast.success(`Vendor ${status.toLowerCase()} successfully!`);

      window.location.reload();
    } catch (error) {
      console.error("Error updating vendor:", error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <h1 className="text-xl font-semibold mb-6">Admin Dashboard</h1>

      <div className="w-full max-w-md space-y-4">
        {vendors.map((vendor) => (
          <Card key={vendor.id} className="p-4 shadow-md">
            <p className="text-sm text-gray-400">
              Vendor Name: {vendor.vendorName}
            </p>

            <div className="flex gap-2 mt-3">
              <Button variant="secondary">{vendor.status}</Button>

              <Button
                disabled={loadingId === vendor.id}
                onClick={() => handleClick(vendor.id, "APPROVED")}
              >
                Approve
              </Button>

              <Button
                disabled={loadingId === vendor.id}
                variant="destructive"
                onClick={() => handleClick(vendor.id, "REJECTED")}
              >
                Reject
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
