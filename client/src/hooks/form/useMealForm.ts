import { mealSchema } from "@/types/meal/mealSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useMealForm = () => {
  return useForm<z.infer<typeof mealSchema>>({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      amount: 1,
    },
  });
};
