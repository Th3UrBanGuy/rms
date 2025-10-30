import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const tables = await prisma.table.findMany({
    include: {
      order: {
        include: {
          items: true,
        },
      },
    },
  });
  return NextResponse.json(tables);
}