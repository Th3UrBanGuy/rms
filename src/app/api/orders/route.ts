import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';

export async function GET() {
  const orders = await prisma.order.findMany({
    include: {
      items: {
        include: {
          menuItem: true,
        },
      },
      table: true,
    },
  });
  return NextResponse.json(orders);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { tableId, items, totalAmount } = await request.json();

  const order = await prisma.order.create({
    data: {
      table: {
        connect: { id: tableId },
      },
      totalAmount,
      status: 'PENDING',
      items: {
        create: items.map((item: { menuItemId: string; quantity: number }) => ({
          quantity: item.quantity,
          menuItem: {
            connect: { id: item.menuItemId },
          },
        })),
      },
    },
    include: {
      items: true,
    },
  });

  // Update table status
  await prisma.table.update({
    where: { id: tableId },
    data: { status: 'OCCUPIED' },
  });

  return NextResponse.json(order, { status: 201 });
}