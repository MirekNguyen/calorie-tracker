import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json(new Error("Unauthorized"), { status: 401 });
  }
  const meals = await prisma.meal.findMany();
  return NextResponse.json(meals);
};
