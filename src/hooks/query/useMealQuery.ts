"use client";
import { useApi } from "@/actions/api";
import { Meal } from "@/types/meal/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

const fetchMeals = async (api: AxiosInstance): Promise<Meal[]> => {
  const { data } = await api.get("meal");
  return data;
};

export const useMealQuery = () => {
  const api = useApi();
  const { data, error } = useQuery({
    queryKey: ["meals"],
    queryFn: () => fetchMeals(api),
  });
  return { data, error };
};
