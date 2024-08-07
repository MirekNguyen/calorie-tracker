'use client';
import { submitMealEntry } from '@/actions/meal-entry';
import { SummaryCard } from '@/components/common/SummaryCard';
import { AmountFormField } from '@/components/meal/AmountFormField';
import { MealEntryTable } from '@/components/meal/MealEntryTable';
import { MealFormField } from '@/components/meal/MealFormField';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jwt = Cookies.get('jwt');
    if (!jwt || (jwtDecode(jwt)?.exp ?? 0) < Date.now() / 1000) {
      router.push('/login');
    }
  }, [router]);

  const form = useMealForm();
  const { control, handleSubmit } = form;
  const [open, setOpen] = useState(false);
  const { data: mealEntries } = useMealEntryQuery();
  const { data: meals } = useMealQuery();

  const queryClient = useQueryClient();

  const onSubmit = async ({ mealId, amount }: MealFormData) => {
    const response = submitMealEntry(mealId, amount).then(() => {
      queryClient.invalidateQueries({ queryKey: ['meal-entry'] });
    });
    setOpen(false);
    return response;
  };

  return (
    <>
      <div className="flex flex-col w-full min-h-screen bg-background">
        <header className="bg-primary text-primary-foreground py-4 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Calorie Tracker</h1>
            <Button onClick={() => setOpen(true)}>
              Add Entry
            </Button>
          </div>
        </header>
        <main className="flex-1 p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <SummaryCard
              title="Calories"
              summary={
                (
                  mealEntries?.reduce(
                    (acc, { calories }) => acc + calories,
                    0,
                  ) ?? 0
                ).toString() + ' /2200 kcal'
              }
            />
            <SummaryCard
              title="Proteins"
              summary={
                (
                  mealEntries?.reduce(
                    (acc, { proteins }) => acc + proteins,
                    0,
                  ) ?? 0
                ).toString() + ' g'
              }
            />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Meal Log</CardTitle>
            </CardHeader>
            <CardContent>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you are
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-8"
                    >
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
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
}
