"use client";
import { MealFormData } from "@/types/meal/mealSchema";
import { FC } from "react";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type Props = {
  control: Control<MealFormData>;
};

export const AmountFormField: FC<Props> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="amount"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Amount</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Amount"
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          </FormControl>
          <FormDescription>This is the amount of food you ate</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
