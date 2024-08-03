import { FC } from 'react';
import { Control, FieldValues } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { ComboboxDemo } from './MealSelect';

type Props = {
  control: Control<FieldValues>;
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
