// app/api/bookings/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from "next/server";
import { prisma } from '@/lib/prisma';
import { verifyJwt } from '@/lib/auth';
import { CreateBookingRequest } from '@/types/booking';
import { 
  AuthenticationError, 
  ValidationError, 
  ConflictError, 
  DatabaseError, 
  handleApiError 
} from '@/lib/errors';

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        service: true,
        user: true,
      },
    });
    return NextResponse.json(bookings);
  } catch{
    return handleApiError(new DatabaseError('Failed to fetch bookings'));
  }
}

export async function POST(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get("session")?.value;
    if (!sessionCookie) {
      throw new AuthenticationError('No session found');
    }

    const token = verifyJwt(sessionCookie);
    if (!token) {
      throw new AuthenticationError('Invalid session token');
    }

    const { serviceId, date, time, notes }: CreateBookingRequest = await req.json();
    
    // Validation
    if (!serviceId || !date || !time) {
      throw new ValidationError('Service, date, and time are required');
    }

    // Check for existing booking at same time
    const existingBooking = await prisma.booking.findFirst({
      where: {
        date: new Date(date),
        time: time
      }
    });

    if (existingBooking) {
      throw new ConflictError('This time slot is already booked');
    }
    
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
  } catch (error) {
    return handleApiError(error);
  }
}
