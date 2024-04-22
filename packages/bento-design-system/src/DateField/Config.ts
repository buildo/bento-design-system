import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";
import { BodyProps } from "../Typography/Body/Body";
import { LabelProps } from "../Typography/Label/Label";
import { BorderRadiusConfig } from "../util/BorderRadiusConfig";
import { Children } from "../util/Children";

export type DateFieldConfig = {
  radius: BorderRadiusConfig;
  padding: NonNullable<BentoSprinkles["padding"]>;
  internalPadding: NonNullable<BentoSprinkles["padding"]>;
  elevation: "none" | "small" | "medium" | "large";
  rangeSeparatorSize: IconProps["size"];
  monthYearLabelSize: LabelProps["size"];
  dayOfWeekLabelSize: LabelProps["size"];
  previousMonthIcon: (props: IconProps) => Children;
  nextMonthIcon: (props: IconProps) => Children;
  monthYearSelectIcons: {
    open: (props: IconProps) => Children;
    close: (props: IconProps) => Children;
  };
  dayWidth: number;
  dayHeight: number;
  dayRadius: BorderRadiusConfig;
  daySize: BodyProps["size"];
};
