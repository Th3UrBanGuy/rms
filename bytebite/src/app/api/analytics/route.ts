import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { startOfDay, endOfDay } from 'date-fns';

export async function GET() {
  const today = new Date();
  const startOfToday = startOfDay(today);
  const endOfToday = endOfDay(today);

  // Total Sales
  const completedOrders = await prisma.order.findMany({
    where: {
      status: 'COMPLETED',
      createdAt: {
        gte: startOfToday,
        lte: endOfToday,
      },
    },
  });
  const totalSales = completedOrders.reduce((acc, order) => acc + order.totalAmount, 0);

  // Orders Served
  const ordersServed = completedOrders.length;

  // Average Order Value
  const averageOrderValue = ordersServed > 0 ? totalSales / ordersServed : 0;

  return NextResponse.json({
    totalSales,
    averageOrderValue,
    ordersServed,
  });
}