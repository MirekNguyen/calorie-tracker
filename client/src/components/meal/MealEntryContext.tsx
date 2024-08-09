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

  const queryClient = useQueryClient();
  const onSubmit = async ({ mealId, amount }: MealFormData) => {
    const response = submitMealEntry(mealId, amount).then(() => {
      queryClient.invalidateQueries({ queryKey: ['meal-entry'] });
    });
    toggleOpen();
    return response;
  };

  if (isDesktop) {
    return (
      <MealEntryDialog
        onSubmit={onSubmit}
        open={open}
        toggleOpen={toggleOpen}
      />
    );
  } else {
    return (
      <MealEntryDrawer
        onSubmit={onSubmit}
        open={open}
        toggleOpen={toggleOpen}
      />
    );
  }
};
