import { useMealForm } from '@/hooks/form/useMealForm';
import { FC, ReactNode } from 'react';
import { FormProvider } from 'react-hook-form';
import { AmountFormField } from './AmountFormField';
import { MealFormField } from './MealFormField';
import { MealFormData } from '@/types/meal/mealSchema';
import { submitMealEntry } from '@/actions/meal-entry';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
  children: ReactNode;
  toggleOpen: () => void;
  className?: string;
};

export const MealEntryForm: FC<Props> = ({ children, toggleOpen, className }) => {
  const form = useMealForm();
  const { control, handleSubmit } = form;

  const queryClient = useQueryClient();
  const onSubmit = async ({ mealId, amount }: MealFormData) => {
    const response = submitMealEntry(mealId, amount).then(() => {
      queryClient.invalidateQueries({ queryKey: ['meal-entry'] });
    });
    toggleOpen();
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
