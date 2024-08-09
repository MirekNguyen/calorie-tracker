import { useMealForm } from '@/hooks/form/useMealForm';
import { MealFormData } from '@/types/meal/mealSchema';
import { FC } from 'react';
import { FormProvider } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { AmountFormField } from './AmountFormField';
import { MealFormField } from './MealFormField';

type Props = {
  onSubmit: ({ mealId, amount }: MealFormData) => Promise<void>;
  open: boolean;
  toggleOpen: () => void;
};

export const MealEntryDialog: FC<Props> = ({ onSubmit, open, toggleOpen }) => {
  const form = useMealForm();
  const { control, handleSubmit } = form;
  return (
    <Dialog open={open} onOpenChange={toggleOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add entry</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <MealFormField control={control} />
            <AmountFormField control={control} />
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
