import {
  customMealEntry,
  CustomMealEntry,
} from "@/types/meal/customMealEntrySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useCustomMealEntryForm = () => {
  return useForm<CustomMealEntry>({
    resolver: zodResolver(customMealEntry),
    defaultValues: {
      calories: 0,
      proteins: 0,
      carbs: 0,
      fats: 0,
      amount: 1,
    },
  });
};
