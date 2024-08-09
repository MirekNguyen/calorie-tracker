import { z } from "zod";

export const customMealEntry = z.object({
  calories: z.number().nonnegative({
    message: "Calories must be a negative number.",
  }),
  proteins: z.number().nonnegative({
    message: "Proteins must be a negative number.",
  }),
  carbs: z.number().nonnegative({
    message: "Carbs must be a negative number.",
  }),
  fats: z.number().nonnegative({
    message: "Fats must be a negative number.",
  }),
  amount: z.number().positive().min(0, {
    message: "Meal amount must be a positive number.",
  }),
});

export type CustomMealEntry = z.infer<typeof customMealEntry>;
