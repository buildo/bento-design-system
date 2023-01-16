import { IconProps } from "../Icons";
import { BentoSprinkles } from "../internal";
import { LabelProps } from "../Typography/Label/Label";
import { ButtonProps, ButtonSize } from "./Button";

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
  /**
   * @default true
   */
  uppercaseLabel: boolean;
  /**
   * @default "medium"
   */
  defaultSize: ButtonSize;
  defaultIconPosition: ButtonProps["iconPosition"];
};
