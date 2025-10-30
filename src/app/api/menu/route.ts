import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const menuItems = await prisma.menuItem.findMany();
  return NextResponse.json(menuItems);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const menuItem = await prisma.menuItem.create({
    data,
  });
  return NextResponse.json(menuItem, { status: 201 });
}