import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { MealFormData } from "@/types/meal/mealSchema";
import { Meal } from "@/types/meal/types";
import { Check } from "lucide-react";
import { FC } from "react";
import { ControllerRenderProps } from "react-hook-form";

type Props = {
  meals: Meal[] | undefined;
  value: string;
  setValue: (value: string) => void;
  setOpen: (value: boolean) => void;
  field: ControllerRenderProps<MealFormData>;
};

export const MealList: FC<Props> = ({
  meals,
  setValue,
  setOpen,
  value,
  field,
}) => {
  return (
    <Command>
      <CommandInput placeholder="Filter meals..." />
      <CommandEmpty>No framework found.</CommandEmpty>
      <CommandList>
        <CommandGroup>
          {meals?.map(({ id, name }: Meal) => (
            <CommandItem
              key={id}
              value={name}
              onSelect={() => {
                setValue(name);
                field.onChange(id);
                setOpen(false);
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === name ? "opacity-100" : "opacity-0",
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
