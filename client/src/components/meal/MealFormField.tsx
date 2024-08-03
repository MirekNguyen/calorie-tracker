import { FC } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ComboboxDemo } from "./MealSelect";
import { Control, FieldValues } from "react-hook-form";

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
          <FormLabel>Username</FormLabel>
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
