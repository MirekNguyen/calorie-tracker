import prisma from "@/lib/prisma";
import { endOfDay, startOfDay } from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  date: z.string().datetime(),
});

export async function GET(req: NextRequest) {
  const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries());
  const { data, success, error } = schema.safeParse(searchParams);
  if (!success) {
    return NextResponse.json({ messsage: error }, { status: 400 });
  }
  const dateObject = new Date(data.date);

  const mealEntries = await prisma.mealEntry.findMany({
    where: {
      date: {
        gte: startOfDay(dateObject),
        lte: endOfDay(dateObject),
      },
    },
  });
  return NextResponse.json(mealEntries);
}

const postSchema = z.object({
  amount: z.number(),
  mealId: z.number(),
  date: z.string().datetime(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { data, success, error } = postSchema.safeParse(body);
  if (!success) {
    return NextResponse.json({ messsage: error }, { status: 400 });
  }
  const meal = await prisma.meal.findUnique({
    where: { id: data.mealId },
  });
  if (!meal) {
    return NextResponse.json(
      { messsage: "Meal could not be found" },
      { status: 400 },
    );
  }

  const { amount, date, mealId } = data;
  const { calories, proteins, carbs, fats } = meal;
  const response = await prisma.mealEntry.create({
    data: {
      date,
      calories: calories * amount,
      proteins: proteins * amount,
      carbs: carbs * amount,
      fats: fats * amount,
      mealId: mealId,
      amount: amount,
    },
  });
  return NextResponse.json(response);
}
