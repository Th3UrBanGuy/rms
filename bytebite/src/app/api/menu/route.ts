import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';


export async function GET() {
  const menuItems = await prisma.menuItem.findMany();
  return NextResponse.json(menuItems);
}

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const data = await request.json();
  const menuItem = await prisma.menuItem.create({
    data,
  });
  return NextResponse.json(menuItem, { status: 201 });
}