'use client';
import { MealEntry } from '@/types/meal/types';
import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type Props = {
  mealEntries: MealEntry[] | undefined;
};
export const NutrientsCard: FC<Props> = ({ mealEntries }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Nutrients</p>
        <div className="flex justify-between flex-col">
          <div className="text-m flex justify-between">
            <p className="font-bold">Proteins</p>
            <p>
              {Math.round(
                mealEntries?.reduce((acc, { proteins }) => acc + proteins, 0) ??
                0,
              ).toString() + ' g'}
            </p>
          </div>
          <div className="text-m flex justify-between">
            <p className="font-bold">Carbs</p>
            <p>
              {Math.round(
                mealEntries?.reduce((acc, { carbs }) => acc + carbs, 0) ?? 0,
              ).toString() + ' g'}
            </p>
          </div>
          <div className="text-m flex justify-between">
            <p className="font-bold">Fats</p>
            <p>
              {Math.round(
                mealEntries?.reduce((acc, { fats }) => acc + fats, 0) ?? 0,
              ).toString() + ' g'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
