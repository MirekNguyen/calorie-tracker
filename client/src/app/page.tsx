'use client';
import { CaloriesCard } from '@/components/common/CaloriesCard';
import { NutrientsCard } from '@/components/common/NutrientsCard';
import { MealEntryContext } from '@/components/meal/MealEntryContext';
import { MealEntryTable } from '@/components/meal/MealEntryTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMealEntryQuery } from '@/hooks/query/useMealEntryQuery';
import { useMealQuery } from '@/hooks/query/useMealQuery';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const jwt = Cookies.get('jwt');
    if (!jwt || (jwtDecode(jwt)?.exp ?? 0) < Date.now() / 1000) {
      router.push('/login');
    }
  }, [router]);

  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);

  const { data: mealEntries } = useMealEntryQuery();
  const { data: meals } = useMealQuery();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <>
      <div className="flex flex-col w-full min-h-screen bg-background">
        <header className="bg-primary text-primary-foreground py-4 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Calorie Tracker</h1>
            <Button onClick={toggleOpen}>Add Entry</Button>
          </div>
        </header>
        <main className="flex-1 p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <CaloriesCard mealEntries={mealEntries} />
            <NutrientsCard mealEntries={mealEntries} />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Meal Log</CardTitle>
            </CardHeader>
            <CardContent>
              <MealEntryTable
                mealEntries={mealEntries}
                meals={meals}
                isDesktop={isDesktop}
              />
            </CardContent>
          </Card>
          <MealEntryContext
            isDesktop={isDesktop}
            open={open}
            toggleOpen={toggleOpen}
          />
        </main>
      </div>
    </>
  );
}
