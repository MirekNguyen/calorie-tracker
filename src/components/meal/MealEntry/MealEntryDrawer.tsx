import { useDialogStore } from "@/hooks/zustand/meal-entry/useDialogStore";
import { FC } from "react";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { MealForm } from "../MealForm";
import { MealEntryForm } from "./MealEntryForm";
import { MealEntryCustomForm } from "./MealEntryCustomForm";

const TabsValue = {
  Account: "account",
  Custom: "custom",
  Meal: "meal",
};

export const MealEntryDrawer: FC = () => {
  const { isOpen, openDialog, closeDialog } = useDialogStore();
  const onOpenChange = (open: boolean) => (open ? openDialog() : closeDialog());

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <Tabs defaultValue={TabsValue.Account}>
          <DialogHeader className="text-left">
            <TabsList className="flex w-full flex-wrap gap-2 sm:flex-nowrap sm:justify-center">
              <TabsTrigger
                value={TabsValue.Account}
                className="flex-1 text-center"
              >
                Meal entry
              </TabsTrigger>
              <TabsTrigger
                value={TabsValue.Custom}
                className="flex-1 text-center"
              >
                Custom
              </TabsTrigger>
              <TabsTrigger
                value={TabsValue.Meal}
                className="flex-1 text-center"
              >
                Meal
              </TabsTrigger>
            </TabsList>
            <DialogTitle>Add entry</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <TabsContent value={TabsValue.Account}>
            <MealEntryForm className="grid items-start px-4 h-72">
              <Button type="submit">Save changes</Button>
            </MealEntryForm>
            <DialogFooter className="pt-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </TabsContent>
          <TabsContent value={TabsValue.Custom}>
            <MealEntryCustomForm className="grid items-start px-4 h-72">
              <Button type="submit">Save changes</Button>
            </MealEntryCustomForm>
            <DialogFooter className="pt-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </TabsContent>
          <TabsContent value={TabsValue.Meal}>
            <MealForm className="grid items-start px-4 h-72">
              <Button type="submit">Save changes</Button>
            </MealForm>
            <DialogFooter className="pt-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

