import { IconButtonProps } from "../IconButton/IconButton";
import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";
import { BodyProps } from "../Typography/Body/Body";
import { LabelProps } from "../Typography/Label/Label";
import { BorderRadiusConfig } from "../util/BorderRadiusConfig";
import { Children } from "../util/Children";
import { ChipCustomColors } from "../util/ConfigurableTypes";

export type ChipConfig = {
  paddingX: BentoSprinkles["paddingX"];
  paddingY: BentoSprinkles["paddingY"];
  label: { kind: "label"; size: LabelProps["size"] } | { kind: "body"; size: BodyProps["size"] };
  iconSize: IconProps["size"];
  closeIcon: (props: IconProps) => Children;
  closeIconSize: IconButtonProps["size"];
  spacingAfterIcon: BentoSprinkles["gap"];
  spacingAfterLabel: BentoSprinkles["gap"];
  customColors: {
    [k in ChipCustomColors]: BentoSprinkles["background"];
  };
  radius: BorderRadiusConfig;
  uppercase: boolean;
};
