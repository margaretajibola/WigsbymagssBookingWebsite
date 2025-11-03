// app/api/services/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

// GET single service
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const service = await prisma.service.findUnique({
    where: { id: Number(id) },
  });
  return NextResponse.json(service);
}


// PUT update
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const data = await req.json();
  const service = await prisma.service.update({
    where: { id: Number(id) },
    data,
  });
  return NextResponse.json(service);
}

// DELETE
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  await prisma.service.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
}