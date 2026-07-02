import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";

// DELETE a cart item by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { id } = params; // ✅ removed unnecessary `await`

    await prisma.cartItem.delete({
      where: { id: Number(id) }, // use Number(id) if your schema defines id as Int
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}

// PATCH (update) a cart item by ID
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { id } = params; // ✅ removed unnecessary `await`
    const { quantity } = await request.json();

    await prisma.cartItem.update({
      where: { id: Number(id) }, // convert if schema uses Int
      data: { quantity },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating cart item:", error);
    return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
  }
}
