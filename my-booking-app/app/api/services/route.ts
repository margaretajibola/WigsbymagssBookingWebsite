// app/api/services/route.ts
import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

// GET /api/services?category=Sewins
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  const services = await prisma.service.findMany({
    where: category ? { category } : {},
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(services);
}

// POST /api/services
export async function POST(req: Request) {
  const data = await req.json();
  const service = await prisma.service.create({ data });
  return NextResponse.json(service);
}
