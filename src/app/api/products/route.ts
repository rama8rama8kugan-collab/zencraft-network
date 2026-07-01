import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        ...(category && category !== 'all' ? { categoryId: category } : {}),
      },
      include: {
        category: true,
        rank: true,
      },
      orderBy: [
        { isFeatured: 'desc' },
        { order: 'asc' },
      ],
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
