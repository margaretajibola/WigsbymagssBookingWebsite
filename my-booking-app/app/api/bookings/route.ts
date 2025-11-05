// app/api/bookings/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from "next/server";
import { prisma } from '@/lib/prisma';
import { verifyJwt } from '@/lib/auth';
import { CreateBookingRequest } from '@/types/booking';


export async function GET() {
  const bookings = await prisma.booking.findMany({
    include: {
      service: true,
      user: true,
    },
  });
  return NextResponse.json(bookings);
}


export async function POST(req: NextRequest) {
  const sessionCookie = req.cookies.get("session")?.value;
  if (!sessionCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = verifyJwt(sessionCookie);
  if (!token) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const { serviceId, date, time, notes }: CreateBookingRequest = await req.json();
  
  const booking = await prisma.booking.create({
    data: {
      userId: token.sub!,
      serviceId,
      date: new Date(date),
      time,
      notes,
    },
    include: {
      service: true,
      user: true,
    }
  });

  return NextResponse.json(booking);
}
