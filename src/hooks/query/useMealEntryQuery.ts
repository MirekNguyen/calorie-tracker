"use client";
import { useApi } from "@/actions/api";
import { MealEntry } from "@/types/meal/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

const fetchMeals = async (api: AxiosInstance): Promise<MealEntry[]> => {
  const { data } = await api.get(`meal-entry?date=${new Date().toISOString()}`);
  return data;
};
export const useMealEntryQuery = () => {
  const api = useApi();
  const { data, error } = useQuery({
    queryKey: ["meal-entry"],
    queryFn: () => fetchMeals(api),
  });
  return { data, error };
};
