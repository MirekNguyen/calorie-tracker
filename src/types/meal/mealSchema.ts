import { z } from "zod";

export const mealSchema = z.object({
  name: z.string().min(1, { message: "Name must not be empty." }),
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
});

export type Meal = z.infer<typeof mealSchema>;
