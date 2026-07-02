import { NextResponse } from "next/server";
import { currentUser } from "@/lib/current-user";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { vendorName, addresses } = body;

    if (!vendorName || !addresses) {
      return NextResponse.json(
        { message: "vendorName and addresses are required" },
        { status: 400 },
      );
    }

    const vendor = await prisma.vendor.create({
      data: {
        userId: user.id,
        vendorName,
        addresses,
      },
    });

    return NextResponse.json(vendor, { status: 201 });
  } catch (error) {
    console.error("[VENDOR_CREATE_ERROR]", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
