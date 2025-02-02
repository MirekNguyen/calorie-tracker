import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { customMealEntry } from "@/types/meal/customMealEntrySchema";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json(new Error("Unauthorized"), { status: 401 });
  }

  const body = await req.json();
  const { data, success, error } = customMealEntry.safeParse(body);
  if (!success) {
    return NextResponse.json({ messsage: error }, { status: 400 });
  }
  const date = new Date();
  const response = await prisma.mealEntry.create({data: {...data, date}});
  return NextResponse.json(response);
}
