import { CustomMealEntry } from '@/types/meal/customMealEntrySchema';
import { api } from './api';

export const submitMealEntry = async (mealId: number, amount: number) => {
  const response = await api.post('meal-entry', {
    mealId,
    amount,
    date: new Date(),
  });
  return response;
};
export const submitCustomMealEntry = async (
  customMealEntry: CustomMealEntry,
) => {
  const date = new Date();
  const response = await api.post('meal-entry/custom', {
    ...customMealEntry,
    date
  });
  return response;
};
