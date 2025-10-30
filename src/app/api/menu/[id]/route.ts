import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const data = await request.json();
  const menuItem = await prisma.menuItem.update({
    where: { id },
    data,
  });
  return NextResponse.json(menuItem);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  await prisma.menuItem.delete({
    where: { id },
  });
  return new NextResponse(null, { status: 204 });
}