"use client";
import { api } from "@/actions/api";
import { Meal } from "@/types/meal/types";
import { useQuery } from "@tanstack/react-query";

const fetchMeals = async (): Promise<Meal[]> => {
  const { data } = await api.get("meal");
  return data;
};
export const useMealQuery = () => {
  const { data, error } = useQuery({
    queryKey: ["meals"],
    queryFn: fetchMeals,
  });
  return { data, error };
};
