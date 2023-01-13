import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";
import { BodyProps } from "../Typography/Body/Body";
import { LabelProps } from "../Typography/Label/Label";
import { Children } from "../util/Children";
import { ChipCustomColors } from "../util/ConfigurableTypes";

export type ChipConfig = {
  paddingX: BentoSprinkles["paddingX"];
  paddingY: BentoSprinkles["paddingY"];
  label: { kind: "label"; size: LabelProps["size"] } | { kind: "body"; size: BodyProps["size"] };
  iconSize: IconProps["size"];
  closeIcon: (props: IconProps) => Children;
  closeIconSize: IconProps["size"];
  spacingAfterIcon: BentoSprinkles["gap"];
  spacingAfterLabel: BentoSprinkles["gap"];
  customColors: {
    [k in ChipCustomColors]: BentoSprinkles["background"];
  };
  radius: BentoSprinkles["borderRadius"];
};
