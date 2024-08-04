'use client';
import { useMealForm } from '@/hooks/form/useMealForm';
import { MealFormData } from '@/types/meal/mealSchema';
import React from 'react';
import { Form } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { AmountFormField } from './AmountFormField';
import { MealFormField } from './MealFormField';

export const MealDialog = () => {
  const form = useMealForm();
  const { control, handleSubmit } = form;
  const [open, setOpen] = React.useState(false);

  const onSubmit = (values: MealFormData) => {
    console.log(values);
    setOpen(false);
  };
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Edit Profile
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form className="space-y-8">
              <MealFormField control={control} />
              <AmountFormField control={control} />
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
