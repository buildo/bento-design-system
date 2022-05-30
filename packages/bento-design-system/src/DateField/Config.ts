import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";
import { BodyProps } from "../Typography/Body/Body";
import { LabelProps } from "../Typography/Label/Label";
import { Children } from "../util/Children";
import { vars } from "../vars.css";

export type DateFieldConfig = {
  radius: NonNullable<BentoSprinkles["borderRadius"]>;
  padding: NonNullable<BentoSprinkles["padding"]>;
  elevation: "none" | "small" | "medium" | "large";
  monthYearLabelSize: LabelProps["size"];
  dayOfWeekLabelSize: LabelProps["size"];
  previousMonthIcon: (props: IconProps) => Children;
  nextMonthIcon: (props: IconProps) => Children;
  monthYearSelectIcons: {
    open: (props: IconProps) => Children;
    close: (props: IconProps) => Children;
  };
  dayWidth: keyof typeof vars.space;
  dayHeight: keyof typeof vars.space;
  dayRadius: NonNullable<BentoSprinkles["borderRadius"]>;
  daySize: BodyProps["size"];
};
