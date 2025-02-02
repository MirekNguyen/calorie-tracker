"use client";
import { useApi } from "@/actions/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Meal, MealEntry } from "@/types/meal/types";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { FC, useState } from "react";
import { Button } from "../../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

type Props = {
  mealEntries: MealEntry[] | undefined;
  meals: Meal[] | undefined;
};

export const MealEntryTable: FC<Props> = ({ mealEntries, meals }) => {
  const queryClient = useQueryClient();
  const api = useApi();
  const handleDelete = async (api: AxiosInstance, id: number) => {
    const response = await api.delete(`meal-entry/${id}`);
    queryClient.invalidateQueries({ queryKey: ["meal-entry"] });
    setOpen(false);
    return response;
  };
  const [open, setOpen] = useState(false);
  const toggleDetail = (meal: MealEntry) => {
    setOpen(true);
    setMealEntry(meal);
    setMealEntryName(meals?.find((m) => m.id === meal.mealId)?.name || "Custom entry");
    console.log(meal);
  };
  const [mealEntry, setMealEntry] = useState<MealEntry>();
  const [mealEntryName, setMealEntryName] = useState<string | null>(null);
  return (
    <>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Calories</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mealEntries?.map((meal) => {
            const name = meals?.find((m) => m.id === meal.mealId)?.name || "Custom entry";
            return (
              <TableRow
                key={meal.id}
                className="hover:cursor-pointer"
                onClick={() => toggleDetail(meal)}
              >
                <TableCell className="w-1">{Math.round(meal.amount)}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell className="text-right text-nowrap">{Math.round(meal.calories)} kcal</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{mealEntryName}</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Are you sure you want to permanently
              delete this file from our servers?
            </DialogDescription>
            <Label htmlFor="Calories">Calories</Label>
            <Input
              id="proteins"
              placeholder="proteins"
              value={mealEntry?.calories + "g"}
              disabled
            />
            <Label htmlFor="proteins">Proteins</Label>
            <Input
              id="proteins"
              placeholder="proteins"
              value={mealEntry?.proteins + "g"}
              disabled
            />
            <Label htmlFor="1">Carbs</Label>
            <Input
              id="carbs"
              placeholder="Carbs"
              value={mealEntry?.carbs + "g"}
              disabled
            />
            <Label htmlFor="fats">Carbs</Label>
            <Input
              id="fats"
              placeholder="Fats"
              value={mealEntry?.fats + "g"}
              disabled
            />
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              placeholder="Amount"
              value={mealEntry?.amount}
              disabled
            />
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" type="submit" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => mealEntry && handleDelete(api, mealEntry.id)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
