'use client';
import { api } from '@/actions/api';
import { AmountFormField } from '@/components/meal/AmountFormField';
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
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useMealForm } from '@/hooks/form/useMealForm';
import { useMealEntryQuery } from '@/hooks/query/useMealEntryQuery';
import { useMealQuery } from '@/hooks/query/useMealQuery';
import { MealFormData } from '@/types/meal/mealSchema';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

export default function Home() {
  const form = useMealForm();
  const { control, handleSubmit } = form;
  const [open, setOpen] = React.useState(false);
  const { data: mealEntries } = useMealEntryQuery();
  const { data: meals } = useMealQuery();

  const onSubmit = async ({ mealId, amount }: MealFormData) => {
    const response = await api.post('meal-entry', {
      mealId,
      amount,
      date: new Date(),
    });
    queryClient.invalidateQueries({ queryKey: ['meal-entry'] });
    setOpen(false);
    return response;
  };
  const queryClient = useQueryClient();
  const handleDelete = async (id: number) => {
    const response = await api.delete(`meal-entry/${id}`);
    queryClient.invalidateQueries({ queryKey: ['meal-entry'] });
  };

  return (
    <>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Calories</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>
            {mealEntries?.reduce((acc, { calories }) => acc + calories, 0)} /
            2200
          </Label>
        </CardContent>
      </Card>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Proteins</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>
            {mealEntries?.reduce((acc, { proteins }) => acc + proteins, 0)}
          </Label>
        </CardContent>
      </Card>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Add Entry
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <MealFormField control={control} />
              <AmountFormField control={control} />
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
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
    </>
  );
}
