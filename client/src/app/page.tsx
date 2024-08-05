'use client';
import { submitMealEntry } from '@/actions/meal-entry';
import { SummaryCard } from '@/components/common/SummaryCard';
import { AmountFormField } from '@/components/meal/AmountFormField';
import { MealEntryTable } from '@/components/meal/MealEntryTable';
import { MealFormField } from '@/components/meal/MealFormField';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useMealForm } from '@/hooks/form/useMealForm';
import { useMealEntryQuery } from '@/hooks/query/useMealEntryQuery';
import { useMealQuery } from '@/hooks/query/useMealQuery';
import { MealFormData } from '@/types/meal/mealSchema';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export default function Home() {
  const form = useMealForm();
  const { control, handleSubmit } = form;
  const [open, setOpen] = useState(false);
  const { data: mealEntries } = useMealEntryQuery();
  const { data: meals } = useMealQuery();

  const onSubmit = async ({ mealId, amount }: MealFormData) => {
    const response = submitMealEntry(mealId, amount);
    queryClient.invalidateQueries({ queryKey: ['meal-entry'] });
    setOpen(false);
    return response;
  };
  const queryClient = useQueryClient();

  return (
    <>
      <SummaryCard
        title="Calories"
        summary={(
          mealEntries?.reduce((acc, { calories }) => acc + calories, 0) ?? 0
        ).toString() + ' /2200 kcal'}
      />
      <SummaryCard
        title="Proteins"
        summary={(
          mealEntries?.reduce((acc, { proteins }) => acc + proteins, 0) ?? 0
        ).toString()}
      />
      <Button variant="outline" onClick={() => setOpen(true)}>
        Add Entry
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <MealFormField control={control} />
              <AmountFormField control={control} />
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <MealEntryTable mealEntries={mealEntries} meals={meals} />
    </>
  );
}
