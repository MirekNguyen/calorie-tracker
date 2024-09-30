import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const meals = await prisma.meal.findMany();
  return NextResponse.json(meals);
};
