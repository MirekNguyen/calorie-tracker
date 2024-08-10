import { FC } from "react";
import { useMediaQuery } from "usehooks-ts";
import { MealEntryDialog } from "./MealEntryDialog";
import { MealEntryDrawer } from "./MealEntryDrawer";

export const MealEntryContext: FC = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop) {
    return <MealEntryDialog />;
  } else {
    return <MealEntryDrawer />;
  }
};
