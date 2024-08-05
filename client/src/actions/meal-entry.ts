import { api } from './api';

export const submitMealEntry = async (mealId: number, amount: number) => {
  const response = await api.post('meal-entry', {
    mealId,
    amount,
    date: new Date(),
  });
  return response;
};
