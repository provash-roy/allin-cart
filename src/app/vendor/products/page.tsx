"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const router = useRouter();
  const handleClick = () => {
    router.push("products/add-product");
  };
  return (
    <div className="p-8 ">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold">My Products</h1>
        <Button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
        >
          <Plus size={16} />
          Add Product
        </Button>
      </div>

      <div className="mt-10 text-center text-gray-500">
        No products found. Start by adding one.
      </div>
    </div>
  );
}
