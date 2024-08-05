import { z } from "zod";

export const mealSchema = z.object({
  //meal: z.string().min(2, {
  //  message: "Meal must be at least 2 characters.",
  //}),
  mealId: z.number().int().min(1, {
    message: "MealId must be a positive number.",
  }),
  amount: z.number().positive().min(1, {
    message: "Meal amount must be a positive number.",
  }),
});

export type MealFormData = z.infer<typeof mealSchema>;
