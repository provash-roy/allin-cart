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
  return (
    <div className="w-full flex flex-col min-h-screen items-center justify-center mx-auto p-4">
      <h1 className="text-xl font-semibold mb-6">Admin Dashboard</h1>
    </div>
  );
}
