"use client";
import { MealFormData } from "@/types/meal/mealSchema";
import { FC } from "react";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { ComboboxDemo } from "./MealSelect";

type Props = {
  control: Control<MealFormData>;
};
export const MealFormField: FC<Props> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="mealId"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <ComboboxDemo field={field} />
          </FormControl>
          <FormDescription>This is your public display name.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
