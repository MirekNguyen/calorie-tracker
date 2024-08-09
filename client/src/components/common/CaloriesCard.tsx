'use client';
import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { MealEntry } from '@/types/meal/types';

type Props = {
  mealEntries: MealEntry[] | undefined;
};

export const CaloriesCard: FC<Props> = ({ mealEntries }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Calories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-muted-foreground">Daily intake</p>
            <p className="text-2xl font-bold">
              {Math.round(
                mealEntries?.reduce((acc, { calories }) => acc + calories, 0) ??
                0,
              ).toString() + ' kcal'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
