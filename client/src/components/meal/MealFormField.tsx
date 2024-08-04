import { FC } from 'react';
import { Control } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { ComboboxDemo } from './MealSelect';
import { MealFormData } from '@/types/meal/mealSchema';

type Props = {
  control: Control<MealFormData>;
};
export const MealFormField: FC<Props> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="meal"
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
