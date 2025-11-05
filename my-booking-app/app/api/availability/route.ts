// app/api/availability/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');
  
  if (!date) {
    return NextResponse.json({ error: 'Date required' }, { status: 400 });
  }
  
  const availability = await prisma.availability.findUnique({
    where: { date: new Date(date) }
  });
  
  return NextResponse.json(availability?.timeSlots || []);
}

export async function POST(req: Request) {
  const { date, timeSlots } = await req.json();
  
  const availability = await prisma.availability.upsert({
    where: { date: new Date(date) },
    update: { timeSlots },
    create: { date: new Date(date), timeSlots }
  });
  
  return NextResponse.json(availability);
}
