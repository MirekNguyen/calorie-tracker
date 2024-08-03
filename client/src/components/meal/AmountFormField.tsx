import { FC } from 'react';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

type Props = {
  control: Control<FieldValues>;
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
              defaultValue={1}
              {...field}
            />
          </FormControl>
          <FormDescription>This is the amount of food you ate</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
