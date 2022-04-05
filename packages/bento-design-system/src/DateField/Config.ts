import { FunctionComponent } from "react";
import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";
import { LabelProps } from "../Typography/Label/Label";

export type DateFieldConfig = {
  radius: BentoSprinkles["borderRadius"];
  padding: BentoSprinkles["padding"];
  elevation: "none" | "small" | "medium" | "large";
  monthYearLabelSize: LabelProps["size"];
  dayOfWeekLabelSize: LabelProps["size"];
  previousMonthIcon: FunctionComponent<IconProps>;
  nextMonthIcon: FunctionComponent<IconProps>;
  monthYearSelectIcons: {
    open: FunctionComponent<IconProps>;
    close: FunctionComponent<IconProps>;
  };
};
