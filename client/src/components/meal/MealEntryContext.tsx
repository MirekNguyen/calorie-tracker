import { submitMealEntry } from '@/actions/meal-entry';
import { MealFormData } from '@/types/meal/mealSchema';
import { useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { MealEntryDialog } from './MealEntryDialog';
import { MealEntryDrawer } from './MealEntryDrawer';

type Props = {
  isDesktop: boolean;
  open: boolean;
  toggleOpen: () => void;
};

export const MealEntryContext: FC<Props> = ({ isDesktop, open, toggleOpen }) => {
  if (isDesktop) {
    return (
      <MealEntryDialog
        open={open}
        toggleOpen={toggleOpen}
      />
    );
  } else {
    return (
      <MealEntryDrawer
        open={open}
        toggleOpen={toggleOpen}
      />
    );
  }
};
