import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = params;
  const data = await request.json();
  const menuItem = await prisma.menuItem.update({
    where: { id },
    data,
  });
  return NextResponse.json(menuItem);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = params;
  await prisma.menuItem.delete({
    where: { id },
  });
  return new NextResponse(null, { status: 204 });
}