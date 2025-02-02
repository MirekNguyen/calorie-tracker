import {
  mealSchema,
  Meal,
} from "@/types/meal/mealSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useMealForm = () => {
  return useForm<Meal>({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      calories: 0,
      proteins: 0,
      carbs: 0,
      fats: 0,
    },
  });
};
