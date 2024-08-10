"use client";
import { api } from "@/actions/api";
import { Meal, MealEntry } from "@/types/meal/types";
import { useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type Props = {
  mealEntries: MealEntry[] | undefined;
  meals: Meal[] | undefined;
};

export const MealEntryTable: FC<Props> = ({ mealEntries, meals }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const queryClient = useQueryClient();
  const handleDelete = async (id: number) => {
    const response = await api.delete(`meal-entry/${id}`);
    queryClient.invalidateQueries({ queryKey: ["meal-entry"] });
    return response;
  };
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          {isDesktop && <TableHead>Id</TableHead>}
          <TableHead>Name</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Calories</TableHead>
          <TableHead>Proteins</TableHead>
          {isDesktop && (
            <>
              <TableHead>Carbs</TableHead>
              <TableHead>Fats</TableHead>
            </>
          )}
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mealEntries?.map(
          ({ proteins, id, fats, carbs, mealId, calories, amount }) => {
            const name =
              meals?.find((meal) => meal.id === mealId)?.name || "Custom entry";
            return (
              <TableRow key={id}>
                {isDesktop && <TableCell>{id}</TableCell>}
                <TableCell>{name}</TableCell>
                <TableCell>{amount}</TableCell>
                <TableCell>{calories} kcal</TableCell>
                <TableCell>{proteins} g</TableCell>
                {isDesktop && (
                  <>
                    <TableCell>{carbs} g</TableCell>
                    <TableCell>{fats} g</TableCell>
                  </>
                )}
                <TableCell>
                  <Button variant="outline" onClick={() => handleDelete(id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          },
        )}
      </TableBody>
    </Table>
  );
};
