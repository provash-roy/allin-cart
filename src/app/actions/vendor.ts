"use server";

import prisma from "@/lib/prisma";


export async function getVendors() {
  return await prisma.vendor.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}


export async function updateVendorStatus(
  vendorId: string,
  status: "APPROVED" | "REJECTED",
) {
  try {
    const updatedVendor = await prisma.vendor.update({
      where: { id: vendorId },
      data: {
        status,
        ...(status === "APPROVED" && { approvedAt: new Date(), user: { update: { role: "VENDOR" } } }),
        ...(status === "REJECTED" && { rejectedReason: "Rejected by admin" }),
      },
    });

    return { success: true, data: updatedVendor };
  } catch (error) {
    console.error("[UPDATE_VENDOR_ERROR]", error);
    return { success: false, message: "Failed to update vendor" };
  }
}

// 🔹 Delete vendor
export async function deleteVendor(vendorId: string) {
  try {
    await prisma.vendor.delete({
      where: { id: vendorId },
    });

    return { success: true };
  } catch (error) {
    console.error("[DELETE_VENDOR_ERROR]", error);
    return { success: false, message: "Failed to delete vendor" };
  }
}
