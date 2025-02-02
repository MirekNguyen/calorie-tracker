import { useApi } from "@/actions/api";
import { submitMealEntry } from "@/actions/meal-entry";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMealEntryForm } from "@/hooks/form/useMealEntryForm";
import { useDialogStore } from "@/hooks/zustand/meal-entry/useDialogStore";
import { MealFormData } from "@/types/meal/mealEntrySchema";
import { useQueryClient } from "@tanstack/react-query";
import { FC, ReactNode } from "react";
import { FormProvider } from "react-hook-form";
import { AmountFormField } from "../AmountFormField";
import { MealEntryFormField } from "./MealEntryFormField";

type Props = {
  children: ReactNode;
  className?: string;
};

export const MealEntryForm: FC<Props> = ({ children, className }) => {
  const form = useMealEntryForm();
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
      <ScrollArea className="h-72">
        <form onSubmit={handleSubmit(onSubmit)} className={className}>
          <MealEntryFormField control={control} />
          <AmountFormField control={control} />
          {children}
        </form>
      </ScrollArea>
    </FormProvider>
  );
};
