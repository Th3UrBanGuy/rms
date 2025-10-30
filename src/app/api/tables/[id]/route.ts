import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { status } = await request.json();

  const table = await prisma.table.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json(table);
}