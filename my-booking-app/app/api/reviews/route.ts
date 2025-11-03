// app/api/reviews/route.ts

import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

// GET /api/reviews
export async function GET() {
  const reviews = await prisma.review.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return NextResponse.json(reviews);
}

// POST /api/reviews
export async function POST(req: Request) {
  const data = await req.json();
  const review = await prisma.review.create({ data });
  return NextResponse.json(review);
}
