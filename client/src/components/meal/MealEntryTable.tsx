import { FC } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Meal, MealEntry } from "@/types/meal/types";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@/actions/api";

type Props = {
  mealEntries: MealEntry[] | undefined
  meals: Meal[] | undefined
}

export const MealEntryTable: FC<Props> = ({mealEntries, meals}) => {
  const queryClient = useQueryClient();
  const handleDelete = async (id: number) => {
    const response = await api.delete(`meal-entry/${id}`);
    queryClient.invalidateQueries({ queryKey: ['meal-entry'] });
    return response;
  };
  return (
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Calories</TableHead>
            <TableHead>Proteins</TableHead>
            <TableHead>Carbs</TableHead>
            <TableHead>Fats</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mealEntries?.map(
            ({ proteins, date, id, fats, carbs, mealId, calories }) => {
              const name =
                meals?.find((meal) => meal.id === mealId)?.name ||
                'Custom entry';
              return (
                <TableRow key={id}>
                  <TableCell>{id}</TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>{calories}</TableCell>
                  <TableCell>{proteins}</TableCell>
                  <TableCell>{carbs}</TableCell>
                  <TableCell>{fats}</TableCell>
                  <TableCell>{date}</TableCell>
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
}
