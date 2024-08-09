import { FC } from 'react';
import { Button } from '../ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '../ui/drawer';
import { MealEntryForm } from './MealEntryForm';

type Props = {
  open: boolean;
  toggleOpen: () => void;
};

export const MealEntryDrawer: FC<Props> = ({ open, toggleOpen }) => {
  return (
    <Drawer open={open} onOpenChange={toggleOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add entry</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you are done.
          </DrawerDescription>
        </DrawerHeader>
        <MealEntryForm
          toggleOpen={toggleOpen}
          className="space-y-8 grid items-start gap-4 px-4"
        >
          <Button type="submit">Save changes</Button>
        </MealEntryForm>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
