import { useDialogStore } from "@/hooks/zustand/meal-entry/useDialogStore";
import { FC } from "react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { MealEntryCustomForm } from "./MealEntryCustomForm";
import { MealEntryForm } from "./MealEntryForm";

const TabsValue = {
  Account: "account",
  Custom: "custom",
};

export const MealEntryDrawer: FC = () => {
  const { isOpen, openDialog, closeDialog } = useDialogStore();
  const onOpenChange = (open: boolean) => (open ? openDialog() : closeDialog());

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <Tabs defaultValue={TabsValue.Account}>
          <DrawerHeader className="text-left">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value={TabsValue.Account}>Meal entry</TabsTrigger>
              <TabsTrigger value={TabsValue.Custom}>Custom</TabsTrigger>
            </TabsList>
            <DrawerTitle>Add entry</DrawerTitle>
            <DrawerDescription>
              Make changes to your profile here. Click save when you are done.
            </DrawerDescription>
          </DrawerHeader>
          <TabsContent value={TabsValue.Account}>
            <MealEntryForm className="space-y-8 grid items-start gap-4 px-4">
              <Button type="submit">Save changes</Button>
            </MealEntryForm>
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </TabsContent>
          <TabsContent value={TabsValue.Custom}>
            <MealEntryCustomForm className="grid items-start px-4">
              <Button type="submit">Save changes</Button>
            </MealEntryCustomForm>
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
