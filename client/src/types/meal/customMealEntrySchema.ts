import { z } from "zod";

export const customMealEntry = z.object({
  calories: z.number().positive().min(0, {
    message: "Calories must be a positive number.",
  }),
  proteins: z.number().positive().min(0, {
    message: "Proteins must be a positive number.",
  }),
  carbs: z.number().positive().min(0, {
    message: "Carbs must be a positive number.",
  }),
  fats: z.number().positive().min(0, {
    message: "Fats must be a positive number.",
  }),
  amount: z.number().positive().min(0, {
    message: "Meal amount must be a positive number.",
  }),
});

export type CustomMealEntry = z.infer<typeof customMealEntry>;
