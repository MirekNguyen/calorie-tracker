import { useMealForm } from '@/hooks/form/useMealForm';
import { MealFormData } from '@/types/meal/mealSchema';
import { FC } from 'react';
import { FormProvider } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '../ui/drawer';
import { AmountFormField } from './AmountFormField';
import { MealFormField } from './MealFormField';

type Props = {
  onSubmit: ({ mealId, amount }: MealFormData) => Promise<void>;
  open: boolean;
  toggleOpen: () => void;
};

export const MealEntryDrawer: FC<Props> = ({ onSubmit, open, toggleOpen }) => {
  const form = useMealForm();
  const { control, handleSubmit } = form;
  return (
    <Drawer open={open} onOpenChange={toggleOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add entry</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you are done.
          </DrawerDescription>
        </DrawerHeader>
        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 grid items-start gap-4 px-4"
          >
            <MealFormField control={control} />
            <AmountFormField control={control} />
            <Button type="submit">Save changes</Button>
          </form>
        </FormProvider>

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
