import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const {
      name,
      description,
      price,
      stock,
      category,
      images,
      isFeatured,
      isWearable,
      replacementDate,
      highlights,
      warranty,
      payOnDelivery,
    } = body;

    if (!name || !price || stock === undefined) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!vendor) {
      return NextResponse.json(
        { message: "Vendor not found" },
        { status: 404 },
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: Number(stock),

        category,
        images: images || [],

        isFeatured: isFeatured || false,
        isWearable: isWearable || false,

        replacementDate: replacementDate ? new Date(replacementDate) : null,

        highlights: highlights || [],
        warranty: warranty ? Number(warranty) : null,

        payOnDelivery: payOnDelivery || false,

        vendorId: vendor.id,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("[PRODUCT_CREATE_ERROR]", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
