"use client";
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
import { MealFormData } from "@/types/meal/mealEntrySchema";

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
              onChange={(e) => field.onChange(e.target.valueAsNumber)}
            />
          </FormControl>
          <FormDescription>This is the amount of food you ate</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
