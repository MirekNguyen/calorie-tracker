import { useApi } from "@/actions/api";
import { submitCustomMealEntry } from "@/actions/meal-entry";
import { useCustomMealEntryForm } from "@/hooks/form/useCustomMealEntryForm";
import { useDialogStore } from "@/hooks/zustand/meal-entry/useDialogStore";
import { CustomMealEntry } from "@/types/meal/customMealEntrySchema";
import { useQueryClient } from "@tanstack/react-query";
import { FC, ReactNode } from "react";
import { FormProvider } from "react-hook-form";
import { NutrientFormField } from "./NutrientFormField";

type Props = {
  className?: string;
  children?: ReactNode;
};

export const MealEntryCustomForm: FC<Props> = ({ className, children }) => {
  const form = useCustomMealEntryForm();
  const { control, handleSubmit } = form;
  const { closeDialog } = useDialogStore();

  const queryClient = useQueryClient();
  const api = useApi();
  const onSubmit = async (customMealEntry: CustomMealEntry) => {
    const response = await submitCustomMealEntry(api, customMealEntry);
    queryClient.invalidateQueries({ queryKey: ["meal-entry"] });
    closeDialog();
    return response;
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className={className}>
        <NutrientFormField control={control} name="calories" label="Calories" />
        <NutrientFormField control={control} name="proteins" label="Proteins" />
        <NutrientFormField control={control} name="carbs" label="Carbs" />
        <NutrientFormField control={control} name="fats" label="Fats" />
        <NutrientFormField control={control} name="amount" label="Amount" />
        {children}
      </form>
    </FormProvider>
  );
};
