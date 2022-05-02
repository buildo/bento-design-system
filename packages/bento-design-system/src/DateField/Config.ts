import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";
import { BodyProps } from "../Typography/Body/Body";
import { LabelProps } from "../Typography/Label/Label";
import { Children } from "../util/Children";

export type DateFieldConfig = {
  radius: BentoSprinkles["borderRadius"];
  padding: BentoSprinkles["padding"];
  elevation: "none" | "small" | "medium" | "large";
  monthYearLabelSize: LabelProps["size"];
  dayOfWeekLabelSize: LabelProps["size"];
  previousMonthIcon: (props: IconProps) => Children;
  nextMonthIcon: (props: IconProps) => Children;
  monthYearSelectIcons: {
    open: (props: IconProps) => Children;
    close: (props: IconProps) => Children;
  };
  dayWidth: BentoSprinkles["width"];
  dayHeight: BentoSprinkles["height"];
  dayRadius: BentoSprinkles["borderRadius"];
  daySize: BodyProps["size"];
};
