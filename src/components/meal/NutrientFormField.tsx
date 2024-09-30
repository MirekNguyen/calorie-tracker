"use client";
import { CustomMealEntry } from "@/types/meal/customMealEntrySchema";
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
  control: Control<CustomMealEntry>;
  name: "calories" | "proteins" | "carbs" | "fats" | "amount";
  label: string;
};

export const NutrientFormField: FC<Props> = ({ control, name, label }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder={label}
              {...field}
              onChange={(e) => field.onChange(e.target.valueAsNumber)}
            />
          </FormControl>
          <FormDescription>{`This is the amount ${name} of food you ate`}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
