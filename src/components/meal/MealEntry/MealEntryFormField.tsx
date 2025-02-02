"use client";
import { MealFormData } from "@/types/meal/mealEntrySchema";
import { FC } from "react";
import { Control } from "react-hook-form";
import { ComboboxDemo } from "../MealSelect";
import { FormField, FormItem, FormControl, FormDescription, FormMessage, FormLabel } from "@/components/ui/form";

type Props = {
  control: Control<MealFormData>;
};
export const MealEntryFormField: FC<Props> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="mealId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Meal</FormLabel>
          <FormControl>
            <ComboboxDemo field={field} />
          </FormControl>
          <FormDescription>Select a meal from the list</FormDescription>
        </FormItem>
      )}
    />
  );
};
