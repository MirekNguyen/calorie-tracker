import { useDialogStore } from "@/hooks/zustand/meal-entry/useDialogStore";
import { FC } from "react";
import { Button } from "../../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../../ui/drawer";
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
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <Tabs defaultValue={TabsValue.Account}>
          <DrawerHeader className="text-left">
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
            <DrawerTitle>Add entry</DrawerTitle>
            <DrawerDescription>
              Make changes to your profile here. Click save when you are done.
            </DrawerDescription>
          </DrawerHeader>
          <TabsContent value={TabsValue.Account}>
            <MealEntryForm className="grid items-start px-4 h-72">
              <Button type="submit">Save changes</Button>
            </MealEntryForm>
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </TabsContent>
          <TabsContent value={TabsValue.Custom}>
            <MealEntryCustomForm className="grid items-start px-4 h-72">
              <Button type="submit">Save changes</Button>
            </MealEntryCustomForm>
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </TabsContent>
          <TabsContent value={TabsValue.Meal}>
            <MealForm className="grid items-start px-4 h-72">
              <Button type="submit">Save changes</Button>
            </MealForm>
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </TabsContent>
        </Tabs>
      </DrawerContent>
    </Drawer>
  );
};
