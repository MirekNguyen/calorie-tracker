export type Meal = {
  id: number;
  name: string;
  calories: number;
  carbs: number;
  fats: number;
  proteins: number;
};

export type MealEntry = {
  id: number;
  calories: number;
  carbs: number;
  fats: number;
  proteins: number;
  mealId?: number | undefined;
  amount: number;
  date: string;
};
