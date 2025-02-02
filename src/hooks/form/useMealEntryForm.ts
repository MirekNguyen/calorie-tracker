import { mealEntrySchema } from "@/types/meal/mealEntrySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useMealEntryForm = () => {
  return useForm<z.infer<typeof mealEntrySchema>>({
    resolver: zodResolver(mealEntrySchema),
    defaultValues: {
      amount: 1,
    },
  });
};
