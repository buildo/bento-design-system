import { FunctionComponent } from "react";
import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";
import { BodyProps } from "../Typography/Body/Body";
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
  dayWidth: BentoSprinkles["width"];
  dayHeight: BentoSprinkles["height"];
  dayRadius: BentoSprinkles["borderRadius"];
  daySize: BodyProps["size"];
};
