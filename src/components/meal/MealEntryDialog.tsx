import { useDialogStore } from "@/hooks/zustand/meal-entry/useDialogStore";
import { FC } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { MealEntryCustomForm } from "./MealEntryCustomForm";
import { MealEntryForm } from "./MealEntryForm";

const TabsValue = {
  Account: "account",
  Custom: "custom",
};

export const MealEntryDialog: FC = () => {
  const { isOpen, openDialog, closeDialog } = useDialogStore();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => (open ? openDialog() : closeDialog())}
    >
      <DialogContent className="sm:max-w-[425px]">
        <Tabs defaultValue={TabsValue.Account}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value={TabsValue.Account}>Meal entry</TabsTrigger>
            <TabsTrigger value={TabsValue.Custom}>Custom</TabsTrigger>
          </TabsList>
          <TabsContent value={TabsValue.Account}>
            <DialogHeader>
              <DialogTitle>Add entry</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you are done.
              </DialogDescription>
            </DialogHeader>
            <MealEntryForm className="space-y-8">
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </MealEntryForm>
          </TabsContent>
          <TabsContent value={TabsValue.Custom}>
            <DialogHeader>
              <DialogTitle>Custom entry</DialogTitle>
              <DialogDescription>
                Create your custom meal entry here. Click save when you are
                done.
              </DialogDescription>
              <MealEntryCustomForm>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </MealEntryCustomForm>
            </DialogHeader>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};