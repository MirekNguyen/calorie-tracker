import { useApi } from "@/actions/api";
import { submitMealEntry } from "@/actions/meal-entry";
import { useMealForm } from "@/hooks/form/useMealForm";
import { useDialogStore } from "@/hooks/zustand/meal-entry/useDialogStore";
import { MealFormData } from "@/types/meal/mealSchema";
import { useQueryClient } from "@tanstack/react-query";
import { FC, ReactNode } from "react";
import { FormProvider } from "react-hook-form";
import { AmountFormField } from "./AmountFormField";
import { MealFormField } from "./MealFormField";

type Props = {
  children: ReactNode;
  className?: string;
};

export const MealEntryForm: FC<Props> = ({ children, className }) => {
  const form = useMealForm();
  const { control, handleSubmit } = form;
  const { closeDialog } = useDialogStore();

  const queryClient = useQueryClient();
  const api = useApi();
  const onSubmit = async ({ mealId, amount }: MealFormData) => {
    const response = submitMealEntry(api, mealId, amount).then(() => {
      queryClient.invalidateQueries({ queryKey: ["meal-entry"] });
      closeDialog();
    });
    return response;
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className={className}>
        <MealFormField control={control} />
        <AmountFormField control={control} />
        {children}
      </form>
    </FormProvider>
  );
};
