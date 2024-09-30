import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type DynamicParams = {
  params: {
    id: string;
  };
};

type ResponseBody = {
  message: string;
  status: number;
};

export async function DELETE(_req: NextRequest, { params }: DynamicParams): Promise<NextResponse<ResponseBody>> {
  const id = parseInt(params.id);
  const mealEntry = await prisma.mealEntry.findUnique({
    where: { id },
  });
  if (!mealEntry) {
    return NextResponse.json({ message: "Meal entry not found", status: 404 });
  }
  const response = await prisma.mealEntry.delete({ where: { id } });
  if (!response) {
    return NextResponse.json({ message: "Failed to delete meal entry", status: 500 });
  }
  return NextResponse.json(response);
}
