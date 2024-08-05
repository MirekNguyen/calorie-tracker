'use client';
import { api } from '@/actions/api';
import { MealEntry } from '@/types/meal/types';
import { useQuery } from '@tanstack/react-query';

const fetchMeals = async (): Promise<MealEntry[]> => {
  const { data } = await api.get(`meal-entry?date=${new Date()}`);
  return data;
};
export const useMealEntryQuery = () => {
  const { data, error } = useQuery({
    queryKey: ['meal-entry'],
    queryFn: fetchMeals,
  });
  return { data, error };
};
