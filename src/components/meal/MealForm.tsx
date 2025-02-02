import { useApi } from "@/actions/api";
import { submitMeal } from "@/actions/meal-entry";
import { useMealForm } from "@/hooks/form/useMealForm";
import { useDialogStore } from "@/hooks/zustand/meal-entry/useDialogStore";
import { Meal } from "@/types/meal/mealSchema";
import { useQueryClient } from "@tanstack/react-query";
import { FC, ReactNode } from "react";
import { FormProvider } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { MealFormField } from "./MealFormField";
import { ScrollArea } from "../ui/scroll-area";

type Props = {
  className?: string;
  children?: ReactNode;
};

export const MealForm: FC<Props> = ({ className, children }) => {
  const form = useMealForm();
  const { control, handleSubmit, formState } = form;
  const { closeDialog } = useDialogStore();

  const queryClient = useQueryClient();
  const api = useApi();
  const onSubmit = async (meal: Meal) => {
    closeDialog();
    console.log(meal);
    const response = await submitMeal(api, meal);
    queryClient.invalidateQueries({ queryKey: ["meals"] });
    closeDialog();
    return response;
  };
  return (
    <FormProvider {...form}>
      <ScrollArea className="h-72">
        <form onSubmit={handleSubmit(onSubmit)} className={className}>
          <FormField
            control={control}
            name={"name"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{"Name"}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={"Name"}
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormDescription>{`This is the amount ${name} of food you ate`}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <MealFormField control={control} name="calories" label="Calories" />
          <MealFormField control={control} name="proteins" label="Proteins" />
          <MealFormField control={control} name="carbs" label="Carbs" />
          <MealFormField control={control} name="fats" label="Fats" />
          {children}
        </form>
      </ScrollArea>
    </FormProvider>
  );
};
