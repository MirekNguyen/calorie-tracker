'use client';

import { ChevronsUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useMealQuery } from '@/hooks/query/useMealQuery';
import { MealFormData } from '@/types/meal/mealSchema';
import { FC, useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { useMediaQuery } from 'usehooks-ts';
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer';
import { MealList } from './MealList';

type Props = {
  field: ControllerRenderProps<MealFormData>;
};

export const ComboboxDemo: FC<Props> = ({ field }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const { data: meals } = useMealQuery();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value ? value : 'Select meal...'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <MealList
            meals={meals}
            value={value}
            setValue={setValue}
            setOpen={setOpen}
            field={field}
          />
        </PopoverContent>
      </Popover>
    );
  } else {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value ? value : 'Select meal...'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mt-4 border-t">
            <MealList
              meals={meals}
              value={value}
              setValue={setValue}
              setOpen={setOpen}
              field={field}
            />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
};
