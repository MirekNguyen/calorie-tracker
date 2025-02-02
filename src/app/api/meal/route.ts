import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { z } from "zod";
import { mealSchema } from "@/types/meal/mealSchema";

export const GET = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json(new Error("Unauthorized"), { status: 401 });
  }
  const meals = await prisma.meal.findMany();
  return NextResponse.json(meals);
};

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json(new Error("Unauthorized"), { status: 401 });
  }

  const body = await req.json();
  const { data, success, error } = mealSchema.safeParse(body);
  if (!success) {
    return NextResponse.json({ messsage: error }, { status: 400 });
  }
  const meal = await prisma.meal.create({data});
  return NextResponse.json(meal);
}
