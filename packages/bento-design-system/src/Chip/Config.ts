import { FunctionComponent } from "react";
import { BoxProps } from "../Box/createBentoBox";
import { IconProps } from "../Icons";
import { BentoSprinkles, bentoSprinkles } from "../internal";
import { LabelProps } from "../Typography/Label/Label";

export type ChipConfig<AtomsFn extends typeof bentoSprinkles, CustomColor extends string> = {
  paddingX: BentoSprinkles["paddingX"];
  paddingY: BentoSprinkles["paddingY"];
  labelSize: LabelProps["size"];
  iconSize: IconProps["size"];
  closeIcon: FunctionComponent<IconProps>;
  closeIconSize: IconProps["size"];
  spacingAfterIcon: BentoSprinkles["gap"];
  spacingAfterLabel: BentoSprinkles["gap"];
  customColors: {
    [k in CustomColor]: BoxProps<AtomsFn>["background"];
  };
};
