import { submitCustomMealEntry } from '@/actions/meal-entry';
import { useCustomMealEntryForm } from '@/hooks/form/useCustomMealEntryForm';
import { CustomMealEntry } from '@/types/meal/customMealEntrySchema';
import { useQueryClient } from '@tanstack/react-query';
import { FC, ReactNode } from 'react';
import { FormProvider } from 'react-hook-form';
import { NutrientFormField } from './NutrientFormField';

type Props = {
  toggleOpen: () => void;
  className?: string;
  children?: ReactNode;
};

export const MealEntryCustomForm: FC<Props> = ({
  toggleOpen,
  className,
  children,
}) => {
  const form = useCustomMealEntryForm();
  const { control, handleSubmit } = form;

  const queryClient = useQueryClient();
  const onSubmit = async (customMealEntry: CustomMealEntry) => {
    console.log(customMealEntry);
    const response = await submitCustomMealEntry(customMealEntry);
    console.log(response);
    queryClient.invalidateQueries({ queryKey: ['meal-entry'] });
    toggleOpen();
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
