'use client';

import { Check, ChevronsUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useMealQuery } from '@/hooks/query/useMealQuery';
import { cn } from '@/lib/utils';
import { MealFormData } from '@/types/meal/mealSchema';
import { Meal } from '@/types/meal/types';
import { FC, useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { useMediaQuery } from 'usehooks-ts';
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer';

type Props = {
  field: ControllerRenderProps<MealFormData>;
};

type MealListProps = {
  meals: Meal[] | undefined;
  value: string;
  setValue: (value: string) => void;
  setOpen: (value: boolean) => void;
  field: ControllerRenderProps<MealFormData>;
};

const MealList: FC<MealListProps> = ({ meals, setValue, setOpen, value, field }) => {
  return (
    <Command>
      <CommandInput placeholder="Filter meals..." />
      <CommandEmpty>No framework found.</CommandEmpty>
      <CommandList>
        <CommandGroup>
          {meals?.map(({ id, name }: Meal) => (
            <CommandItem key={id} value={name} onSelect={
              (currentValue) => {
                setValue(currentValue === name ? '' : name);
                field.onChange(currentValue === name ? '' : id);
                setOpen(false);
              }
            }>
              <Check
                className={cn(
                  'mr-2 h-4 w-4',
                  value === name ? 'opacity-100' : 'opacity-0',
                )}
              />
              {name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
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
          <MealList meals={meals} value={value} setValue={setValue} setOpen={setOpen} field={field} />
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
          <MealList meals={meals} value={value} setValue={setValue} setOpen={setOpen} field={field} />
        </div>
      </DrawerContent>
    </Drawer>
    )
  }
};
