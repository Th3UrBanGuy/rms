import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = params;
  const { status } = await request.json();

  const order = await prisma.order.update({
    where: { id },
    data: { status },
  });

  // If order is completed, set table to available
  if (status === 'COMPLETED') {
    await prisma.table.update({
      where: { id: order.tableId },
      data: { status: 'AVAILABLE' },
    });
  }

  return NextResponse.json(order);
}