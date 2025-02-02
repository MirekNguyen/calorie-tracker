"use client";
import { CaloriesCard } from "@/components/common/CaloriesCard";
import { NutrientsCard } from "@/components/common/NutrientsCard";
import { MealEntryContext } from "@/components/meal/MealEntry/MealEntryContext";
import { MealEntryTable } from "@/components/meal/MealEntry/MealEntryTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMealEntryQuery } from "@/hooks/query/useMealEntryQuery";
import { useMealQuery } from "@/hooks/query/useMealQuery";
import { useDialogStore } from "@/hooks/zustand/meal-entry/useDialogStore";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

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
