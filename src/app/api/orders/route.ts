import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust path if your prisma client is elsewhere

// GET a cart item by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const cartItem = await prisma.cart.findUnique({
      where: { id },
    });

    if (!cartItem) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(cartItem);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch cart item" },
      { status: 500 }
    );
  }
}

// DELETE a cart item by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await prisma.cart.delete({
      where: { id },
    });

    return NextResponse.json({ message: `Deleted cart item ${id}` });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete cart item" },
      { status: 500 }
    );
  }
}

// (Optional) PUT to update a cart item by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await request.json();

  try {
    const updated = await prisma.cart.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update cart item" },
      { status: 500 }
    );
  }
}
