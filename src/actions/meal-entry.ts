import { CustomMealEntry } from "@/types/meal/customMealEntrySchema";
import { Meal } from "@/types/meal/mealSchema";
import { AxiosInstance } from "axios";

export const submitMealEntry = async (
  api: AxiosInstance,
  mealId: number,
  amount: number,
) => {
  const response = await api.post("meal-entry", {
    mealId,
    amount,
    date: new Date(),
  });
  return response;
};
export const submitCustomMealEntry = async (
  api: AxiosInstance,
  customMealEntry: CustomMealEntry,
) => {
  const date = new Date();
  const response = await api.post("meal-entry/custom", {
    ...customMealEntry,
    date,
  });
  return response;
};

export const submitMeal = async (
api: AxiosInstance,
meal: Meal
) => {
  const response = await api.post("meal", meal);
  return response;
}
