import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";
import { LabelProps } from "../Typography/Label/Label";
import { ButtonSize } from "./createButton";

type SizeConfig<T> = {
  [k in ButtonSize]: T;
};
export type ButtonConfig = {
  paddingX: SizeConfig<BentoSprinkles["paddingX"]>;
  paddingY: SizeConfig<BentoSprinkles["paddingY"]>;
  labelSize: LabelProps["size"];
  radius: BentoSprinkles["borderRadius"];
  internalSpacing: BentoSprinkles["gap"];
  iconSize: SizeConfig<IconProps["size"]>;
  uppercaseLabel: boolean;
  defaultSize: ButtonSize;
};
