import { z } from "zod";

export const mealSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  meal: z.string().min(2, {
    message: "Meal must be at least 2 characters.",
  }),
})

