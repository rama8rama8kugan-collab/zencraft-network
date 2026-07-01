import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const total = parseFloat(searchParams.get('total') || '0');

    if (!code) {
      return NextResponse.json({ error: 'Coupon code required' }, { status: 400 });
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!coupon || !coupon.isActive) {
      return NextResponse.json({ valid: false, message: 'Invalid coupon code' });
    }

    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
      return NextResponse.json({ valid: false, message: 'Coupon usage limit reached' });
    }

    if (coupon.startsAt && coupon.startsAt > new Date()) {
      return NextResponse.json({ valid: false, message: 'Coupon not yet active' });
    }

    if (coupon.expiresAt && coupon.expiresAt < new Date()) {
      return NextResponse.json({ valid: false, message: 'Coupon has expired' });
    }

    if (total < coupon.minOrderAmount) {
      return NextResponse.json({
        valid: false,
        message: `Minimum order amount is ₹${coupon.minOrderAmount}`,
      });
    }

    const discount =
      coupon.discountType === 'PERCENTAGE' ? (total * coupon.discountValue) / 100 : coupon.discountValue;

    return NextResponse.json({
      valid: true,
      discount,
      message: 'Coupon applied successfully',
    });
  } catch (error) {
    console.error('Error validating coupon:', error);
    return NextResponse.json({ error: 'Failed to validate coupon' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { code, total } = await request.json();

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!coupon || !coupon.isActive) {
      return NextResponse.json({ valid: false, message: 'Invalid coupon code' });
    }

    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
      return NextResponse.json({ valid: false, message: 'Coupon usage limit reached' });
    }

    if (total < coupon.minOrderAmount) {
      return NextResponse.json({
        valid: false,
        message: `Minimum order amount is ₹${coupon.minOrderAmount}`,
      });
    }

    const discount =
      coupon.discountType === 'PERCENTAGE' ? (total * coupon.discountValue) / 100 : coupon.discountValue;

    return NextResponse.json({
      valid: true,
      discount,
    });
  } catch (error) {
    console.error('Error validating coupon:', error);
    return NextResponse.json({ error: 'Failed to validate coupon' }, { status: 500 });
  }
}
