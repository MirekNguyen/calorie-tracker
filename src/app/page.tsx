'use client';
import { CaloriesCard } from '@/components/common/CaloriesCard';
import { NutrientsCard } from '@/components/common/NutrientsCard';
import { MealEntryContext } from '@/components/meal/MealEntryContext';
import { MealEntryTable } from '@/components/meal/MealEntryTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMealEntryQuery } from '@/hooks/query/useMealEntryQuery';
import { useMealQuery } from '@/hooks/query/useMealQuery';
import { useDialogStore } from '@/hooks/zustand/meal-entry/useDialogStore';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

export default function Home() {
  const [{ jwt }] = useCookies(['jwt']);
  const router = useRouter();
  useEffect(() => {
    if (!jwt || (jwtDecode(jwt)?.exp ?? 0) < Date.now() / 1000) {
      router.push('/login');
    }
  }, [router, jwt]);

  const { data: mealEntries } = useMealEntryQuery();
  const { data: meals } = useMealQuery();
  const { openDialog } = useDialogStore();

  return (
    <main className="flex-1 p-6 space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <CaloriesCard mealEntries={mealEntries} />
        <NutrientsCard mealEntries={mealEntries} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row justify-between items-center">
            <p>Meal Entries</p>
            <Button onClick={openDialog}>Add Entry</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MealEntryTable mealEntries={mealEntries} meals={meals} />
        </CardContent>
      </Card>
      <MealEntryContext />
    </main>
  );
}
